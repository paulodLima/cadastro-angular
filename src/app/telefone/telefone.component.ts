import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TelefoneService} from '../service/telefone.service';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-telefone',
  templateUrl: './telefone.component.html',
  styleUrls: ['./telefone.component.css']
})
export class TelefoneComponent implements OnInit {

  public typePerson = '';
  public number = '';
  public codArea = '';
  public phoneType = '';
  public phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public formulario: FormGroup;
  public addMaisTelefone = [];
  public numero = 0;
  public telefones: Array<any>;
  public delete = '../../../assets/imagens/delete.png';
  public edit = '../../../assets/imagens/mais.png';

  constructor(private formBuilder: FormBuilder, private telefoneService: TelefoneService,
              private authService: AuthService) {
  }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      number: [null, [Validators.required, Validators.pattern(/^[\s\S]{8,10}$/)]],
      codArea: [null, [Validators.required, Validators.pattern(/^[\s\S]{3}$/)]],
      phoneType: [null, Validators.required],
      operatorLogin: [this.authService.login]
    });

    this.listarTelefones();
  }

  listarTelefones() {
    this.telefoneService.listarTelefone().subscribe(telefones => {
      this.telefones = telefones;
    }, erro => {
      console.log('Erro ao listar contatos', erro);
    });
  }

  cadastrar() {

  }

  tipoTelefone() {
    if (this.formulario.get('phone.phoneType').value === 'FIXO'
      || this.formulario.get('phone.phoneType').value === 'COMERCIAL') {
      this.phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    }
  }

  adicionarMaisTelefone() {
    this.numero = this.addMaisTelefone.push(1);
  }

  retirarTelefone() {
    this.addMaisTelefone.pop();
    console.log(this.addMaisTelefone);
  }
}
