import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TelefoneService} from '../service/telefone.service';

@Component({
  selector: 'app-lista-telefone',
  templateUrl: './lista-telefone.component.html',
  styleUrls: ['./lista-telefone.component.css']
})
export class ListaTelefoneComponent implements OnInit {

  public telefones: Array<any>;
  public edit = '../../../assets/imagens/edit.png';
  public delete = '../../../assets/imagens/delete.png';

  constructor(private router: Router, private telefoneService: TelefoneService) { }

  ngOnInit(): void {

    this.  listarTelefones();
  }

    listarTelefones() {
      this.telefoneService.listarTelefone().subscribe(telefones => {
        this.telefones = telefones;
      }, erro => {
        console.log('Erro ao listar contatos', erro);
      });
    }
}
