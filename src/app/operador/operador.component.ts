import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OperadorService} from '../service/operador.service';
import {map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-operador',
  templateUrl: './operador.component.html',
  styleUrls: ['./operador.component.css']
})
export class OperadorComponent implements OnInit {
  formulario: FormGroup;
  public contatosList: Array<any>;

  constructor(private formBuilder: FormBuilder,
              private operadorService: OperadorService,
              private route: ActivatedRoute) {
  }

  mensagem = false;
  mostrarLogin = true;
  name: '';
  login: '';
  password: '';
  perfil: '';
  admin: '';
  patternPss = true;
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(/^[\s\S]{5,100}$/)]],
      login: [null, [Validators.required, Validators.pattern(/^[\s\S]{2,15}$/), Validators.pattern(/^[a-z0-9]{2,15}$/)]],
      password: [null, [Validators.required, Validators.pattern(/^[\s\S]{6,10}$/)]],
      perfil: [null, Validators.required],
      admin: [null, Validators.required]
    });

    this.route.params.pipe(
      map((params) => params.id),
      switchMap(login => this.operadorService.consultarOperador(login))
    ).subscribe(operador => this.updateForm(operador));

    if (this.route.snapshot.url.length === 2) {
      this.mostrarLogin = false;
      this.patternPss = false;
    }
  }

  updateForm(operador) {
    this.formulario.patchValue({
      name: operador.name,
      login: operador.login,
      password: operador.password,
      perfil: operador.perfil,
      admin: operador.admin
    });
    console.log(operador);
  }

  cadastrar() {
    this.operadorService.listarOperadores().subscribe(contatos => {
      this.contatosList = contatos;
      for (let i = 0; i < this.contatosList.length; i++) {
        if (this.contatosList[i].login.indexOf(this.formulario.value.login) === 0) {
          this.operadorService.atualizarOperador(this.formulario.value).subscribe(
            () => {
              this.operadorService.listarOperadores();
              this.formulario.reset();
              this.mensagem = true;
              alert('Cadastrado com sucesso');
            }, erro => {
              alert('Erro ao atualizar pessoa');
              console.log('Erro ao Atualizar pessoa', erro);
            });
          break;
        } else {
          if (this.contatosList[i].login.indexOf(this.formulario.value.login) === -1) {
            this.operadorService.cadastrarOperador(this.formulario.value).subscribe(() => {
              this.formulario.reset();
            }, erro => {
              alert('Erro ao cadastrar operador');
              console.log('Erro ao cadastrar operadores', erro);
            });
            break;
          }
        }
      }
    }, erro => {
      console.log('Erro ao listar operadores', erro);
    });
  }

}
