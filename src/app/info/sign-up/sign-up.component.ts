import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  signupForm!: FormGroup;
  users!: User[];
  newUser:User = new User;

  constructor(private router:Router,private formBuilder: FormBuilder,private userService : UserServiceService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get formControls() { return this.signupForm.controls; }

  onSubmit(){
    this.userService.getAllUsers().subscribe( data =>{
      this.users = data;
      let i:number=0;
      while(i<this.users.length && this.users[i].email!=this.signupForm.value.email){
        i++;
      }
      if(i==this.users.length){
        this.newUser=this.signupForm.value
        this.newUser.is_admin=false
        this.userService.createUser(this.newUser).subscribe(data =>{
          console.log(data);
        })
        this.router.navigate(['form/login'])
      }else{
        alert("email adress already exists please use another one");
      }
    })
  }

  
  NavigateTo(){
    this.router.navigate(['form/login']);
  }

}
