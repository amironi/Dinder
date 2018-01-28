/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity,ListFooterComponent, Image } from 'react-native';
import { MKTextField, MKColor, MKButton, getTheme} from 'react-native-material-kit';
import _ from 'lodash';
import EventItem from './EventItem';
import Icon from 'react-native-vector-icons/EvilIcons';
import { createNewMeal, loadInitialEvents } from '../actions';


const AddButton = MKButton
  .coloredButton()
  .withText('ADD')
  .build();

class EventsList extends Component {
   
  static navigationOptions = {
        title: "דינדר"
      }

    state = {
        events: [] 
    };
    
    componentDidMount() {
      loadInitialEvents( (events) => this.setState({events}))
    }

    onPress(event) {
      this.props.navigation.navigate( 'EventDetails', event )
    }

    render() {
 
      return (
        <View style={styles.container}>
          <FlatList 
            data={this.state.events}
            renderItem={ (event) =>{ return <EventItem event={event} onPress={this.onPress(event)} /> } }
            ListFooterComponent={<View style={styles.footer}></View>} /> 
          
          <AddButton 
            style={styles.add_button}
            onPress={ () => this.onPress({}) }/>
        </View>
      );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  EventItem: {
    width: 353,
  },
  footer: {
    height: 150,
  },
  add_button: {
     width: 353,
     marginBottom: 100
  },

});

export default EventsList;
