import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../app/services/authService';
import { ListService } from '../../app/services/listService';
import { Camera, CameraOptions } from '@ionic-native/camera';
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
  id: number;
  status: string;
  allow: boolean;
  rental = {
    title: '',
    itemDescription: '',
    itemAmount: ''
  }
  captureDataUrl: string;

  constructor(public navCtrl: NavController, public auth: AuthService, private camera: Camera,
    public listService: ListService, public navParams: NavParams, private alertCtrl: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    let info = this.auth.getUserInfo();
    console.log(info);
    if(info == undefined)
    {
      this.allow = false;
      this.status = "Please Login!";
    }
    else{
      this.allow = true;
      this.status ="";
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

    postRental(){
      let prompt = this.alertCtrl.create({
      title: 'Post Rental',
      inputs: [{ name: 'newTitle', placeholder: "Title" },
              {name: 'newDescription', placeholder: "Description"},
              { name: 'newAmount', placeholder: "Amount"}],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.rental.title = data.newTitle;
            this.rental.itemDescription = data.newDescription;
            this.rental.itemAmount = data.newAmount;
            this.listService.postRental(this.rental)
            .map(res => res.json)
             .subscribe(data => {
              console.log(data);
              this.getRentalsById();
               });
          }
        }
      ]
    });
    prompt.present();
    }

  deleteRental(rental: any) {
    this.listService.deletePost(rental)
    .map(res => res.toString())
    .subscribe(data => {
      console.log(data);
      this.getRentalsById();
    })
  }

editRental(rental){
  let prompt = this.alertCtrl.create({
  title: 'Edit Rental',
  inputs: [{ name: 'newTitle', value: rental.title },
          {name: 'newDescription', value: rental.itemDescription },
          { name: 'newAmount', value: rental.itemAmount }],
  buttons: [
    {
      text: 'Cancel'
    },
    {
      text: 'Save',
      handler: data => {
        rental.title = data.newTitle;
        rental.itemDescription = data.newDescription;
        rental.itemAmount = data.newAmount;
        this.listService.updateRental(rental)
        .map(res => res.json)
         .subscribe(data => {
          console.log(data);
          this.getRentalsById();
           });
      }
    }
  ]
});
prompt.present();
}

capture() {
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  upload() {
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);
    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/${filename}.jpg`);
    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
     // Do something here when the data is succesfully uploaded!
     this.captureDataUrl = "";
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  public goHome(){
    console.log('home');
    this.navCtrl.push("HomePage");
  }


}
