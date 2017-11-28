import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Filling} from '../models/filling';
import 'rxjs/add/operator/map';
import {Car} from '../models/car';

@Injectable()
export class FillingHttpService {

  private url: string;

  constructor(private http: HttpClient) {

    this.url = 'http://www.rantakallio.fi/fillherup/fillingapi.php?action=';
  }

  getCars(): Observable<Car[]> {

    var carUrl = this.url + 'get_cars';

    return this.http.get(carUrl).map((response) => {
      return response as Car[];
    });
  }

  get(id:string): Observable<Filling[]> {

    var getUrl = this.url + 'get_fillings&id=' + id;

    return this.http.get(getUrl).map((response) => {
      return response as Filling[];
    });
  }

  create(filling: Filling) {
    return this.http.post(this.url, filling).subscribe();
  }

  update(filling: Filling) {

    var idUrl = this.url + '/' + filling.id;

    return this.http.put(idUrl, filling).subscribe();
  }

  delete(id: number) {

    var idUrl = this.url + '/' + id;

    return this.http.delete(idUrl).subscribe();
  }

  getById(id: number): Observable<Filling> {

    var idUrl = this.url + '/' + id;

    return this.http.get(idUrl).map((filling) => {
      return filling as Filling;
    });
  }
}
