import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm!: FormGroup;
  newUser: User = new User();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.signupForm.controls;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.userService
        .getUserByEmail(this.signupForm.value.email)
        .subscribe((user) => {
          if (user) {
            alert('email address already exists please use another one');
          } else {
            this.newUser = this.signupForm.value;
            this.newUser.is_admin = false;
            this.userService.createUser(this.newUser).subscribe((data) => {
              console.log(data);
              this.router.navigate(['form/login']);
            });
          }
        });
    }
  }

  NavigateTo() {
    this.router.navigate(['form/login']);
  }
}
