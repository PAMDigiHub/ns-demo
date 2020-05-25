import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

// references: 
// https://github.com/EddyVerbruggen/nativescript-plugin-firebase/blob/master/docs/AUTHENTICATION.md
// https://github.com/EddyVerbruggen/nativescript-plugin-firebase/blob/master/docs/AUTHENTICATION.md#google-sign-in
export class AuthenticationComponent implements OnInit {

  user;

  constructor(
    private authservice: AuthService
  ) { }

  ngOnInit() {
    // this.authservice.authenticate().subscribe((usr => {
    //   this.user = usr;
    //   console.log(usr);
    // }));
    const test = this.authservice.authenticate();
    // test.subscribe(usr => {
    //console.log(usr);
    // });

    console.log("onInit");
    console.log(test);

  }

}
