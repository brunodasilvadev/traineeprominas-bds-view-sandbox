import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { Teachers } from '../../../models/teachers';

@Component({
    selector: 'app-course-update',
    templateUrl: './courses-update.component.html',
    styleUrls: ['./courses-update.component.scss']
})
export class CoursesUpdateComponent implements OnInit {
    id: number;
    courseForm: FormGroup;
    name: string;
    city: string;
    period: number;
    teachers: Teachers[];
    isLoadingResults = false;

    constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.api.getTeachers()
            .subscribe(teachers => this.teachers = teachers);

        this.getCourse(this.route.snapshot.params['id']);
        this.courseForm = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(2)]],
            period: [null, Validators.required],
            city: [null, [Validators.required, Validators.minLength(2)]],
            teacher: [null , Validators.required]
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
                teacher: data.teacher
            });
        });
    }

    updateCourse(form: NgForm) {
        this.isLoadingResults = true;
        this.api.updateCourse(this.id, form)
            .subscribe(res => {
                    this.isLoadingResults = false;
                    this.router.navigate(['/course-details/' + this.id]);
                }, (err) => {
                    console.log(err);
                    this.isLoadingResults = false;
                }
            );
    }
}
