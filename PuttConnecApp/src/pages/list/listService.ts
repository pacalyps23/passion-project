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

}
