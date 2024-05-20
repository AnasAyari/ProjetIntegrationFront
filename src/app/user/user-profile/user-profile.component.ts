import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/user-service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  user: any;
  private readonly USER_ID_KEY = 'user_id';
  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = Number(localStorage.getItem(this.USER_ID_KEY));
    if (userId) {
      this.userService.getUserById(userId).subscribe((user) => {
        this.user = user;
      });
    }
  }

  navigateToEditForm() {
    this.router.navigate(['home/edit-user', this.user.id]);
  }
}

