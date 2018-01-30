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
    admin: true,
    error: '',
  };

    AddEvent() {
          updateEvent(
              this.state.event,
              () => this.props.navigation.goBack(),
              () => this.setState({ error: ('נא למלא  מקומות לאירוח*')  }));
    }
//TODO realtime update
  update(event)
  {
    this.setState({ event })
  }
  componentWillMount() {

    this.props.navigation.setParams({ 
      this_: this
     })

    const {event,showSave} = this.props.navigation.state.params;
    
    this.setState({ 
      event: event,
      admin: showSave
     })

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
    
    // console.log(event)

    const {admin} = this.state;
    const password = showPass &&
                     !admin &&
                     !isApproved(event);
    return (
      <TF
        ref={defaultInput}
        placeholder={placeholder}
        defaultValue={event[field]}
        editable={admin}
        password={password}
        onChangeText={value => event[field] = value }
      />
    )
  }

  render() {
    const {event,admin} = this.state;

   return (
      // <Button 
      // transparent
      // style={{color: "#fff"}}
      // title="Save"
      // // size={28}
      // onPress={() => params.this_.AddEvent()}/>
      
      <ScrollView 
        style={styles.form} 
        showsVerticalScrollIndicator={false}>

          {this.renderTextfield(event,'type', 'סוג/שם האירוע', false,'defaultInput')}
          {this.renderTextfield(event,'area', 'שכונה ועיר')}
          {this.renderTextfield(event,'address', 'כתובת מדוייקת של האירוע( יוצג רק למוזמנים שאושרו', true)}
          {this.renderTextfield(event,'date', 'תאריך ושעה')}
          {this.renderTextfield(event,'sits', 'מספר מקומות לאירוח')}
          <Text style={styles.error}>{this.state.error}</Text>

          <Text style={styles.title}>מי מביא מה?</Text>
          <FlatList
            data={ event.approved}
            renderItem ={ ({ item, index }) => <AprovedItem admin={admin} pair={item}/> } 

          />
        
          {admin  && event.pending &&
          <Pending pending={event.pending}/> }

      </ScrollView>
    );
  }
}



export default EventDetails;