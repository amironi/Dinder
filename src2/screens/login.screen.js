
import React, { Component } from 'react';
import {
  Container,
  Content
} from 'native-base';

import {
  View,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';
import { inject } from 'mobx-react';

import Login from '../components/login.component';

import { LoginButton, LoginManager, AccessToken, GraphRequestManager, GraphRequest } from 'react-native-fbsdk';

@inject("stores")
export default class extends Component {
  constructor(props) {
    super(props)
    console.log('Login Screen')
  }
  render() {
    const {stores} = this.props
    return (
      <Container>
        <View style={styles.container}>
          <Content scrollEnabled={false}>
            <Image style={styles.loginBackground} source={stores.config.LoginBG}>
              <View style={styles.loginForeground}>
                <Login {...this.props}/>
                  {/* <LoginButton
                  publishPermissions={['public_profile', 'email']}
                  onLoginFinished={
                    (error, result) => {
                      if (error) {
                        console.log("login has error: " + result.error);
                      } else if (result.isCancelled) {
                        console.log("login is cancelled.");
                      } else {
                          
                        this.props.stores.auth.getAccessToken(
                           () => this.props.navigation.navigate('Match'))
                            
                           
                      }
                    }
                  }
                  onLogoutFinished={() => alert("logout.")}/> */}
              </View>
            </Image>
          </Content>
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  loginBackground: {
    flex: 1,
    width: null,
    height: null
  },
  loginForeground: {
    flex:1,
    // width: ,
    marginTop: Dimensions.get('window').height/1.75,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 90,
    bottom: 0
  }
})