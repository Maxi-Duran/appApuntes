import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UpdateTaskPageModule } from './pages/task/update-task/update-task.module';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('../app/pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('../app/pages/register/register.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'login-email',
    loadChildren: () =>
      import('./pages/login/login-email/login-email.module').then(
        (m) => m.LoginEmailPageModule
      ),
  },
  {
    path: 'login-password',
    loadChildren: () =>
      import('./pages/login/login-password/login-password.module').then(
        (m) => m.LoginPasswordPageModule
      ),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('../app/pages/welcome/welcome.module').then(
        (m) => m.WelcomePageModule
      ),
  },
  {
    path: 'confirm-name',
    loadChildren: () =>
      import('./pages/welcome/confirm-name/confirm-name.module').then(
        (m) => m.ConfirmNamePageModule
      ),
  },
  {
    path: 'restore-password',
    loadChildren: () =>
      import('../app/pages/restore-password/restore-password.module').then(
        (m) => m.RestorePasswordPageModule
      ),
  },
  {
    path: 'home-2',
    loadChildren: () =>
      import('../app/pages/home-2/home-2.module').then(
        (m) => m.Home2PageModule
      ),
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('../app/pages/calendar/calendar.module').then(
        (m) => m.CalendarPageModule
      ),
  },
  {
    path: 'task',
    loadChildren: () =>
      import('../app/pages/task/task.module').then((m) => m.TaskPageModule),
  },
  {
    path: 'notes',
    loadChildren: () =>
      import('../app/pages/notes/notes.module').then((m) => m.NotesPageModule),
  },
  {
    path: 'new-task',
    loadChildren: () =>
      import('../app/pages/task/new-task/new-task.module').then(
        (m) => m.NewTaskPageModule
      ),
  },
  {
    path: 'update-task',
    loadChildren: () =>
      import('./pages/task/update-task/update-task.module').then(
        (m) => m.UpdateTaskPageModule
      ),
  },
  {
    path: 'update-task/:id', // Asegúrate de que el path sea correcto
    loadChildren: () =>
      import('./pages/task/update-task/update-task.module').then(
        (m) => m.UpdateTaskPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
