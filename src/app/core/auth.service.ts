import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

const API_URL = 'localhost:8082';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioAutenticado = false;
  mostrarMenuEmitter = new EventEmitter<boolean>();
  login = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {
    this.mostrarMenuEmitter.emit(false);
  }

  public authenticate(userName: string, password: string) {
    this.login = userName;
    this.password = password;

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(userName + ':' + password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.get(`http://localhost:8082/v1/login/`, {headers, responseType: 'text'}).subscribe(
      () => {
        this.router.navigateByUrl('/home');
        this.usuarioAutenticado = true;
        this.mostrarMenuEmitter.emit(true);
        this.consultarOperador(userName);

      }, error => {
        this.mostrarMenuEmitter.emit(false);
        alert('Usuario ou senha incorreta');
        console.log('erro ao se autenticar', error);
      }
    );
  }

  public permissaoDelete(userName: string, password: string, url: string) {

    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(userName + ':' + password));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.delete(url, {headers});
  }

  consultarOperador(login: string) {
    return this.http.get(`http://localhost:8082/v1/gestor/operator/${login}`);
  }
}

