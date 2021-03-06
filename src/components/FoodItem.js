import React, { Component } from 'react';
import { Text,View, StyleSheet } from 'react-native';
import { MKTextField,MKColor } from 'react-native-material-kit';

const FoodItem = ({admin,item,event}) => {

   const MTF =  MKTextField.textfieldWithFloatingLabel()
    .withEditable(admin)
    .withTextInputStyle({ textAlign: 'right' })
    .withTintColor(MKColor.BlueGrey)
    .build();

    const {food,person,status,key} = item;
    const { displayName } = firebase.auth().currentUser

    // currentUser.displayName = 'amir mironi';

  return(
    <View>
      {(admin || !person || person === me) && <MTF defaultValue={food} editable={admin} onChangeText={value => food = value } />}

      {admin && <MTF  defaultValue={person} onChangeText={value => person = value } />}
      {!admin && !person && <Button  transparent
              style={{color: "#fff"}}
              title={'אני דואג לזה!'}
              onPress={() => {food[key].person = me; food[key].pending = 1} }/>}

      {!admin && person === me && <Button  transparent
        style={{color: "#fff"}}
        title={'בטל'}
        onPress={() => {food[key].person = ''; food[key].pending = null} }/>}

      {admin && pending && <Button  raised  title="Approve" onPress={ () => pending = null}/>}
      {admin && pending && <Button  raised  title="Decline" onPress={ () => {pending = null; person = '' }}/>}

    </View>
    )
}

export default FoodItem;