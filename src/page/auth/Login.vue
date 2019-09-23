<template>
  <div class="login-container">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12 form">
            <v-toolbar color="primary ">
              <v-toolbar-title class="color">
                <h2>Login</h2>
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="userLogin">
                <v-text-field
                  prepend-icon="mdi-account"
                  name="userId"
                  label="Login"
                  v-validate="{required: 'required', min:4 }"
                  data-vv-as="userId"
                  :error-messages="errors.collect('userId')"
                  v-model="userId"
                  outlined
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-validate="{required: 'required', min:6, max:32 }"
                  data-vv-as="password"
                  :error-messages="errors.collect('password')"
                  v-model="password"
                  outlined
                  autocomplete
                ></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit" class="color">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      userId: null,
      password: null,
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    async userLogin() {
      const validateResult = await this.$validator.validateAll();
      if (validateResult) {
        const loader = this.$loading.show();
        this.login({
          id: this.userId,
          password: this.password,
        })
          .then(() => {
            loader.hide();
            this.$router.push({ name: 'SingerListPage' });
          })
          .catch((err) => {
            this.$store.commit('setSnack', {
              snack: err.message,
              color: 'error',
            });
          });
      }
    },
  },
};
</script>
