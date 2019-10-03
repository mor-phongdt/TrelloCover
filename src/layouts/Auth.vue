<template>
  <v-app>
    <div class="login-container">
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-card class="elevation-24 form--grid__login" width="80%" height="85%" dark>
          <v-card class="form__login-container elevation-24">
            <router-view />
          </v-card>
          <div class="banner">
            <v-tabs background-color="transparent" class="mt-2 ml-5" light>
              <v-tab class="font-weight-bold" router link to="/">Sign In</v-tab>
              <v-tab class="font-weight-bold" router link to="/register">Sign Up</v-tab>
            </v-tabs>
          </div>
        </v-card>
      </v-layout>
    </v-container>
  </div>
  </v-app>
</template>

<script>


export default {
  components: {
  },
};
</script>
