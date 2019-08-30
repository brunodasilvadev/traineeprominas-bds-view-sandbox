import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Teachers } from '../../models/teachers';
import { ApiService } from '../../api.service';

@Injectable()
export class TeachersResolver implements Resolve<Teachers[]> {
    constructor(private apiService: ApiService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<Teachers[]> {
        return this.apiService.getTeachers();
    }
}
