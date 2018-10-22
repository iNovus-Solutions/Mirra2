var app_fireBase = {};
    (function(){
                // Initialize Firebase
                var config = {
                    apiKey: "AIzaSyAoZFXDF2H_JMT6snHWx7ydlq-xBc4iSXU",
                    authDomain: "mirra2-a36ed.firebaseapp.com",
                    databaseURL: "https://mirra2-a36ed.firebaseio.com",
                    projectId: "mirra2-a36ed",
                    storageBucket: "mirra2-a36ed.appspot.com",
                    messagingSenderId: "506923401907"
                };
                
                firebase.initializeApp(config);
                app_fireBase = firebase
                const db = firebase.firestore();
                db.settings({timestampsInSnapshots: true});
})()