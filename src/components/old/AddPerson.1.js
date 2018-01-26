/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import {createNewMeal} from '../actions';

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  fieldStyles: {
    height: 40,
    textAlign: 'right',
    // justifyContent: 'flex-end',
    //alignItems: 'right',
    color: MKColor.Blue,
  },
  addButton:{
    marginBottom: 15,
  },
  title: {
    textAlign: 'right',
    fontSize: 15,
    marginTop: 10,
    // fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
  },
  add: {
    marginTop: 30,
  },
  textfieldWithFloatingLabel: {
    height: 48,  // have to do it on iOS
    marginTop: 10,
  },
});


const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  // .withPlaceholder('Number...')
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({flex: 1})
  .withFloatingLabelFont({
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '200',
  })
  .withKeyboardType('Hebrew')
  .build();

const AddButton = MKButton.coloredButton()
  .withText('ADD')
  .build();

class AddPerson extends Component {
  
  state = {

  };
  componentDidMount(){
    this.setState( {
      form:  's',
    } );
    
    setTimeout((() => {
      if (this.refs.defaultInput) {
        this.refs.defaultInput.focus();
      }
    }), 1000);

    console.log('amir', this.state.form)
  }


  static navigationOptions = {
        title: 'ארוחה חדשה'
    }
    
    onAddPress() {
         

    console.log('amir', this.state)
    // createNewMeal( this.props.form );
    
      this.props.navigation.goBack();
    }
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>

          <View style={styles.col}>
            <TextfieldWithFloatingLabel ref="defaultInput"/>
            {/* <Text style={styles.legendLabel}>With floating label</Text> */}
          </View>

          {/* <Text style={styles.title}></Text> */}
          <MKTextField 
            textInputStyle={styles.fieldStyles}
            placeholder={'שכונה ועיר'}
            tintColor={MKColor.BlueGrey}
            // value={this.props.form.area}
            onChangeText={value => this.state.area = value}
          />
          <MKTextField 
            textInputStyle={styles.fieldStyles}
            placeholder={'כתובת מדוייקת של האירוע( יוצג רק למאושרים)'}
            tintColor={MKColor.BlueGrey}
            // value={this.props.form.address}
            onChangeText={value => this.state.address =  value}
          />
          <MKTextField 
            textInputStyle={styles.fieldStyles}
            placeholder={'תאריך ושעה'}
            tintColor={MKColor.BlueGrey}
            // value={this.props.form.date}
            onChangeText={value => this.state.date =  value}
          />
          <MKTextField 
            textInputStyle={styles.fieldStyles}
            placeholder={'מספר מקומות לאירוח'}
            tintColor={MKColor.BlueGrey}
            // value={this.props.form.sits}
            onChangeText={value => this.state.sits =  value}
          />
          <Text style={styles.title}></Text>
          <Text style={styles.title}>מה להביא לארוחה</Text>
          
          <MKTextField 
            textInputStyle={styles.fieldStyles}
            // placeholder={}
            tintColor={MKColor.Teal}
            // value={this.props.form.meals}
            onChangeText={value => this.state.meals =  value}
          />
          {/* <MKTextField 
            textInputStyle={styles.fieldStyles}
            placeholder={'Project...'}
            tintColor={MKColor.Teal}
            value={this.props.project}
            onChangeText={value => this.props.formUpdate({ prop: 'project', value})}
          />
          <MKTextField 
            textInputStyle={styles.fieldStyles}
            placeholder={'Notes...'}
            tintColor={MKColor.Teal}
            value={this.props.notes}
            onChangeText={value => this.props.formUpdate({ prop: 'notes', value})}
          /> */}
          <View style={styles.add}>
            <AddButton onPress={this.onAddPress.bind(this)}/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

// const mapStateToProps = state => {
//   const { first_name, last_name, phone, email, company, project, notes } = state;
//   return { first_name, last_name, phone, email, company, project, notes };

// };

export default AddPerson;