<template>
  <div class="flex-fill d-flex flex-column">
    <div class="d-flex align-items-center ps-2">
      <div class="d-flex align-items-baseline">
        <div class="px-2">Cloudpage URL Param: </div>
        <button type="button" :disabled="codeStatus == 'RUNNING'" class="btn btn-link">Edit</button>
      </div>
      <button v-if="!runButtonDisabled" @click="runCode" type="button" class="btn btn-flat mx-3 px-4 d-flex align-items-center">
        <span>Run</span>
        <span class="material-icons">play_arrow</span>
      </button>
      <div class="d-flex text-gray">
        <div v-if="codeStatus == 'OK'" class="d-flex align-items-center">
          <span class="mx-2 material-icons" style="color:green;">done</span>
          <span>OK</span>
        </div>
        <div v-if="codeStatus == 'ERROR'" class="d-flex align-items-center">
          <span class="mx-2 material-icons" style="color:red;">cancel</span>
          <span>Error</span>
        </div>
        <div v-if="codeStatus == 'RUNNING'" class="d-flex align-items-center">
          <span class="mx-2"><div class='spinner-border spinner-border-sm mx-2' style='color:#CCCCCC;'></div></span>
          <span>Running</span>
        </div>
      </div>
    </div>
    <div class="bg-gray-light divider"></div>
    <div class="flex-fill">
      <div class="row g-0 h-100">
        <div class="col-4 bg-gray-lighter">
          <textarea @input="onCodeInput" v-model="currentCode" placeholder="Write some code here :)" style="resize: none;border:none;" class="form-control textarea rounded-0 h-100 remove-outline"></textarea>
        </div>
        <div class="col-8">
          <iframe class="w-100 h-100" :srcdoc="codeEditor.currentView"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/index.js';
import { v4 as uuid } from 'uuid';

