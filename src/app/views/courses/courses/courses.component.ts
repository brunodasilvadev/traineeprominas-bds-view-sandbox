import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { ApiService } from '../../../api.service';
import { Courses } from '../../../models/courses';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss']
})

export class CoursesComponent implements OnInit {

    displayedColumns: string[] = ['name', 'city', 'period', 'teacher', 'action', 'actionUpdate'];
    dataSource: MatTableDataSource<Courses>;
    isLoadingResults = true;
    length = 10;
    pageSize = 8;
    globalFilter = '';

    constructor(private api: ApiService) { }

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    ngOnInit() {
        this.api.getCourses()
            .subscribe(res => {
                this.dataSource = new MatTableDataSource<Courses>(res);
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
            for(let i = 0; i < data[key].length; i++){
                for (const k in data[key][i]) {
                    if(k == 'name'){
                        if (data[key][k] !== null) {
                            search = this.nestedFilterCheck(search, data[key][i], k);
                        }
                    }
                }
            }
        } else {
            search += data[key];
        }
        return search;
    }

}
