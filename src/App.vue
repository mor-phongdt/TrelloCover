<template>
  <div id="app">
    <Snackbar/>
    <router-view />
  </div>
</template>

<script>
import Snackbar from './components/SnakBar';

export default {
  name: "App",
  components: {
    Snackbar,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Dosis&display=swap");
@import "@/assets/scss/style.scss";
</style>
