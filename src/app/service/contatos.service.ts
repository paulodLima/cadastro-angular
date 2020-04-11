import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Person} from '../shared/person_model';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContatosSevice {
  public URL = 'http://localhost:8082/v1/';


  constructor(private http: HttpClient) {
  }

  listarPessoas(): Observable<Person[]> {
    return this.http.get<Person[]>(this.URL + 'persons');
  }

  cadastrarPessoa(pessoa: Person): Observable<any> {
    return this.http.post(this.URL + 'gestor/persons', pessoa);
  }

  consultarPessoa(documentNumber: string) {
    return this.http.get(`${this.URL}persons/${documentNumber}`).pipe(take(1));
  }

  atualizarPessoa(pessoa) {
    return this.http.put(`${this.URL}gestor/persons/${pessoa.documentNumber}`, pessoa).pipe(take(1));
  }

  deletarPessoa(documentNumber: string) {
    return this.http.delete(`${this.URL}gestor/persons/${documentNumber}`);
  }
}
