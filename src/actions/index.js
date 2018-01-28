import firebase from 'firebase';

export const isApproved = (event) => {
    const { currentUser } = firebase.auth()
    
    console.log('isApproved',event ? event.approved[currentUser] != undefined : true);
    return event ? event.approved[currentUser] != undefined : true;
};
 
  
export const isAdmin = (event) => {
    const { currentUser } = firebase.auth()
    
    console.log('isAdmin',event ? currentUser.email == event.email : true);
    
    // event.approved[currentUser]
    return event ? currentUser.email == event.email : true;
};



export const register = (event,item) => {
    const { currentUser } = firebase.auth();

    const data = {}
    
    //todo
    // currentUser.displayName = 'amir mironi';

    data['amir mironi'] = "dsf";

    console.log(event);
    console.log(data);

    firebase.database().ref(`/events/${event.uid}/pending/`).set(data);
};

export const updateMeal = (event ) => {

    // console.log(event);

   firebase.database().ref(`/events/${event.uid}`)
   .set(event);

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

    
    data.remains &&
    firebase.database().ref(`/events/`)
        .push(data)
        .then(() => console.log('Good'))
        .catch((err) => console.log(err));

};


export const deleteMeal = (event,cb) => {

    if(!isAdmin(event))
    {
        alert('אינך מנהל האירוע');
        return;
    }
    
    firebase.database().ref(`/events/${event.uid}`)
        .remove()
        .then(() => {
            console.log('deleteMeal');
            cb();
        });
    
};


export const snapshotToArray = snapshot => {
    const returnArr = [];

    snapshot.forEach(childSnapshot => {
        const item = childSnapshot.val(); 
        item.uid = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};

export const loadInitialMeals = (cb) => {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/events/`)
    .on('value', (snapshot) => cb(snapshotToArray(snapshot)) )
    ;
};
