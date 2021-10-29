<template>
  <div class="flex-fill d-flex flex-column">
    <div class="d-flex align-items-center ps-2">
      <div class="d-flex align-items-baseline">
        <div class="p-2">{{ 'Execution ID: ' + history.executionId }}</div>
      </div>
    </div>
    <div class="bg-gray-light divider"></div>
    <div class="flex-fill">
      <div class="row g-0 h-100">
        <div class="col-4 p-4 bg-gray-lighter">

          <div class="row">
            <div class="col-6">
              <h5>Status:</h5>
              <div class="d-flex my-3">
                <div v-if="history.status == 'OK'" class="d-flex align-items-center">
                  <span class="mx-2 material-icons" style="color:green;font-size:3rem;">done</span>
                  <span>OK</span>
                </div>
                <div v-if="history.status == 'ERROR'" class="d-flex align-items-center">
                  <span class="mx-2 material-icons" style="color:red;font-size:3rem;">cancel</span>
                  <span>Error</span>
                </div>
              </div>
            </div>
            <div class="col-6">
              <h5>Logs:</h5>
              <div class="d-flex my-3">
                <div v-if="history.logType != 'NONE'" class="d-flex align-items-center">
                  <span class="mx-2 material-icons" style="color:green;font-size:3rem;">done</span>
                  <span>{{ history.logType }}</span>
                </div>
                <div v-if="history.logType == 'NONE'" class="d-flex align-items-center">
                  <span class="mx-2 material-icons" style="color:gray;font-size:3rem;">cancel</span>
                  <span>None</span>
                </div>
              </div>
            </div>
            <div v-if="history.status == 'ERROR'" class="col-12 mt-2">
              <h5>Error details:</h5>
              <div class="my-3">
                <div><b>Error code:</b> <span>{{ history.httpcode ?? 'Unkown' }}</span></div>
                <div><b>Error message:</b> <span>{{ history.error ? history.error.message : 'Unkown' }}</span></div>
                <div><b>Error description:</b> <span v-if="seeErrorDescription">{{ history.error ? history.error.description : 'Unkown' }}</span>
                  <button @click="this.seeErrorDescription = !this.seeErrorDescription;" type="button" class="btn btn-link">{{ seeErrorDescription ? 'Hide' : 'Show' }}</button>
                </div>
              </div>
            </div>
            <div class="col-12 mt-2">
              <h5>Code View:</h5>
              <select class="form-select my-3" v-model="codeView">
                <option value="ORIGINAL">Original</option>
                <option value="COMPILED">Pre-compiled</option>
                <option :disabled="['NONE'].includes(this.history.logType)" value="LINE">Lines executed</option>
                <option :disabled="['NONE'].includes(this.history.logType)" value="COVERAGE">Code coverage</option>
                <option value="RESULT">Result</option>
              </select>
            </div>
            <div class="col-12 mt-2">
              <h5>Running time:</h5>
              <div class="progress my-3" style="height: 30px;">
                <div class="progress-bar" style="background:#888;" :style="{width: history.clientPercent + '%'}">{{ 'Client (' + history.clientPercent + '%)' }}</div>
                <div class="progress-bar" style="background:#333;" :style="{width: history.serverPercent + '%'}">{{ 'Server (' + history.serverPercent + '%)' }}</div>
              </div>
              <div>
                <div>Client: {{ history.duration - history.serverDuration }} seconds ({{ history.clientPercent }}%)</div>
                <div>Server: {{ history.serverDuration }} seconds ({{ history.serverPercent }}%)</div>
                <div>Total: {{ history.duration }} seconds</div>
              </div>
            </div>
          </div>
        
        </div>
        <div class="col-8" style="overflow:auto;">

          <div v-if="'LINE' == this.codeView" class="m-3">
            <div v-for="(msg,i) in this.codelines" :key="i" class="d-flex">
              <div class="me-3 text-gray">{{ msg.LineNumber }}</div>
              <div>{{ msg.Code }}</div>
            </div>
          </div>

          <div v-if="['ORIGINAL','COMPILED'].includes(this.codeView)" class="m-3">
            <div v-for="(msg,i) in this.codelines" :key="i" class="d-flex">
              <div class="me-3 text-gray">{{ i+1 }}</div>
              <div>{{ msg }}</div>
            </div>
          </div>

          <div v-if="'COVERAGE' == this.codeView" class="m-3">

            <div v-for="(msg,i) in this.codelines" :key="i" class="d-flex">
              <div class="me-3 text-gray">{{ msg.LineNumber }}</div>
              <div v-if="msg.Type == 'COVERED'" class="text-light bg-success px-2">{{ msg.Code }}</div>
              <div v-if="msg.Type == 'NONE'" class="text-dark bg-gray-light px-2">{{ msg.Code }}</div>
              <div v-if="!['COVERED','NONE'].includes(msg.Type)" class="text-light bg-danger px-2">{{ msg.Code }}</div>
            </div>

          </div>

          <div v-show="'RESULT' == this.codeView">
            <iframe class="w-100 h-100" :srcdoc="this.history.result"></iframe>
          </div>
          

        </div>
      </div>
    </div>
    <div class="bg-gray-light">
      <div class="bg-gray-darken divider"></div>
      <div class="d-flex bg-gray-light">
        <div class="btn-group">
          <button type="button" class="btn btn-outline-secondary rounded-0 border-0 remove-outline">{{ history.url }}</button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  props: {
    history: Object
  },
  data() {
    return {
      codeView: 'ORIGINAL',
      seeErrorDescription: false
    };
  },
  methods: {

  },
  computed: {
    codelines: function(){
      if (this.codeView == 'ORIGINAL'){
        return this.history.rawCode.split("\n")
      } else if (this.codeView == 'COMPILED'){
        return this.history.compiledCode.split("\n")
      } else if (this.codeView == 'LINE'){
        return this.history.logs;
      } else if (this.codeView == 'COVERAGE'){
        let codeToReturn = [];
        this.history.rawCodeLogged.forEach((line,index) => {
          let codeToAdd = {
            LineNumber: index+1,
            Code: line.code,
            Type: 'NONE'
          };
          if(this.history.logs?.some(e => (e.LineID === line.id))){
            codeToAdd.Type = 'COVERED';
          }
          codeToReturn.push(codeToAdd);
        });

        return codeToReturn;
      }
    }
  }
};
</script>

<style scoped>


.remove-outline:focus{
  outline:none;
  box-shadow: none;
}
.textarea {
  background: #f4f4f4;
}
.divider {
  height: 2px;
}
</style>