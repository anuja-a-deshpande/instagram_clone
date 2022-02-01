import React, { Component } from 'react'
import { View, Button, TextInput } from 'react-native'
import firebaseConfig from '../../config';
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore } from "firebase/firestore"; 
import {
    getAuth,
    createUserWithEmailAndPassword
  } from 'firebase/auth';

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: ''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    onSignUp() {
        const { email, password, name } = this.state;
       createUserWithEmailAndPassword(auth,email, password)
            .then((result) => {
                const docRef =  addDoc(collection(db, "users"), {
                        name,
                        email
                    })
                
                    console.log(docRef.id)
                    console.log(result)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder="name"
                    onChangeText={(name) => this.setState({ name })}
                />
                <TextInput
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />

                <Button
                    onPress={() => this.onSignUp()}
                    title="Sign Up"
                />
            </View>
        )
    }
}

export default Register