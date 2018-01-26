/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, ListView, TouchableOpacity, Image } from 'react-native';
import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import _ from 'lodash';
import EventItem from './EventItem';
import Icon from 'react-native-vector-icons/EvilIcons';
import { createNewMeal, loadInitialMeals } from '../actions';


// const AddButton = MKButton.coloredButton()
//   .withText('ADD')
//   .build();

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
    marginBottom: 30,
   size : 20
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
      state = {
        data : {1:'f'}
      }
    componentWillMount() {
      // this.props.people = ['fdfsd'];

      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      });
  
      this.dataSource = ds.cloneWithRows(this.state.data);

      loadInitialMeals( (data) =>{

        _.map(data, (val, uid) => {    
            
            // const data = { ...val, uid};
              //  console.log(data);  
     //         this.setState({data: [...this.state.data, data]} );
              this.setState({data: val} );
            } );
         console.log(this.state.data);  
          // this.setState({data})
      } );


             
  //     

  // });

    }

  // renderInitialView() {
    

  //   if (this.props.detailView === true) {
  //     return (
  //       <PeopleDetail />
  //     );
  //   } else {
  //     return (
        
  //     );
  //   }


    
  // }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.EventItem}>
           <ListView 
            enableEmptySections={true}
            dataSource={this.dataSource}
            renderRow={
              (rowData) =>{ <EventItem people={rowData} /> } }/> 

          {/* <EventItem people={this.state.data}/> */}
        </View>

        <View style={styles.add_button}>
            <MKButton
              test = '+'
              onPress={ () => {this.props.navigation.navigate('EventNew',
              {
                title = 'הוסף ארוחה חדשה',
                action = createNewMeal
              })}}/>
        </View>
{/* 
        <TouchableOpacity
                onPress={() => { this.props.navigation.navigate('EventNew')}}>
                <Image source={require('../images/add_button.png')} style={styles.add_button}/>
        </TouchableOpacity> */}

      </View>
    );
  }
}

// const mapStateToProps = state => {
//   const people = _.map(state.people, (val, uid) => {
//     return { ...val, uid};
//   });

//   return { 
//     people,
//     detailView: state.detailView,
//  };
// };

export default EventsList;
