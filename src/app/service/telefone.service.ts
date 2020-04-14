import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {Telefone} from '../shared/telefone';

@Injectable({
  providedIn: 'root'
})
export class TelefoneService {
  public URL = 'http://localhost:8082/v1/';


  constructor(private http: HttpClient) {
  }

  listarTelefone(): Observable<Telefone[]> {
    return this.http.get<Telefone[]>(this.URL + 'persons');
  }


  cadastrarTelefone(telefone: Telefone): Observable<any> {
    return this.http.post(this.URL + 'admin/operator', telefone);
  }

  consultarTelefone(documentNumber: string) {
    console.log('documento', documentNumber);
    return this.http.get(`${this.URL}gestor/operator/${documentNumber}`).pipe(take(1));
  }

  atualizarTelefone(telefone) {
    return this.http.put(`${this.URL}admin/operator/${telefone.documentNumber}`, telefone).pipe(take(1));
  }

}
