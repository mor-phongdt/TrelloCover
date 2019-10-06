<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent width="40%" class="container__dialog">
      <v-form @submit.prevent="submit()">
        <v-card :style="{backgroundImage:background}" class="dialog-background">
          <v-card-title>
            <span class="font-weight-bold white--text">Create Project</span>
          </v-card-title>
          <div class="dialog-row">
            <v-text-field
              class="mt-5 ml-5 name--input__dialog"
              v-model="nameProject"
              v-validate="{required: 'required', min:6, max:50,}"
              :error-messages="errors.collect('nameProject')"
              data-vv-name="nameProject"
              placeholder="Name Project"
              required
              dark
              outlined
              background-color="rgba(0,0,0,.4)"
              style="width:40%"
            />
            <v-btn-toggle
              v-model="toggle_exclusive"
              mandatory
              class="mt-5 mr-5 group--button__dialog"
            >
              <v-btn
                :value="theme"
                v-for="theme in themes"
                :key="theme.id"
                class="btn--toggle__dialog"
              >
                <v-img :src="theme" aspect-ratio="1" width="100%"></v-img>
              </v-btn>
            </v-btn-toggle>
          </div>
          <v-autocomplete
            v-model="selectedMembers"
            :items="members"
            filled
            dark
            class="mt-2 ml-5 mr-5"
            :loading="isLoading"
            :search-input.sync="search"
            background-color="rgba(0,0,0,.4)"
            placeholder="Add Member ..."
            outlined
            item-text="fullName"
            return-object
            multiple
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                @click="data.select"
                @click:close="remove(data.item)"
                class="list-singer"
              >
                <v-avatar left>
                  <v-img src="https://image.shutterstock.com/image-vector/blank-avatar-photo-placeholder-flat-260nw-1151124605.jpg"></v-img>
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
                  <img src="https://image.shutterstock.com/image-vector/blank-avatar-photo-placeholder-flat-260nw-1151124605.jpg" />
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
            placeholder="Description"
            v-model="decription"
            background-color="rgba(0,0,0,.4)"
            outlined
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
import { mapActions,mapGetters } from "vuex";

export default {
  data() {
    return {
      dialog: false,
      nameProject: "",
      decription: "",
      background:
        "url(http://demo.module-5.com/uploads/board/2216a3078676bc52aac374114e09d925)",
      toggle_exclusive: "",
      themes: [
        "https://wallpaperbro.com/img/67665.jpg",
        "https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1087&q=80",
        "https://images.unsplash.com/photo-1488866022504-f2584929ca5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1043&q=80"
      ],
      members: [],
      selectedMembers: [],
      search: null,
      isLoading: false
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
    this.selectedMembers = [JSON.parse(localStorage.getItem('account'))]
  },
  watch: {
    toggle_exclusive() {
      this.background = "url(" + this.toggle_exclusive + ")";
    },
    search(val) {
      if (this.members.length > 0) return

        this.isLoading = true
        this.getListUser()
          .then(() => {
            let index = this.getAllListUser.findIndex((item)=>{ return item.email !== JSON.parse(localStorage.getItem('account')).email})
            this.getAllListUser.splice(index,1);
            this.members = this.getAllListUser
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
    }
  },
  computed : {
    ...mapGetters('project',['getAllListUser'])
  },
  methods: {
    ...mapActions("project", ["createProject","getListUser"]),
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          const loader = this.$loading.show();
          this.createProject({
            owner: JSON.parse(localStorage.getItem('email')),
            nameProject: this.nameProject,
            contentProject: this.decription,
            createdAt: new Date(),
            members: this.selectedMembers,
            themeProject: this.background
          }).then(() => {
            loader.hide();
            this.nameProject = "";
            this.decription = "";
            this.cancel();
          });
        }
      });
    },
    cancel() {
      this.$validator.reset();
      this.$store.commit("closeDialog");
    },
    remove(item) {
      const index = this.selectedMembers.indexOf(item.email);
      if (index >= 0) {
        this.selectedMembers.splice(index, 1);
      }
    },
  }
};
</script>

