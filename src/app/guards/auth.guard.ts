import { CanActivateFn, Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const firestore = inject(FirestoreService);
  const router = inject(Router);

  // Verifica el estado de autenticación
  return new Promise<boolean>((resolve) => {
    firestore.getUser().subscribe((user) => {
      if (user) {
        resolve(true); // El usuario está autenticado, permite el acceso
      } else {
        router.navigate(['/login']); // Redirigir a la página de inicio de sesión
        resolve(false); // El usuario no está autenticado, bloquea el acceso
      }
    });
  });
};
