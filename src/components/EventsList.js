/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, TouchableOpacity, Image } from 'react-native';
import { MKTextField, MKColor, MKButton, getTheme} from 'react-native-material-kit';
import _ from 'lodash';
import EventItem from './EventItem';
import Icon from 'react-native-vector-icons/EvilIcons';
import { createNewMeal, loadInitialMeals } from '../actions';


const AddButton = MKButton.coloredButton()
  .withText('ADD')
  .build();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  EventItem: {
    // flex: 1,
    width: 353,
    // flexWrap: 'wrap',
    // paddingTop: 20,
    // paddingLeft: 20,
  },

  add_button: {
    // flex: 1
    width: 353,
    // marginBottom: 15,
     marginBottom: 100
  //  size : 20
    // flex : 1,
    // flexDirection:  'row',
    // paddingRight: 20,
    // justifyContent: 'space-around',
    // alignItems: 'center',
    // backgroundColor: 'rgba(211,211,211, 0.3)',
    // marginBottom: 10,
  },

});

class EventsList extends Component {
    static navigationOptions = {
        title: "ארוחות קרובות"
      }

    constructor(props) {

      super(props)

      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
  
      this.state = {
        dataSource : ds.cloneWithRows([])
      };


      this.load();
    }

    load() {
      loadInitialMeals( (data) =>{

        // _.map(data, (val, uid) => {    
            
        //       val.uid = uid;
        //        this.state.data.push( val );
        //     } );
        // this.state.data = data;
        //  console.log(this.state.data);  

        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2,
        });
        
        this.setState({
          dataSource: ds.cloneWithRows(data)
        });
      })
    };

  render() {
    const props = {
      admin : true
    };

    const {navigation} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.EventItem}>
           <ListView 
            
            data={this.state.dataSource}
            renderRow={
              (item) =>{ return <EventItem 
                event={rowData}
                uid={rowID}
                cb={() => {} } 
              navigation={navigation} /> } }/> 
        </View>
        
        <View style={styles.add_button}>
            <AddButton
              onPress={ () => { navigation.navigate('EventDetails',props) }}/>
        </View>

      </View>
    );
  }
}

export default EventsList;
