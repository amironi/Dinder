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
      index && this.setState({ prevEvents:  Object.assign({},  this.state.events)} )

      this.setState({currectID = index } );
    }

    save(){
      updateEvent(
        events[currectID]),
        () => {},
        () => this.setState({ error: ('נא למלא  מקומות לאירוח*')  } )
    }

    cancel(){
      this.setState({ events: this.state.prevEvents} )
    }

    newEvent(){
      this.onEventSeleced( 
        this.state.events.push({ food: require('../data') }) -1);
    }

    back(){
      this.setState({currectID = null } );
    }

    render() {
      
      const {currectID,events,error,prevEvents} = this.state;

      return (
        <View style={styles.container}>

        {!currectID && <Button transparent style={{color: "#fff"}}
              title={'חדש'}
              onPress={() => this.newEvent()}/>}
        
        {currectID && <Button transparent style={{color: "#fff"}}
              title={prevEvents === events ? 'Save' : 'Cancel'}
              onPress={() => prevEvents === events ? this.save() : this.cancel()}/>}
  
          {currectID && <Button transparent style={{color: "#fff"}}
              title={'<Back'}
              onPress={() => this.back()}/>}

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
