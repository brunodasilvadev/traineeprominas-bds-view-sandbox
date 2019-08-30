import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-users-update',
    templateUrl: './users-update.component.html',
    styleUrls: ['./users-update.component.scss']
})
export class UsersUpdateComponent implements OnInit {

    public errors: any[] = [];
    id: number;
    userForm: FormGroup;
    name: string;
    lastName: string;
    profile: boolean;
    isLoadingResults = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private api: ApiService,
                private formBuilder: FormBuilder,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        this.getUser(this.route.snapshot.params['id']);
        this.userForm = this.formBuilder.group({
            name: [null, Validators.required],
            lastName: [null, Validators.required],
            profile: [null, Validators.required]
        });
    }

    getUser(id) {
        this.api.getUser(id).subscribe(data => {
            this.id = data.id;
            console.log(data);
            this.userForm.setValue({
                name: data.name,
                lastName: data.lastName,
                profile: data.profile
            });
        });
    }

    updateUser(form: NgForm) {
        this.isLoadingResults = true;
        this.api.updateUser(this.id, form)
            .subscribe(res => {
                    //alerta
                    const toastMessage = this.toastr.success('Usuário Atualizado com Sucesso!', 'Oba :D');

                    if(toastMessage){
                        toastMessage.onHidden.subscribe(() => {
                            this.isLoadingResults = false;
                            this.router.navigate(['/users-details/' + this.id]);
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
