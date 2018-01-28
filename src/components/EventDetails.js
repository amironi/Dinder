import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import { isApproved } from '../actions/index';
import { AprovedItem } from './EventDetails/AprovedItem'
import { Pending } from './EventDetails/Pending'

const AddButton = MKButton
  .coloredButton()
  .withText('ADD/UPDATE')
  .build();

class EventDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: `${params.admin  ? 'עדכן' : 'הצטרף'}`,
    };
  };

  list_items = require('../data');

  state = {
    error = "",
    event: {
      approved: list_items,
    },
  };

  componentDidMount() {

    console.log('EventDetails::componentDidMount', this.props);

    this.setState({
        event: this.props.navigation.state.params.event
    });
  
    setTimeout((() => {
       if (this.refs.defaultInput) {
         this.refs.defaultInput.focus();
       }
    }), 1000);
  }


  renderTextfield(
    data, 
    ph, 
    showPass = false, 
    defaultInput = ''){
    
    const admin = isAdmin(event);
    const password = showPass &&
                     !admin &&
                     !isApproved(event);


   const TextfieldWithFloatingLabel = MKTextField
    .textfieldWithFloatingLabel()
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

    return 
      <TextfieldWithFloatingLabel
        ref={defaultInput}
        placeholder={ph}
        defaultValue={data}
        editable={admin}
        password={password}
        onChangeText={value => data = value}
      />
  }

  render() {
    const {event} = this.state;

   return (
      <ScrollView 
        style={styles.form} 
        showsVerticalScrollIndicator={false}>

          {renderTextfield(event.type, 'סוג/שם האירוע', false,'defaultInput')}
          {renderTextfield(event.area, 'שכונה ועיר')}
          {renderTextfield(event.address, 'כתובת מדוייקת של האירוע( יוצג רק למוזמנים שאושרו', true)}
          {renderTextfield(event.date, 'תאריך ושעה')}
          {renderTextfield(event.sits, 'מספר מקומות לאירוח')}
           
          <Text style={styles.error}>{this.state.error}</Text>
          <Text style={styles.title}>מי מביא מה?</Text>

          <FlatList
            data={ event.approved }
            renderItem ={item => <AprovedItem admin={admin} pair={item}/> }
          />
        
          <Pending admin={admin} pending={event.pending}/>
          
          <AddButton
            style={styles.add}
            onPress={() => {

              const {event} =  this.state;
              if(!event.sits ) 
                  this.setState({ error: ('נא למלא  מקומות לאירוח*')  }) ;
              else {
                isAdmin(event) ? updateMeal(event) : register(event);
            
                this.props.navigation.goBack();
              }
            } }
            />

      </ScrollView>
    );
  }
}


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

export default EventDetails;