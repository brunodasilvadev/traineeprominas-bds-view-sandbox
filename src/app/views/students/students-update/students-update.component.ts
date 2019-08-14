import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { Courses } from '../../../models/courses';

@Component({
    selector: 'app-student-update',
    templateUrl: './students-update.component.html',
    styleUrls: ['./students-update.component.scss']
})
export class StudentsUpdateComponent implements OnInit {
    id: number;
    studentForm: FormGroup;
    name: string;
    lastName: string;
    age: number;
    courses: Courses[];
    isLoadingResults = false;
    constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.api.getCourses()
            .subscribe(courses => this.courses = courses);

        this.getStudent(this.route.snapshot.params['id']);
        this.studentForm = this.formBuilder.group({
            name : [null, [Validators.required, Validators.minLength(2)]],
            lastName : [null, Validators.required],
            age : [null, [Validators.required, Validators.minLength(2)]],
            course: [null, [Validators.required]]
        });
    }

    getStudent(id) {
        this.api.getStudent(id).subscribe(data => {
            console.log(data);
            this.id = data.id;
            this.studentForm.setValue({
                name: data.name,
                lastName: data.lastName,
                age: data.age,
                course: data.course
            });
        });
    }

    updateStudent(form: NgForm) {
        this.isLoadingResults = true;
        this.api.updateStudent(this.id, form)
            .subscribe(res => {
                    this.isLoadingResults = false;
                    this.router.navigate(['/student-details/' + this.id]);
                }, (err) => {
                    console.log(err);
                    this.isLoadingResults = false;
                }
            );
    }
}
