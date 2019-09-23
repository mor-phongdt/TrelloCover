<template>
  <draggable v-model="columns" class="d-flex content">
    <v-card
      width="333px"
      class="list-column"
      v-for="column in columns"
      :key="column.id"
      elevation="24"
      color="rgba(0,0,0,.4)"
    >
      <v-app-bar dark color="rgba(0,0,0,.4)">
        <v-toolbar-title>{{column.name}}</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-btn icon @click="addItem()">
          <v-icon>mdi-folder-remove</v-icon>
        </v-btn>
      </v-app-bar>
      <v-container class="pa-2" fluid>
        <draggable :list="column.items" group="people">
          <v-col v-for="(item, i) in column.items" :key="i">
            <v-card :color="item.color" dark>
              <v-btn icon @click="removeItem()" style="float:right">
                <v-icon>mdi-close-circle</v-icon>
              </v-btn>
              <v-list-item three-line>
                <v-list-item-content class="align-self-start">
                  <div>{{item.title}}</div>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </draggable>
        <div class="pa-2">
          <v-btn block color="#e6e6e6" class="color" @click="addTask()">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-card>
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
      columns: [
        {
          name: "TODO",
          items: [
            {
              color: "#1F7087",
              title: "qưewqewqewqewqewqe qưewqewqewqewqewqe qưewqewqewqewqewqe "
            },
            {
              color: "#1F7087",
              title: "Halcyon Days"
            }
          ]
        },
        {
          name: "DOING",
          items: [
            {
              color: "#1F7087",
              title: "abc"
            },
            {
              color: "secondary",
              title: "Halcyon Days"
            }
          ]
        },
        {
          name: "DONE",
          items: [
            {
              color: "#1F7087",
              title: "abc"
            },
            {
              color: "secondary",
              title: "Halcyon Days"
            },
            {
              color: "secondary",
              title: "Halcyon Days"
            },{
              color: "secondary",
              title: "Halcyon Days"
            },{
              color: "secondary",
              title: "Halcyon Days"
            },{
              color: "secondary",
              title: "Halcyon Days"
            },{
              color: "secondary",
              title: "Halcyon Days"
            },{
              color: "secondary",
              title: "Halcyon Days"
            },{
              color: "secondary",
              title: "Halcyon Days"
            },{
              color: "secondary",
              title: "Halcyon Days"
            },
          ]
        }
      ]
    };
  }
};
</script>

<style>
.content {
  overflow-x: auto;
  flex-direction: row;
  flex-wrap: nowrap;
  padding-bottom: 100px;
  background-image: url('http://demo.module-5.com/uploads/board/2216a3078676bc52aac374114e09d925');
  background-size: cover;
  background-position: 50%;
  height: 100vh;
}
.list-column {
  margin: 100px 2% auto 50px;
}
.v-list-item__content {
  display: initial;
}

</style>