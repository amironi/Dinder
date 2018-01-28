// import {observable, action} from 'mobx';
// import firebase from 'firebase';
import { LoginButton, LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';

export default class AuthStore {
  // @observable authUser = null;

  constructor() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   this.authUser = user
    // })
  }
  // @action
  // signIn({email, password}) {
  //   if(this.authUser) {
  //     return Promise.resolve(this.authUser)
  //   }
  //   return firebase.auth().signInWithEmailAndPassword(email, password)
  // }

  getAccessToken(cb) {
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        let accessToken = data.accessToken;
        alert(accessToken.toString());

        const responseInfoCallback = (error, result) => {
          if (error) {
            console.log(error)
            alert('Error fetching data: ' + error.toString());
          } else {
            console.log(result)
            alert('Success fetching data: ' + result.toString());
            cb()
          }
        }

        const infoRequest = new GraphRequest(
          '/me',
          {
            accessToken: accessToken,
            parameters: {
              fields: {
                string: 'email,name,first_name,middle_name,last_name'
              }
            }
          },
          responseInfoCallback
        );

        // Start the graph request.
        new GraphRequestManager().addRequest(infoRequest).start();

      })  
  }

  LoginIn(cb) {
    console.log('LoginManager')

    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString())
         
          this.getAccessToken(cb)

         }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )

    // return

    // this.props.stores.auth.signIn({email: this.email, password: this.password})
    //   .then(() => {
    //     this.props.navigation.navigate('Match')
    //   })
  }
}