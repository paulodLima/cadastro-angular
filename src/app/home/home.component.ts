import {Component, OnInit} from '@angular/core';
import {ContatosSevice} from '../service/contatos.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private contatosSevice: ContatosSevice,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
  }

  public contatosList: Array<any>;
  addTelefone = true;
  public addMaisTelefone = [];
  dataDiaVerife = false;
  formulario: FormGroup;

  public fullName = '';
  public documentNumber = '';
  public documentdisable = true;
  public birthDate = '';
  public fathersName = '';
  public mothersName = '';
  public typePerson = '';
  public number = '';
  public codArea = '';
  public phoneType = '';
  public phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  public tipoPessoa;
  public delete = '../../../assets/imagens/delete.png';
  public mais = '../../../assets/imagens/mais.png';


  // controle de estado inicial

  numero = 1;

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      fullName: [null, [Validators.required, Validators.pattern(/^[\s\S]{5,100}$/)]],
      documentNumber: [null, [Validators.required, Validators.pattern(/^[\s\S]{11,20}$/)]],
      fathersName: [null, [Validators.required, Validators.pattern(/^[\s\S]{5,100}$/)]],
      birthDate: [null, Validators.required],
      mothersName: [null, [Validators.required, Validators.pattern(/^[\s\S]{5,100}$/)]],
      typePerson: [null, Validators.required],
      phone: this.formBuilder.group({
        number: [null, [Validators.required, Validators.pattern(/^[\s\S]{8,10}$/)]],
        codArea: [null, [Validators.required, Validators.pattern(/^[\s\S]{2,3}$/)]],
        phoneType: [null, Validators.required]
      })
    });

    if (this.route.snapshot.url.length === 2) {
      this.documentdisable = false;
    }

    this.route.params.pipe(
      map((params) => params.id),
      switchMap(documentNumber => this.contatosSevice.consultarPessoa(documentNumber))
    ).subscribe(pessoa => this.updateForm(pessoa));
  }

  updateForm(pessoa) {
    this.formulario.patchValue({
      fullName: pessoa.fullName,
      fathersName: pessoa.fathersName,
      documentNumber: pessoa.documentNumber,
      birthDate: pessoa.birthDate,
      mothersName: pessoa.mothersName,
      typePerson: pessoa.typePerson
    });
  }

  cadastrar() {

    if (this.formulario.valid) {

      this.contatosSevice.listarPessoas().subscribe(contatos => {

        this.contatosList = contatos;

        for (let i = 0; i < this.contatosList.length; i++) {
          if (this.contatosList[i].documentNumber.indexOf(this.formulario.value.documentNumber) === 0) {
            this.contatosSevice.atualizarPessoa(this.formulario.value).subscribe(
              () => {

                this.formulario.reset();
                this.contatosSevice.listarPessoas();

              }, erro => {
                alert('Erro ao atualizar pessoa');
                console.log('Erro ao Atualizar pessoa', erro);
              });
            break;
          } else {

            if (this.contatosList[i].documentNumber.indexOf(this.formulario.value.documentNumber) === -1) {

              this.contatosSevice.cadastrarPessoa(this.formulario.value).subscribe(() => {

                this.formulario.reset();
              }, erro => {

                alert('Erro ao cadastrar pessoa');
                console.log('Erro ao cadastrar pessoa', erro);

              });
              break;
            }
          }
        }
      }, erro => {
        console.log('Erro ao listar contatos', erro);
      });
    }
  }

  adicionarTelefone() {
    this.addTelefone = true;
    this.addMaisTelefone.push(1);
  }

  adicionarMaisTelefone() {
    this.numero = this.addMaisTelefone.push(1);
  }

  retirarTelefone() {
    this.addMaisTelefone.pop();
    console.log(this.addMaisTelefone);
  }

  dataDia() {
    const dataform = this.formulario.get('birthDate').value;
  }

  tipoTelefone() {
    if (this.formulario.get('phone.phoneType').value === 'FIXO'
      || this.formulario.get('phone.phoneType').value === 'COMERCIAL') {
      this.phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    }
  }

  tipoDocumento() {
    if (this.formulario.get('typePerson').value === 'FISICA') {
      this.tipoPessoa = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    } else {
      this.tipoPessoa = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    }
  }
}
