import React from 'react';
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/EvilIcons';
import {isAdmin, updateMeal} from '../actions';

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

const EventItem = (event) => {

    return (
        <TouchableWithoutFeedback 
            onPress={() => {
                const props  = {
                    event : event,
                    title : isAdmin(event) ? 'עדכן' : 'הרשם',
                    action: isAdmin(event) ? 
                                updateMeal : 
                                register
                };

                this.props.navigation.navigate( 'EventNew',props );
            }}>
        
            <View style={[theme.cardStyle, styles.card]}>
                <Image
                    source={{ uri: '../images/background.jpg'}}
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
    );
};

export default EventItem;