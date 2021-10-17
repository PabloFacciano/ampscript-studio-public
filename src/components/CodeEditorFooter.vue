<template>
  <div class="bg-gray-light">
    <div v-if="showPanel != 'NONE'" class="bg-gray-darken divider"></div>
    <div v-if="showPanel != 'NONE'" class="py-2" style="max-height:200px;overflow:auto;">
      <div v-if="showPanel == 'CONSOLE'" class="p-3">
        <p v-if="myConsole.length == 0">Nothing to see here.</p>
        <div v-for="(msg,i) in myConsole" :key="i" :style="{ color: msg.color }" :class="`console-${i}`">{{ msg.text }}</div>
      </div>
      <div v-if="showPanel == 'HISTORY'" class="p-3">
        <div v-if="this.myRunHistory.length == 0">
          <p>Nothing to see here.</p>
        </div>
        <table v-if="this.myRunHistory.length > 0">
          <tr>
            <th class="pe-3"># Execution ID</th>
            <th class="px-3">Status</th>
            <th class="px-3">Run date</th>
            <th class="px-3">Duration</th>
          </tr>
          <tr v-for="(hs,i) in this.myRunHistory" :key="i">
            <td class="pe-3"><button class="btn btn-link p-0" @click="openHistory(hs)">{{ hs.executionId }}</button></td>
            <td class="px-3">
              <div class="d-flex text-gray">
                <div v-if="hs.status == 'OK'" class="d-flex align-items-center">
                  <span class="mx-2 material-icons" style="color:green;">done</span>
                  <span>OK</span>
                </div>
                <div v-if="hs.status == 'ERROR'" class="d-flex align-items-center">
                  <span class="mx-2 material-icons" style="color:red;">cancel</span>
                  <span>Error</span>
                </div>
                <div v-if="hs.status == 'RUNNING'" class="d-flex align-items-center">
                  <span class="mx-2"><div class='spinner-border spinner-border-sm mx-2' style='color:#CCCCCC;'></div></span>
                  <span>Running</span>
                </div>
              </div>
            </td>
            <td class="px-3">{{ hs.clientStartDate }}</td>
            <td class="px-3">{{ hs.duration != null ? hs.duration + ' second(s)' : 'Wait a second...' }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div v-if="showPanel != 'NONE'" class="bg-gray-darken divider"></div>
    <div class="d-flex bg-gray-light">
      <div class="btn-group">
        <button type="button" class="btn btn-outline-secondary rounded-0 border-0 btn-flat" :class="{ active: (showPanel == 'CONSOLE') }" @click="changeLowPanel('CONSOLE')">Console</button>
        <button type="button" class="btn btn-outline-secondary rounded-0 border-0 btn-flat d-flex align-items-center" :class="{ active: (showPanel == 'HISTORY') }" @click="changeLowPanel('HISTORY')"><span class="pe-2">Run History</span><span>({{ this.myRunHistory.length }})</span></button>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store/index.js';
export default {  
  props: {
    editorId: String
  },
  data() { 
    return {
      showPanel: 'HISTORY'
    };
  },
  methods: {
    scrollDownConsole() {
      const el = this.$refs.getElementsByClassName('console-'+codeEditor.console.length)[0];
      if (el) {
        el.scrollIntoView({behavior: 'smooth'});
      }
    },
    changeLowPanel(name){
      this.showPanel = (this.showPanel == name) ? 'NONE' : name;
    },
    openHistory(hs){
      let tabName = 'Run History - ' + hs.executionId;
      this.$store.commit('openNewTab',{
        type: 'history',
        name: tabName,
        id: 'run-history-'+hs.executionId,
        value: hs,
        closeable:true
      });
    }
  },
  computed: {
    myRunHistory: {
      get () {
        return this.codeEditor.runHistory.slice().reverse();
      }
    },
    myConsole: {
      get () {
        return this.codeEditor.console.slice().reverse();
      }
    },
    codeEditor: {
      get () {
        return store.state.codeEditors[this.editorId];
      },
      set (value) {
        store.commit('updateCodeEditor', {id: this.editorId, obj: value});
      }
    }
  }
}
</script>


<style scoped>

.btn-flat:focus {
  box-shadow: none;
  outline: none;
}
.divider {
  height: 2px;
}
.footer-button {
  cursor: pointer;
  color: #767676;
  padding: 0.2em 1em;
}
.footer-button:hover {
  background-color: #767676;
  color: #fff;
}
</style>
