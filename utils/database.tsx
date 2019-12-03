import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCCaCtnCTXrAd_VhUYUrdF3mCPK3u1NetM",
    authDomain: "toeat-fdbbc.firebaseapp.com",
    databaseURL: "https://toeat-fdbbc.firebaseio.com",
    projectId: "toeat-fdbbc",
    storageBucket: "toeat-fdbbc.appspot.com",
    messagingSenderId: "647553049301",
    appId: "1:647553049301:web:bbf86790ca53b0503bb85c"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

export function storeHighScore(userId, score) {
    firebase.database().ref('users/' + userId).set({
        highscore: score
    });
}

export default database;