import firebase from 'firebase'

const config = {
	apiKey: "AIzaSyCNtkoiHbhc11trbdS-pt466sI_oek20hw",
    authDomain: "dinder-8bd34.firebaseapp.com",
    databaseURL: "https://dinder-8bd34.firebaseio.com",
    projectId: "dinder-8bd34",
    storageBucket: "dinder-8bd34.appspot.com",
    messagingSenderId: "600429335329"
};




export default class ConfigStore {
  constructor() {
    firebase.initializeApp(config)
    this.splashTime = 1000
    this.splashImg = require('../../images/splash.jpg')
    this.loginBG = require('../../images/login.jpg')
  }
  get SplashImg() {
    return this.splashImg
  }
  get SplashTime() {
    return this.splashTime
  }
  get LoginBG() {
    return this.loginBG
  }
}