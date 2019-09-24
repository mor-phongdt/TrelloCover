import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyAJ1nUWO-nJW5_oIWE7UgJyHfLIPQWob9s",
        authDomain: "kma-board.firebaseapp.com",
        databaseURL: "https://kma-board.firebaseio.com",
        projectId: "kma-board",
        storageBucket: "kma-board.appspot.com",
        messagingSenderId: "535045847971",
        appId: "1:535045847971:web:eabc2b12bf59177f7f7816"
    });
}
const db = firebase.firestore();

const projectCollection = db.collection('Project')


export {
    firebase,
    projectCollection
}


// const db = firebase.firestore();
    // // db.collection('Project').doc('xKlDkaHi26P2nKycJY44').collection('task').onSnapshot((snapshot)=>{ 
    // //   console.log(snapshot)
    // //   snapshot.docChanges().forEach((item)=>{
    // //     console.log(item.doc.data())
    // //   })
    // // })
    // db.collectionGroup('task').where('ownerTask','==','abc@gmail.com').onSnapshot((snapshot)=>{ 
    //   console.log(snapshot)
    //   snapshot.docChanges().forEach((item)=>{
    //     console.log(item.doc.data())
    //   })
    // })