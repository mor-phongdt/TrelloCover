<template>
  <draggable v-model="columns" class="d-flex content">
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
        <div class="flex-grow-1"></div>
        <v-btn icon @click="addItem()">
          <v-icon>mdi-folder-remove</v-icon>
        </v-btn>
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
    <v-text-field
              v-if='flagColumn'
              v-model="nameColumn"
              style="margin:100px auto ;width:333px "
              label="Solo"
              placeholder="Type title..."
              @keyup.enter="addColumn(nameColumn)"
              solo
            ></v-text-field>
    <div class="btn--addColumn__Task">
      <v-btn block color="#e6e6e6" class="color" width="300px" @click="flagColumn=true" v-if='!flagColumn'>
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable
  },
  data() {
    return {
      flagColumn:false,
      nameColumn:'',
      columns: [
        {
          id:0,
          name: "TODO",
          addTask:false,
          model:'',
          items: [
            {
              title: "qưewqewqewqewqewqe qưewqewqewqewqewqe qưewqewqewqewqewqe"
            },
            {
              title: "Halcyon Days"
            }
          ]
        },
        
        {
          id:1,
          name: "DOING",
          addTask:false,
          items: [
            {
              title: "abc"
            },
            {
              title: "Halcyon Days"
            }
          ]
        },
        {
          id:2,
          name: "DONE",
          addTask:false,
          items: [
            {
              title: "abc"
            },
            {
              title: "Halcyon Days"
            },
            {
              title: "Halcyon Days"
            },
            {
              title: "Halcyon Days"
            },
            {
              title: "Halcyon Days"
            }
          ]
        }
      ]
    };
  },
  methods : {
    submit(value,idColumn) {
      this.columns[idColumn].items.push({
        title : value
      });
      this.columns[idColumn].model = '';
      this.columns[idColumn].addTask = !this.columns[idColumn].addTask;
    },
    addColumn(nameColumn) {
      this.columns.push({
        id:this.columns.length,
        name: nameColumn,
        addTask:false,
        model:'',
        items : [],
      });
      this.flagColumn = false
    }
  }
};
</script>

<style>
.content {
  overflow-x: scroll;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-bottom: 100px;
  background-image: url("http://demo.module-5.com/uploads/board/2216a3078676bc52aac374114e09d925");
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  height: 100%;
  margin-right:4%;
}
.list-column {
  margin: 100px 3% auto 50px;
}
.v-list-item__content {
  display: initial;
}
.btn--addColumn__Task {
  margin-top: 100px;
}
</style>