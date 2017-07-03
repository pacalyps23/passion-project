import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListService } from './listService';
import { Http } from '@angular/http';
import { InfoPage } from '../info/info';
import { AuthService } from '../../app/services/authService';

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

  constructor(public navCtrl: NavController, public auth: AuthService, public listService: ListService, public navParams: NavParams) {
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

    getRentals(){
      this.listService.getAllRentals()
      .subscribe(data => {
        this.rentals = data;
      })
    }


  getInfo(rental)
  {
    console.log(rental.itemId);
    this.listService.getRental(rental)
      .subscribe(data => {
         rental = data;
        console.log(rental);
        this.navCtrl.push(InfoPage, {rental});
    })
  }
}
