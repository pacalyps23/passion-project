import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListService } from '../../app/services/listService';

/**
 * Generated class for the InfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
  providers: [ListService]
})
export class InfoPage {
  rental: any;
  selectedRental : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public listService: ListService) {
    // this.getInfo();
    this.selectedRental = this.navParams.get('rental');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

}
