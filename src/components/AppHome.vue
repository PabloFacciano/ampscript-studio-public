<template>
  <div class="flex-fill d-flex flex-column">

    <div class="container flex-fill">
      <div class="row px-3 pt-3">
        <div class="col-lg-4 col-md-6 col-12">
          <h2 class="pt-3 pb-2">AMPScript Studio</h2>
          <hr>
          <button v-for="tab in this.tabs" :key="tab.tabtype" class="list-group-item list-group-item-action bg-gray rounded border-0 p-0 mb-2" @click="openTab(tab.tabtype)">
            <div class="d-flex align-items-center">
              <div class="h-100"></div>
              <span class="material-icons ps-3">{{ tab.icon }}</span>
              <div class="px-3 py-3">{{ tab.text }}</div>
            </div>
          </button>
          <div class="text-muted pt-3">
            <small>
            Developed with ❤ by Pablo Facciano.<br>Copyright 2021. All rights reserved.
            </small>
          </div>
        </div>
        <div class="col-md col-12">
          <h2 class="pt-3 pb-2">News</h2>
          <hr>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import shared from '@/shared.js'
//import { v4 as uuid } from 'uuid';

export default {
  data() {
    return {
      
    };
  },
  computed: {
    tabs: function(){
      return shared.home.tabButtons;
    }
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
      shared.tab.closeTab(id);
      this.$emit('tabsChanged');
    },
    openTab(tab){
      if (tab == 'code-editor'){
        shared.tab.openNewCodeEditor();
      } else if (tab == 'settings'){
        shared.tab.openSettings();
      } else if (tab == 'help'){
        shared.tab.openExternal('https://pablofacciano.github.io/ampscript-studio-public/');
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

