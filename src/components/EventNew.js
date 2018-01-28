/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, ListView } from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import { isApproved } from '../actions/index';
import {list_items} from '../data';
  
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

// list_items = require('../data');
// list_items = require('../data');
class EventNew extends Component {


  componentWillMount() {


    console.log('componentWillMount', this.props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.setState({
      event: {
        approved: list_items,
        ...this.props.navigation.state.params.event
      },
      // dataSource: ds.cloneWithRows(list_items)
    });
    // this.props.navigation.state.params,uid &&
    // this.setState({
    //   event: {
  
    //   uid: this.props.navigation.state.params,uid,
    //   },
    //   // dataSource: ds.cloneWithRows(list_items)
    // });


    // this.setState({
      
    //   dataSource: ds.cloneWithRows(list_items)
    // });
  }
  componentDidMount() {
    // this.setState({...this.props.event});
    console.log('componentDidMount', this.props);

    setTimeout((() => {
      if (this.refs.defaultInput) {
        this.refs.defaultInput.focus();
      }
    }), 1000);
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: `${state.params.title}`,
    };
  };


  // static navigationOptions = { title: this.props.title }
  getDataSource(a) {
    return  new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }).cloneWithRows(a ? a : [] )
  }

  // isAdmin(){
  //   const {admin} = this.props.navigation.state.params;

  //   console.log('isAdmin', admin );

  //   return 
  //     admin
  // }

  renderPending() {
    // return ()s

    if(!this.props.navigation.state.params.admin || 
    !this.state.event.renderPending )
    {
      return(
        <View/>
      )
    }

    return(
      <View>
      <Text style={styles.title}></Text>
      <Text style={styles.title}>רשימת ממתינים לאישור</Text>
        <ListView
          enableEmptySections={true}
          dataSource={  this.getDataSource(this.state.event.renderPending) }
          renderRow={(rowData, sectionID, rowID) => {

            return (

              <TextfieldWithFloatingLabel2
                defaultValue={rowData}
                editable={admin}
                onChangeText={value => { this.state.event.approved[rowID] = value }} />
            )
          }
          } />  
        </View>
        )    
  }

  render() {

    const {admin} = this.props.navigation.state.params;
    const approved = isApproved(this.state.event);

    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <TextfieldWithFloatingLabel
            ref="defaultInput"
            placeholder={'סוג/שם האירוע'}
            defaultValue={this.state.event.type}
            editable={admin}
            onChangeText={value => this.state.event.type = value}
          />
          <TextfieldWithFloatingLabel
            placeholder={'שכונה ועיר'}
            defaultValue={this.state.event.area}
            editable={admin}
            onChangeText={value => this.state.event.area = value}
          />
          <TextfieldWithFloatingLabel
            defaultValue={this.state.event.address}
            placeholder={'כתובת מדוייקת של האירוע( יוצג רק למוזמנים שאושרו)'}
            editable={admin}
            password={!admin && !approved}
            onChangeText={value => this.state.event.address = value}
          />
          <TextfieldWithFloatingLabel
            placeholder={'תאריך ושעה'}
            defaultValue={this.state.event.date}
            editable={admin}
            onChangeText={value => this.state.event.date = value}
          />
          <TextfieldWithFloatingLabel
            placeholder={'מספר מקומות לאירוח'}
            keyboardType='numeric'
            // style={[style.textfieldWithFloatingLabel,{color: MKColor.Blue}]}
            defaultValue={this.state.event.sits}
            editable={admin}
            onChangeText={value =>
              {   
                this.setState({
                error: ""
              }) 
            this.state.event.sits = value}}
          />
          <Text style={styles.error}>{this.state.error}</Text>
          <Text style={styles.title}>מי מביא מה?</Text>

          <ListView
          enableEmptySections={true}
          dataSource={  this.getDataSource(this.state.event.approved) }
          renderRow={(rowData, sectionID, rowID) => {

              return (
                <View style={styles.visit}>
                  <TextfieldWithFloatingLabel2
                  defaultValue={Object.values(rowData)[0]}
                  editable={admin}
                  onChangeText={value => { 
                    this.state.event.approved[rowID][Object.keys(rowData)[0]] = value }} />
                  
                <TextfieldWithFloatingLabel2
                  defaultValue={Object.keys(rowData)[0]}
                  editable={admin}
                  onChangeText={value => { 
                    this.state.event.approved[rowID][value] = Object.values(rowData)[0]} } />
                </View>
              )
            }  }
             />

          {this.renderPending()}
          <View style={styles.add}>
            <AddButton
              // text={this.props.navigation.state.params.title}
              text={'dfsdfdsafs'}
              onPress={() => {

                // console.log('clicked')
                if(!this.state.event.sits )
                {
                    this.setState({
                      error: ('נא למלא  מקומות לאירוח*')
                    })

                    return;
                }

                this.props.navigation.state.params.uid  &&
                (this.state.event.uid =
                 this.props.navigation.state.params.uid);

                this.props.navigation.state.params.action(
                  this.state.event);

                this.props.navigation.goBack();
              }
              } />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default EventNew;