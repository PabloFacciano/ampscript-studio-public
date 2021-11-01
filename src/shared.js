import store from '@/store';
import { v4 as uuid } from 'uuid';

export default {
  home: {
    tabButtons: [
      {
        tabtype: 'code-editor',
        icon: 'description',
        text: 'Code Editor'
      },
      {
        tabtype: 'salesforce-data',
        icon: 'cloud',
        text: 'Salesforce Data'
      },
      {
        tabtype: 'settings',
        icon: 'settings',
        text: 'Settings'
      },
      {
        tabtype: 'help',
        icon: 'help',
        text: 'Docs'
      }
    ]
  },
  tab: {
    openTab: function(id){
      if (id == 'code-editor'){
        this.openNewCodeEditor();
      } else if (id == 'settings'){
        this.openSettings();
      } else if (id == 'salesforce-data'){
        this.openNewSalesforceData();
      } else if (id == 'help'){
        this.openExternal('https://pablofacciano.github.io/ampscript-studio-public/');
      }
    },
    closeTab: function(id){
      store.commit('closeTab',id);
    },
    openExternal: function(url){
      window.open(url,'_blank');
    },
    openNewCodeEditor: function(){
      let id = uuid();
      store.commit('addCodeEditor',{
        id: id,
        currentCode: '%%=Add(1,3)=%%',
        currentView: '',
        cloudpageParam: '',
        runHistory: [],
        console: []
      });
      store.commit('openNewTab',{
        type: 'code-editor',
        name: 'Code Editor #' + store.state.tabs.length,
        id: 'code-editor-' + id,
        value: id,
        closeable: true
      });
  
    },
    openNewSalesforceData: function(){
      let id = uuid();
      store.commit('openNewTab',{
        type: 'salesforce-data',
        name: 'Salesforce #' + store.state.tabs.length,
        id: 'salesforce-data-' + id,
        closeable: true
      });
    },
    openSettings(){
      store.commit('openNewTab', {
        type: 'settings',
        name: 'Settings',
        id: 'settings',
        closeable: true
      });
    }
  }
}