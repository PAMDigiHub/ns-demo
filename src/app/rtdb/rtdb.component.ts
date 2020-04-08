import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-rtdb',
  templateUrl: './rtdb.component.html',
  styleUrls: ['./rtdb.component.css']
})
export class RtdbComponent implements OnInit {

  items: Observable<any[]>;

  constructor(database: AngularFireDatabase) {
    this.items = database.list('ns-demo-4dd52').valueChanges();
    console.log(this.items);
  }

  ngOnInit() {
  }

}
