import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Import Containers
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './views/error/404.component';
import {P500Component} from './views/error/500.component';
import {LoginComponent} from './views/login/login.component';
import {RegisterComponent} from './views/register/register.component';
import {TeachersComponent} from './views/teachers/teachers/teachers.component';
import {TeacherNewComponent} from './views/teachers/teachers-new/teachers-new.component';
import {CoursesComponent} from './views/courses/courses/courses.component';
import {CoursesNewComponent} from './views/courses/courses-new/courses-new.component';
import {StudentsComponent} from './views/students/students/students.component';
import {StudentNewComponent} from "./views/students/students-new/students-new.component";

export const routes: Routes = [
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
        path: 'login',
        component: LoginComponent,
        data: {
            title: 'Login Page'
        }
    },
    {
        path: 'register',
        component: RegisterComponent,
        data: {
            title: 'Register Page'
        }
    },
    {
        path: '',
        component: DefaultLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'teachers',
                component: TeachersComponent,
                data: {
                    title: 'Professores'
                }
            },
            {
                path: 'teacher-new',
                component: TeacherNewComponent,
                data: {
                    title: 'Novo Professor'
                }
            },
            {
                path: 'courses',
                component: CoursesComponent,
                data: {
                    title: 'Cursos'
                }
            },
            {
                path: 'courses-new',
                component: CoursesNewComponent,
                data: {
                    title: 'Novo Curso'
                }
            },
            {
                path: 'students',
                component: StudentsComponent,
                data: {
                    title: 'Estudantes'
                }
            },
            {
                path: 'students-new',
                component: StudentNewComponent,
                data: {
                    title: 'Novo Estudante'
                }
            }
        ]
    },
    {path: '**', component: P404Component}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
