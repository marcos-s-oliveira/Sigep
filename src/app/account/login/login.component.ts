import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from './../shared/account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  addressForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });



  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  async onSubmit() {
    try {
      const result = await this.accountService.login(this.addressForm)

      this.router.navigate([''])
    } catch (error) {
      console.error(error)
      }
  }
  login(login: any) {
    throw new Error('Method not implemented.');
  }
}
