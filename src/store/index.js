import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from '@/router';
import supabase from "@/supabase";

/*
Tabs Types
- home
- code-editor
- settings
*/

export default createStore({
  state: {
    tabs: [
      {
        type: 'home',
        name: 'Home',
        id: 'home',
        closeable: false
      }
    ],
    codeEditors: {},
    selectedWorkspaceId: 'rocket',
    workspaces: [
      {
        id: 'rocket',
        name: 'Rocket',
        cloudpageUrl: 'https://mcpk8yjlr38c-gnlfdjh-1t51c81.pub.sfmc-content.com/ykjcnrpl0df',
        tenant: 'mcpk8yjlr38c-gnlfdjh-1t51c81',
        mid: 333444
      },
      {
        id: 'xappia',
        name: 'Xappia',
        cloudpageUrl: '1',
        tenant: '2222',
        mid: 111222
      }
    ],
    codeSettings: {
      logSelected: "LINE",
      runAs: "CLOUDPAGE",
      livePreview: "HTML",
      autoSave: "DISABLED",
      darkMode: false
    }
  },
  mutations: {
    updateCodeSettings (state, value) {
      state.codeSettings = value;
    },
    updateCodeEditor (state, value) {
      state.codeEditors[value.id] = value.obj;
    },
    updateCodeInCodeEditor (state, value) {
      state.codeEditors[value.id].currentCode = value.obj;
    },
    updateCloudpageparamInCodeEditor (state, value) {
      state.codeEditors[value.id].cloudpageParam = value.obj;
    },
    updateRunHistory (state, value) {
      state.codeEditors[value.id].runHistory = value.obj;
    },
    addCodeEditor (state, value) {
      state.codeEditors[value.id] = value;
    },
    openNewTab (state, tab){
      if(!state.tabs.some(t => t.id === tab.id )){
        state.tabs.push(tab);
      }
      window.location.href = '/#'+tab.id;
    },
    closeTab (state,id){
      let tabIndex = state.tabs.findIndex((t) => t.id == id);
      let tabDeleted = state.tabs[tabIndex];
      state.tabs.splice(tabIndex,1);

      if (tabDeleted.type == 'code-editor'){
        delete state.codeEditors[tabDeleted.value];
      }

    },
    changeWorkspace(state,id){
      state.selectedWorkspaceId = id;
    }
  },
  actions: {
    async loginWithAction({ commit }, provider) {
      try {
        const { error, user } = await supabase.auth.signIn(provider);
        if (error) throw error;
        commit('setUser', user);
      } catch (error) {
        return {status: 'ERROR', message: (error.error_description || error.message)}
      }   
    },
    async signOutAction({ commit }) {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        await router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },

  },
  modules: {},
  getters: {
    selectedWorkspace (state) {
      let wss = state.workspaces.filter(ws => ws.id == state.selectedWorkspaceId);
      if (wss.length > 0){
        wss = wss[0];
      } else {
        wss = null;
      }
      return wss;
    },
    user (state){
      return supabase.auth.user();
    }
  },
 // plugins: [createPersistedState()]
});
