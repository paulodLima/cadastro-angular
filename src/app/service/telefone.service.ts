import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Person} from '../shared/person_model';

@Injectable({
  providedIn: 'root'
})
export class TelefoneService {
  public URL = 'http://localhost:8082/v1/';


  constructor(private http: HttpClient) {
  }

  listarPessoas(): Observable<Person[]> {
    return this.http.get<Person[]>(this.URL + 'persons');
  }
}
