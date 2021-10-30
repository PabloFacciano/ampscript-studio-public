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