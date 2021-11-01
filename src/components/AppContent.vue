<template>
  <div class="flex-fill d-flex flex-column">
    <tabs
      :key="forceRender"
      :options="{ useUrlFragment: true }"
      wrapper-class="flex-fill d-flex flex-column"
      nav-class="ps-3 bg-gray-light nav nav-tabs"
      nav-item-class="nav-item"
      nav-item-link-class="nav-link px-3 py-1 rounded-0"
      nav-item-link-active-class="active"
      nav-item-link-disabled-class="disabled"
      panels-wrapper-class="flex-fill d-flex flex-column"
    >
      <tab v-for="tab in tabs" :key="tab.id" :name="tab.name" :id="tab.id" panel-class="flex-fill flex-column display-flex">
        <app-home v-if="tab.type == 'home'" />
        <code-editor v-if="tab.type == 'code-editor'" :editorId="tab.value" />
        <salesforce-data v-if="tab.type == 'salesforce-data'" />
        <run-history v-if="tab.type == 'history'" :history="tab.value" />
        <settings v-if="tab.type == 'settings'" />
      </tab>
    </tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forceRender: 0
    };
  },
  methods: {
    tabsReload(){
      this.forceRender += 1;
    }
  },
  computed: {
    tabs(){
      return this.$store.state.tabs;
    },
    tabsCount(){
      return this.$store.state.tabs.length;
    }
  },
  watch: { 
    tabsCount: function(newVal, oldVal) { // watch it
      this.tabsReload();
    }
  }
};
</script>
