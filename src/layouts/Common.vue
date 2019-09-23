<template>
  <v-app class="text lighten-4">
    <NavBar />
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavBar from '../components/Navbar.vue';

export default {
  name: 'CommonLayout',
  components: {
    NavBar,
  },
};
</script>
