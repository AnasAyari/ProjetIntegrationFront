import { CanActivateFn } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService) as AuthService;

  if (authService.isAuthenticated()) {
    return true;
  } else {
    alert("Authentication failed, please log in first");
    return false;
  }
};
