import { Injectable, NgZone } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, AngularFireList } from '@angular/fire/database';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Call } from '@src/app/call.model';


@Injectable({
  providedIn: 'root'
})
export class RtdbService {

  //items: Observable<any[]>; // 8.4


  // private callsCollection: Call[] = [];
  // private callSubject$: BehaviorSubject<Call[]>;

  items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  call$: BehaviorSubject<string | null>;
  items: Observable<any>;
  private callsCollection: Call[] = [];
  private callSubject$: BehaviorSubject<Call[]>;

  itemsRef: AngularFireList<any>;

  constructor(
    private database: AngularFireDatabase,
    private ngZone: NgZone
  ) {


    //this.call$ = new BehaviorSubject(null);

    //this.callSubject$ = new BehaviorSubject(this.callsCollection);

    //this.items = database.list('ns-demo-4dd52').snapshotChanges();
    //console.log(this.items);

    this.itemsRef = database.list('ns-demo-4dd52');
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes => {
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
        console.log("SERVICE constructor this.items = ");
        console.log(this.items);
      })
    );

  }


  getCalls(): Observable<any> {
    //console.log('SERVICE getCalls this.items$ = ');

    //this.items$ = this.database.list('ns-demo-4dd52').snapshotChanges();
    //console.log(this.items);
    //return this.items;
    return this.database.list('ns-demo-4dd52').snapshotChanges();
  }

  getCall(id: string): Observable<Call> {
    //return this.callSubject$.asObservable().pipe(map(calls => calls.filter(value => value.id === id)[0]));
    return;
  }


  createCall(call: Call) {

    // TODO
  }

  updateCall(call: Call) {
    delete call.id;
    //this.firestore.database.ref('calls/' + call.id).update(call);
  }

  deleteCall(callId: string) {
    // this.firestore.doc('calls/' + callId).delete();
    console.log('deleteCall callId = ');
    console.log(callId);
    //this.firestore.list('calls').remove(callId);
  }

}
