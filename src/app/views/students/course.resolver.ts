import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Courses } from '../../models/courses';
import { ApiService } from '../../api.service';

@Injectable()
export class CourseResolver implements Resolve<Courses[]> {
    constructor(private apiService: ApiService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Courses[]> {
        return this.apiService.getCourses();
    }
}
