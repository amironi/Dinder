import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { MKTextField } from 'react-native-material-kit';

const Pending = ({pending}) => {

  const MTF = MKTextField
    .withTextInputStyle({ textAlign: 'right' })
    .withTintColor(MKColor.BlueGrey)
    .build();

  return(
    <View>
      <Text style={styles.title}>רשימת ממתינים לאישור</Text>
      <FlatList
        data={ pending }
        renderItem={({pair}) => { 
            return (
                <View>
                  <Text>pair.name</Text>
                  <Text>pair.item</Text>
                  <Button  raised  title="Approve" onPress={}/>
                  <Button  raised  title="Decline" onPress={}/>
                </View>
            )}}
      />
    </View>
    )

}

export default Pending;