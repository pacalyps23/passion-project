import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

@Injectable()
export class ListService {
  constructor(private _http: Http) {

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
    console.log(id);
    return this._http.get("http://localhost:8080/users/" + id + "/rentals")
    .map(res => res.json());
  }

  updateRental(rental: any): Observable <any> {
    console.log(rental);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.put("http://localhost:8080/users/" + rental.user.userId + "/rental/" + rental.itemId, 
    JSON.stringify(rental), {headers: headers});
  }


}
