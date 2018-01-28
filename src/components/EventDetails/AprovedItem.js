import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { MKTextField } from 'react-native-material-kit';

const AprovedItem = ({admin,pair}) => {

   const MTF = MKTextField
    .withEditable(admin)
    .withTextInputStyle({ textAlign: 'right' })
    .withTintColor(MKColor.BlueGrey)
    .build();

  return(
    <View>
      <MTF
        defaultValue={pair.name}
        onChangeText={value => pair.name = value } />

      <MTF
        defaultValue={pair.item}
        onChangeText={value => pair.item = value } />
    </View>
    )

}

export default AprovedItem;