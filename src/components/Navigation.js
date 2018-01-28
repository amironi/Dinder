import { StackNavigator } from 'react-navigation';
import EventsList from './EventsList';
import CompanyList from './CompanyList';
import EventDetails from './EventDetails';
// import EventEdit from './EventEdit';
// import EventDetails from './EventDetails';


const Navigation = StackNavigator({
    Home: { screen: EventsList },
    EventDetails: { screen: EventDetails },
    // CompanyList: { screen: CompanyList }
    // EventEdit: { screen: EventEdit },
    // EventDetails: { screen: EventDetails },
  });


export default Navigation;