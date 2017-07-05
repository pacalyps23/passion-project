import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AuthService} from '../../app/services/authService';

@Injectable()
export class ListService {
  id: number;

  constructor(private _http: Http, private auth: AuthService) {
    let current = this.auth.getUserInfo();
    this.id = current.userId;
  }

  getAllRentals(): Observable<any> {
    return this._http.get("http://localhost:8080/users/rentals")
      .map(response => response.json());
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
    console.log(this.id);
    headers.append('Content-Type', 'application/json');
    return this._http.put("http://localhost:8080/users/" + 1 +"/rentals/" + rental.itemId,
    JSON.stringify(rental), {headers: headers});

  }

  postRental(rental: any): Observable <any>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post("http://localhost:8080/users/"+ rental.userId +"/rentals", JSON.stringify(rental), { headers: headers });
  }

  deletePost(rental: any) : Observable<any> {
  return this._http.delete("http://localhost:8080/users/1/rentals/" + rental.itemId);
}


}
