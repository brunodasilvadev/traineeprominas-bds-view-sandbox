import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

import {AppComponent} from './app.component';

// Import containers
import {DefaultLayoutComponent} from './containers';

import {P404Component} from './views/error/404.component';
import {P500Component} from './views/error/500.component';

import {TeachersComponent} from './views/teachers/teachers/teachers.component';
import {TeacherNewComponent} from './views/teachers/teachers-new/teachers-new.component';
import {TeacherUpdateComponent} from "./views/teachers/teachers-update/teachers-update.component";
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

const APP_CONTAINERS = [
    DefaultLayoutComponent
];

import {
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule
} from '@coreui/angular';

// Import routing module
import {AppRoutingModule} from './app.routing';

// Import 3rd party components
import { ToastrModule } from 'ngx-toastr';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ChartsModule} from 'ng2-charts';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSnackBarModule
} from '@angular/material';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HttpClientModule} from '@angular/common/http';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import {CourseResolver} from "./views/students/course.resolver";
import {TeachersResolver} from "./views/courses/teachers-resolver"

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AppAsideModule,
        AppBreadcrumbModule.forRoot(),
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        PerfectScrollbarModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        HttpClientModule,
        ChartsModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatSnackBarModule
        ,        ToastrModule.forRoot()
    ],
    declarations: [
        AppComponent,
        ...APP_CONTAINERS,
        P404Component,
        P500Component,
        TeachersComponent,
        TeacherNewComponent,
        TeacherUpdateComponent,
        TeacherDetailsComponent,
        CoursesComponent,
        CoursesNewComponent,
        CoursesUpdateComponent,
        CoursesDetailsComponent,
        StudentsComponent,
        StudentNewComponent,
        StudentsUpdateComponent,
        StudentsDetailsComponent,
        UsersComponent,
        UsersNewComponent,
        UsersUpdateComponent,
        UsersDetailsComponent,
        CallbackComponent,
        ProfileComponent,
        HomeComponent
    ],
    bootstrap: [AppComponent],
    providers: [CourseResolver, TeachersResolver]
})
export class AppModule {
}
