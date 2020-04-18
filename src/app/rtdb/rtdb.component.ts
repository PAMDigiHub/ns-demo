import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { RtdbService } from '../rtdb.service';
import { Call } from '../call.model';

@Component({
  selector: 'app-rtdb',
  templateUrl: './rtdb.component.html',
  styleUrls: ['./rtdb.component.css']
})
export class RtdbComponent implements OnInit {

  //items: Observable<any[]>; // 8.4

  calls: Call[] = [];

  //calls: Observable<Call[]>;
  constructor(
    // database: AngularFireDatabase, // 8.4
    private rtdbservice: RtdbService
  ) {
    // 8,4
    // this.items = database.list('ns-demo-4dd52').valueChanges();
    // console.log(this.items);
  }

  ngOnInit() {
    /** Il faut subscribe au service pour recevoir les donnees, et les modifications */
    // this.rtdbservice.getCalls().subscribe((calls) => {
    //   this.calls = calls;
    //   console.log("FIREBASE onInit calls = ");
    //   console.log(this.calls);
    // });

    console.log("onInit");
  }

  ngAfterViewInit() {
    this.rtdbservice.getCalls().subscribe((calls) => {
      this.calls = calls;
      console.log("FIREBASE onInit calls = ");
      console.log(this.calls);
    });
  }

  // d/termine si ligne paire ou impaire
  // templateSelector(item, index: number, items: any) {
  //   return index % 2 === 0 ? "red" : "green";
  // }
}
