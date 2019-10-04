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
      <v-container class="pa-2" fluid>
        <draggable :list="column.items" group="people" @change="log">
          <v-col v-for="(item, i) in column.items" :key="i">
            <v-card color="secondary" dark>
              <v-btn icon @click="remove(item,column)" style="float:right">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
              <v-list-item three-line>
                <v-list-item-content class="align-self-start">
                  <div>{{item.nameTask}}</div>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </draggable>
        <v-text-field
          v-if="column.addTask"
          v-model="column.model"
          class="pa-3"
          label="Solo"
          placeholder="Type title..."
          @keyup.enter="submit(column)"
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
import { projectCollection } from "@/plugins/firebase";
import draggable from "vuedraggable";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    draggable
  },
  data() {
    return {
      projectId: "",
      background: "",
      columns: [
        {
          id: 0,
          idDynamic: "",
          name: "TODO",
          addTask: false,
          model: "",
          items: []
        },
        {
          id: 1,
          idDynamic: "",
          name: "DOING",
          addTask: false,
          items: []
        },
        {
          id: 2,
          idDynamic: "",
          name: "DONE",
          addTask: false,
          items: []
        }
      ],
      lengthTodo: 0,
      lengthDoing: 0,
      lengthDone: 0,
      idColumnTodo: "",
      idColumnDoing: "",
      idColumnDone: "",
      taskMove: {},
      flagFirst1: false,
      flagFirst2: false,
      flagFirst3: false,
      flagAddColumn: "",
      flagStatus: "",
      flagSnapshot: undefined
    };
  },
  created() {
    const loader = this.$loading.show();
    this.uid = this.$route.params.id;
    this.getProjectById(this.uid)
      .then(() => {
        this.background = this.projectDetail.themeProject;
        this.projectId = this.projectDetail.id;
        this.getAllTask(this.uid).then(value => {
          this.idColumnTodo = this.$store.state.task.idColumnTodo;
          this.idColumnDoing = this.$store.state.task.idColumnDoing;
          this.idColumnDone = this.$store.state.task.idColumnDone;
          this.columns[0].idDynamic = this.$store.state.task.idColumnTodo;
          this.columns[1].idDynamic = this.$store.state.task.idColumnDoing;
          this.columns[2].idDynamic = this.$store.state.task.idColumnDone;
          this.flagSnapshot = value;
          this.$store.watch(
            state => state.task.taskTodo,
            () => {
              const msg = this.$store.state.task.taskTodo;
              if (msg !== "") {
                this.columns[0].items = msg;
              }
            }
          );
          this.$store.watch(
            state => state.task.taskDoing,
            () => {
              const msg = this.$store.state.task.taskDoing;
              if (msg !== "") {
                this.columns[1].items = msg;
              }
            }
          );
          this.$store.watch(
            state => state.task.taskDone,
            () => {
              const msg = this.$store.state.task.taskDone;
              if (msg !== "") {
                this.columns[2].items = msg;
              }
            }
          );
        });
        loader.hide();
      })
      .catch(error => {
        console.log(error.message);
      });
  },
  watch: {
    todoWatch: function(newVal, oldVal) {
      if (newVal.length > this.lengthTodo) {
        this.flagAddColumn = this.idColumnTodo;
      }
      if (newVal.length < this.lengthTodo && this.flagFirst1) {
        this.flagStatus = this.idColumnTodo;
      }
      this.flagFirst1 = true;
      this.lengthTodo = newVal.length;
    },
    doingWatch: function(newVal, oldVal) {
      if (newVal.length > this.lengthDoing) {
        this.flagAddColumn = this.idColumnDoing;
      }
      if (newVal.length < this.lengthDoing && this.flagFirst2) {
        this.flagStatus = this.idColumnDoing;
      }
      this.flagFirst2 = true;
      this.lengthDoing = newVal.length;
    },
    doneWatch: function(newVal, oldVal) {
      if (newVal.length > this.lengthDone) {
        this.flagAddColumn = this.idColumnDone;
      }
      if (newVal.length < this.lengthDone && this.flagFirst3) {
        this.flagStatus = this.idColumnDone;
      }
      this.flagFirst3 = true;
      this.lengthDone = newVal.length;
    }
  },
  computed: {
    ...mapGetters("project", ["projectDetail"]),
    ...mapGetters("task", ["getTaskTodo", "getTaskDoing", "getTaskDone"]),
    todoWatch() {
      return this.columns[0].items;
    },
    doingWatch() {
      return this.columns[1].items;
    },
    doneWatch() {
      return this.columns[2].items;
    }
  },
  methods: {
    ...mapActions("project", ["getProjectById"]),
    ...mapActions("task", [
      "getAllTask",
      "moveStatusTask",
      "deleteTask",
      "addTask"
    ]),
    log: async function(evt) {
      if (evt["added"]) {
        this.taskMove = evt["added"]["element"];
        this.taskMove.projectId = this.uid;
        this.taskMove.columnAdd = this.flagAddColumn;
        this.taskMove.status = this.flagStatus;
        this.moveStatusTask(this.taskMove);
      }
    },
    submit(column) {
      this.addTask({
        nameTask: column.model,
        createdAt: new Date(),
        projectId: this.projectId,
        status: column.idDynamic,
        ownerTask: JSON.parse(localStorage.getItem("email"))
      }).then(() => {
      })
      .catch((error)=>{
        console.log(error)
      })
      this.columns[column.id].model = ''
        this.columns[column.id].addTask = !this.columns[column.id].addTask;
    },
    remove(item) {
      this.deleteTask(item);
    }
  }
};
</script>
