import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListService } from './listService';
import { Http } from '@angular/http';
import { InfoPage } from '../info/info';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
  providers: [ListService]
})
export class ListPage {

  icons: string[];
  rentals: any;
  users:any;

  constructor(public navCtrl: NavController, public listService: ListService, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
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
