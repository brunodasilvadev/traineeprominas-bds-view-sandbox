import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

@Component({
    selector: 'app-teacher-new',
    templateUrl: './teachers-new.component.html',
    styleUrls: ['./teachers-new.component.scss']
})
export class TeacherNewComponent implements OnInit {

    teacherForm: FormGroup;
    phd = false;
    isLoadingResults = false;
    constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.teacherForm = this.formBuilder.group({
            name : [null, [Validators.required, Validators.minLength(2)]],
            lastName : [null, [Validators.required, Validators.minLength(2)]],
            phd : [null, Validators.requiredTrue]
        });
    }

    addTeacher(form: NgForm) {
        this.isLoadingResults = true;
        this.api.addTeacher(form)
            .subscribe(res => {
                const id = res['id'];
                this.isLoadingResults = false;
                this.router.navigate(['/teachers']);
            }, (err) => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }

}
