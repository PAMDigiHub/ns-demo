// https://www.npmjs.com/package/nativescript-google-maps-sdk
// https://github.com/dapriett/nativescript-google-maps-sdk#readme

import { Component, OnInit } from '@angular/core';

import { Call } from '@src/app/call.model';
import { RtdbService } from '@src/app/rtdb.service';
import { RouterExtensions } from 'nativescript-angular/router';

import { MapView, Marker, Position } from 'nativescript-google-maps-sdk';
import { registerElement } from 'nativescript-angular/element-registry';


// Important - must register MapView plugin in order to use in Angular templates
registerElement('MapView', () => MapView);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  calls: Call[] = [];
  latitude = 46.343460;
  longitude = -72.543600;
  zoom = 8;
  minZoom = 0;
  maxZoom = 22;
  bearing = 0;
  tilt = 0;
  padding = [40, 40, 40, 40];
  mapView: MapView;

  lastCamera: String;
  // calls: Call[];
  //calls: Call[] = [];


  constructor(
    private rtdbservice: RtdbService,
    private routerextension: RouterExtensions

  ) {

  }

  ngOnInit() {
    /** Il faut subscribe au service pour recevoir les donnees, et les modifications */
    // this.rtdbservice.getCalls().subscribe((calls: Call[]) => this.calls = calls);


    // console.log("onInit");
  }

  onMapReady(event) {
    this.mapView = event.object;
    this.rtdbservice.getCalls().subscribe(
      (calls) => {
        // console.log('in subscribe');
        //console.log(value);
        // ajouter dans le array les valeurs recues du serveur pour pouvoir retrouver les infos
        this.calls = calls;
        //console.log(calls);

        this.updateMap(this.calls);

      }
    );
  }
  updateMap(calls: any[]) {
    //On clear la map et on recrée tout a chaque fois que la liste de call change (facon simple mais peu performante).
    //if (this.mapView) {
    this.mapView.clear();
    //}
    //console.log("this.mapView");
    //console.log(this.mapView);

    // creer le array de markers
    calls.forEach(call => {
      // console.log("onMapReady Setting a marker...");
      // console.log("-------------");

      // console.log(call.loc.address);
      // console.log(call.loc.lat);
      // console.log(call.loc.long);

      this.addMarker(call);
    });
  }

  addMarker(call: Call) {
    // console.log("addMarker Setting a marker...");

    // console.log("-------------");
    //console.log(call);

    const marker = new Marker();
    marker.position = Position.positionFromLatLng(call.loc.lat, call.loc.long);
    //marker.position = Position.positionFromLatLng(-33.86, 151.20);
    marker.title = call.loc.address;
    // marker.snippet = "Australia";
    // marker.userData = { index: 1 };
    this.mapView.addMarker(marker);



  }
  onCoordinateTapped(args) {
    console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
  }

  onMarkerEvent(args) {
    console.log("Marker Event: '" + args.eventName
      + "' triggered on: " + args.marker.title
      + ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
  }

  onCameraChanged(args) {
    //console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
    this.lastCamera = JSON.stringify(args.camera);
  }

  onCameraMove() {
    //console.log("Camera moving: " + JSON.stringify(args.camera));
  }

}

