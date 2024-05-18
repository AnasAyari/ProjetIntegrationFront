import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private readonly USER_ID_KEY = 'user_id';
  private authenticated = false;
  isAnAdmin = 'admin';
  constructor(private router: Router, private userService: UserServiceService) {}

  login(email: string, password: string): void {
    this.userService
      .getUserByEmail(email)
      .subscribe((authenticatedUser) => {
        if (authenticatedUser && authenticatedUser.password === password) {
          localStorage.setItem(
            this.USER_ID_KEY,
            authenticatedUser.id.toString()
          );
          console.log(localStorage.getItem(this.USER_ID_KEY));
          
          if (authenticatedUser.is_admin) {
            localStorage.setItem(this.isAnAdmin, 'true');
            this.router.navigate(['/dashboard']);
          } else {
            localStorage.setItem(this.isAnAdmin, 'false');
            this.router.navigate(['/home']);
          }
        } else {
          alert('User not found or incorrect password');
        }
      });
  }

  logout(): void {
    localStorage.removeItem(this.USER_ID_KEY);
    localStorage.removeItem(this.isAnAdmin);
    console.log(localStorage.removeItem(this.USER_ID_KEY));
    
    alert("You have been logged out")
    this.router.navigate(['/home']);
    window.location.reload();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.USER_ID_KEY);
  }

  setAuthenticated(value: boolean): void {
    this.authenticated = value;
  }

  getCurrentUserId(): string | null {
    const storedUserId = localStorage.getItem(this.USER_ID_KEY);

    if (storedUserId) {
      return storedUserId;
    } else {
      return null;
    }
  }
}
