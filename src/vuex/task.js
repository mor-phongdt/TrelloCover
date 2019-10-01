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
    async getAllTask({ commit, getters }, projectId) {
      let taskTodo = []
      let taskDoing = []
      let taskDone = []
      let result1 = undefined
      let result2 = undefined
      let result3 = undefined
      return new Promise((resolve, reject) => {
        projectCollection.doc(projectId).collection('column').get()
          .then((response) => {
            response.forEach((item) => {
              if (item.data().idColumn === 0) {
                commit('setIdColumnTodo', item.id)
                result1 = projectCollection.doc(projectId)
                  .collection('column').doc(item.id)
                  .collection('task').orderBy("createdAt", "asc").onSnapshot((snapshot) => {
                    snapshot.docChanges().forEach((task) => {
                      let index = getters.getTaskTodo.findIndex((x) => x.id === task.doc.id)
                      if (task.type === 'added' && task.doc.data().nameTask && index === -1) {
                        taskTodo.push({
                          id: task.doc.id,
                          status: item.id,
                          ...task.doc.data(),
                        })
                        console.log(taskTodo)
                      }
                      if (task.type === 'removed' && task.doc.data().nameTask) {
                        let index = getters.getTaskTodo.findIndex(item => item.id === task.doc.id)
                        if (index !== -1) {
                          taskTodo.splice(index, 1)
                        }
                      }
                    })
                  });
              }
              if (item.data().idColumn == 1) {
                commit('setIdColumnDoing', item.id)
                result2 = projectCollection.doc(projectId)
                  .collection('column').doc(item.id)
                  .collection('task').orderBy("createdAt", "asc").onSnapshot((snapshot) => {
                    snapshot.docChanges().forEach((task) => {
                      let index = getters.getTaskDoing.findIndex((x) => x.id === task.doc.id)
                      if (task.type === 'added' && task.doc.data().nameTask && index === -1) {
                        taskDoing.push({
                          id: task.doc.id,
                          status: item.id,
                          ...task.doc.data(),
                        })
                      }
                      if (task.type === 'removed' && task.doc.data().nameTask) {
                        let index = getters.getTaskDoing.findIndex(item => item.id === task.doc.id)
                        if (index !== -1) {
                          taskDoing.splice(index, 1)
                        }
                      }
                    })
                  });
              }
              if (item.data().idColumn == 2) {
                commit('setIdColumnDone', item.id)
                result3 = projectCollection.doc(projectId)
                  .collection('column').doc(item.id)
                  .collection('task').orderBy("createdAt", "asc").onSnapshot((snapshot) => {
                    snapshot.docChanges().forEach((task) => {
                      let index = getters.getTaskDone.findIndex((x) => x.id === task.doc.id)
                      if (task.type === 'added' && task.doc.data().nameTask && index === -1) {
                        taskDone.push({
                          id: task.doc.id,
                          status: item.id,
                          ...task.doc.data(),
                        })
                      }
                      if (task.type === 'removed' && task.doc.data().nameTask) {
                        let index = getters.getTaskDone.findIndex(item => item.id === task.doc.id)
                        if (index !== -1) {
                          taskDone.splice(index, 1)
                        }
                      }
                    })
                  });
              }
            })
          })
          .then(() => {
            commit('setAllTask', { taskTodo, taskDoing, taskDone });
            resolve(result1, result2, result3);
          })
          .catch((error) => {
            console.log(error)
          })
      })

    },
    async moveStatusTask(context, task) {
      let response = await projectCollection.doc(task.projectId)
        .collection('column').doc(task.columnAdd)
        .collection('task').doc(task.id).set({
          createdAt: task.createdAt,
          id: task.id,
          nameTask: task.nameTask,
          ownerTask: task.ownerTask,
          projectId: task.projectId,
        })
      if (task.status !== task.columnAdd) {
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