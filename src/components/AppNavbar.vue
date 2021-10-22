<template>
  <div class="py-0 bg-gray-light d-flex justify-content-between align-items-baseline">
    <div>
      <b class="px-3 py-2 sub-button">AMPScript Studio</b>
      <!--button type="button" class="btn btn-link sub-button">File</button-->
      <!--button type="button" class="btn btn-link sub-button">Settings</button-->
    </div>
    <div class="m-1">
      <select class="form-select form-select-sm" :value="selectedWorkspace.id" @change="changeWorkspace">
        <option v-for="w in this.$store.state.workspaces" :key="w.id" :value="w.id">{{ w.name }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
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
</style>
