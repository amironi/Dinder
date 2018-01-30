import React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/EvilIcons';
import {deleteMeal,isAdmin} from '../actions';

const theme = getTheme();

const EventItem = ({event,onPressed}) => {

    
    const isAdmin = isAdmin(event);
    
    const swipeBtns = [{
        text: 'Delete',
        backgroundColor: 'red',
        onPress: () => deleteMeal(event) 
      }];
        //TODO : add  number of pending
    return (
        <View>
        {isAdmin && <Swipeout 
            style={[theme.cardStyle, styles.card]}
            right={swipeBtns}
            autoClose={true}
            backgroundColor= 'transparent'> }
            <TouchableWithoutFeedback onPress={() => { onPressed() }  }>
                <View>
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
                </View>
            </TouchableWithoutFeedback>
            {isAdmin && </Swipeout>}
        </View>
    );
};

const styles = StyleSheet.create({
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

  
export default EventItem;