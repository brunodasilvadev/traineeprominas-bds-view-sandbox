import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-users-new',
    templateUrl: './users-new.component.html',
    styleUrls: ['./users-new.component.scss']
})
export class UsersNewComponent implements OnInit {

    public errors: any[] = [];
    userForm: FormGroup;
    isLoadingResults = false;
    constructor(private router: Router,
                private api: ApiService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService)
                {}

    ngOnInit() {
        this.userForm = this.formBuilder.group({
            name : [null, [Validators.required, Validators.minLength(2)]],
            lastName : [null, [Validators.required, Validators.minLength(2)]],
            profile : [null, Validators.required]
        });
    }

    addUser(form: NgForm) {
        this.isLoadingResults = true;
        this.api.addUser(form)
            .subscribe(res => {
                const id = res['id'];

                //alerta
                const toastMessage = this.toastr.success('Usuário Registrado com Sucesso!', 'Oba :D');

                if(toastMessage){
                    toastMessage.onHidden.subscribe(() => {
                        this.isLoadingResults = false;
                        this.router.navigate(['/users']);
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
