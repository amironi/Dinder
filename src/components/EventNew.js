/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, ListView   } from 'react-native';
import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import { isAdmin } from '../actions/index';

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
  .withFloatingLabelFont({
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '200',
    textAlign: 'right'
  })
  // .withKeyboardType('Hebrew')
  .build();

  const TextfieldWithFloatingLabel2 = MKTextField
  .textfieldWithFloatingLabel()
  .withStyle( {
    // height: 48,  // have to do it on iOS
    // marginTop: 10,
  })
  .withTextInputStyle({textAlign: 'right'})
  .withTintColor(MKColor.BlueGrey)
  .build();

const AddButton = MKButton
  .coloredButton()
  .withText('ADD')
  .build();

class EventNew extends Component {
  

  componentWillMount(){
    // import {list_items} from '../data';
    const list_items = require('./data');
    
    console.log('componentWillMount',this.props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    // {require('./data')}
    this.setState( {
      event: {
        visitors: list_items,
        ...this.props.navigation.state.params.event
      },
      dataSource: ds.cloneWithRows(list_items)
    });
  }
  componentDidMount(){
    // this.setState({...this.props.event});
    console.log('componentDidMount',this.props);

    setTimeout((() => {
      if (this.refs.defaultInput) {
        this.refs.defaultInput.focus();
      }
    }), 1000);
  }

  static navigationOptions = ({ navigation }) => {
    const {state} = navigation;
    return {
      title: `${state.params.title}`,
    };
  };

  
  // static navigationOptions = { title: this.props.title }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
        <TextfieldWithFloatingLabel  
            ref="defaultInput"
            placeholder={'סוג/שם האירוע'}
            defaultValue={this.state.event.type}
            editable={isAdmin(this.state.event.uid)}
            onChangeText={value => this.state.event.type = value}
          />
         <TextfieldWithFloatingLabel  
            placeholder={'שכונה ועיר'}
            defaultValue={this.state.event.area}
            editable={isAdmin(this.state.event.uid)}
            onChangeText={value => this.state.event.area = value}
          />
          <TextfieldWithFloatingLabel 
            defaultValue={this.state.event.address}
            placeholder={'כתובת מדוייקת של האירוע( יוצג רק למאושרים)'}
            editable={isAdmin(this.state.event.uid)}
            onChangeText={value => this.state.event.address = value}
          />
          <TextfieldWithFloatingLabel 
            placeholder={'תאריך ושעה'}
            defaultValue={this.state.event.date}
            editable={isAdmin(this.state.event.uid)}
            onChangeText={value => this.state.event.date = value}
          />
          <TextfieldWithFloatingLabel 
            placeholder={'מספר מקומות לאירוח'}
            withKeyboardType='numeric'
            defaultValue={this.state.event.sits}
            editable={isAdmin(this.state.event.uid)}
            onChangeText={value => this.state.event.sits = value}
          />
          <Text style={styles.title}></Text>
          <Text style={styles.title}>? מה להביא</Text>
          
           <ListView 
              dataSource={this.state.dataSource}
              renderRow={(rowData,sectionID,rowID) => { 
   
                   return (
                  //  <Text>{rowData},{rowID}</Text>
                   <TextfieldWithFloatingLabel2 
                     defaultValue={rowData} 
                     editable={isAdmin(this.state.event.uid)}
                     onChangeText={value => {this.state.event.visitors[rowID]=value} }/> 
                   )}
            }/>   

          <View style={styles.add}>
            <AddButton 
            text = {this.props.navigation.state.params.title}
            onPress={ ()=>{
                this.props.navigation.state.params.action( 
                  this.state.event );
                this.props.navigation.goBack();
              }
            }/>
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default EventNew;