import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../app/services/authService';
import { ListPage } from '../list/list';
import { ListService } from '../../app/services/listService';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
   registerCredentials = { email: '', password: '' };
   users: any;
   user = {
     firstName: "",
     lastName: "",
     address: "",
     city: "",
     state: "",
     zipcode: "",
     email: "",
     pass:  ""
   }

  constructor(public navCtrl: NavController, private listService: ListService, private auth: AuthService, private alertCtrl: AlertController) {
    //this.getUsers();
   }

  public register() {
      this.auth.register(this.user).subscribe(success => {
        if (success) {
          this.createSuccess = true;
          this.createUser();
          this.showPopup("Success", "Account created.");
        } else {
          this.showPopup("Error", "Problem creating account.");
        }
      },
        error => {
          this.showPopup("Error", error);
        });
    }

    getUsers(){
      this.listService.getAllUsers()
      .subscribe(data =>{
        console.log(data);
      })
    }


    createUser()
    {
          this.listService.createUser(this.user)
          .map(res => res.json)
          .subscribe(data => {
            console.log(data);
          })
    }

    showPopup(title, text) {
      let alert = this.alertCtrl.create({
        title: title,
        subTitle: text,
        buttons: [
          {
            text: 'OK',
            handler: data => {
              if (this.createSuccess) {
                this.navCtrl.push(ListPage);
              }
            }
          }
        ]
      });
      alert.present();
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
