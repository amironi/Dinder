import firebase from 'firebase';
// import { Alert } from 'react-native';

export const selectPerson = (peopleId) => {
    return {
        type: 'SELECTED_PERSON',
        payload: peopleId,
    };
};

export const noneSelected = () => {
    return {
        type: 'NONE_SELECTED',
    };
};

export const formUpdate = ({ prop, value }) => {
    return {
        type: 'FORM_UPDATE',
        payload: { prop, value },
    };
};


export const isAdmin = (event) => {

    return firebase.auth().email === event.email;
};


export const register = (event) => {
    const { currentUser } = firebase.auth();

//   event.wait = [...event.wait, currentUser ];

   firebase.database().ref(`/events/${event.uid}`)
   .set(data);
};

export const updateMeal = (data ) => {

   firebase.database().ref(`/events/${event.uid}`)
   .set(data);

   // .then(() => {
   //     ;
   // });
};

export const createNewMeal = (data) => {
    const { currentUser } = firebase.auth();
    console.log(data);
    
    data.admin = currentUser.displayName; //todo
    data.email = currentUser.email;
    data.remains = data.sits;

    firebase.database().ref(`/events/`)
        .push(data)
        .then(() => console.log('Good'))
        .catch((err) => console.log(err));

};


export const deleteMeal = (uid,cb) => {
    const { currentUser } = firebase.auth();

         firebase.database().ref(`/events/${uid}`)
        .remove()
        .then(() => {
            cb();
        });
};

export const loadInitialMeals = (cb) => {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/events/`)
    .on('value', snapshot => cb(snapshot.val()) );
    
};



export const createNewContact = ({ first_name, last_name, phone, email, company, project, notes }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/events/${currentUser.uid}/people`)
        .push({ first_name, last_name, phone, email, company, project, notes })
        .then(() => {
            dispatch({ type: 'NEW_CONTACT' });
        });
    };
};

// export const loadInitialContacts = () => {
//     const { currentUser } = firebase.auth();

//     return (dispatch) => {
//         firebase.database().ref(`/events/${currentUser.uid}/people`)
//         .on('value', snapshot => {
//             dispatch({ type: 'INITIAL_FETCH', payload: snapshot.val() });
//         });
//     };
// };


export const deleteContact = (uid) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/events/${currentUser.uid}/people/${uid}`)
        .remove()
        .then(() => {
            dispatch({ type: 'DELETE_CONTACT'});
        });
    };
};

export const updateContact = (personSelected) => {
    return {
        type: 'UPDATE_CONTACT',
        payload: personSelected,
    };
};

export const saveContact = ({ first_name, last_name, phone, email, company, project, notes, uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/events/${currentUser.uid}/people/${uid}`)
        .set({ first_name, last_name, phone, email, company, project, notes, uid })
        .then(() => {
            dispatch({ type: 'SAVE_CONTACT'});
        });
    };
}