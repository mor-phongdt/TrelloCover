<template>
    <v-snackbar v-model="show" :timeout="3000" top :color="color" >
    <span>{{ message }}</span>
    <v-icon right color="white" @click="show = false">mdi-close</v-icon>
<!--    <v-btn color="white" flat @click="show = false">X</v-btn>-->
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      color: '',
    };
  },
  created() {
    this.$store.watch(state => state.snackBar.snack, () => {
      const msg = this.$store.state.snackBar.snack;
      if (msg !== '') {
        this.show = true;
        this.color = this.$store.state.snackBar.color;
        this.message = this.$store.state.snackBar.snack;
        this.$store.commit('setSnack', { snack: '', color: '' });
      }
    });
  },
};
</script>
