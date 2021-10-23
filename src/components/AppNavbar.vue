<template>
  <div class="py-0 bg-gray-light d-flex justify-content-between align-items-baseline">
    <div>
      <b class="px-3 py-2 sub-button">AMPScript Studio</b>
      <!--button type="button" class="btn btn-link sub-button">File</button-->
      <!--button type="button" class="btn btn-link sub-button">Settings</button-->
    </div>
    <div class="d-flex m-1" v-if="this.$store.getters.user != null">
      <button @click="this.modalFeedback_show = true" type="button" class="ms-2 btn btn-light btn-sm no-wrap-text d-flex align-items-center px-3">💬 Feedback on this page?</button>
      <select class="ms-2 form-select btn btn-sm btn-light pe-5" :value="selectedWorkspaceId" @change="changeWorkspace">
        <option v-if="this.$store.state.workspaces.length == 0" value='none'>Add a Workspace in Settings.</option>
        <option v-for="w in this.$store.state.workspaces" :key="w.id" :value="w.id">{{ w.name }}</option>
      </select>
      <div class="ms-2 d-flex align-items-center btn btn-sm btn-light p-1">
        <span class="user_name no-wrap-text mx-2">{{ this.$store.getters.user.user_metadata.full_name || this.$store.getters.user.email}}</span>
        <img v-if="this.$store.getters.user.user_metadata.avatar_url != null" class="user_img me-2" :src="this.$store.getters.user.user_metadata.avatar_url" />
      </div>
    </div>
    <transition name="modal">
      <ModalFeedback v-if="modalFeedback_show" @close="modalFeedback_show = false" />
    </transition>
  </div>
</template>

<script>
import ModalFeedback from "@/components/ModalFeedback.vue";
export default {
  computed: {
    selectedWorkspaceId(){
      if (this.selectedWorkspace == null){
        return 'none';
      } else {
        return this.selectedWorkspace.id;
      }
    },
    selectedWorkspace(){
      return this.$store.getters.selectedWorkspace;
    }
  },
  methods: {
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
