import { LayoutComponent } from './core/layout/layout.component';
import { Routes } from '@angular/router';
import { ReportComponent } from './relatorios/report.component'; // Import the new report component

export const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            {
                path: '', loadComponent: () => import('./feature/home/home.component').then(component => component.HomeComponent)
            },
            {
                path: 'relatorios', loadComponent: () => import('./relatorios/report.component').then(component => component.ReportComponent) // Add route for the report component
            },
            {
                path: 'alugueis', loadComponent: () => import('./upload/upload.component').then(component => component.UploadComponent) 
            }
        ]
    }
];
