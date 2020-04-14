import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css']
})
export class TopoComponent implements OnInit {

  mostrarMenu = false;
  nome = '';
  admin = false;
  public operador: any;
  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu
    );

    this.nome = this.auth.login;

    this.auth.consultarOperador(this.nome).subscribe(
      pessoa => {
        console.log(pessoa);
        this.operador = pessoa;
        this.admin = this.operador.admin;
      });

  }
}
