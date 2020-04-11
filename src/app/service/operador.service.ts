import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {Operador} from '../shared/Operador';
import {AuthService} from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {
  public URL = 'http://localhost:8082/v1/';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  login = this.authService.login;
  passoword = this.authService.password;

  listarOperadores(): Observable<Operador[]> {
    return this.http.get<Operador[]>(`${this.URL}gestor/operator`);
  }

  cadastrarOperador(operador: Operador): Observable<any> {
    return this.http.post(this.URL + 'admin/operator', operador);
  }

  consultarOperador(documentNumber: string) {
    console.log('documento', documentNumber);
    return this.http.get(`${this.URL}gestor/operator/${documentNumber}`).pipe(take(1));
  }

  atualizarOperador(pessoa) {
    return this.http.put(`${this.URL}admin/operator/${pessoa.documentNumber}`, pessoa).pipe(take(1));
  }

  deletarOperador(documentNumber: string) {

    return this.authService.permissaoDelete(this.login, this.passoword, `${this.URL}admin/operator/${documentNumber}`);
  }
}
