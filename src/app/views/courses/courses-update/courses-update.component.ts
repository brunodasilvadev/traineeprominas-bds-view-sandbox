import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { Teachers } from '../../../models/teachers';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-course-update',
    templateUrl: './courses-update.component.html',
    styleUrls: ['./courses-update.component.scss']
})
export class CoursesUpdateComponent implements OnInit {

    public errors: any[] = [];
    id: number;
    courseForm: FormGroup;
    name: string;
    city: string;
    period: number;
    teachers: Teachers[] = [];
    isLoadingResults = false;

    constructor(private router: Router, 
                private route: ActivatedRoute, 
                private api: ApiService, 
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private toastr: ToastrService) {
        this.teachers = this.activatedRoute.snapshot.data.Teachers;
    }

    ngOnInit() {
        // this.api.getTeachers()
        //     .subscribe(teachers => this.teachers = teachers);

        this.getCourse(this.route.snapshot.params['id']);
        this.courseForm = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2)]],
            period: [null],
            city: [null, [Validators.required, Validators.minLength(2)]],
            teacher: [[], [Validators.required, Validators.minLength(2)]]

        });
    }

    getCourse(id) {
        this.api.getCourse(id).subscribe(data => {
            console.log(data);
            this.id = data.id;
            this.courseForm.setValue({
                name: data.name,
                period: data.period,
                city: data.city,
                teacher: this.teachers
            });
            console.log('1')
            var index = [];
            data.teacher.forEach(function(item)
            {
                console.log(item.id);
                var index2 = {};
                index2 = item.id.toString();
                index.push(index2);
            });
            console.log('2',index)

            this.courseForm.get('teacher').setValue(index);
        });
    }

    updateCourse(form) {
        this.isLoadingResults = true;

        this.api.updateCourse(this.id, form)
            .subscribe(res => {

                //alerta
                const toastMessage = this.toastr.success('Curso alterado com sucesso!', 'Oba :D');

                if(toastMessage){
                    toastMessage.onHidden.subscribe(() => {
                        this.isLoadingResults = false;
                        this.router.navigate(['/course-details/' + this.id]);
                    } )
                }
                //finalAlerta

                }, (err) => {
                    console.log(err);
                    this.onError(err);
                    this.isLoadingResults = false;
                }
            );
    }

    onError(fail) {
        this.toastr.error('Ocorreu um erro no processamento', 'Ops! :(');
        this.errors = fail.error.errors;
    }

}
