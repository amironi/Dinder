import firebase from 'firebase';

export const isApproved = (event) => {
    const { currentUser } = firebase.auth()
    
    console.log('isApproved',event ? event.approved[currentUser] != undefined : true);
    return event ? event.approved[currentUser] != undefined : true;
};
 
  
export const isAdmin = (event) => {
    const { currentUser } = firebase.auth()
    
    // console.log('isAdmin', event,
    // currentUser.email == 
    // (event.email ? event.email : currentUser.email));
    
    // event.approved[currentUser]
    return currentUser.email == 
    (event.email ? event.email : currentUser.email);
};



export const register = (event,item) => {
    const { currentUser } = firebase.auth();

    const data = {}
    
    //todo
    // currentUser.displayName = 'amir mironi';

    data['amir mironi'] = "dsf";

    console.log(event);
    console.log(data);

    firebase.database().ref(`/events/${event.key}/pending/`).set(data);
};

export const updateEvent = (event,ok, err ) => {

    // console.log(event);


   if (!event.sits ) {
        err()
       return;
   }

   if (!event.key ) {
        newEvent(event)
        ok();
        return;
    }

   firebase.database().ref(`/events/${event.key}`)
   .set(event);
   
   ok();
   // .then(() => {
   //     ;
   // });
};

export const newEvent = (event) => {
    const { currentUser } = firebase.auth();
    console.log(event);
    
    event.admin = currentUser.displayName; //todo
    event.email = currentUser.email;
    event.remains = event.sits;

    
    event.remains &&
    firebase.database().ref(`/events/`)
        .push(event)
        .then(() => console.log('Good'))
        .catch((err) => console.log(err));

};


export const deleteMeal = (event,cb) => {

    if(!isAdmin(event))
    {
        alert('אינך מנהל האירוע');
        return;
    }
    
    firebase.database().ref(`/events/${event.key}`)
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
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};

export const loadInitialEvents = (cb) => {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/events/`)
    .on('value', (snapshot) => cb(snapshotToArray(snapshot)) )
    ;
};
