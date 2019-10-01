import { projectCollection } from '@/plugins/firebase';


export default {
  namespaced: true,
  state: {
    taskTodo: [],
    taskDoing: [],
    taskDone: [],
    idColumnTodo: undefined,
    idColumnDoing: undefined,
    idColumnDone: undefined
  },
  getters: {
    getTaskTodo: state => {
      return state.taskTodo
    },
    getTaskDoing: state => {
      return state.taskDoing
    },
    getTaskDone: state => {
      return state.taskDone
    }
  },
  mutations: {
    setAllTask: (state, { taskTodo, taskDoing, taskDone }) => {
      state.taskTodo = taskTodo
      state.taskDoing = taskDoing
      state.taskDone = taskDone
    },
    setIdColumnTodo: (state, idColumnTodo) => {
      state.idColumnTodo = idColumnTodo
    },
    setIdColumnDoing: (state, idColumnDoing) => {
      state.idColumnDoing = idColumnDoing
    },
    setIdColumnDone: (state, idColumnDone) => {
      state.idColumnDone = idColumnDone
    }
  },
  actions: {
    async getAllTask({ commit,getters}, projectId) {
      let taskTodo = []
      let taskDoing = []
      let taskDone = []
      let result1 = undefined
      let result2 = undefined
      let result3 = undefined
      projectCollection.doc(projectId).collection('column').onSnapshot((snapshot1)=>{
          snapshot1.docChanges().forEach((item) => {
            console.log(item)
            if (item.doc.data().idColumn === 0) {
              commit('setIdColumnTodo', item.doc.id)
                result1 = projectCollection.doc(projectId)
                .collection('column').doc(item.doc.id)
                .collection('task').orderBy("createdAt", "asc").onSnapshot((snapshot) => {
                  snapshot.docChanges().forEach((task) => {
                    let index =  getters.getTaskTodo.findIndex((x)=>x.id ===task.doc.id)
                    console.log(task.doc.data())
                    if (task.type === 'added' && task.doc.data().nameTask && index === -1) {
                      taskTodo.push({
                        id: task.doc.id,
                        status: item.doc.id,
                        ...task.doc.data(),
                      })
                    }
                    if (task.type === 'removed' && task.doc.data().nameTask) {
                      let index = getters.getTaskTodo.findIndex(item => item.id === task.doc.id)
                      if(index !== -1){
                        taskTodo.splice(index, 1)
                      }
                    }
                  })
                });
            }
            if (item.doc.data().idColumn == 1) {
              commit('setIdColumnDoing', item.doc.id)
              result2 = projectCollection.doc(projectId)
                .collection('column').doc(item.doc.id)
                .collection('task').orderBy("createdAt", "asc").onSnapshot((snapshot) => {
                  snapshot.docChanges().forEach((task) => {
                    console.log(task)
                    let index =  getters.getTaskDoing.findIndex((x)=>x.id ===task.doc.id)
                    if (task.type === 'added' && task.doc.data().nameTask && index === -1) {    
                      taskDoing.push({
                        id: task.doc.id,
                        status: item.doc.id,
                        ...task.doc.data(),
                      })
                    }
                    if (task.type === 'removed' && task.doc.data().nameTask) {
                      let index = getters.getTaskDoing.findIndex(item => item.id === task.doc.id)
                      if(index !== -1){
                        taskDoing.splice(index, 1)
                      }
                    }
                  })
                });
            }
            if (item.doc.data().idColumn == 2) {
              commit('setIdColumnDone', item.doc.id)
              result3 = projectCollection.doc(projectId)
                .collection('column').doc(item.doc.id)
                .collection('task').orderBy("createdAt", "asc").onSnapshot((snapshot) => {
                  snapshot.docChanges().forEach((task) => {
                    let index =  getters.getTaskDone.findIndex((x)=>x.id ===task.doc.id)
                    if (task.type === 'added' && task.doc.data().nameTask && index === -1) {
                      taskDone.push({
                        id: task.doc.id,
                        status: item.doc.id,
                        ...task.doc.data(),
                      })
                    }
                    if (task.type === 'removed' && task.doc.data().nameTask) {
                      let index = getters.getTaskDone.findIndex(item => item.id === task.doc.id)
                      if(index !== -1){
                        taskDone.splice(index, 1)
                      }
                    }
                  })
                });
            }
        }) 
        commit('setAllTask', { taskTodo, taskDoing, taskDone });
      })
    },
    async moveStatusTask(context, task) {
      let response = await projectCollection.doc(task.projectId)
        .collection('column').doc(task.columnAdd)
        .collection('task').doc(task.id).set({
          createdAt : task.createdAt,
          id: task.id,
          nameTask: task.nameTask,
          ownerTask: task.ownerTask,
          projectId: task.projectId,
           status : task.columnAdd
        })
       if(task.columnAdd !== task.status) {
        projectCollection.doc(task.projectId)
            .collection('column').doc(task.status)
            .collection('task').doc(task.id).delete()
            .then((response) => {
            })
            .catch((error) => {
              console.log(error)
            })
       }
    }
  }
}
