import { Injectable, NgZone } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Call } from '@src/app/call.model';

const firebase = require('nativescript-plugin-firebase');

@Injectable({
  providedIn: 'root'
})
export class RtdbService {

  private callsCollection: Call[] = [];
  private callSubject$: BehaviorSubject<Call[]>;

  constructor(
    //private firestore: AngularFireDatabase,
    private ngZone: NgZone
  ) {
    /** Le BehaviorSubject sera utilisé pour émettre les Calls qui sont mis à jour par Firebase
     *  le BehaviorSubject nous offre la possibilité d'émettre la liste immédiatement lors d'un Subscribe
     */
    this.callSubject$ = new BehaviorSubject(this.callsCollection);

    firebase.init({
      // Optionally pass in properties for database, authentication and cloud messaging,
      // see their respective docs.
    }).then(
      () => {
        console.log('firebase.init done');
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    );

    /** Cette fonction est appelée chaque fois qu'il y a un changement dans la liste de Call de Firebase */
    const onChildEvent = (change) => {
      console.log(change)
      const newCalls = [];
      Object.keys(change.value).forEach((key) => {
        const call: Call = Object.assign({}, { id: key, ...change.value[key] });
        newCalls.push(call);
      },
      );
      this.callsCollection = newCalls;

      /**
       * La librairie Firebase que nous utilisons n'est pas une librairie Angular. Elle s'éxécute donc hors de la Zone utilisée par Angular.
       * Le mécanisme de détection des changements d'Angular n'est donc pas notifié du changement que nous voulons déclancher lorsque nous
       * émettons une nouvelle liste de Call. Nous devons forcer la détection des changements.
       *
       * Plus d'informations : https://angular.io/guide/zone
       */
      this.ngZone.run(() => {
        this.callSubject$.next(newCalls);
      });
    };

    /**
     * Ajoute un listener dans Firebase qui nous permet d'écouter les changements dans la liste de Call.
     * La méthode onChildEvent sera exécutée avec comme entrée un objet représentant le changement.
     */
    firebase.addValueEventListener(onChildEvent, 'calls');
  }


  getCalls(): Observable<Call[]> {
    return this.callSubject$.asObservable();
  }

  getCall(id: string): Observable<Call> {
    return this.callSubject$.asObservable().pipe(map(calls => calls.filter(value => value.id === id)[0]));
  }


  createCall() {

    // TODO
  }

  updateCall(call: Call) {
    //delete call.id;
    // this.firestore.database.ref('calls/' + call.id).update(call);
    firebase.update(
      '/calls',
      { call: call }
    );
  }

  deleteCall(callId: string) {
    // en theorie aucun call n'est jamais efface, ils sont tous gardes pour archivage

    // pour firestore pas rtdb
    // this.firestore.doc('calls/' + callId).delete();
    // this.firestore.list('calls').remove(callId);
  }

  addCall(call: Call) {
    firebase.push(
      'calls',
      call
    ).then(
      function (result) {
        console.log("created key: " + result.key);
      }
    );
  }
}
