import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { AuthService } from 'src/app/Services/auth.service';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
export class LogInComponent {
  NavigateTo() {
    this.router.navigate(['form/signup']);
  }

  loginForm!: FormGroup;
  users: User[] = [];
  user: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false],
    });
    this.userService.getUserByEmail('aaa@gmail.com').subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user', error);
      }
    );
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data;
      console.log(this.users);
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.authService.login(email, password);
      
    }
  }
}
