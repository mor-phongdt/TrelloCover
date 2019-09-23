<template>
  <div style="background:#14181d;height:100%">
    <DialogProject />
    <div style="margin:100px auto auto 8%" class="grid">
      <v-card
        class="mx-auto mb-5 bg--project"
        width="90%"
        v-for="item in items"
        dark
        :style="{backgroundImage:item.background}"
        :key="item.id"
      >
        <v-card-title>
          <v-icon large left >mdi-briefcase</v-icon>
          <span class="title font-weight-bold">{{item.projectName}}</span>
        </v-card-title>

        <v-card-text class="headline font-weight-light">{{item.projectContent}}</v-card-text>

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title >{{item.nameProjectOwner}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </div>
    <v-btn absolute dark fab bottom right fixed color="primary" style="margin:100px" @click='addProject()'>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
import DialogProject from "@/components/DialogProject.vue";

export default {
  components: {
    DialogProject
  },
  data() {
    return {
      items: [
        {
          id: 1,
          projectName: "Project1",
          projectContent: "abccccc",
          nameProjectOwner: "Phong",
          background : "url(http://demo.module-5.com/uploads/board/2216a3078676bc52aac374114e09d925)",
        },
         {
          id: 1234,
          projectName: "Project1",
          projectContent: "abccccc",
          nameProjectOwner: "Phong",
          background : "url(http://demo.module-5.com/uploads/board/2216a3078676bc52aac374114e09d925)",
        },
         {
          id: 1213,
          projectName: "Project1",
          projectContent: "abccccc",
          nameProjectOwner: "Phong",
          background : "url(http://demo.module-5.com/uploads/board/2216a3078676bc52aac374114e09d925)",
        },
         {
          id: 1222,
          projectName: "Project1",
          projectContent: "abccccc",
          nameProjectOwner: "Phong",
          background : "url(http://demo.module-5.com/uploads/board/2216a3078676bc52aac374114e09d925)",
        },
         {
          id: 10,
          projectName: "Project1",
          projectContent: "abccccc",
          nameProjectOwner: "Phong",
          background : "url(http://demo.module-5.com/uploads/board/2216a3078676bc52aac374114e09d925)",
        },
        {
          id: 3,
          projectName: "Project1",
          projectContent: "abccccc",
          nameProjectOwner: "Phong",
          background : "url(https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)"
        },
        {
          id: 2,
          projectName: "Project1",
          projectContent: "abccccc",
          nameProjectOwner: "Phong",
          background : "url(https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1087&q=80)"
        },
        {
          id: 4,
          projectName: "Project1",
          projectContent: "abccccc",
          nameProjectOwner: "Phong",
          background : "url(https://images.unsplash.com/photo-1488866022504-f2584929ca5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1043&q=80)"
        },
      ]
    };
  },
  methods : {
    addProject() {
      this.$store.commit("showDialog");
    }
  }
};
</script>
