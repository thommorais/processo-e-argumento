import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAHaiGYmn1bEE_CJGNRxCzEppxZY4_3cEQ",
    authDomain: "grupo-de-pesquisa.firebaseapp.com",
    databaseURL: "https://grupo-de-pesquisa.firebaseio.com",
    projectId: "grupo-de-pesquisa",
    storageBucket: "grupo-de-pesquisa.appspot.com",
    messagingSenderId: "800675823252"
}

export const firebaseImpl = firebase.initializeApp(config)
export const firebaseDatabase = firebase.database()

export class FirebaseService {

    static getDataList = (nodePath, callback, size = 10) => {

        const query = firebaseDatabase.ref(nodePath).limitToLast(size)

        query.on('value', dataSnapshot => {

            const items = []

            dataSnapshot.forEach(childSnapshot => {
                const item = childSnapshot.val();
                item['key'] = childSnapshot.key;
                items.push(item)
            })

            callback(items)

        })

        return query
    }

}