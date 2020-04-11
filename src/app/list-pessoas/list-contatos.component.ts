import {Component, OnInit} from '@angular/core';
import {ContatosSevice} from '../service/contatos.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-contatos',
  templateUrl: './list-contatos.component.html',
  styleUrls: ['./list-contatos.component.css']
})
export class ListContatosComponent implements OnInit {
  public pessoas: Array<any>;

  constructor(private contatosSevice: ContatosSevice, private router: Router) { }

  ngOnInit(): void {
    this.listarPessoas();

  }

  listarPessoas() {
    this.contatosSevice.listarPessoas().subscribe(pessoas => {
      this.pessoas = pessoas;
    }, erro => {
      console.log('Erro ao listar contatos', erro);
    });
  }

  editar(documentNumber) {
    this.router.navigate(['editar', documentNumber]);
  }

  remover(documentNumber) {
    this.contatosSevice.deletarPessoa(documentNumber).subscribe(pessoa => {
      this.router.navigate(['/lista_de_pessoas']);
    });
  }
}
