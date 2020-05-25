import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';

const firebase = require("nativescript-plugin-firebase");

@Injectable({
  providedIn: 'root'
})

/*
* Authentication service
*/
export class AuthService {

  constructor() {

    firebase.init({
      onAuthStateChanged: function (data) { // optional but useful to immediately re-logon the user when they re-visit your app
        console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
        if (data.loggedIn) {
          console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
        }
      }
    });
  }

  authenticate() {
    firebase.login({
      type: firebase.LoginType.GOOGLE,
    }).then(
      function (result) {
        console.log(result);
        JSON.stringify(result);
        return result;
      },
      function (errorMessage) {
        console.log(errorMessage);
        return errorMessage;
      }
    );
    //return;
  }
  // TODO get token for session
  // TODO session expiration and relogin
}
