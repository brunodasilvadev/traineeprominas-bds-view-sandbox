import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

@Component({
    selector: 'app-teacher-update',
    templateUrl: './teachers-update.component.html',
    styleUrls: ['./teachers-update.component.scss']
})
export class TeacherUpdateComponent implements OnInit {
    id: number;
    teacherForm: FormGroup;
    name: string;
    lastName: string;
    phd: boolean;
    isLoadingResults = false;

    constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.getTeacher(this.route.snapshot.params['id']);
        this.teacherForm = this.formBuilder.group({
            name : [null, [Validators.required, Validators.minLength(2)]],
            lastName : [null, [Validators.required, Validators.minLength(2)]],
            phd : [null, Validators.required]
        });
    }

    getTeacher(id) {
        this.api.getTeacher(id).subscribe(data => {
            this.id = data.id;
            this.teacherForm.setValue({
                name: data.name,
                lastName: data.lastName,
                phd: data.phd
            });
        });
    }

    updateTeacher(form: NgForm) {
        this.isLoadingResults = true;
        this.api.updateTeacher(this.id, form)
            .subscribe(res => {
                    this.isLoadingResults = false;
                    this.router.navigate(['/teacher-details/' + this.id]);
                }, (err) => {
                    console.log(err);
                    this.isLoadingResults = false;
                }
            );
    }
}
