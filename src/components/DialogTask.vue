<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="40%" class="container__dialog">
      <v-form @submit.prevent="submit()">
        <v-card class="dialog-background" dark>
          <v-card-title>
            <span class="font-weight-bold white--text">{{selectTask.nameTask}}</span>
          </v-card-title>
          <v-autocomplete
            v-model="asignee"
            :items="selectTask.members"
            filled
            outlined
            dark
            style="width:60%"
            class="mt-2 ml-5 mr-5"
            background-color="rgba(0,0,0,.4)"
            placeholder="Asignee to ..."
            item-text="fullName"
            item-value="id"
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="remove(data.item)"
              >
                <v-avatar left>
                  <v-img
                    :src="data.item.avatarUrl"
                  ></v-img>
                </v-avatar>
                {{ data.item.fullName }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template v-if="typeof data.item !== 'object'">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-avatar>
                  <img
                    :src="data.item.avatarUrl"
                  />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-html="data.item.fullName"></v-list-item-title>
                  <v-list-item-subtitle v-html="data.item.email"></v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
          <v-textarea
            class="mt-2 ml-5 mr-5"
            placeholder="Comment ..."
            v-model="comment"
            background-color="rgba(0,0,0,.4)"
            outlined
            auto-grow
            dark
            @keyup.enter="submit()"
            required
          />
          <v-divider class="mx-4" />
          <v-spacer></v-spacer>
          <v-list-item v-for="(item, index) in getListCommentToStore" :key="index">
            <v-list-item-avatar>
              <img :src="item.owner.avatarUrl" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{item.owner.email}}</v-list-item-title>
              <v-list-item-subtitle>{{item.title}}</v-list-item-subtitle>
              <v-divider />
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn class="white--text" text @click="cancel()">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["selectTask"],
  data() {
    return {
      dialog: false,
      asignee: '',
      comment: "",
      key: 0,
      flag:'',
      members: [
        
      ]
    };
  },
  created() {
    console.log(this.asignee)
    this.$store.watch(
      state => state.showDialog.show,
      () => {
        if (this.$store.state.showDialog.show) {
          this.dialog = true
          this.asignee = this.selectTask.ownerTask
          const loader = this.$loading.show();
          this.getListComment(this.selectTask)
            .then(() => {
              loader.hide();
            })
            .catch(err => {
              console.log(err);
              loader.hide();
            });
        } else {
          this.dialog = false;
        }
      }
    );
    this.key = this.key + 1;
  },
  watch: {
    asignee() {
      if(this.asignee !== '' && this.asignee !== this.selectTask.ownerTask && this.asignee) {
        console.log(this.selectTask)
        let loader = this.$loading.show() //update task
        this.updateTask({
          ...this.selectTask,
          asignee: this.asignee
        }).then(() => {
          this.selectTask.ownerTask = this.asignee
          this.$store.commit("setSnack", {
              snack: "Updating this task is completed!",
              color: "#40b883"
            });
          loader.hide()
        }).catch((err) => {
          this.$store.commit("setSnack", {
              snack: "Something went wrong, please try again later!",
              color: "#ff5252"
            })
          console.log(err)
        })
      }
    }
  },
  computed : {
    ...mapGetters('comment',['getListCommentToStore'])
  },
  methods: {
    ...mapActions("comment", ["getListComment", "addComment"]),
    ...mapActions("task",['updateTask','getAllTask']),
    submit() {
      if(this.comment.trim() !== '') {
        let loader = this.$loading.show()
      this.addComment({
        ...this.selectTask,
        ownerComment: JSON.parse(localStorage.getItem('id')),
        title: this.comment
      })
      .then(() => {
        this.comment = ''
        loader.hide()
      })
      .catch((err) => {
        this.$store.commit("setSnack", {
              snack: "Something went wrong, please try again later!",
              color: "#ff5252"
            })
        console.log(err)
      })
      }
    },
    cancel() {
      this.$store.commit("closeDialog")
    },
    remove(item) {
      const index = this.asignee.indexOf(item);
      if (index >= 0) {
        this.asignee.splice(index, 1);
      }
    }
  }
};
</script>

