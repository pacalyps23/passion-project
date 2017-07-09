import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController, NavParams, AlertController, MenuController} from 'ionic-angular';
//import { HomeService } from './homeService';
import { Http } from '@angular/http';
import { RegisterPage } from '../register/register';
import { ListPage } from '../list/list';
import { AuthService } from '../../app/services/authService';

@IonicPage({})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
loading: Loading;
registerCredentials = {email: '', password: ''};

rentals: any;

  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController,
    public alertCtrl: AlertController, private auth: AuthService, private menuCtrl: MenuController) {
  }


  public createAccount(){
      this.navCtrl.push(RegisterPage);
  }

  public goHome()
  {
    this.navCtrl.push(ListPage);
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        this.menuCtrl.enable(true);
        this.navCtrl.setRoot(ListPage);
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
      this.loading = this.loadingCtrl.create({
        content: 'Please wait...',
        dismissOnPageChange: true
      });
      this.loading.present();
    }

    showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

}
