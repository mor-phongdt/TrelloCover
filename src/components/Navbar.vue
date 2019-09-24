<template>
  <div>
       <v-app-bar
        fixed
        class="elevation-6"
        color="transparent"
        hide-on-scroll
      >
        <v-toolbar-title class="white--text"><h3>KMA Board</h3></v-toolbar-title>
      </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      height="100vh"
      width="256px"
      class="elevation-3"
      right
      fixed
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src=""></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon large >mdi-close</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider style="margin-top:8px"></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
          <div class="pa-2">
            <v-btn block color="secondary" class="color" @click="logoutEvent()"><v-icon v-if="mini">mdi-logout-variant</v-icon><div v-else>Logout</div></v-btn>
          </div>
        </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        { title: "Boards", icon: "mdi-bulletin-board" },
        { title: "My Account", icon: "mdi-account" }
      ],
      mini: true,
    };
  },
};
</script>