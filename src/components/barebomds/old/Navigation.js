import { StackNavigator } from 'react-navigation';
import EventsList from './EventsList';
import EventDetails from './EventDetails';



const Navigation = StackNavigator({
    Home: { screen: EventsList },
    EventDetails: { screen: EventDetails },
  });


export default Navigation;