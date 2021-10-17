<template>
  <div class="flex-fill d-flex flex-column">


    <div class="container flex-fill">
      <div class="row mt-5">
        <div class="col-sm-3 col-12 py-3">
          <h4 class="py-3">Tabs</h4>
                
            <div v-for="(tab, i) in this.$store.state.tabs" :key="i" class="d-flex align-items-baseline">
              {{ tab.name }}
              <button type="button" class="btn ms-2" v-if="tab.closeable" @click="closeTab(tab.id)">&times;</button>
            </div>
          <hr>
          
        </div>
        <div class="col-sm-6 col-12 py-3 list-group list-group-flush">
          <h2 class="py-3">AMPScript Studio</h2>
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
  methods: {
    logout(){
      this.$store.dispatch("signOutAction");
    },
    removeAllInstances(arr, item) {
      for (var i = arr.length; i--;) {
        if (arr[i] === item) arr.splice(i, 1);
      }
    },  
    closeTab(id){
      this.$store.commit('closeTab',id);
      // window.location.href = '/#';
      
      this.$emit('tabsChanged');
      console.log('changed!');
    },
    openTab(tab){
      if (tab == 'code-editor'){

        let id = uuid();
        this.$store.commit('addCodeEditor',{
          id: id,
          currentCode: '',
          currentView: '',
          cloudpageParam: '',
          runHistory: [],
          console: []
        })
        this.$store.commit('openNewTab',{
          type: 'code-editor',
          name: 'Code Editor #' + this.$store.state.tabs.length,
          id: 'code-editor-' + id,
          value: id,
          closeable: true
        });

      } else if (tab == 'settings'){
      
        this.$store.commit('openNewTab', {
          type: 'settings',
          name: 'Settings',
          id: 'settings',
          closeable: true
        });
      }
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

