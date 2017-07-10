import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListService } from '../../app/services/listService';
import { Http } from '@angular/http';
import { InfoPage } from '../info/info';
import { AuthService } from '../../app/services/authService';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

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
  @ViewChild('map') mapElement: ElementRef;
  users = {
    address: '',
    city: '',
    state: '',
    zipcode: ''
  }
  allow: boolean;
  map: any;

  constructor(public geolocation: Geolocation,
    private navCtrl: NavController,
    public auth: AuthService,
    public listService: ListService,
    public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    let info = this.auth.getUserInfo();
    if (info == undefined) {
      this.name;
      this.lname;
    }
    else {

      this.name = info['firstName'];
      this.lname = info['lastName'];

    }
    this.getRentals();
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        animation: google.maps.Animation.DROP,

      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.myMarker(latLng, "You are here");
    }, (err) => {
      console.log(err);
    });

  }

  show()
  {
    this.allow = true;
  }

  getAllMarkers(markers) {
    for(let marker of markers)
    {
      this.getLtLng(marker);
    }
  }

  getLtLng(marker)
  {
    var address = marker.user.address + ", " + marker.user.city + " " + marker.user.zipcode;
    this.listService.codeAddress(address).forEach(
      (results: any) => {
        let zipCode = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        this.myMarker(zipCode, marker.title);
      }
    );
  }

  getRentals() {
    this.listService.getAllRentals()
      .subscribe(data => {
        this.rentals = data;
        this.getAllMarkers(data);
      })
  }


  getInfo(rental) {
    this.listService.getRental(rental)
      .subscribe(data => {
        rental = data;
        this.navCtrl.push(InfoPage, { rental });
      });
  }

  logout() {
    console.log("logging off");
    this.auth.logout()
      .subscribe(succ => {
        this.navCtrl.setRoot('HomePage');
      });
  }


  myMarker(position, title) {

    var rentalMarker = new google.maps.Marker({
      optimized: false,
      position: position
    });
    rentalMarker.setMap(this.map);
    let content = title;
    this.addInfoWindow(rentalMarker, title);
  }

  addInfoWindow(marker, content){
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
}


}
