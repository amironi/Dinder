/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, FlatList, TouchableOpacity,ListFooterComponent, Image } from 'react-native';
import { MKTextField, MKColor, MKButton, getTheme} from 'react-native-material-kit';
import _ from 'lodash';
import EventItem from './EventItem';
import Icon from 'react-native-vector-icons/EvilIcons';
import { isAdmin, loadInitialEvents } from '../actions';


const AddButton = MKButton
  .coloredButton()
  .withText('ADD')
  .build();

class EventsList extends Component {
   
    state = {
        events: [] 
    };
    
    componentDidMount() {
      loadInitialEvents( (events) => this.setState({events}))
    }

  
    onEventSeleced(index = null){
      this.setState({currectID = index } );
    }


    cancel(){
      this.onEventSeleced();
      this.componentDidMount();
    }

    saveChanges(){
      updateEvent(
        events[currectID]),
        () => this.setState({currectID = null } ),
        () => this.setState({ error: ('נא למלא  מקומות לאירוח*')  } )
    }


    newEvent(){
      events.push( { food: require('../data') } )
      
      this.setState({currectID = events.length -1 } )
    }

    render() {
      
      const {currectID,events,error} = this.state;

      return (
        <View style={styles.container}>

          {<Button 
              transparent
              style={{color: "#fff"}}
              title={currectID ? 'שמור' : 'חדש'}
              onPress={() => currectID ? this.saveChanges() : this.newEvent()}/>}
  
          {currectID && <Button 
              transparent
              style={{color: "#fff"}}
              title={'Back'}
              onPress={() =>  this.cancel()}/>}


          {currectID === null &&<FlatList 
            data={events}
            renderItem={ ({item,index}) =>{ return <EventItem 
              event={item} 
              onPressed={() => this.onEventSeleced(index) } /> } }
              ListFooterComponent={<View style={styles.footer}></View>} /> }}

          
          {currectID && <EventDetails error={error} event={events[currectID]} /> }

        </View>
      );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: 364,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});

export default EventsList;
