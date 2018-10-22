const userList = document.querySelector('#user-list');
const userForm = document.querySelector('#add-user-form');

// Creates element and renders the user-list
function renderUsers(doc){
    let li = document.createElement('li');
    let firstName = document.createElement('span');
    let lastName = document.createElement('span');
    let emailAddress = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    firstName.textContent = doc.data().firstName;
    lastName.textContent = doc.data().lastName;
    emailAddress.textContent = doc.data().emailAddress;
    cross.textContent = 'x';

    li.appendChild(firstName);
    li.appendChild(lastName);
    li.appendChild(emailAddress);
    li.appendChild(cross);

    userList.appendChild(li);

    // Deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('users').doc(id).delete();
    })
}

// Gets data
//db.collection('users').orderBy(lastName).get().then((snapshot)=>{
    //snapshot.docs.forEach(doc => {
        //renderUsers(doc);
    //})
//});

// Gets data - Query
//db.collection('users').where('lastName', '==','Jackson').get().then((snapshot)=>{
    //snapshot.docs.forEach(doc => {
        //renderUsers(doc);
    //})
//});

// Sends Data
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('users').add({
        firstName: userForm.firstName.value,
        lastName: userForm.lastName.value,
        emailAddress: userForm.emailAddress.value
    });

    userForm.firstName.value = '';
    userForm.lastName.value = '';
    userForm.emailAddress.value = '';
});

// real time listener
db.collection('users').orderBy('lastName').onSnapshot(snapshot =>{
   let changes = snapshot.docChanges();
   changes.forEach(change => {
       if(change.type == 'added'){
           renderUsers(change.doc);
       } else if (change.type == 'removed'){
           let li = userList.querySelector('[data-id' + change.doc.id + ']');
           userList.removeChild(li);
       }
   })
})