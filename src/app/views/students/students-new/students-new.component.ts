import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Courses } from '../../../models/courses';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ApiService} from '../../../api.service';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-student-new',
    templateUrl: './students-new.component.html',
    styleUrls: ['./students-new.component.scss']
})
export class StudentNewComponent implements OnInit {

    public errors: any[] = [];
    studentForm: FormGroup;
    isLoadingResults = false;
    courses: Courses[];

    constructor(private router: Router,
                private api: ApiService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService) { }

    ngOnInit() {
        this.studentForm = this.formBuilder.group({
            name : [null, [Validators.required, Validators.minLength(2)]],
            lastName : [null, Validators.required],
            age : [null, [Validators.required, Validators.minLength(2)]],
            course: [null, [Validators.required]]
        });

        this.api.getCourses()
            .subscribe(courses => this.courses = courses);
    }

    addStudent(form) {
        this.isLoadingResults = true;
        this.api.addStudent(form)
            .subscribe(res => {
                //const id = res['id'];
                //alerta
                const toastMessage = this.toastr.success('Estudante registrado com sucesso!', 'Oba :D');

                if(toastMessage){
                    toastMessage.onHidden.subscribe(() => {
                        this.isLoadingResults = false;
                        this.router.navigate(['/students']);
                    } )
                }
                //finalAlerta
           }, (err) => {
                console.log(err);
                this.onError(err);
                this.isLoadingResults = false;
            });
    }

    onError(fail) {
        this.toastr.error('Ocorreu um erro no processamento', 'Ops! :(');
        this.errors = fail.error.errors;
    }
}
