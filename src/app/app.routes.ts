import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./Components/producto/producto.component')
    },
    {
        path: 'crearProducto',
        loadComponent: () => import('./Components/formproduct/formproduct.component')
    },
    {
        path: ':id/editar',
        loadComponent: () => import('./Components/formproduct/formproduct.component')
    }
];
