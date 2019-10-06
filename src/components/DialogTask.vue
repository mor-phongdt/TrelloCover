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
            :items="members"
            filled
            outlined
            dark
            style="width:40%"
            class="mt-2 ml-5 mr-5"
            background-color="rgba(0,0,0,.4)"
            placeholder="Asignee to ..."
            item-text="fullName"
            item-value="email"
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
                    src="https://image.shutterstock.com/image-vector/blank-avatar-photo-placeholder-flat-260nw-1151124605.jpg"
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
                    src="https://image.shutterstock.com/image-vector/blank-avatar-photo-placeholder-flat-260nw-1151124605.jpg"
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
          />
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn class="white--text" text @click="cancel()">Close</v-btn>
            <v-btn class="white--text" text type="submit">Create</v-btn>
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
      comment: '',
      key:0,
      members: [{email:'abc@gmail.com',fullName:'phong'},{email:'a@gmail.com',fullName:'tung'}],
    };
  },
  created() {
    this.$store.watch(
      state => state.showDialog.show,
      () => {
        if (this.$store.state.showDialog.show) {
          this.dialog = true;
        } else {
          this.dialog = false;
        }
      }
    );
    this.key = this.key +1
  },
  watch : {
      selectTask(){
           this.asignee = this.selectTask.ownerTask.email
      }
  },
  methods: {
      cancel() {
      this.$store.commit("closeDialog");
    },
    remove(item) {
      const index = this.asignee.indexOf(item.email);
      if (index >= 0) {
        this.asignee.splice(index, 1);
      }
    },
  }
};
</script>

