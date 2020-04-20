import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Teachers } from '../../../models/teachers';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-teacher-details',
    templateUrl: './teachers-details.component.html',
    styleUrls: ['./teachers-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {

    teachers: Teachers = { id: null, name: '', lastName: '', phd: null };
    isLoadingResults = true;
    constructor(private router: Router,
                private route: ActivatedRoute,
                private api: ApiService,
                private toastr: ToastrService) { }

    ngOnInit() {
        this.getTeacher(this.route.snapshot.params['id']);
    }

    getTeacher(id) {
        this.api.getTeacher(id)
            .subscribe(data => {
                this.teachers = data;
                console.log(this.teachers);
                this.isLoadingResults = false;
            });
    }

    deleteTeacher(id) {
        var option = confirm('Você tem certeza que deseja excluir este registro?');
        if(option){
            this.isLoadingResults = true;
            this.api.deleteTeacher(id)
                .subscribe(res => {
                        console.log(res);
                        const toastMessage = this.toastr.success(res.toString());
                        this.isLoadingResults = false;
                        this.router.navigate(['/teachers']);
                    }, (err) => {
                        console.log(err);
                        this.isLoadingResults = false;
                    }
                );
        }
    }
}
