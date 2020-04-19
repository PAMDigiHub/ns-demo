import { Component, OnInit, NgZone } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { RtdbService } from '@src/app/rtdb.service';
import { Call } from '@src/app/call.model';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'app-rtdb',
  templateUrl: './rtdb.component.tns.html',
  styleUrls: ['./rtdb.component.tns.css']
})


export class RtdbComponent implements OnInit {

  items: Observable<any[]>; // 8.4
  data;

  calls: Call[] = [];

  //calls: Observable<Call[]>;
  constructor(
    private rtdbservice: RtdbService

  ) {
    // 8,4
    // this.items = database.list('ns-demo-4dd52').valueChanges();
    //console.log(this.items);

  }

  ngOnInit() {
    /** Il faut subscribe au service pour recevoir les donnees, et les modifications */
    this.rtdbservice.getCalls().subscribe((calls: Call[]) => this.calls = calls);


    console.log("onInit");
  }


  // d/termine si ligne paire ou impaire
  // templateSelector(item, index: number, items: any) {
  //   return index % 2 === 0 ? "red" : "green";
  // }
}
