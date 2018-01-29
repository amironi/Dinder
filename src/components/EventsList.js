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
      onPress={() => navigation.navigate( 'EventDetails',{
        event: require('../data'),
        showSave: true})}/>,
    title: ''
      })

    state = {
        events: [] 
    };
    
    componentDidMount() {
      loadInitialEvents( (events) => this.setState({events}))
    }

    render() {
      return (
        <View style={styles.container}>
          <FlatList 
            data={this.state.events}
            renderItem={ ({item,index}) =>{ return <EventItem 
              event={item} 
              index={index} 
              navigate={this.props.navigation.navigate} /> } }
            ListFooterComponent={<View style={styles.footer}></View>} /> 
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
