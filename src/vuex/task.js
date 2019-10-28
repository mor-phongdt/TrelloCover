import { projectCollection, userCollection } from '@/plugins/firebase';


export default {
  namespaced: true,
  state: {
    taskTodo: [],
    taskDoing: [],
    taskDone: [],
    idColumnTodo: undefined,
    idColumnDoing: undefined,
    idColumnDone: undefined,
    memberProject: []
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
    },
    getMembersProject: state => {
      return state.memberProject
    },
    getIdColumnTodo: (state) => {
      return state.idColumnTodo 
    },
    getIdColumnDoing: (state) => {
      return state.idColumnDoing
    },
    getIdColumnDone: (state) => {
      return state.idColumnDone
    },
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
    },
    setMembersProject: (state, membersList) => {
      state.memberProject = membersList
    },
    setTaskTodoing: (state,task) => {
      state.taskDoing = task
    },
    setTaskDone: (state,task) => {
      state.taskDoing = task
    },
    setTaskTodo: (state,task) => {
      state.taskTodo = task
    }
  },
  actions: {
    async getMembers({commit}, projectId) { //co member roi
      let listUserDetail = []
      let listMembersDetail = []
      let res1 = await userCollection.get()
      if (res1) {
        res1.forEach((item) => {
          listUserDetail.push({
            id: item.id,
            ...item.data()
          })
        })
      }
      let res2 =  await projectCollection.doc(projectId).get()
      if (res2) {
        res2.data().members.forEach((item) => {
          let user = listUserDetail.find((x) => item === x.id)
          if(user) {
            listMembersDetail.push(user)
          }
        })
      }
      commit('setMembersProject',listMembersDetail)
    },
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
            rejcet(error)
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
            rejcet(error)
            console.log(error)
          })
      }


    },
    addTask(context, task) {
      console.log(task)
      return new Promise((resolve,reject)=>{
        projectCollection.doc(task.projectId)
        .collection('column').doc(task.status)
        .collection('task').add(task)
        .then(()=>{
          resolve()
        })
        .catch((error)=>{
          reject(error)
        })
      })
    },
    async updateTask({commit,getters}, task) {
        return new Promise((resolve, r) => {
          projectCollection.doc(task.projectId)
        .collection('column').doc(task.status)
        .collection('task').doc(task.id).update({
          ownerTask: task.asignee
        })
        .then((res) => {
          if(getters.getIdColumnDoing === task.status) {
            let  tasks= getters.getTaskDoing
            let index  = tasks.find(x => x.id === task.id)
            index.ownerTask = task.asignee
            commit('setTaskTodoing', tasks)
          }
          if(getters.getIdColumnDone === task.status) {
            let  tasks= getters.getTaskDone
            let index  = tasks.find(x => x.id === task.id)
            index.ownerTask = task.asignee
            commit('setTaskDone', tasks)
          }
          if(getters.getIdColumnTodo === task.status) {
            let  tasks= getters.getTaskTodo
            let index  = tasks.find(x => x.id === task.id)
            index.ownerTask = task.asignee
            commit('setTaskTodo', tasks)
          }
          resolve()
        })
        .catch(err => {
          console.log(err)
          r(err)
        }) 
        })
    },
    async deleteTask(context, task) {
      console.log(task)
      projectCollection.doc(task.projectId)
        .collection('column').doc(task.status)
        .collection('task').doc(task.id).delete()
        .then((response) => {
        })
        .catch((error) => {
          rejcet(error)
          console.log(error)
        })
    }
  }
}