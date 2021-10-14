<template>
  <div class="flex-fill d-flex flex-column">


    <div class="container flex-fill">
      <div class="row mt-5">
        <div class="col-12 py-3">
          <h2>AMPScript Studio</h2>
        </div>
        <div class="col-6 py-3 list-group list-group-flush">
          <button class="list-group-item list-group-item-action border-0 p-0 mb-2" @click="openTab('code-editor')">
            <div class="d-flex align-items-center">
              <div class="h-100"></div>
              <span class="material-icons ps-3">description</span>
              <div class="px-3 py-3">New Code Editor</div>
            </div>
          </button>
          <button class="list-group-item list-group-item-action border-0 p-0 mb-2" @click="openTab('settings')">
            <div class="d-flex align-items-center">
              <div class="h-100"></div>
              <span class="material-icons ps-3">settings</span>
              <div class="px-3 py-3">Settings</div>
            </div>
          </button>
          <button class="list-group-item list-group-item-action border-0 p-0 mb-2" @click="logout">
            <div class="d-flex align-items-center">
              <div class="h-100"></div>
              <span class="material-icons ps-3">logout</span>
              <div class="px-3 py-3">Log out</div>
            </div>
          </button>
          <small class="text-muted ps-3">
            <hr>
            Developed with ❤ by Pablo Facciano.<br>Copyright 2021. All rights reserved.
          </small>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';

export default {
  data() {
    return {
      
    };
  },
  computed: {
    
  },
  methods: {
    logout(){
      this.$store.dispatch("signOutAction");
    },
    openTab(tab){
      if (tab == 'code-editor'){

        this.$store.commit('addCodeEditor',{
          currentCode: '',
          currentView: '',
          cloudpageParam: '',
          runHistory: [],
          console: []
        })
        this.$store.commit('openNewTab',{
          type: 'code-editor',
          name: 'Code Editor #'+this.$store.state.codeEditors.length,
          id: uuid(),
          value: this.$store.state.codeEditors.length-1
        });

      } else if (tab == 'settings'){
        
        let tabName = 'Settings';
        if(!this.$store.state.tabs.some(t => t.name === tabName )){
          this.$store.commit('openNewTab', {
            type: 'settings',
            name: 'Settings',
            id: 'settings'
          });
        }
      }
    },
    openHistory(hs){
      let tabName = 'Run History - ' + hs.executionId;
      if(!this.$store.state.tabs.some(t => t.name === tabName )){
        this.$store.commit('openNewTab',{
          type: 'history',
          name: tabName,
          id: hs.executionId,
          value: hs
        });
      }
      this.$router.push({ path: '/', hash: '#'+hs.executionId });
    }
  }
}
</script>

<style scoped>
.bg-gray {
  background-color: #f8f9fa;
}
.bg-gray:hover {
  background-color: #eee;
}
.bg-gray:active {
  background-color: #ccc;
}
</style>

