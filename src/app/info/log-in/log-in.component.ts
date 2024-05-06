import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  NavigateTo(){
    this.router.navigate(['form/signup']);
  }

  loginForm!: FormGroup;
  users:User[]=[]


  constructor(private router:Router,private formBuilder: FormBuilder,private userService : UserServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      remember: [false]
    });
    this.getAllUsers();
  }


  getAllUsers(){
    this.userService.getAllUsers().subscribe( data =>{
      this.users = data;
      console.log(this.users);
    })
  }


  i:number=0

  onSubmit(email:string,password:string){
    while(this.i<this.users.length && this.users[this.i].email != email){
      this.i++;
    }
    if (this.i == this.users.length){
      console.log("user not found");
    }else if (password == this.users[this.i].password){
      if (!this.users[this.i].is_admin){
        console.log("admin");
        this.router.navigate([`dashboard/${this.users[this.i].userId}`])
      }else{
        console.log("user");
        this.router.navigate([`/${this.users[this.i].userId}`])
      }
    }
  }

}
