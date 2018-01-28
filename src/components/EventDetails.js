/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import { isApproved } from '../actions/index';

  
const styles = StyleSheet.create({
  form: {
    // flex: 1,
    // paddingTop: 50,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    // textAlign: 'right',
    // justifyContent: 'space-between',
  },
  fieldStyles: {
    height: 40,
    textAlign: 'right',
    // justifyContent: 'flex-end',
    //alignItems: 'right',
    color: MKColor.Blue,
  },
  addButton: {
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
    height: 48,  // have to do it on iOS
    marginTop: 10,
    // color: MKColor.Blue,
    // textAlign: 'right',
    // textAlign: 'right',
    // alignItems:'flex-end',
  },

 
  visit: {
    // flexFlow: ow,
    // color: MKColor.Blue,
    // textAlign: 'right',
    // textAlign: 'right',
    // flex: 1,
    // flexDirection: "row",
  },


});


const TextfieldWithFloatingLabel = MKTextField.textfieldWithFloatingLabel()
  // .withPlaceholder('Number...')
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({ flex: 1, textAlign: 'right' })
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
  .withStyle({
    // height: 48,  // have to do it on iOS
    // marginTop: 10,
  })
  .withTextInputStyle({ textAlign: 'right' })
  .withTintColor(MKColor.BlueGrey)
  .build();

const AddButton = MKButton
  .coloredButton()
  .withText('ADD/UPDATE')
  .build();

// ;
// list_items = ;

import {list_items} from '../data';

class EventDetails extends Component {

  list_items = require('../data');

  state = {
    event: {
      approved: list_items,
    },
  };

  componentWillMount() {

    console.log('componentWillMount', this.props);

      this.setState({
        event: this.props.navigation.state.params.event
      });
  
     setTimeout((() => {
       if (this.refs.defaultInput) {
         this.refs.defaultInput.focus();
       }
     }), 1000);

  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: `${params.admin  ? 'עדכן' : 'הצטרף'}`,
    };
  };

  renderApproved() {

    const { params } = this.props.navigation.state;
    const {event} =  this.state;

    return(
      <View>
         <FlatList
         data={ event.approved }
         renderItem ={item => {

             return (
               <View style={styles.visit}>
                 <TextfieldWithFloatingLabel2
                 defaultValue={Object.values(rowData)[0]}
                 editable={admin}
                 onChangeText={value => { 
                   event.approved[rowID][Object.keys(rowData)[0]] = value }} />
                 
               <TextfieldWithFloatingLabel2
                 defaultValue={Object.keys(rowData)[0]}
                 editable={admin}
                 onChangeText={value => { 
                   event.approved[rowID][value] = Object.values(rowData)[0]} } />
               </View>
             )
           }  }
            />
        </View>
        )    
  }

  renderPending() {

    const { params } = this.props.navigation.state;
    const {event} =  this.state;

    if(!params.admin || !event.renderPending )
      return( <View/> )

    return(
      <View>
        <Text style={styles.title}>רשימת ממתינים לאישור</Text>
        <FlatList
          data={ event.pending }
          renderItem={({item}) => {
            return (
              <TextfieldWithFloatingLabel2
                defaultValue={item}
                editable={admin}
                onChangeText={value => { event.approved[rowID] = value }} />
            )
          }
          } />  
        </View>
        )    
  }

  render() {
    const {event} =  this.state;
    const {admin} = this.props.navigation.state.params;
    const {params} = this.props.navigation.state;
    const approved = isApproved(event);

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <TextfieldWithFloatingLabel
            ref="defaultInput"
            placeholder={'סוג/שם האירוע'}
            defaultValue={event.type}
            editable={admin}
            onChangeText={value => event.type = value}
          />
          <TextfieldWithFloatingLabel
            placeholder={'שכונה ועיר'}
            defaultValue={event.area}
            editable={admin}
            onChangeText={value => event.area = value}
          />
          <TextfieldWithFloatingLabel
            defaultValue={event.address}
            placeholder={'כתובת מדוייקת של האירוע( יוצג רק למוזמנים שאושרו)'}
            editable={admin}
            password={!admin && !approved}
            onChangeText={value => event.address = value}
          />
          <TextfieldWithFloatingLabel
            placeholder={'תאריך ושעה'}
            defaultValue={event.date}
            editable={admin}
            onChangeText={value => event.date = value}
          />
          <TextfieldWithFloatingLabel
            placeholder={'מספר מקומות לאירוח'}
            keyboardType='numeric'
            // style={[style.textfieldWithFloatingLabel,{color: MKColor.Blue}]}
            defaultValue={event.sits}
            editable={admin}
            onChangeText={value => this.setState({  error: "" })  event.sits = value}}
          />
          <Text style={styles.error}>{this.state.error}</Text>
          <Text style={styles.title}>מי מביא מה?</Text>

         

          {this.renderAproved()}
          {this.renderPending()}


          <View style={styles.add}>
            <AddButton
              onPress={() => {
                if(!event.sits )
                {
                    this.setState({
                      error: ('נא למלא  מקומות לאירוח*')
                    })

                    return;
                }

                params.uid  &&
                (event.uid = params.uid);


                admin ? 
                updateMeal(event) : 
                register(event);

                this.props.navigation.goBack();
              }
              } />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default EventDetails;