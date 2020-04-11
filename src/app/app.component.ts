import {Component, OnInit} from '@angular/core';
import {AuthService} from './core/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mostrarMenu = false;
  title = 'contato';

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu
    );
  }

}
