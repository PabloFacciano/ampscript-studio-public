import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import router from '../router';
import supabase from "../supabase";

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
    mcIntegration: {
      cloudpageUrl: 'https://mcpk8yjlr38c-gnlfdjh-1t51c81.pub.sfmc-content.com/ykjcnrpl0df',
      tenant: '',
      clientId: '',
      clientSecret: ''
    },
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
    updateRunHistory (state, value) {
      state.codeEditors[value.id].runHistory = value.obj;
    },
    addCodeEditor (state, value) {
      state.codeEditors[value.id] = value;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    openNewTab (state, tab){
      if(!state.tabs.some(t => t.id === tab.id )){
        state.tabs.push(tab);
      }
      window.location.href = '/#'+tab.id;
    },
    closeTab (state,id){
      let tabIndex = state.tabs.findIndex((t) => t.id == id);
      let tabDeleted = state.tabs.splice(tabIndex,1);

      if (tabDeleted.type == 'code-editor'){
        delete state.codeEditors[value];
      }

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
        commit('setUser', null);
        await router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },


    async signupAction({dispatch}, form) {
      try {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        alert("You've been registered successfully");
        await dispatch("signInAction", form)
      } catch (error) {
          return {status: 'ERROR', message: (error.error_description || error.message)}
      }
    },
  },
  modules: {},
  plugins: []
});
