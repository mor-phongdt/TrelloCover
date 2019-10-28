<template>
  <v-form
    @submit.prevent="userRegister"
    class="d-flex justify-center flex-column align-center"
    style="margin-top:-40%"
  >
    <img
      src="https://madewithvuejs.com/mandant/madewithvuejs/images/logo.png"
      alt="logo"
      height="100"
    />
    <v-text-field
      class="input--wrapper"
      prepend-icon="mdi-account"
      name="fullName"
      placeholder="Full Name"
      v-validate="{required: 'required', min:6 , max:20}"
      data-vv-as="fullName"
      :error-messages="errors.collect('fullName')"
      v-model="fullName"
    ></v-text-field>
    <v-text-field
      class="input--wrapper"
      prepend-icon="mdi-email"
      name="email"
      placeholder="Email"
      v-validate="{required: 'required', email:true}"
      data-vv-as="email"
      :error-messages="errors.collect('email')"
      v-model="email"
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
    <v-text-field
      class="input--wrapper"
      prepend-icon="mdi-lock-reset"
      name="confirmPassword"
      placeholder="Confirm Password"
      type="password"
      v-validate="{required: 'required', is:password }"
      data-vv-as="password"
      :error-messages="errors.collect('confirmPassword')"
      v-model="confirmPassword"
      autocomplete
    ></v-text-field>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" type="submit" class="color">Register</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      fullName: null,
      email: null,
      password: null,
      confirmPassword: null
    };
  },
  methods: {
    ...mapActions("auth", ["register"]),
    async userRegister() {
      const validateResult = await this.$validator.validateAll();
      if (validateResult) {
        const loader = this.$loading.show();
        this.register({
          fullName: this.fullName,
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        })
          .then(() => {
            this.$validator.reset();
            loader.hide();
            this.$store.commit("setSnack", {
              snack: 'Register is completed. Please check email to verify',
              color: "#40b883"
            });
            
            this.$router.push({ name: "loginPage" });
          })
          .catch(err => {
            this.$store.commit("setSnack", {
              snack: err.message,
              color: "#ff5252"
            })
          })
      }
    }
  }
};
</script>
