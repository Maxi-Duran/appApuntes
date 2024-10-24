import { CanActivateFn, Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const firestore = inject(FirestoreService);
  const router = inject(Router);

  // Verifica el estado de autenticación y redirige si es necesario
  return firestore.getUser().pipe(
    map((user) => {
      return !!user;
    })
  );
};
