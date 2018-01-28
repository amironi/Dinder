import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import { isApproved } from '../actions/index';

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

  renderAprovedItem({name,item}) {
    
    const admin = isAdmin(this.state.event);

    const MTF = MKTextField
      // .textfieldWithFloatingLabel()
      // .withStyle({})
      .withEditable(admin)
      .withTextInputStyle({ textAlign: 'right' })
      .withTintColor(MKColor.BlueGrey)
      .build();

    return(
      <View>
        <MTF
          defaultValue={name}
          onChangeText={value => name = value } />

        <MTF
          defaultValue={item}
          onChangeText={value => item = value } />
      </View>
      )
    }

  renderPending(pending) {
    const admin = isAdmin(this.state.event);

    if(!admin || !pending ) return( <View/> )

    const MTF = MKTextField
      .withEditable(admin)
      .withTextInputStyle({ textAlign: 'right' })
      .withTintColor(MKColor.BlueGrey)
      .build();
  
    return (
      <View>
        <Text style={styles.title}>רשימת ממתינים לאישור</Text>
        <FlatList
          data={ pending }
          renderItem={({item}) => { 
              return<MTF defaultValue={item} onChangeText={value => {item = value }} />}}
        />  
      </View>
    )
  }

  renderTextfieldWithFloatingLabel(
    data, 
    ph, 
    showPass = false, 
    defaultInput = ''){
    
    const admin = isAdmin(event);
    const password = showPass &&
                     !admin &&
                     !isApproved(event);

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
    const {event} =  this.state;

   return (
      <ScrollView 
        style={styles.form} 
        showsVerticalScrollIndicator={false}>

          {renderTextfieldWithFloatingLabel(event.type, 'סוג/שם האירוע', false,'defaultInput')}
          {renderTextfieldWithFloatingLabel(event.area, 'שכונה ועיר')}
          {renderTextfieldWithFloatingLabel(event.address, 'כתובת מדוייקת של האירוע( יוצג רק למוזמנים שאושרו', true)}
          {renderTextfieldWithFloatingLabel(event.date, 'תאריך ושעה')}
          {renderTextfieldWithFloatingLabel(event.sits, 'מספר מקומות לאירוח')}
           
          <Text style={styles.error}>{this.state.error}</Text>
          <Text style={styles.title}>מי מביא מה?</Text>

          <FlatList
            data={ event.approved }
            renderItem ={item => {this.renderAprovedItem(item) }}
          />
        
          {this.renderPending()}
          
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