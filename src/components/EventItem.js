import React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/EvilIcons';
import {deleteMeal,isAdmin, updateMeal, register} from '../actions';
import Swipeout from 'react-native-swipeout';

const theme = getTheme();

const styles = StyleSheet.create({

  card: {
    marginTop: 20,
  },
  title: {
      top: 20,
      left: 80,
      fontSize: 24,
  },
  image: {
      height: 100,
  },
  action: {
      backgroundColor: 'black',
      color: 'white',
  },
  icon: {
      position: 'absolute',
      top: 15,
      left: 0,
      color: 'white',
      backgroundColor: 'rgba(255,255,255,0)',
  },
});

// const SwipeoutWithPer = (event) => {

const EventItem = (event) => {

    console.log(event);

    const swipeBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        // underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
        onPress: () => { deleteMeal(event) }
      }];

    return (


        <Swipeout 
            style={[theme.cardStyle, styles.card]}
            right={swipeBtns}
            autoClose={true}
            backgroundColor= 'transparent'>
            <TouchableWithoutFeedback 
            // style={[theme.cardStyle, styles.card]}
                onPress={() => {
                    console.log(event);

                    const props  = {    
                        event : event.event,
                        uid : event.uid,
                        admin : isAdmin(event.event),
                        title : isAdmin(event.event) ? 'עדכן' : 'הצטרף',
                        action: isAdmin(event.event) ? 
                                    updateMeal : 
                                    register
                    };

                    event.navigation.navigate( 'EventNew',props );
                }}>
            
                <View>
                    {/* style={[theme.cardStyle, styles.card]}> */}
                    <Image
                        source={require('../images/background.jpg')}
                        style={[theme.cardImageStyle, styles.image]}
                    />
                    <Icon
                        name={'user'}
                        size={100} 
                        style={styles.icon}
                    />
                    <Text style={[theme.cardTitleStyle, styles.title]}>{event.type} : האירוע</Text>
                    <Text style={[theme.cardTitleStyle, styles.title]}>{event.area} : באיזור</Text>
                    <Text style={[theme.cardTitleStyle, styles.title]}>{event.date} : במועד</Text>
                    <Text style={[theme.cardTitleStyle, styles.title]}>{event.remains} : מספר המקומות שנותרו</Text>
                        {/* <Text style={[theme.cardActionStyle, styles.action]}>{props.people.company}</Text> */}
                </View>
            </TouchableWithoutFeedback>
        </Swipeout>
    );
};

export default EventItem;