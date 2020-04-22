import { Component, OnInit, NgZone } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { RtdbService } from '@src/app/rtdb.service';
import { Call } from '@src/app/call.model';
import { RouterExtensions } from 'nativescript-angular/router';
import { ItemEventData } from 'tns-core-modules/ui/list-view/list-view';

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
    private rtdbservice: RtdbService,
    private routerextension: RouterExtensions

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

  onItemTap(event: ItemEventData) {
    /** Lorsqu'un item est selectionné par l'utilisateur, le composant listview nous retourne la position de l'item selectionné.
     * Il faut donc récupérer le Call dans la liste, car nous avons besoin de son id pour le transmettre à la page de détail.
     */
    const item: Call = this.calls[event.index];
    this.routerextension.navigate(['/rtdb-detail/', item.id]);
  }
}
