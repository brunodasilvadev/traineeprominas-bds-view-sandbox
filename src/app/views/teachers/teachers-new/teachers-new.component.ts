import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-teacher-new',
    templateUrl: './teachers-new.component.html',
    styleUrls: ['./teachers-new.component.scss']
})
export class TeacherNewComponent implements OnInit {

    public errors: any[] = [];
    teacherForm: FormGroup;
    phd = false;
    isLoadingResults = false;
    constructor(private router: Router,
                private api: ApiService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService) { }

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

                //alerta
                const toastMessage = this.toastr.success('Professor registrado com sucesso!', 'Oba :D');

                if(toastMessage){
                    toastMessage.onHidden.subscribe(() => {
                        this.isLoadingResults = false;
                        this.router.navigate(['/teachers']);
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
