import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { Courses } from '../../../models/courses';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-student-update',
    templateUrl: './students-update.component.html',
    styleUrls: ['./students-update.component.scss']
})
export class StudentsUpdateComponent implements OnInit {

    public errors: any[] = [];
    id: number;
    studentForm: FormGroup;
    name: string;
    lastName: string;
    age: number;
    courses: Courses[] = [];
    isLoadingResults = false;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private api: ApiService,
                private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private toastr: ToastrService) {
        this.courses = this.activatedRoute.snapshot.data.Courses;
        //console.log(Courses);
    }

    ngOnInit() {
       /* this.api.getCourses()
            .subscribe(courses => this.courses = courses);*/

        this.getStudent(this.route.snapshot.params['id']);
        this.studentForm = this.formBuilder.group({
            name : ['', [Validators.required, Validators.minLength(2)]],
            lastName : ['', Validators.required],
            age : ['', [Validators.required, Validators.minLength(2)]],
            course: [[], [Validators.required]]
        });
    }

    getStudent(id) {
        this.api.getStudent(id).subscribe(data => {
            console.log(data, this.courses);
            this.id = data.id;
            this.studentForm.setValue({
                name: data.name,
                lastName: data.lastName,
                age: data.age,
                /*course: data.course*/
                course: this.courses.find(c => c.id === data.course.id)
            });
        });
    }

    updateStudent(form) {
        this.isLoadingResults = true;

        const newStudent = {
            name: form.name,
            lastName: form.lastName,
            age: form.age,
            course: form.course.id

        };


        this.api.updateStudent(this.id, newStudent)
            .subscribe(res => {

                //alerta
                const toastMessage = this.toastr.success('Estudante atualizado com sucesso!', 'Oba :D');

                if(toastMessage){
                    toastMessage.onHidden.subscribe(() => {
                        this.isLoadingResults = false;
                        this.router.navigate(['/students-details/' + this.id]);
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
