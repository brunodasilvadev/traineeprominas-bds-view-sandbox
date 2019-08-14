import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../../api.service';

@Component({
    selector: 'app-users-new',
    templateUrl: './users-new.component.html',
    styleUrls: ['./users-new.component.scss']
})
export class UsersNewComponent implements OnInit {

    userForm: FormGroup;
    isLoadingResults = false;
    constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

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
                this.isLoadingResults = false;
                this.router.navigate(['/users']);
            }, (err) => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }
}
