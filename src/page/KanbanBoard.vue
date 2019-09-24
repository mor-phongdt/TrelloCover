<template>
  <div class="d-flex content" :style="{backgroundImage:background}">
    <v-card
      class="list-column"
      v-for="column in columns"
      :key="column.id"
      elevation="24"
      color="rgba(0,0,0,.4)"
       width="300px"
    >
      <v-app-bar dark color="rgba(0,0,0,.4)" width="300px">
        <v-toolbar-title>{{column.name}}</v-toolbar-title>
      </v-app-bar>
      <v-container class="pa-2" fluid >
        <draggable :list="column.items" group="people">
          <v-col v-for="(item, i) in column.items" :key="i" >
            <v-card color="secondary" dark>
              <v-btn icon @click="removeItem()" style="float:right">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
              <v-list-item three-line>
                <v-list-item-content class="align-self-start" >
                  <div>{{item.title}}</div>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </draggable>
        <v-text-field
              v-if='column.addTask'
              v-model="column.model"
              class="pa-3"
              label="Solo"
              placeholder="Type title..."
              @keyup.enter="submit(column.model,column.id)"
              solo
            ></v-text-field>
        <div class="pa-2">
          <v-btn block color="#e6e6e6" class="color" @click="column.addTask=true">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import {projectCollection} from '@/plugins/firebase';
import draggable from "vuedraggable";
import { mapActions,mapGetters } from "vuex";

export default {
  components: {
    draggable
  },
  data() {
    return {
      background:'',
      columns: [
        {
          id:0,
          name: "TODO",
          addTask:false,
          model:'',
          items: []
        },
        {
          id:1,
          name: "DOING",
          addTask:false,
          items: []
        },
        {
          id:2,
          name: "DONE",
          addTask:false,
          items: []
        }
      ],
      wacthTask:[]
    };
  },
  created() {
    const loader = this.$loading.show();
    this.uid = this.$route.params.id;
    this.wacthTask = this.columns[0].items
    this.getProjectById(this.uid)
    .then(()=>{
      this.background = this.projectDetail.themeProject;
      loader.hide()
    })
    .catch((error)=>{
      console.log(error.message)
    })
  },
  watch : {
    wacthTask(){
      console.log('hahahihi')
    }
  },
  computed : {
    ...mapGetters("project", ["projectDetail"]),
  },
  methods : {
    ...mapActions("project", ["getProjectById"]),
    submit(value,idColumn) {
      this.columns[idColumn].items.push({
        title : value
      });
      this.columns[idColumn].model = '';
      this.columns[idColumn].addTask = !this.columns[idColumn].addTask;
    },
  }
};
</script>
