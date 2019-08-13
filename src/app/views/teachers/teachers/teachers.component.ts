import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {ApiService} from '../../../api.service';
import {Teachers} from '../../../models/teachers';

@Component({
    selector: 'app-teachers',
    templateUrl: './teachers.component.html',
    styleUrls: ['./teachers.component.scss']
})

export class TeachersComponent implements OnInit {

    displayedColumns: string[] = ['name', 'actionUpdate', 'action'];
    dataSource: MatTableDataSource<Teachers>;
    isLoadingResults = true;
    length = 10;
    pageSize = 8;

    constructor(private api: ApiService) {
    }

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    ngOnInit() {

        this.api.getTeachers()
            .subscribe(res => {
                this.dataSource = new MatTableDataSource<Teachers>(res);
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
