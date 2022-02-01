import { USER_STATE_CHANGE } from '../constants/index'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore"
import { collection, getDocs ,query, where, } from "firebase/firestore"; 
import firebaseConfig from '../../config';

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const q = query(collection(db, "users"), where("user", "==", auth.currentUser.uid));

const getData= async ()=>{
    
const usersCol = collection(db, "users");
const q2 = query(usersCol, where("email", "==", "Test2"));
const userSnapshots = await getDocs(usersCol);
const userSnapshots2 = await getDocs(q2);
// const userList = userSnapshots.docs.map(doc=>console.log('first', doc.data()));
const userList2 = userSnapshots2.docs.map(doc=>console.log('first', doc.data()));
console.log('auth.currentUser :>> ', auth.currentUser.email);
}
export function fetchUser() {
    getData();
    return ((dispatch) => {
            getDocs(q)
            .then((snapshot) => {
            //    snapshot.docs.map((doc)=>console.log('first', doc));
                // console.log('snapshot', snapshot._firestore.app._container.providers);
                if(snapshot.exists){
                    dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
                }
                else{
                    console.log('does not exist')
                }
            })
    })
}