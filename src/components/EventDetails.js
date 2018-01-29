import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import { isApproved,updateEvent,isAdmin } from '../actions/index';
import AprovedItem from './EventDetails/AprovedItem';
import Pending from './EventDetails/Pending';


const styles = StyleSheet.create({
  form: {
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  fieldStyles: {
    height: 40,
    textAlign: 'right',
    color: MKColor.Blue,
  },
  addButton: {
    marginBottom: 15,
  },
  title: {
    textAlign: 'right',
    fontSize: 15,
    marginTop: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  error: {
    textAlign: 'left',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold',
    color: 'red',
    paddingTop: 5,
    paddingBottom: 5,
  },
  add: {
    marginTop: 30,
  },
  textfieldWithFloatingLabel: {
    height: 48,
    marginTop: 10,
  },
});

const AddButton = MKButton
  .coloredButton()
  .withText('ADD/UPDATE')
  .build();


const TF = MKTextField.textfieldWithFloatingLabel()
  .withStyle(styles.textfieldWithFloatingLabel)
  .withTextInputStyle({ flex: 1, textAlign: 'right' })
  .withTintColor(MKColor.BlueGrey)
  .withFloatingLabelFont({
    fontSize: 10,
    fontStyle: 'italic',
    fontWeight: '200',
    textAlign: 'right'
  })
  .build();

class EventDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      headerRight: params.showSave && <Button 
        transparent
        style={{color: "#fff"}}
        title="Save"
        // size={28}
        onPress={() => params.this_.AddEvent()}/>,

      title: ``,
 

 


      // title: `${params.admin  ? 'עדכן' : 'הצטרף'}`,
    };
  };

  state = {
    event: {
      approved: [],
    }, 
    admin: true,
    error: '',
  };

    AddEvent() {
          updateEvent(
              this.state.event,
              () => this.props.navigation.goBack(),
              () => this.setState({ error: ('נא למלא  מקומות לאירוח*')  }));
    }

  componentDidMount() {

    this.props.navigation.setParams({ 
      this_: this
     })


    // this.AddEvent.bind(this);

    this.setState({
      event: require('../data'),

    });

    const {event} = this.props.navigation.state.params;
    event && 
    this.setState({ event }) ;
  
    event &&
    this.setState({ admin: isAdmin(event) })

    setTimeout((() => {
       if (this.refs.defaultInput) {
         this.refs.defaultInput.focus();
       }
    }), 1000);
  }

  renderTextfield(
    event,
    field, 
    placeholder, 
    showPass = false, 
    defaultInput = ''){
    
    const admin = isAdmin(event);
    const password = showPass &&
                     !admin &&
                     !isApproved(event);
    return (
      <TF
        ref={defaultInput}
        placeholder={placeholder}
        defaultValue={field}
        editable={admin}
        password={password}
        onChangeText={value => field = value}
      />
    )
  }


  render() {
    const {event} = this.state;
    const admin = isAdmin(event);

   return (
      <ScrollView 
        style={styles.form} 
        showsVerticalScrollIndicator={false}>

          {this.renderTextfield(event,event.type, 'סוג/שם האירוע', false,'defaultInput')}
          {this.renderTextfield(event,event.area, 'שכונה ועיר')}
          {this.renderTextfield(event,event.address, 'כתובת מדוייקת של האירוע( יוצג רק למוזמנים שאושרו', true)}
          {this.renderTextfield(event,event.date, 'תאריך ושעה')}
          {this.renderTextfield(event,event.sits, 'מספר מקומות לאירוח')}
          <Text style={styles.error}>{this.state.error}</Text>

          <Text style={styles.title}>מי מביא מה?</Text>
          <FlatList
            data={ event.approved}
            keyExtractor={item => item.name}
          renderItem ={ ({ item, index }) => <AprovedItem admin={admin} pair={item}/> } 

          />
        
          {admin  && event.pending &&
          <Pending pending={event.pending}/> }
          
          {/* {admin &&
          <AddButton
              style={styles.add}
              onPress={() => {
                updateEvent(
                    this.state.event,
                    () => this.props.navigation.goBack(),
                    () => this.setState({ error: ('נא למלא  מקומות לאירוח*')  }));
    
                  ;
              } }
              />
          } */}

      </ScrollView>
    );
  }
}



export default EventDetails;