import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { ApiService } from '../../../api.service';
import { Students } from '../../../models/students';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

    displayedColumns: string[] = ['name', 'lastName', 'age', 'course', 'actionUpdate', 'action'];
    dataSource: MatTableDataSource<Students>;
    isLoadingResults = true;
    length = 10;
    pageSize = 8;

    constructor(private api: ApiService) { }

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    ngOnInit() {
        this.api.getStudents()
            .subscribe(res => {
                this.dataSource = new MatTableDataSource<Students>(res);
                this.dataSource.paginator = this.paginator;
                console.log(this.dataSource);
                this.isLoadingResults = false;
            }, err => {
                console.log(err);
                this.isLoadingResults = false;
            });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filterPredicate = (data, filter: string)  => {
            const accumulator = (currentTerm, key) => {
                return this.nestedFilterCheck(currentTerm, data, key);
            };
            const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
            // Transform the filter by converting it to lowercase and removing whitespace.
            const transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
        };
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    nestedFilterCheck(search, data, key) {
        if (typeof data[key] === 'object') {
            for (const k in data[key]) {
                if(k == 'name'){
                    if (data[key][k] !== null) {
                        search = this.nestedFilterCheck(search, data[key], k);
                    }
                }
            }
        } else {
            search += data[key];
        }
        return search;
    }

}
