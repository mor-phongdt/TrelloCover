import { projectCollection } from '@/plugins/firebase';

export default {
  namespaced: true,
  state: {
    project : {},
    listProjects : [],
  },
  getters: {
    projectDetail: state => {
      return state.project
    },
    getlistProjects: state => {
      return state.listProjects
    }
  },
  mutations: {
    setProject: (state, project) => {
      state.project = project
    },
    setListProject: (state, listProjects) => {
      state.listProjects = listProjects
    },
  },
  actions: {
    async getAllProject({ commit }) {
        let listProjects =[]
        let response = await projectCollection.orderBy("createdAt", "asc").onSnapshot((snapshot)=>{ 
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
              if(response){
                commit('setListProject',listProjects);
            }
         });
        
        
    },
    async getProjectById({commit},projectId) {
        try{
          const response = await projectCollection.doc(projectId).get()
        if(response){
          commit('setProject',response.data())
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
    }
  },

};
