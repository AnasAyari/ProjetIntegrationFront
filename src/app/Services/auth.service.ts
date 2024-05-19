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
  constructor(
    private router: Router,
    private userService: UserServiceService
  ) {}

  login(email: string, password: string, remember: boolean): void {
    this.userService.getUserByEmail(email).subscribe((authenticatedUser) => {
      if (authenticatedUser && authenticatedUser.password === password) {
        if (remember) {
          localStorage.setItem(
            this.USER_ID_KEY,
            authenticatedUser.id.toString()
          );
        } else {
          sessionStorage.setItem(
            this.USER_ID_KEY,
            authenticatedUser.id.toString()
          );
        }

        if (authenticatedUser.isAdmin) {
          window.location.href = 'http://localhost:8000/admin';
        } else {
          this.router.navigate(['/home']);
        }
      } else {
        alert('User not found or incorrect password');
      }
    });
  }

  logout(): void {
    localStorage.removeItem(this.USER_ID_KEY);
    sessionStorage.removeItem(this.USER_ID_KEY);
    localStorage.removeItem(this.isAnAdmin);
    alert('You have been logged outT');
    this.router.navigate(['/home']);
    window.location.reload();
  }

  isAuthenticated(): boolean {
    return (
      !!localStorage.getItem(this.USER_ID_KEY) ||
      !!sessionStorage.getItem(this.USER_ID_KEY)
    );
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