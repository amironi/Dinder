import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import { updateEvent,isAdmin } from '../actions/index';
import FoodItem from './FoodItem';

const styles = StyleSheet.create({
  form: {
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  fieldStyles: {
    height: 40,
    textAlign: 'right',
    color: MKColor.Blue,
  },
  addButton: {
    marginBottom: 15,
  },
  title: {
    textAlign: 'right',
    fontSize: 15,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  error: {
    textAlign: 'left',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'red',
    paddingTop: 5,
    paddingBottom: 5,
  },
  add: {
    marginTop: 30,
  },
  textfieldWithFloatingLabel: {
    height: 48,
    marginTop: 10,
  },
});

const AddButton = MKButton
  .coloredButton()
  .withText('ADD/UPDATE')
  .build();


const TF = MKTextField.textfieldWithFloatingLabel()
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

const EventDetails = ({event,error}) => {
    // componentWillMount() {

    //   setTimeout((() => {
    //      if (this.refs.defaultInput) {
    //        this.refs.defaultInput.focus();
    //      }
    //   }), 1000);
    // }

  renderTextfield(
    event,
    field, 
    placeholder, 
    showPass = false, 
    defaultInput = ''){
    
    const admin = isAdmin(event);
    const password = showPass &&
                     !admin &&
                     !isApproved(event);
    return (
      <TF
        // ref={defaultInput}
        placeholder={placeholder}
        defaultValue={event[field]}
        editable={admin}
        password={password}
        onChangeText={value => event[field] = value }
      />
    )
  }

  
  const admin = isAdmin(event);
  
   return (
  
      <ScrollView 
        style={styles.form} 
        showsVerticalScrollIndicator={false}>

          {this.renderTextfield(event,'type', 'סוג/שם האירוע', false,'defaultInput')}
          {this.renderTextfield(event,'area', 'שכונה ועיר')}
          {this.renderTextfield(event,'address', 'כתובת מדוייקת של האירוע( יוצג רק למוזמנים שאושרו', true)}
          {this.renderTextfield(event,'date', 'תאריך ושעה')}
          {this.renderTextfield(event,'sits', 'מספר מקומות לאירוח')}
          <Text style={styles.error}>{error}</Text>

          <Text style={styles.title}>מי מביא מה?</Text>
          <FlatList
            data={ event.food }
            renderItem ={ ({ item, index }) => <FoodItem 
                                                  event={event} 
                                                  admin={admin} 
                                                  item={item}/> } 

          />

            {currectID && <Button transparent style={{color: "#fff"}}
              title={'Delete'}
              onPress={() => deleteMeal(event)}/>}
      </ScrollView>
    );
  
}



export default EventDetails;