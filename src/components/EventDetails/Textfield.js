import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { MKTextField } from 'react-native-material-kit';



const MTF = MKTextField
.textfieldWithFloatingLabel()
.withStyle(styles.textfieldWithFloatingLabel)
.withTextInputStyle({ flex: 1, textAlign: 'right' })
.withTintColor(MKColor.BlueGrey)
.withFloatingLabelFont({
  fontSize: 10,
  fontStyle: 'italic',
  fontWeight: '200',
  textAlign: 'right'
})
.build();


const Textfield = ({admin,placeholder,data,showPass,defaultInput}) => {
//   data, 
// placeholder, 
// showPass = false, 
// defaultInput = ''){

    const password = showPass &&
                    !admin &&
                    !isApproved(event);

    return 
      <MTF
        ref={defaultInput}
        placeholder={placeholder}
        defaultValue={data}
        editable={admin}
        password={password}
        onChangeText={value => data = value}
      />
}




export default Textfield;