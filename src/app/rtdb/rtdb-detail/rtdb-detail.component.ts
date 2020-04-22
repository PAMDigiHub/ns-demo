import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Call } from '@src/app/call.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { RtdbService } from '@src/app/rtdb.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-rtdb-detail',
  templateUrl: './rtdb-detail.component.html',
  styleUrls: ['./rtdb-detail.component.css']
})
export class RtdbDetailComponent implements OnInit {

  call$: Observable<Call>;
  selectedCall: Call;

  constructor(
    private route: ActivatedRoute,
    private callservice: RtdbService

  ) { }

  ngOnInit() {

    /** Ici nous transformons l'Observable de paramètres de route (ParamMap) en Observable de Call
     * Le id de la route sera utilisé pour récupérer le bon Call. ( params.get )
     * L'Observable<Call> que nous donne callservice sera retourné à l'opérateur rxJs "switchMap" pour qu'il effectue la tranformation.
     */
    this.call$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.callservice.getCall(params.get('id')))
    );

    /** Nous avons maintenant notre Observable<Call>.
     * Il faut donc subscribe notre Observable pour mettre à jour la variable qui sera utilisée par notre Template.
     */
    this.call$.subscribe((value: Call) => {
      this.selectedCall = value;
    });

  }

}
