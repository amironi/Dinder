import { StackNavigator } from 'react-navigation';
import EventsList from './EventsList';
import CompanyList from './CompanyList';
// import EventNew from './EventNew';
// import EventEdit from './EventEdit';
// import EventDetails from './EventDetails';


const Navigation = StackNavigator({
    Home: { screen: EventsList },
    EventNew: { screen: EventNew },
    // CompanyList: { screen: CompanyList }
    // EventEdit: { screen: EventEdit },
    // EventDetails: { screen: EventDetails },
  });


export default Navigation;