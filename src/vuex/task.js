import { projectCollection } from '@/plugins/firebase';


export default {
  namespaced: true,
  state: {
    taskTodo : [],
    taskDoing : [],
    taskDone : [],
    idColumnTodo : undefined,
    idColumnDoing : undefined,
    idColumnDone : undefined
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
    setAllTask: (state, {taskTodo,taskDoing,taskDone}) => {
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
    async getAllTask({ commit }, projectId) {
      let taskTodo = []
      let taskDoing = []
      let taskDone = []
      return new Promise((resolve, reject) => {
        projectCollection.doc(projectId).collection('column').get()
          .then((response) => {
            response.forEach((item) => {
              if (item.data().idColumn == 0) {
                commit('setIdColumnTodo',item.id)
                let result = projectCollection.doc(projectId)
                  .collection('column').doc(item.id)
                  .collection('task').orderBy("createdAt", "asc").onSnapshot((snapshot) => {
                    snapshot.docChanges().forEach((task) => {
                      if (task.type === 'added') {
                        taskTodo.push({
                          id: task.doc.id,
                          status: item.id,
                          ...task.doc.data(),
                        })
                      }
                    })
                  });
              }
              if (item.data().idColumn == 1) {
                commit('setIdColumnDoing',item.id)
                let result = projectCollection.doc(projectId)
                  .collection('column').doc(item.id)
                  .collection('task').orderBy("createdAt", "asc").onSnapshot((snapshot) => {
                    snapshot.docChanges().forEach((task) => {
                      if (task.type === 'added') {
                        taskDoing.push({
                          id: task.doc.id,
                          status: item.id,
                          ...task.doc.data(),
                        })
                      }
                    })
                  });
              }
              if (item.data().idColumn == 2) {
                commit('setIdColumnDone',item.id)
                let result = projectCollection.doc(projectId)
                  .collection('column').doc(item.id)
                  .collection('task').orderBy("createdAt", "asc").onSnapshot((snapshot) => {
                    snapshot.docChanges().forEach((task) => {
                      if (task.type === 'added') {
                        taskDone.push({
                          id: task.doc.id,
                          status: item.id,
                          ...task.doc.data(),
                        })
                      }
                    })
                  });
              }
            })
          })
          .then(() => {
            commit('setAllTask',{taskTodo,taskDoing,taskDone});
            resolve();
          })
          .catch((error) => {
            console.log(error)
          })
      })

    },
    async moveStatusTask(context, projectId, task) {
      // let response = projectCollection.doc(projectId)
      // .collection('column').doc(task.status).get()
      // console.log(response)
    }
  }
}
