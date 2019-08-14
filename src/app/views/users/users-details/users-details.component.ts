import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Users } from '../../../models/users';

@Component({
    selector: 'app-users-details',
    templateUrl: './users-details.component.html',
    styleUrls: ['./users-details.component.scss']
})
export class UsersDetailsComponent implements OnInit {

    users: Users = { id: null, name: '', lastName: '', profile: '' };
    isLoadingResults = true;
    constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }


    ngOnInit() {
        this.getUser(this.route.snapshot.params['id']);
    }

    getUser(id) {
        this.api.getUser(id)
            .subscribe(data => {
                this.users = data;
                console.log(this.users);
                this.isLoadingResults = false;
            });
    }

    deleteUser(id) {
        this.isLoadingResults = true;
        this.api.deleteUser(id)
            .subscribe(res => {
                    this.isLoadingResults = false;
                    this.router.navigate(['/users']);
                }, (err) => {
                    console.log(err);
                    this.isLoadingResults = false;
                }
            );
    }
}
