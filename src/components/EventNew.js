/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, ListView   } from 'react-native';
import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
// import {createNewMeal} from '../actions';
import {list_items} from '../data';

const styles = StyleSheet.create({
  form: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    // textAlign: 'right',
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
    // textAlign: 'right',
    // alignItems:'flex-end',
  },
});


const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  // .withPlaceholder('Number...')
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({flex: 1, textAlign: 'right'})
  .withTintColor(MKColor.BlueGrey)
  // .withAlignSelf('right')
  .withFloatingLabelFont({
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '200',
    textAlign: 'right'
  })
  // .withKeyboardType('Hebrew')
  .build();

  const TextfieldWithFloatingLabel2 = MKTextField.textfieldWithFloatingLabel()
  .withStyle( {
    // height: 48,  // have to do it on iOS
    // marginTop: 10,
  })
  .withTextInputStyle({textAlign: 'right'})
  .withTintColor(MKColor.BlueGrey)
  .build();

// const AddButton = MKButton.coloredButton()
//   .withText('הוסף ארוחה חדשה')
//   .build();

class EventNew extends Component {
  
  state = {
    list_items: list_items
  };
  componentWillMount(){
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(this.state.list_items);
  }
  componenrDidMount(){

    this.setState(...props.event);

    setTimeout((() => {
      if (this.refs.defaultInput) {
        this.refs.defaultInput.focus();
      }
    }), 1000);

  }

  static navigationOptions = { title: 'ארוחה חדשה' }
    
  // onAddPress() {
  //     ;
  //   }
  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
        <TextfieldWithFloatingLabel  
            ref="defaultInput"
            placeholder={'סוג האירוע'}
            onChangeText={value => this.state.type = value}
          />
         <TextfieldWithFloatingLabel  
            ref="defaultInput"
            placeholder={'שכונה ועיר'}
            onChangeText={value => this.state.area = value}
          />
          <TextfieldWithFloatingLabel 
            placeholder={'כתובת מדוייקת של האירוע( יוצג רק למאושרים)'}
            onChangeText={value => this.state.address = value}
          />
          <TextfieldWithFloatingLabel 
            placeholder={'תאריך ושעה'}
            // value={this.props.form.date}
            onChangeText={value => this.state.date = value}
          />
          <TextfieldWithFloatingLabel 
            placeholder={'מספר מקומות לאירוח'}
            withKeyboardType='numeric'
            // value={this.props.form.sits}
            onChangeText={value => this.state.sits = value}
          />
          <Text style={styles.title}></Text>
          <Text style={styles.title}>רשימת מרכיבים לארוחה</Text>
          

           <ListView 
              dataSource={this.dataSource}
              renderRow={(rowData) => { 
                console.log(i); 
                   
                  <TextfieldWithFloatingLabel2 
                    value={rowData} 
                    onChangeText={value => {this.state.list_items = value} }/> 
                 }
            }/>   

          <View style={styles.add}>
            <MKButton 

            text = {this.props.title}
            onPress={ ()=>{
                this.props.action( this.state );
                this.props.navigation.goBack()
              }
            }/>
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

export default EventNew;