export default {
  props: {
    editorId: String
  },
  data() {
    return {
      codeStatus: 'OK',
      tempoId: 0
    };
  },
  computed: {
    runButtonDisabled: function() {
      return (this.codeStatus == 'RUNNING') || (this.$store.state.codeSettings.livePreview == 'AUTO');
    },
    currentCode: {
      get () {
        return store.state.codeEditors[this.editorId].currentCode;
      },
      set (value) {
        store.commit('updateCodeInCodeEditor', {id: this.editorId, obj: value});
      }
    },
    codeEditor: {
      get () {
        return store.state.codeEditors[this.editorId];
      },
      set (value) {
        store.commit('updateCodeEditor', {id: this.editorId, obj: value});
      }
    },
    runHistory: {
      get () {
        return store.state.codeEditors[this.editorId].runHistory;
      },
      set (value) {
        store.commit('updateRunHistory', {id: this.editorId, obj: value});
      }
    }
  },
  methods: {
    onCodeInput(e){
      let previewMode = this.$store.state.codeSettings.livePreview;
      let timeoutTime = {
        DISABLED: 0,
        HTML: 500,
        AUTO: 3000
      }

      if (previewMode == 'DISABLED'){
        return;
      } else {
        clearInterval(this.tempoId);
        this.tempoId = setTimeout(()=>{ this.afterHidle() }, timeoutTime[previewMode]);
      }
      
    },
    afterHidle(){
      this.codeEditor.currentView = this.currentCode;

      let previewMode = this.$store.state.codeSettings.livePreview;
      if (previewMode == 'AUTO'){
        this.runCode();
      }
    },
    getLineForLog(ampscriptOpen, ssjsOpen, realLineNumber, lineNumber, code, executionid){
      let id = uuid();
      let line = "";
      
      if (ampscriptOpen == false && ssjsOpen == false){ line += "%%[" };
      if (ampscriptOpen == true  && ssjsOpen == false){ /* ampscript */ };
      if (ampscriptOpen == false && ssjsOpen == true ){ line += 'ampscript_studio__ampscript("' };
      // if (ampscriptOpen == true  && ssjsOpen == true ){ /* wtf */ }; // Never executed
      
      line += " InsertData(";
      line += "'ampscript_studio__run_history_lines',";
      line += "'Code','" + code.replace("'", "\\'") + "',";
      line += "'LineNumber','" + lineNumber + "',";
      line += "'RealLineNumber','" + realLineNumber + "',";
      line += "'RunDateOnClient','" + new Date().toLocaleString() + "',";
      line += "'RunDateOnServer',NOW(),";
      line += "'ExecutionID','" + executionid + "',";
      line += "'LineID','" + id + "'";
      line += ") ";

      if (ampscriptOpen == false && ssjsOpen == false){ line += "]%%" };
      if (ampscriptOpen == true  && ssjsOpen == false){ /* ampscript */ };
      if (ampscriptOpen == false && ssjsOpen == true ){ line += '")' };
      // if (ampscriptOpen == true  && ssjsOpen == true ){ /* wtf */ }; // Never executed

      return {
        code: line,
        id: id
      };
    },   
    getCodeWithLogs(rawCode,executionid){
      let finalCode = "";
      let lines = rawCode.split(/\r?\n/);

      let lineNumber = 0;
      let logsAdded = 0;

      let ampscriptOpens = 0;
      let ssjsOpens = 0;
      let ampscriptIsOpen = false;
      let ssjsIsOpen = false;

      let mode = store.state.codeSettings.logSelected;
      let logmode_user_continuelogging = false;
      let mapLines = true;

      let lineasReservadas = [
        "{{log.start}}",
        "{{log.stop}}"
      ];

      let rawCodeProcessed = [];

      lines.forEach(line => {
        
        // Agrega el codigo ejecutable
        let lineAdded = !lineasReservadas.includes(line.trim());
        if (lineAdded){
          lineNumber += 1;
          finalCode += line + "\r\n";
        }
        
        // Logica para agregar el log
        let addLog = false;
        if (mode == "NONE"){
          addLog = false;
        } else {
          
          let ampOpens = 0;
          let jsOpens = 0;
          for (let index = 0; index < line.length; index++) {
            const element = line.substring(index);
            if (element.startsWith("%%[")){ ampOpens++; }
            if (element.startsWith("]%%")){ ampOpens--; }
            if (element.startsWith("<script runat='server'>") || element.startsWith('<script runat="server">') || element.startsWith('<script runat=server>')){ jsOpens++; }
            if (element.startsWith("<\/script>")){ jsOpens-- }

          }
          ampscriptOpens += ampOpens;
          ssjsOpens += jsOpens;
          ampscriptIsOpen = (ampscriptOpens > 0);
          ssjsIsOpen = (ssjsOpens > 0);

          if (mode == "LINE"){
            addLog = true;
          } else if (mode == "CODE"){
            addLog = (ampscriptIsOpen || ssjsIsOpen);
          } else if (mode == "USER"){
            let myLine = line.trim();
            if (myLine == "{{log.start}}"){
              logmode_user_continuelogging = true;
            } else if (myLine == "{{log.stop}}"){
              logmode_user_continuelogging = false;
            }
            addLog = logmode_user_continuelogging;
          }

        }

        // Agrega el log
        if (addLog && lineAdded && line.trim()){
          line = line.replace("%%[","%%-[");
          line = line.replace("]%%","]-%%");
          // line = line.replace("<script>","<\/script>");
          // line = line.replace("<\/script>","\\\<\\\/script\\\>");
          
          let lineForLog = this.getLineForLog(ampscriptIsOpen,ssjsIsOpen,lineNumber + logsAdded,lineNumber,line,executionid);

          rawCodeProcessed.push({
            id: lineForLog.id,
            code: line
          })

          finalCode += lineForLog.code + "\r\n";
          logsAdded += 1;
        }

      });

      return {
        rawcode: rawCodeProcessed,
        processedcode: finalCode
      };
    },
    executeCode(url,data){

      return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => {
        if (!response.ok) throw Error(response.status);
        return response;
      })
    },
    runCode(){

      let executionid = uuid();
      let url = store.state.mcIntegration.cloudpageUrl + this.codeEditor.cloudpageParam;
      let rawCode = this.codeEditor.currentCode;

      this.codeEditor.console = [];
      this.writeOnConsole("Pre-processing the code.","#888")

      let codeWithLogs = this.getCodeWithLogs(rawCode,executionid);
      this.addRunHistory({
        executionId: executionid,
        status: 'RUNNING',
        logType: store.state.codeSettings.logSelected,
        runAs: store.state.codeSettings.runAs,
        url: url,
        rawCode: rawCode,
        rawCodeLogged: codeWithLogs.rawcode,
        compiledCode: codeWithLogs.processedcode,
        clientStartDate: this.getCurrentDate(),
      });

      let cmp = this;
      let postData = {
        code: codeWithLogs.processedcode,
        executionId: executionid
      }
      this.beforeRun();
      this.executeCode(url,postData)
      .then(res => res.text())
      .then(function(result){
        cmp.afterRun(result);
      })
      .catch (function (error) {
        console.error(error);
        cmp.afterRun(false);
      });

    },
    beforeRun(){
      this.codeStatus = "RUNNING";
      this.writeOnConsole("Running code.","#888")
      // Mostrar el icono de running
    },
    afterRun(success){
      // Mostrar el icono de success o error
      if (success === false){
        this.codeStatus = "ERROR";
        this.codeEditor.currentView = this.getErrorPageHTML("Runtime Error", 'Marketing Cloud returned an error. For more info, see the browser console.');
        this.writeOnConsole("Marketing Cloud returned an error! See browser console for more info.","#F00");
        this.updateRunHistory(false);
      } else {
        let result = JSON.parse(success);
        console.log('Cloudpage sent:',result);
        this.codeStatus = "OK";
        this.writeOnConsole("Execution finished.","#888")
        this.handleSuccessResult(result);
        this.updateRunHistory(result);
      }
    },
    getErrorPageHTML(title, description){
      let html = "";
      html += "<h1>😥 " + title + "</h1>"
      html += "<p>Message: " + description + "<p>";
      html += "<p>For more info, see the <b>Run History</b> tab.<p>";

      return html;
    },
    handleSuccessResult(json){
      if (json.httpcode == 200){
        this.codeEditor.currentView = json.result;
        this.writeOnConsole("No errors found.","#00731f")
      } else {
        this.codeEditor.currentView = this.getErrorPageHTML("Runtime Error", json.error.message);
        this.writeOnConsole("There was a run-time error. For more info, see the Run History tab.","#bf0a00")
      }
    },
    getCurrentDate(){
      return new Date().toISOString();
    },
    getDifferenceInSeconds(dt1,dt2){
      let d1 = new Date(dt1);
      let d2 = new Date(dt2);
      return Math.abs(d2 - d1) / 1000;
    },
    writeOnConsole(ttext, ccolor){     
      let consoleline = {
        text: this.getCurrentDate() + " | " + ttext, 
        color: ccolor
      };
      this.codeEditor.console.push(consoleline);
    },
    addRunHistory(obj){
      this.runHistory.push(obj);
    },
    updateRunHistory(obj){
      let hs = this.runHistory.pop();
      hs.clientEndDate = this.getCurrentDate();
      hs.duration = this.getDifferenceInSeconds(hs.clientStartDate, hs.clientEndDate);

      let hayError = false;
      if (obj === false){
        hayError = true;
      } else {
        hs.httpcode = obj.httpcode;
        if (obj.httpcode != 200){
          hs.error = obj.error;
          hayError = true;          
        } else {

        }
      }
      hs.status = hayError ? 'ERROR' : 'OK';
      hs.result = hayError ? null : obj.result;
      hs.logs = obj.logs ?? null;
      hs.serverInitDate = obj.initdate ?? 'Unkown';
      hs.serverStartDate = obj.startdate ?? 'Unkown';
      hs.serverEndDate = obj.enddate ?? 'Unkown';
      hs.serverDuration = Math.round( this.getDifferenceInSeconds(hs.serverInitDate, hs.serverEndDate) * 100) / 100 ?? 'Unkown';
      hs.serverPercent = ((hs.serverDuration * 100) / hs.duration);
      hs.clientPercent = (100 - hs.serverPercent) ?? 50;

      this.addRunHistory(hs);
    }
  }

}
</script>

<style scoped>
/* Content */
.remove-outline:focus{
  outline:none;
  box-shadow: none;
}
.textarea {
  background: #f4f4f4;
}
/* Header */
.divider {
  height: 2px;
}
.btn-flat {
  background-color: #007acc;
  color: #fff;
  border-radius: 0;
}
.btn-flat:hover {
  color: #fff;
  outline: none !important;
  box-shadow: none;
}
.btn-flat:focus {
  outline: none !important;
  box-shadow: none;
}
</style>