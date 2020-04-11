import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ListContatosComponent} from './list-pessoas/list-contatos.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './guards/auth-guard';
import {PaginaNaoEncontradaComponent} from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import {OperadorComponent} from './operador/operador.component';
import {ListaOperadorComponent} from './lista-operador/lista-operador.component';
import {TelefoneComponent} from './telefone/telefone.component';
import {ListaTelefoneComponent} from './lista-telefone/lista-telefone.component';

export const ROUTES: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'lista_de_pessoas', component: ListContatosComponent, canActivate: [AuthGuard]},
  {path: 'lista_de_operadores', component: ListaOperadorComponent, canActivate: [AuthGuard]},
  {path: 'cadastrar_operadores/editar/:id', component: OperadorComponent, canActivate: [AuthGuard]},
  {path: 'cadastrar_operadores', component: OperadorComponent, canActivate: [AuthGuard]},
  {path: 'cadastrar_telefone', component: TelefoneComponent, canActivate: [AuthGuard]},
  {path: 'listar_telefone', component: ListaTelefoneComponent, canActivate: [AuthGuard]},
  {path: 'editar/:id', component: HomeComponent, canActivate: [AuthGuard]},
  {path: '**', component: PaginaNaoEncontradaComponent, canActivate: [AuthGuard]}
];
