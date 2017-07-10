import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AuthService} from '../../app/services/authService';
import { Geolocation } from '@ionic-native/geolocation';
import { Observer } from 'rxjs/Observer';

declare var google;

@Injectable()
export class ListService {
  id: any;
  geocoder: any;

  constructor(private _http: Http, private auth: AuthService) {
    let current = this.auth.getUserInfo();
    if(current != null)
    {
      this.id = current.userId;
    }
    this.geocoder = new google.maps.Geocoder();
  }

  getAllRentals(): Observable<any> {
    return this._http.get("http://localhost:8080/users/rentals")
      .map(response => response.json());
  }

  getAllUsers(): Observable<any>{
    return this._http.get("http://localhost:8080/users")
    .map(res => res.json());

  }

  getRental(rental: any) : Observable <any> {
    return this._http.get("http://localhost:8080/users/" + 1 +"/rentals/" + rental.itemId)
    .map(res => res.json());
  }

  getRentalById(id: number) : Observable <any>{
    return this._http.get("http://localhost:8080/users/" + id + "/rentals")
    .map(res => res.json());
  }

  updateRental(rental: any): Observable <any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put("http://localhost:8080/users/" + 1 +"/rentals/" + rental.itemId,
    JSON.stringify(rental), {headers: headers});

  }

  postRental(rental: any): Observable <any>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("http://localhost:8080/users/"+ this.id +"/rentals",
    JSON.stringify(rental), { headers: headers });
  }

  deletePost(rental: any) : Observable<any> {
  return this._http.delete("http://localhost:8080/users/1/rentals/" + rental.itemId);
}

createUser(user: any) : Observable <any>{
  console.log(user);
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return this._http.post("http://localhost:8080/users", JSON.stringify(user),
   { headers: headers });
}

codeAddress(address: any) : Observable<any> {
  console.log("codeAd:" + address);
  var loc = [];
  return new Observable((observer: Observer<any>) => {
    //invokes geocode method of Google Maps API geocoding
    this.geocoder.geocode({ 'address': address },
    (
      (results, status) => {
        if(status === google.maps.GeocoderStatus.OK){
          observer.next(results);
          observer.complete();
        }else{
          console.log("Geocding service: geocode was not successful for the following reason: " + status);
          observer.error(status);
        }
      })
    );
  });
}


}
