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

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.auth.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu
    );

    this.nome = this.auth.login;

    this.auth.consultarOperador(this.nome).subscribe(
      pessoa => {
        this.admin = pessoa.admin;
      });

  }
}
