import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

export const authGuard: CanActivateFn = async (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastController = inject(ToastController);

  if (authService.isConnected()) {
    return true;
  } else {
    const toast = await toastController.create({
      message: 'Vous devez être connecté pour accéder à cette page.',
      duration: 3000,
      color: 'danger',
      position: 'top',
    });
    await toast.present();

    router.navigate(['/home']);
    return false;
  }


};
