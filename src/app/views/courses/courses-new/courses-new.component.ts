import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { Teachers } from '../../../models/teachers';

@Component({
    selector: 'app-course-new',
    templateUrl: './courses-new.component.html',
    styleUrls: ['./courses-new.component.scss']
})
export class CoursesNewComponent implements OnInit {

    courseForm: FormGroup;
    isLoadingResults = false;
    teachers: Teachers[];
    constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.courseForm = this.formBuilder.group({
            name : [null, [Validators.required, Validators.minLength(2)]],
            period : [null, Validators.required],
            city : [null, [Validators.required, Validators.minLength(2)]],
            teacher: ['', Validators.required]
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
                this.isLoadingResults = false;
                this.router.navigate(['/courses']);
            }, (err) => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }
}
