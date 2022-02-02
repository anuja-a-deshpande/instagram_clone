import { USER_STATE_CHANGE } from '../constants/index'
import { collection, getDocs ,query, where, } from "firebase/firestore"; 
import {auth, db } from "../../components/firebaseConfig"

const usersCol = collection(db, "users");
const q2 = query(usersCol, where("email", "==", auth.currentUser.email));

export function fetchUser() {
    return ((dispatch) => {
        getDocs(q2)
        .then((snapshots)=>
                {
                    snapshots.docs.map((snapshot)=>{
                    if(snapshot.exists){
                        dispatch({type : USER_STATE_CHANGE, currentUser: snapshot.data()})
                        console.log(snapshot.data())
                    }
                    else{
                        console.log('does not exist')
                    }}
        )});
                // console.log('snapshot', snapshot._firestore.app._container.providers);
                
            // })
    })
}