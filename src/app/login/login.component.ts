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
      login: [null, [Validators.required,/* Validators.pattern(/^[a-z0-9 _-] {8,15}$/),*/ Validators.maxLength(15)]],
      password: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]]
    });
  }

  public login() {
    const userName = this.formLogin.get('login').value;
    const password = this.formLogin.get('password').value;

    this.authService.authenticate(userName, password)
      .subscribe(() => {
      }, error => {
        this.formLogin.reset();
        this.userNameInput.nativeElement.focus();
        alert('Usuario ou senha incorreta!');
      });
  }
}
