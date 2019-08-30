import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { Teachers } from '../../../models/teachers';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-course-new',
    templateUrl: './courses-new.component.html',
    styleUrls: ['./courses-new.component.scss']
})
export class CoursesNewComponent implements OnInit {

    public errors: any[] = [];
    courseForm: FormGroup;
    isLoadingResults = false;
    teachers: Teachers[];
    constructor(private router: Router,
                private api: ApiService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService) { }

    ngOnInit() {
        this.courseForm = this.formBuilder.group({
            name : [null, [Validators.required, Validators.minLength(2)]],
            period : [null, Validators.required],
            city : [null, [Validators.required, Validators.minLength(2)]],
            teacher: [[], [Validators.required, Validators.minLength(2)]]
        });

        this.api.getTeachers()
            .subscribe(teachers => this.teachers = teachers);
    }

    addCourse(form: NgForm) {
        this.isLoadingResults = true;
        console.log(form);

        this.api.addCourse(form)
            .subscribe(res => {
                const id = res['id'];
                //alerta
                const toastMessage = this.toastr.success('Curso registrado com sucesso!', 'Oba :D');

                if(toastMessage){
                    toastMessage.onHidden.subscribe(() => {
                        this.isLoadingResults = false;
                        this.router.navigate(['/courses']);
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
