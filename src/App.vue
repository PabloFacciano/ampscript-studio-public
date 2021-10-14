<template>
  <AppLibrary />
  <div class="d-flex flex-column" style="height:100vh;">
    <AppNavbar />
    <router-view></router-view>
  </div>
</template>

<script>
import AppLibrary from "./components/AppLibrary.vue";
import AppNavbar from "./components/AppNavbar.vue";

import { supabase } from "./supabase";
import router from './router';

export default {
  components: { AppLibrary, AppNavbar },
  data() {
    return {};
  },
};
</script>
