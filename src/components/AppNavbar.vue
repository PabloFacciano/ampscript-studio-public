<template>
  <div class="py-0 bg-gray-light d-flex justify-content-between align-items-baseline">
    <div>
      <b class="px-3 py-2 sub-button">AMPScript Studio</b>
      <!--button type="button" class="btn btn-link sub-button">File</button-->
      <!--button type="button" class="btn btn-link sub-button">Settings</button-->
    </div>
    <div class="d-flex m-1" v-if="this.$store.getters.user != null">
      <select class="form-select form-select-sm" :value="selectedWorkspaceId" @change="changeWorkspace">
        <option v-if="this.$store.state.workspaces.length == 0" value='none'>Add a Workspace in Settings.</option>
        <option v-for="w in this.$store.state.workspaces" :key="w.id" :value="w.id">{{ w.name }}</option>
      </select>
      <div class="ms-2 d-flex align-items-center bg-white rounded p-1">
        <span class="user_name mx-2">{{ this.$store.getters.user.user_metadata.full_name }}</span>
        <img class="user_img me-2" :src="this.$store.getters.user.user_metadata.avatar_url" />
      </div>
    </div>
  </div>
</template>

<script>
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
      
    };
  }
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
.user_name {
  white-space: nowrap;
}
.user_img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}
</style>
