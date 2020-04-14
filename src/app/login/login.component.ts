import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
  }

  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      login: [null, [Validators.required, Validators.pattern(/^-?(0|[a-z]{2,15}\d*)?$/)]],
      password: [null, [Validators.required, Validators.pattern(/^-?(0|[a-z0-9]{8,15}\d*)?$/)]]
    });
  }

  public login() {

    if (this.formLogin.valid) {

      const userName = this.formLogin.get('login').value;
      const password = this.formLogin.get('password').value;

      this.authService.authenticate(userName, password);

    }
  }
}
