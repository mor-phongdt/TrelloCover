<template>
  <v-form
    @submit.prevent="userLogin"
    class="d-flex justify-center flex-column align-center"
    style="margin-top:-79%"
  >
    <img
      src="https://madewithvuejs.com/mandant/madewithvuejs/images/logo.png"
      alt="logo"
      height="100"
    />
    <v-text-field
      class="input--wrapper"
      prepend-icon="mdi-account"
      name="userId"
      placeholder="User"
      v-validate="{required: 'required', email:true }"
      data-vv-as="userId"
      :error-messages="errors.collect('userId')"
      v-model="userId"
    ></v-text-field>
    <v-text-field
      class="input--wrapper"
      prepend-icon="mdi-lock"
      name="password"
      placeholder="Password"
      type="password"
      v-validate="{required: 'required', min:6, max:32 }"
      data-vv-as="password"
      :error-messages="errors.collect('password')"
      v-model="password"
      autocomplete
    ></v-text-field>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" type="submit" class="color">Login</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userId: null,
      password: null
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async userLogin() {
      const validateResult = await this.$validator.validateAll();
      if (validateResult) {
        const loader = this.$loading.show();
        this.login({
          email: this.userId,
          password: this.password
        })
          .then(() => {
            this.$validator.reset();
            this.$store.commit("setSnack", {
              snack: "login completed!",
              color: "#40b883"
            });
            this.$router.push({ name: "ProjectPage" });
            loader.hide();
          })
          .catch(err => {
            loader.hide()
            this.$store.commit("setSnack", {
              snack: err.message,
              color: "#ff5252"
            });
          });
      }
    }
  }
};
</script>
