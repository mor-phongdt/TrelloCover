<template>
  <div style="background:#14181d;height:100%">
    <DialogProject />
    <div style="margin:100px auto auto 8%" class="grid">
      <v-card
        class="mx-auto mb-5 bg--project"
        width="90%"
        v-for="item in getlistProjects"
        dark
        :style="{backgroundImage:item.themeProject}"
        :key="item.id"
        @click ="goToDetailProject(item.id)"
      >
        <v-card-title>
          <v-icon large left >mdi-briefcase</v-icon>
          <span class="title font-weight-bold">{{item.nameProject}}</span>
          <v-spacer/>
          <v-icon right @click.stop="remove(item.id)">mdi-close-circle</v-icon>
        </v-card-title>

        <v-card-text class="headline font-weight-light">{{item.contentProject}}</v-card-text>

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                :src="item.owner.avatarUrl"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title >{{item.owner.email}}</v-list-item-title>
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
import { mapActions,mapGetters } from "vuex";

export default {
  components: {
    DialogProject
  },
  data() {
    return {

    }
  },
  created() {
    const loader = this.$loading.show()

    this.getAllProject()
    .then(()=>{
    loader.hide();
    })
  },
  computed : {
    ...mapGetters('project',['getlistProjects'])
  },
  methods : {
    ...mapActions("project", [
      "getAllProject",
      "deleteProject"
      ]),
    addProject() {
      this.$store.commit("showDialog");
    },
    remove(id) {
      let loader = this.$loading.show();
      this.deleteProject(id)
      .then(()=>{
        loader.hide();
      }).catch((err)=>{
        this.$store.commit("setSnack", {
              snack: "Updating this task is completed!",
              color: "#40b883"
            });
      })
    },
    goToDetailProject(id){
      this.$router.push({
        name: "DetailProjectPage",
        params: { id: id }
      });
    }
  }
};
</script>
