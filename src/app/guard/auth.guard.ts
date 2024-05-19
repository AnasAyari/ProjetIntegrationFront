import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService) as AuthService;
  const router = inject(Router) as Router;
  if (authService.isAuthenticated()) {
    return true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Authentication failed, please log in first',
      width: '400px',
    });
    router.navigate(['/home/landing']);
    
    return false;
  }
};
