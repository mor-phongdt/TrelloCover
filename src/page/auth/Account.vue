<template>
  <div style="background:#14181d;height:100%">
    <div style="margin:100px auto auto 8%">
      <v-card-title style="margin:30px auto 20px 0">
        <h4 style="color:white">User Infomation</h4>
      </v-card-title>
      <v-form class="user-container__grid" @submit.prevent="submit()">
        <div>
          <picture-input
            class="input-wrapper"
            style="margin: 0px !important"
            ref="pictureInput"
            @change="onChangeImage"
            :hideChangeButton="true"
            :width="300"
            :height="300"
            :crop="false"
            margin="15"
            :prefill='avatarUrl'
            size="2"
          ></picture-input>
        </div>
        <div>
          <v-text-field
              class="mt-22 ml-5 name--input__dialog"
              style="width:40%"
              v-model="name"
              v-validate="{required: 'required', min:6, max:50,}"
              :error-messages="errors.collect('name')"
              data-vv-name="name"
              placeholder="Full name"
              required
              dark
              outlined
              background-color="rgba(0,0,0,.4)"
            />
            <v-text-field
              class="mt-2 ml-5 name--input__dialog"
              style="width:40%"
              v-model="job"
              v-validate="{ max:50,}"
              :error-messages="errors.collect('job')"
              data-vv-name="job"
              placeholder="Job"
              required
              dark
              outlined
              background-color="rgba(0,0,0,.4)"
            />
            <v-textarea
                style="width:40%"
                class="mt-2 ml-5"
                placeholder="Description"
                v-model="description"
                background-color="rgba(0,0,0,.4)"
                outlined
                dark
            />
            <div class="position--btn ml-5" >
              <v-btn color="primary" type="submit" class="color mr-5" >Save</v-btn>
              <v-btn color="primary" type="submit" class="color" to="/board">Back</v-btn>
            </div>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import { firebase } from '@/plugins/firebase'
import PictureInput from "vue-picture-input"

export default {
  components: {
    PictureInput
  },
  data() {
    return {
      imageFile: '',
      avatarUrl: '',
      name:'',
      job:'',
      description: '',
    }
  },
  created() {
    console.log('abc')
    if(Object.keys(this.getUser).length !== 0) { //case1: redirect từ router(vì dữ liệu đã đc call từ trước nên fill vào luôn)
      this.avatarUrl = this.getUser.avatarUrl
      this.name = this.getUser.fullName
      this.job = this.getUser.job
      this.description = this.getUser.description
    }
    this.$store.watch( // case 2: reload lại trang( khi load lại trang thì sẽ restart store và call api lại thì tạo watcher để hứng dữ liệu call store)
      state => state.user.user,
      () => {
        let loader = this.$loading.show()
        if (this.$store.state.user.user) {
          this.avatarUrl = this.getUser.avatarUrl
          this.name = this.getUser.fullName
          this.job = this.getUser.job
          this.description = this.getUser.description
          loader.hide()
        }
      }
    )
    // let loader = this.$loading.show()
    // this.requestUser(JSON.parse(localStorage.getItem('id')))
    // .then(() => {
    //   this.avatarUrl = this.getUser.avatarUrl
    //   this.name = this.getUser.fullName
    //   this.job = this.getUser.job
    //   this.description = this.getUser.description
    //   setTimeout(()=> {
    //     loader.hide()
    //   },500)
    //   loader.hide()
    // })
    // .catch((err) => {
    //   console.log(err)
    //   loader.hide()
    // })
  },
  watch: {
    
  },
  computed: {
    ...mapGetters('user', ['getUser'])
  },
  methods: {
    ...mapActions("user", ["requestUser", "updateUserInfo"]),
    onChangeImage() {
      let loader = this.$loading.show()
      if (this.$refs.pictureInput.image) {
        this.imageFile = this.$refs.pictureInput.file;
      }
      let vm = this
      const storageRef = firebase.storage().ref('avatar/' + this.imageFile.name);
					//upload file
					const task = storageRef.put(this.imageFile)
						.then((snapshot) => {
							storageRef.getDownloadURL().then(function (url) {
								// get Url
                vm.avatarUrl = url
                loader.hide()
              }).catch((err) => {
                  console.log(err)
                })
              })
    },
    submit() {
      this.$validator
        .validateAll()
        .then(result => {
          if (result) {
            const loader = this.$loading.show();
            this.updateUserInfo({
              fullName: this.name,
              avatarUrl: this.avatarUrl,
              job: this.job,
              description: this.description,
              id: JSON.parse(localStorage.getItem('id'))
            })
              .then(() => {
                // this.$store.commit("setSnack", {
                //   snack: textSnackBar("addData", this.$store.state.lang.locale),
                //   color: "success"
                // })
                // this.clear()
                this.$router.push({ name: "ProjectPage" });
                loader.hide()
              })
              .catch(error => {
                // this.$store.commit("setSnack", {
                //   snack: `${getMessageError(
                //     error,
                //     this.$store.state.lang.locale
                //   )}`,
                //   color: "error"
                // });
                // loader.hide()
              });
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    clear() {
      this.$validator.reset();
    }
  }
}
</script>

<style scoped>
.user-container__grid {
  display: grid;
  grid-template-columns: 30% auto;
}
.position--btn {
  display:flex;
  justify-content:flex-end;
  width:40%;
}
</style>