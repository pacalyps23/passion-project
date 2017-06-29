import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HomeService } from './homeService';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HomeService]
})
export class HomePage {

rentals: any;

  constructor(public navCtrl: NavController, public homeService: HomeService, public alertCtrl: AlertController) {
    this.getRentals();
  }

  getRentals(){
    this.homeService.getAllRentals()
    .subscribe(data => {
      this.rentals = data;
    })
  }

}
