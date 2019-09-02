import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../api.service';
import { Students } from '../../../models/students';

@Component({
    selector: 'app-student-details',
    templateUrl: './students-details.component.html',
    styleUrls: ['./students-details.component.scss']
})
export class StudentsDetailsComponent implements OnInit {

    students: Students = { id: null, name: '', lastName: '', age: null, course: null };
    isLoadingResults = true;
    constructor(private router: Router, private route: ActivatedRoute, private api: ApiService) { }

    ngOnInit() {
        this.getStudent(this.route.snapshot.params['id']);
    }

    getStudent(id) {
        this.api.getStudent(id)
            .subscribe(data => {
                this.students = data;
                console.log(this.students);
                this.isLoadingResults = false;
            });
    }

    deleteStudent(id) {
        var option = confirm('Você tem certeza que deseja excluir este registro?');
        if(option){
            this.isLoadingResults = true;
            this.api.deleteStudent(id)
                .subscribe(res => {
                        this.isLoadingResults = false;
                        this.router.navigate(['/students']);
                    }, (err) => {
                        console.log(err);
                        this.isLoadingResults = false;
                    }
                );
        }
    }

}
