import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Courses } from '../../../models/courses';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-course-details',
    templateUrl: './courses-details.component.html',
    styleUrls: ['./courses-details.component.scss']
})
export class CoursesDetailsComponent implements OnInit {

    courses: Courses = { id: null, name: '', period: null, city: '', teacher: null };
    isLoadingResults = true;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private api: ApiService,
                private toastr: ToastrService) { }

    ngOnInit() {
        this.getCourse(this.route.snapshot.params['id']);
    }

    getCourse(id) {
        this.api.getCourse(id)
            .subscribe(data => {
                this.courses = data;
                console.log(this.courses);
                this.isLoadingResults = false;
            });
    }

    deleteCourse(id) {
        var option = confirm('Você tem certeza que deseja excluir este registro?');
        if(option){
            this.isLoadingResults = true;
            this.api.deleteCourse(id)
                .subscribe(res => {
                        const toastMessage = this.toastr.success(res.toString());
                        this.isLoadingResults = false;
                        this.router.navigate(['/courses']);
                    }, (err) => {
                        console.log(err);
                        this.isLoadingResults = false;
                    }
                );
        }
    }
}
