<template>
  <div class="py-0 bg-gray-light d-flex justify-content-between align-items-baseline">
    <div class="d-flex align-items-center">
      <span class="ps-3"><b>AMPScript Studio</b></span>
      <div  v-if="this.user != null">
        <span class="ps-3 dropdown">
          <button type="button" class="btn btn-link sub-button" data-bs-toggle="dropdown">New Tab</button>
          <ul class="dropdown-menu">
            <li v-for="tab in tabs" :key="tab.tabtype" @click="openTab(tab.tabtype)">
              <button class="dropdown-item d-flex align-items-center">
                <span class="px-2">{{ tab.text }}</span>
              </button>
            </li>
          </ul>
        </span>
        <button type="button" class="btn btn-link sub-button" @click="closeCurrentTab">Close this Tab</button>
      </div>
    </div>
    <div class="d-flex m-1" v-if="this.user != null">
      <button @click="this.modalFeedback_show = true" type="button" class="ms-2 btn btn-primary btn-sm no-wrap-text d-flex align-items-center px-3">💬 Feedback on this page?</button>
      <select class="ms-2 form-select btn btn-sm btn-light pe-5" :value="selectedWorkspaceId" @change="changeWorkspace">
        <option v-if="this.$store.state.workspaces.length == 0" value='none'>Add a Workspace in Settings.</option>
        <option v-for="w in this.$store.state.workspaces" :key="w.id" :value="w.id">{{ w.name }}</option>
      </select>
      <span class="ms-2 dropdown">
        <button type="button" class="btn btn-light sub-button p-1 ms-2 d-flex align-items-center" data-bs-toggle="dropdown">
          <span class="user_name no-wrap-text mx-2">{{ this.user?.user_metadata?.full_name || this.user?.email}}</span>
          <img v-if="this.user?.user_metadata?.avatar_url != null" class="user_img me-2" :src="this.user?.user_metadata?.avatar_url" />
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li @click="logout">
            <button class="dropdown-item d-flex align-items-center">
              <span class="px-2">Logout</span>
            </button>
          </li>
        </ul>
      </span>
    </div>
    <transition name="modal">
      <ModalFeedback v-if="modalFeedback_show" @close="modalFeedback_show = false" />
    </transition>
  </div>
</template>

<script>
import shared from '@/shared.js';
import ModalFeedback from "@/components/ModalFeedback.vue";

export default {
  computed: {
    tabs(){
      return shared.home.tabButtons;
    },
    selectedWorkspaceId(){
      if (this.selectedWorkspace == null){
        return 'none';
      } else {
        return this.selectedWorkspace.id;
      }
    },
    selectedWorkspace(){
      return this.$store.getters.selectedWorkspace;
    },
    user(){
      return this.$store.state.user;
    }
  },
  methods: {
    logout(){
      this.$store.dispatch("signOutAction");
    },
    closeCurrentTab(){
      shared.tab.closeTab(window.location.hash.substring(1));
    },
    openTab(tab){
      shared.tab.openTab(tab);
    },
    changeWorkspace(e){
      this.$store.commit('changeWorkspace', e.target.value);
    },
  },
  data(){
    return {
      modalFeedback_show: false
    };
  },
  components: {
    ModalFeedback
  },
};
</script>

<style scoped>
/* Navbar */
.sub-button {
  user-select: none;
  cursor: pointer;
  text-decoration: none;
  color: #767676;
}
.sub-button:focus {
  outline: none !important;
  box-shadow: none;
}
.sub-button:hover {
  text-decoration: underline;
}
.no-wrap-text {
  white-space: nowrap;
}
.material-icons.md-18 { font-size: 16px; }
.user_name {
}
.user_img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
</style>
