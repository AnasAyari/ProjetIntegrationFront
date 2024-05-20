// EditUser.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { User } from 'src/app/Classes/user';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  editForm!: FormGroup;
  existingUser: User = new User();
  userId!: number;
  selectedFile: File | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      profilePic: ['', [Validators.required]],
      numero: [, [Validators.required, Validators.minLength(8)]],
    });

    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.getUser();
  }

  get formControls() {
    return this.editForm.controls;
  }

  getUser() {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe((user) => {
        this.existingUser = user;
        this.editForm.setValue({
          username: user.username,
          email: user.email,
          password: user.password,
          numero: user.numero,
          profilePic: user.profilePic,
        });
      });
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      console.log(this.editForm.value);

      if (this.selectedFile) {
        // If a new file has been selected, update the profilePic
        this.editForm.value.profilePic = this.selectedFile.name;
      } else {
        // If no new file has been selected, keep the existing profilePic
        this.editForm.value.profilePic = this.existingUser.profilePic;
        console.log(this.editForm.value.profilePic);
        console.log(this.existingUser.profilePic);
      }

      this.userService
        .updateUser(this.userId, this.editForm.value)
        .subscribe(() => {
          this.router.navigate(['home/profile']).then(() => {
            window.location.reload();
          });
        });
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}
