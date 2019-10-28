import { projectCollection } from '@/plugins/firebase';

export default {
    namespaced: true,
    state: {
        listComment: [],
        comment: {}
    },
    getters: {
        getListCommentToStore: state => {
          return state.listComment
        },
      },
    mutations: {
        setListComment: (state, comments) => {
            state.listComment = comments;
        },
        setComment: (state, comment) => {
            state.comment = comment
        },
    },
    actions: {
        getListComment ({commit}, selectTask) {
            let listComments = []
            return new Promise((resolve, reject) => {
                projectCollection.doc(selectTask.projectId)
                .collection('column').doc(selectTask.status)
                .collection('task').doc(selectTask.id)
                .collection('comment').onSnapshot((snapshot) => { //xu ly lai firebase
                    snapshot.docChanges().forEach((item)=>{
                        if(item.type==='added'){
                            let owner = selectTask.members.find((x) => x.id === item.doc.data().ownerComment)
                            if(owner) {
                                listComments.push({
                                    id: item.doc.id,
                                    title: item.doc.data().title,
                                    owner: owner
                                }) 
                            }
                        }
                        if(item.type === 'removed') {
                            let index = listComments.findIndex((comment)=>{ return item.doc.id===comment.id})
                            listComments.splice(index,1);
                        }
                    })
                    commit('setListComment',listComments)
                    resolve()
                })
            })
        },
        addComment(context, task) {
            return new Promise((resolve,reject)=>{
                projectCollection.doc(task.projectId)
                .collection('column').doc(task.status)
                .collection('task').doc(task.id)
                .collection('comment').add({
                    ownerComment: JSON.parse(localStorage.getItem('id')),
                    title: task.title
                })
                .then(()=>{
                    console.log(123)
                    resolve()
                })
                .catch((error)=>{
                    reject(error)
                })
            })
        }
    },

};
