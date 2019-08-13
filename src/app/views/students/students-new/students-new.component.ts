import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Courses } from '../../../models/courses';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {ApiService} from '../../../api.service';

@Component({
    selector: 'app-student-new',
    templateUrl: './students-new.component.html',
    styleUrls: ['./students-new.component.scss']
})
export class StudentNewComponent implements OnInit {

    studentForm: FormGroup;
    isLoadingResults = false;
    courses: Courses[];

    constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

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

    addStudent(form: NgForm) {
        this.isLoadingResults = true;
        this.api.addStudent(form)
            .subscribe(res => {
                const id = res['id'];
                this.isLoadingResults = false;
                this.router.navigate(['/students']);
            }, (err) => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }

}
