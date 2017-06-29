import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ListService } from '../list/listService';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  rentals: any;
  users: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public listService: ListService) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
