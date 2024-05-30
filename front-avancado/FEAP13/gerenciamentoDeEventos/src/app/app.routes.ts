import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
    // { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadComponent: () => import('./component/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'eventos', loadComponent: () => import('./component/eventos/eventos.component').then(m => m.EventosComponent) },
];
