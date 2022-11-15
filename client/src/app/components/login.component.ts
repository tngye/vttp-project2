import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { User } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup
  openDialogLogin: Boolean = false
  openDialogReg: Boolean = false
  donereg: Boolean = false

  constructor(private fb: FormBuilder, private appSvc: AppService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.createForm()
    
  }

  createForm() {
    return this.fb.group({
      username: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
  }

  login() {
    const login = this.form.value as User
    console.log("login: ", login)
    this.appSvc.authenticate(login)
    .then(results => {
      console.log("done", results)
      this.appSvc.saveToken(results.token);
      this.appSvc.saveUser(login.username);
      
      this.router.navigate(['/'])
      .then(()=> {
        window.location.reload();
      })
    }).catch(results=> {
      console.log(results)
      this.openDialogLogin = true})
      // alert('Login Failed')
      
  }
  register() {
    const register = this.form.value as User
    console.log("login: ", register)
    this.appSvc.register(register)
    .then(results => {
      console.log("done", results)
      this.router.navigate(['/login'])
      this.donereg = true
    }).catch(results=> {
      console.log(results)
      this.openDialogReg = true})
  }

}
