import { Component, ViewChild, ElementRef } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListService } from '../../app/services/listService';
import { Http } from '@angular/http';
import { InfoPage } from '../info/info';
import { AuthService } from '../../app/services/authService';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
declare var geocoder;

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [ListService]
})
export class ListPage {
  name = "Guest"
  lname = "";
  rentals: any;
  users:any;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public geolocation: Geolocation, private navCtrl: NavController, public auth: AuthService, public listService: ListService, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    let info = this.auth.getUserInfo();
    if(info == undefined)
    {
      this.name;
      this.lname;
    }
    else{

      this.name = info['firstName'];
      this.lname = info['lastName'];

    }
    this.getRentals();
    }

    ionViewDidLoad(){
      this.loadMap();
    }

    loadMap(){
      //geocoder = new google.maps.Geocoder();
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });

  }

  addMarker(){
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
  let content = "<h4>Information!</h4>";
  this.addInfoWindow(marker, content);
}

addInfoWindow(marker, content){
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
}

    getRentals(){
      this.listService.getAllRentals()
      .subscribe(data => {
        this.rentals = data;
      })
    }


  getInfo(rental)
  {
    this.listService.getRental(rental)
      .subscribe(data => {
         rental = data;
        this.navCtrl.push(InfoPage, {rental});
    })
  }

    logout() {
      console.log("logging off");
      this.auth.logout()
      .subscribe(succ => {
        this.navCtrl.setRoot('HomePage');
      });
    }

    getMarkers(){
      this.listService.getAllRentals()
      .subscribe(data => {
        this.addMarkersToMap(data.user.address);
      })
    }

    addMarkersToMap(markers){
      for(let marker of markers)
      {

      }
    }

}
