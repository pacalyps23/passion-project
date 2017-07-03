import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../app/services/authService';
import { ListService } from '../../app/services/listService';

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
  status: string;
  id: number;

  constructor(public navCtrl: NavController, public auth: AuthService,
    public listService: ListService, public navParams: NavParams, private alertCtrl: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    let info = this.auth.getUserInfo();
    console.log(info);
    if(info == undefined)
    {
      this.status = "Not Signed In!";
    }
    else{

      this.id = info['userId'];
      this.getRentalsById();
    }

    }

    getRentalsById(){
      this.listService.getRentalById(this.id)
      .subscribe(data => {
        this.rentals = data;
      })
    }

editRental(rental){

  let prompt = this.alertCtrl.create({
  title: 'Edit Rental',
  inputs: [{ name: 'newTitle', placeholder: 'Title' },
          {name: 'newDescription', placeholder: 'Description'},
          { name: 'newAmount', placeholder: 'Amount'}],
  buttons: [
    {
      text: 'Cancel'
    },
    {
      text: 'Save',
      handler: data => {
        console.log(data);
        rental.title = data.newTitle;
        rental.itemDescription = data.newDescription;
        rental.itemAmount = data.newAmount;
        this.listService.updateRental(rental)
          .map(res => res.json())
         .subscribe(data => {
          console.log(data);
           this.getRentalsById();
           });
      }
    }
  ]
});


//this.getQuotes();
prompt.present();

}


quote = {
  message: ''
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
