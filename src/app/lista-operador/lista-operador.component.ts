import {Component, OnInit} from '@angular/core';
import {OperadorService} from '../service/operador.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lista-operador',
  templateUrl: './lista-operador.component.html',
  styleUrls: ['./lista-operador.component.css']
})
export class ListaOperadorComponent implements OnInit {
  public operador: Array<any>;

  constructor(private operadorService: OperadorService, private router: Router) {
  }

  ngOnInit(): void {

    this.listarOperadores();
  }

  listarOperadores() {
    this.operadorService.listarOperadores().subscribe(operador => {
      this.operador = operador;
      console.log(operador);
    }, erro => {
      console.log('Erro ao listar operadores', erro);
    });
  }

  editar(login) {
    this.router.navigate(['/cadastrar_operadores/editar/', login]);
  }

  remover(login) {
    this.operadorService.deletarOperador(login).subscribe(pessoa => {
      this.router.navigate(['/lista_de_operadores']);
    }, error => {
      console.log('erro ao deletar', error);
    });
  }
}
