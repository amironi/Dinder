/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, ListView   } from 'react-native';
import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
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

class EventNew extends Component {
  

  componentWillMount(){
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = {
      visitors: list_items,
      dataSource: ds.cloneWithRows(list_items)
    };
  }
  componenrDidMount(){
    // this.setState({...this.props.event});

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
            value={this.state.type}
            onChangeText={value => this.state.type = value}
          />
         <TextfieldWithFloatingLabel  
            placeholder={'שכונה ועיר'}
            value={this.state.area}
            onChangeText={value => this.state.area = value}
          />
          <TextfieldWithFloatingLabel 
            value={this.state.address}
            placeholder={'כתובת מדוייקת של האירוע( יוצג רק למאושרים)'}
            onChangeText={value => this.state.address = value}
          />
          <TextfieldWithFloatingLabel 
            placeholder={'תאריך ושעה'}
            value={this.state.date}
            onChangeText={value => this.state.date = value}
          />
          <TextfieldWithFloatingLabel 
            placeholder={'מספר מקומות לאירוח'}
            withKeyboardType='numeric'
            value={this.state.sits}
            onChangeText={value => this.state.sits = value}
          />
          <Text style={styles.title}></Text>
          <Text style={styles.title}>? מה להביא</Text>
          
           <ListView 
              dataSource={this.state.dataSource}
              renderRow={(rowData,sectionID,rowID) => { 
   
                   return <Text>{rowData},{rowID}</Text>
                  // <TextfieldWithFloatingLabel2 
                  //   value={rowData} 
                  //   onChangeText={value => {this.state.list_items = value} }/> 
                 }
            }/>   

          <View style={styles.add}>
            <MKButton 
            text = {this.props.title}
            onPress={ ()=>{
                this.props.action( this.state );
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