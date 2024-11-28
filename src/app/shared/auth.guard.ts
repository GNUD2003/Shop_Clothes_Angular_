import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';
//import { Router } from 'express';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedId()) {
    return true;
  }

  else {
    router.navigateByUrl('/user/login')
    return false
  }

};
