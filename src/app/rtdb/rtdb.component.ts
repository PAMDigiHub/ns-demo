import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { RtdbService } from '../rtdb.service';

@Component({
  selector: 'app-rtdb',
  templateUrl: './rtdb.component.html',
  styleUrls: ['./rtdb.component.css']
})
export class RtdbComponent implements OnInit {

  items: Observable<any[]>;

  constructor(
    database: AngularFireDatabase,
    rtdbservice: RtdbService
  ) {
    this.items = database.list('ns-demo-4dd52').valueChanges();
    console.log(this.items);
  }

  ngOnInit() {
  }

  // d/termine si ligne paire ou impaire
  templateSelector(item, index: number, items: any) {
    return index % 2 === 0 ? "red" : "green";
  }
}
