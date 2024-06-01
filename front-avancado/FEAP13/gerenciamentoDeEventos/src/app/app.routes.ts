import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { eventoGuard } from './guard/evento.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { 
        path: 'login', 
        loadComponent: () => import('./component/login/login.component').then(m => m.LoginComponent) 
    },
    { 
        path: 'dashboard', 
        loadComponent: () => import('./component/dashboard/dashboard.component').then(m => m.DashboardComponent), 
        canActivate: [eventoGuard] 
    },
    { 
        path: 'eventos', 
        loadComponent: () => import('./component/eventos/eventos.component').then(m => m.EventosComponent), 
        canActivate: [eventoGuard] 
    },
];
