import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from './user-service.service';
import Swal from 'sweetalert2';

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
          Swal.fire({
            icon: 'success',
            title: 'Welcome ' + authenticatedUser.username,
            text: 'Enjoy the Posters',
            width: '500px',
          });
          this.router.navigate(['/home']);
        }
      } else {
         Swal.fire({
           icon: 'error',
           title: 'Oops...',
           text: 'User not found or incorrect password',
           width: '300px',
           
         });
      }
    });
  }

  logout(): void {
    localStorage.removeItem(this.USER_ID_KEY);
    sessionStorage.removeItem(this.USER_ID_KEY);
    localStorage.removeItem(this.isAnAdmin);
    
    Swal.fire({
      icon: 'success',
      title: 'See you soon',
      text: 'You have been logged Out',
      width: '350px',
    });
    this.router.navigate(['/home/landing']);
    
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