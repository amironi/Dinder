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
   

  static navigationOptions = ({navigation}) => ({
    headerRight: <Button 
      transparent
      style={{color: "#fff"}}
      title="הוסף אירוע"
      // size={28}
      onPress={() => navigation.navigate( 'EventDetails',{showSave: true})}/>,
    title: ''
      })

    state = {
        events: [] 
    };
    
    componentDidMount() {
      loadInitialEvents( (events) => this.setState({events}))
    }

    onPress(event) {
       this.props.navigation.navigate( 'EventDetails', {
          showSave: isAdmin(event),
          event: event
          } )
    }

    render() {
 
      return (
        <View style={styles.container}>
          <FlatList 
            data={this.state.events}
            renderItem={ (event) =>{ return <EventItem event={event} onPress={() => this.onPress(event)} /> } }
            ListFooterComponent={<View style={styles.footer}></View>} /> 
        </View>
      );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

});

export default EventsList;
