import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from '@/router';
import supabase from "@/supabase";
import { setSourceMapRange } from "typescript";

/*
Tabs Types
- home
- code-editor
- settings
*/

export default createStore({
  state: {
    user: null,
    tabs: [
      {
        type: 'home',
        name: 'Home',
        id: 'home',
        closeable: false
      }
    ],
    codeEditors: {},
    selectedWorkspaceId: '',
    workspaces: [],
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
      let tabIndex = state.tabs.findIndex((t) => t.id == id || t.name == id);
      let tabDeleted = state.tabs[tabIndex];
      if (tabDeleted == null || tabDeleted.closeable == false){
        return;
      }
      
      state.tabs.splice(tabIndex,1);
      if (tabDeleted.type == 'code-editor'){
        delete state.codeEditors[tabDeleted.value];
      }

    },
    changeWorkspace(state,id){
      state.selectedWorkspaceId = id;
    },
    loadWorkspaces(state,value){
      state.workspaces = value;
    },
    setUser(state,usr){
      state.user = usr;
    }
  },
  actions: {
    async loginWithAction({ commit }, provider) {
      try {
        const { error, user } = await supabase.auth.signIn(provider,{redirectTo:window.location.origin});
        if (error) throw error;
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
    async newWorkspace({ commit }, value){
      try {
        let { data, error } = await supabase
          .from('workspace')
          .insert([ value ])
      } catch (error) {
        console.error({ex: error, message: (error.error_description || error.message)});
      }
    },
    async deleteWorkspace({ commit }, value){
      try {
        let { data, error } = await supabase
          .from('workspace')
          .delete()
          .eq('id', value)
      } catch (error) {
        console.error({ex: error, message: (error.error_description || error.message)});
      }
    },
    async loadWorkspaces({ commit }){
      try {
        let { data: workspace, error } = await supabase
          .from('workspace')
          .select('*');
        commit('loadWorkspaces',workspace);
        if (workspace.length > 0){
          commit('changeWorkspace', workspace[0].id);
        }
      } catch (error) {
        console.error({ex: error, message: (error.error_description || error.message)});
      }
    },
    async sendFeedback({ commit }, feedback){
      try {
        let { data, error } = await supabase
          .from('userfeedback')
          .insert([ {
            type: feedback.feedbackType,
            message: feedback.feedbackMessage,
            url: window.location.href
          } ])
      } catch (error) {
        console.error({ex: error, message: (error.error_description || error.message)});
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
    userIsOk (state){
      return state.user != null;
    }
  },
 // plugins: [createPersistedState()]
});
