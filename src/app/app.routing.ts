import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CallbackComponent } from './callback/callback.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';

// Import Containers
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './views/error/404.component';
import {P500Component} from './views/error/500.component';
import {TeachersComponent} from './views/teachers/teachers/teachers.component';
import {TeacherNewComponent} from './views/teachers/teachers-new/teachers-new.component';
import {TeacherUpdateComponent} from './views/teachers/teachers-update/teachers-update.component';
import {TeacherDetailsComponent} from "./views/teachers/teachers-details/teachers-details.component";
import {CoursesComponent} from './views/courses/courses/courses.component';
import {CoursesNewComponent} from './views/courses/courses-new/courses-new.component';
import {CoursesUpdateComponent} from "./views/courses/courses-update/courses-update.component";
import {CoursesDetailsComponent} from "./views/courses/courses-details/courses-details.component";
import {StudentsComponent} from './views/students/students/students.component';
import {StudentNewComponent} from "./views/students/students-new/students-new.component";
import {StudentsUpdateComponent} from "./views/students/students-update/students-update.component";
import {StudentsDetailsComponent} from "./views/students/students-details/students-details.component";
import {UsersComponent} from "./views/users/users/users.component";
import {UsersNewComponent} from "./views/users/users-new/users-new.component";
import {UsersUpdateComponent} from "./views/users/users-update/users-update.component";
import {UsersDetailsComponent} from "./views/users/users-details/users-details.component";
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        canActivate: [AuthGuard],
        children: []
    },
    {
        path: 'logout',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: '404',
        component: P404Component,
        data: {
            title: 'Page 404'
        }
    },
    {
        path: '500',
        component: P500Component,
        data: {
            title: 'Page 500'
        }
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'callback',
        component: CallbackComponent
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        children: [
            {
                path: 'graficos',
                loadChildren: () => import('./views/chartjs/chartjs.module').then(m => m.ChartJSModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'users',
                component: UsersComponent,
                data: {
                    title: 'Usuários'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'users-new',
                component: UsersNewComponent,
                data: {
                    title: 'Novos Usuários'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'users-update/:id',
                component: UsersUpdateComponent,
                data: {
                    title: 'Atualiza Usuários'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'users-details/:id',
                component: UsersDetailsComponent,
                data: {
                    title: 'Detalhes do Usuários'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'teachers',
                component: TeachersComponent,
                data: {
                    title: 'Professores'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'teacher-new',
                component: TeacherNewComponent,
                data: {
                    title: 'Novo Professor'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'teacher-update/:id',
                component: TeacherUpdateComponent,
                data: {
                    title: 'Atualiza Professor'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'teacher-details/:id',
                component: TeacherDetailsComponent,
                data: {
                    title: 'Detalhes do Professor'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'courses',
                component: CoursesComponent,
                data: {
                    title: 'Cursos'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'course-new',
                component: CoursesNewComponent,
                data: {
                    title: 'Novo Curso'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'course-update/:id',
                component: CoursesUpdateComponent,
                data: {
                    title: 'Atualiza Curso'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'course-details/:id',
                component: CoursesDetailsComponent,
                data: {
                    title: 'Detalhes do Curso'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'students',
                component: StudentsComponent,
                data: {
                    title: 'Estudantes'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'students-new',
                component: StudentNewComponent,
                data: {
                    title: 'Novo Estudante'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'students-update/:id',
                component: StudentsUpdateComponent,
                data: {
                    title: 'Atualiza Estudante'
                },
                canActivate: [AuthGuard]
            },
            {
                path: 'students-details/:id',
                component: StudentsDetailsComponent,
                data: {
                    title: 'Detalhes do Estudante'
                },
                canActivate: [AuthGuard]
            }
        ]
    },
    {path: '**', component: P404Component}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        }
    ]
})
export class AppRoutingModule {
}
