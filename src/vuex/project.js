import { projectCollection,userCollection } from '@/plugins/firebase';

export default {
  namespaced: true,
  state: {
    project : {},
    listProjects : [],
    listUser: []
  },
  getters: {
    projectDetail: state => {
      return state.project
    },
    getlistProjects: state => {
      return state.listProjects
    },
    getAllListUser: state => {
      return state.listUser
    }, 
  },
  mutations: {
    setProject: (state, project) => {
      state.project = project
    },
    setListProject: (state, listProjects) => {
      state.listProjects = listProjects
    },
    setListUser: (state, listUser) => {
      state.listUser = listUser
    },
  },
  actions: {
    async getAllProject({ commit }) {
        let listProjects =[]
        return new Promise((resolve, reject) => {
          let response = projectCollection.where("members", "array-contains", JSON.parse(localStorage.getItem('email'))).onSnapshot((snapshot)=>{ 
              snapshot.docChanges().forEach((item)=>{
                if(item.type==='added'){
                    listProjects.push({
                        id: item.doc.id,
                        ...item.doc.data(),
                    }) 
                }
                if(item.type === 'removed') {
                   let index = listProjects.findIndex((project)=>{ return item.doc.id===project.id})
                    listProjects.splice(index,1);
                }
              })
         });
         if(response){
          commit('setListProject',listProjects);
          resolve()
        }
        })
    },
    async getProjectById({commit},projectId) {
        try{
          const response = await projectCollection.doc(projectId).get()
        if(response){
          commit('setProject',{id:projectId,...response.data()})
        }
        }catch(error){
          console.log(error)
        }
    },
    async createProject(context,project) {
        try{
            const response = await projectCollection.add(project);
            projectCollection.doc(response.id).collection('column').add({name:'Todo',idColumn:0})
            projectCollection.doc(response.id).collection('column').add({name:'Doing',idColumn:1})
            projectCollection.doc(response.id).collection('column').add({name:'Done',idColumn:2})
        }catch(error){
            console.log(error)
        }
    },
    async deleteProject(context , projectId) {
        try{
            const response = projectCollection.doc(projectId).delete();

        }catch(error) {
            console.log(error)
        }
    },
    async getListUser({commit}) {
      let listUser = []
      let response = await userCollection.get()
      if(response) {
        response.forEach((item)=>{
          listUser.push({
            id : item.id,
            ...item.data()
          })
        })
        commit('setListUser',listUser)
      }
    }
  },

};
