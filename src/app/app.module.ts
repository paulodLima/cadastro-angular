import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TopoComponent} from './topo/topo.component';
import {HomeComponent} from './home/home.component';
import {RodapeComponent} from './rodape/rodape.component';
import {ListContatosComponent} from './list-pessoas/list-contatos.component';
import {ProgressoComponent} from './progresso/progresso.component';
import {ContatosSevice} from './service/contatos.service';
import {OperadorService} from './service/operador.service';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TextMaskModule} from 'angular2-text-mask';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';
import {CommonModule} from '@angular/common';
import {VmensagemModel} from './vmensagem/vmensagem.model';
import {AuthGuard} from './guards/auth-guard';
import {PaginaNaoEncontradaComponent} from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import {OperadorComponent} from './operador/operador.component';
import {TelefoneComponent} from './telefone/telefone.component';
import {ListaOperadorComponent} from './lista-operador/lista-operador.component';
import {ListaTelefoneComponent} from './lista-telefone/lista-telefone.component';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    HomeComponent,
    RodapeComponent,
    ProgressoComponent,
    ListContatosComponent,
    LoginComponent,
    PaginaNaoEncontradaComponent,
    OperadorComponent,
    TelefoneComponent,
    ListaOperadorComponent,
    ListaTelefoneComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    TextMaskModule,
    RouterModule.forRoot(ROUTES),
    VmensagemModel
  ],
  providers: [
    ContatosSevice,
    HttpClientModule,
    AuthGuard,
    OperadorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
