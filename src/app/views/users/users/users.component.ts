import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {ApiService} from '../../../api.service';
import {Users} from '../../../models/users';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

    displayedColumns: string[] = ['name', 'lastName', 'profile', 'actionUpdate', 'action'];
    dataSource: MatTableDataSource<Users>;
    isLoadingResults = true;
    length = 10;
    pageSize = 8;

    constructor(private api: ApiService) {
    }

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    ngOnInit() {

        this.api.getUsers()
            .subscribe(res => {
                this.dataSource = new MatTableDataSource<Users>(res);
                this.dataSource.paginator = this.paginator;
                console.log(this.dataSource);
                this.isLoadingResults = false;
            }, err => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
