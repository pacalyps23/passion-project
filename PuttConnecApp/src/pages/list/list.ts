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
    //this.getUsers();
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((position) => {
      //let address = new google.maps.LatLng(lat, lng);
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 5,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        animation: google.maps.Animation.DROP

      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }, (err) => {
      console.log(err);
    });

  }

  postMarker(data)
  {
    console.log(data);
    let zipCode = new google.maps.LatLng(39.749391, -75.561390);
    this.myMarker(zipCode);//working marker
    this.myMarker(data);
  }

  getUsers() {
    this.listService.getAllUsers()
      .subscribe(data => {
        console.log(data);
        this.getAllMarkers(data);
      })
  }

  getAllMarkers(markers) {
    for(let marker of markers)
    {
      this.getLtLng(marker);
    }
  }

  getLtLng(marker)
  {
    var address = marker.address + ", " + marker.city + " " + marker.zipcode;
    console.log(address);
    this.listService.codeAddress(address)
    .map(res => res.toString())
    .subscribe(data => {
      console.log(data);
      this.postMarker(data);
    })
  }

  getRentals() {
    this.listService.getAllRentals()
      .subscribe(data => {
        this.rentals = data;
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


  myMarker(position) {

    var currentPositionIcon = new google.maps.Marker({
      optimized: false,
      position: position
    });
    currentPositionIcon.setMap(this.map);
  }


}
