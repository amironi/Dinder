/**
 * Sample React Native Main
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container, StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import Login from './Login';
import Loader from './Loader';
import Navigation from './Navigation';
import EventsList from './EventsList';

export default class App extends Component {
  state = { loggedIn: null};

    componentWillMount() {
        firebase.initializeApp({
          apiKey: "AIzaSyCNtkoiHbhc11trbdS-pt466sI_oek20hw",
          authDomain: "dinder-8bd34.firebaseapp.com",
          databaseURL: "https://dinder-8bd34.firebaseio.com",
          projectId: "dinder-8bd34",
          storageBucket: "dinder-8bd34.appspot.com",
          messagingSenderId: "600429335329"
        });

        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({ loggedIn: true });
          } else {
            this.setState({ loggedIn: false});
          }
        });
    }

    render() {
      switch (this.state.loggedIn) {
        case true:
        return <EventsList />
        case false:
          return <Login />;
        default:
          return <Loader size="large" />;
      }
    }
  // render() {
  //   return (
  //     <Container style={styles.container}>
  //     { this.renderInitialView()}
  //     </Container> 
  //   );
  // }
}
