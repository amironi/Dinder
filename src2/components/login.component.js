import React, { Component } from 'react';

import {
  Button,
  Item,
  Input,
  Icon,
  Text,
  Form
} from 'native-base';
// import { observer } from 'mobx-react/native';
// import { observable } from 'mobx';
// import { Icon } from 'react-native-elements'

const {LoginButton, LoginManager} = require('react-native-fbsdk');

// @observer
export default class Login extends Component {
  // @observable email = '';
  // @observable password = '';

  constructor(props) {
    super(props)
  }

  render() {
    // const { auth } = this.props.stores
    return (
      <Form>
         {/* <Item style={{marginBottom: 10}} rounded>
          <Icon style={{color: "#fff"}} name='person-outline'/>
          <Input style={{color: "#fff"}} 
            placeholder='Please Enter Email'
            placeholderTextColor="#fff"
            onChangeText={(email) => this.email = email}/>
        </Item>
        <Item style={{marginBottom: 10}} rounded transparnt>
          <Icon style={{color: "#fff"}} name='lock-open'/>
          <Input style={{color: "#fff"}} 
            placeholder='Please Enter Password'
            placeholderTextColor="#fff"
            secureTextEntry={true}
            onChangeText={(pass) => this.password = pass}/>
        </Item> */}
        <Item style={{marginBottom: 10}} rounded>
        </Item>
        <Item style={{marginBottom: 10}} rounded>
        </Item>
        <Button rounded block style={{marginBottom: 10}}
          onPress={() => this.props.stores.auth.LoginIn(
            () => this.props.navigation.navigate('Match')
          )}>
          {/* <Icon
            // reverse
            name='facebook'
            type='ionicon'
            color='#fff'
          /> */}
          <Text>Login With Facebook</Text>
        </Button>
      </Form>
    )
  }
}