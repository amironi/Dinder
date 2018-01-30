import React, { Component } from 'react';
import { Text,View, StyleSheet } from 'react-native';
import { MKTextField,MKColor } from 'react-native-material-kit';

const AprovedItem = ({admin,tuple,event}) => {

   const MTF =  MKTextField.textfieldWithFloatingLabel()
    .withEditable(admin)
    .withTextInputStyle({ textAlign: 'right' })
    .withTintColor(MKColor.BlueGrey)
    .build();

    const {food,person,status} = tuple;

  return(
    <View>
      <MTF defaultValue={food} editable={admin} onChangeText={value => food = value } />

      {admin && <MTF  defaultValue={person} onChangeText={value => person = value } />}
      {admin && status === 'pending' && <Button  raised  title="Approve" onPress={ () => status = ''}/>}
      {admin && status === 'pending' && <Button  raised  title="Decline" onPress={ () => {status = ''; person = "" }}/>}

      {!admin && <Button  transparent
              style={{color: "#fff"}}
              title={'אני דואג לזה!'}
              onPress={() => register(event,tuple.key)}/>}
    </View>
    )
}

export default AprovedItem;