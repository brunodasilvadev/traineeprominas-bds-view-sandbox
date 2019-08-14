import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';

@Component({
    templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent implements OnInit {

    // Charts
    public guess = 0;
    public admin = 0;
    public barChartOptions;
    public barChartLabels;
    public barChartType;
    public barChartLegend;
    public barChartData;

    // Pie
    public student = [];
    public course = [];
    public pieChartLabels;
    public pieChartData;
    public pieChartType;

    constructor(private api: ApiService) {
    }

    ngOnInit() {

        this.api.getUsers()
            .subscribe(response => {
                response.forEach(user => {
                    if (user.profile == 'guess')
                        this.guess = this.guess + 1;
                    if (user.profile == 'admin')
                        this.admin = this.admin + 1;
                });
                this.chart();
            }, err => {
                console.log(err);
            });

      this.api.getCourses()
          .subscribe(response => {
            response.forEach(courseResponse => {
              this.course.push(courseResponse.name)

              this.api.getStudents()
                  .subscribe(res => {
                    let quantity = 0;
                    res.forEach(students => {
                      if(courseResponse.id == students.course.id) quantity = quantity+1;
                    });
                    this.student.push(quantity);
                  })
            });

            this.pie();
          }, err => {
            console.log(err);
          });
    }

    chart() {
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['Tipos de usuários'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            {data: [this.admin, 0], label: 'Administradores'},
            {data: [this.guess, 0], label: 'Visitantes'}
        ];
    }

    pie() {
        this.pieChartLabels = this.course;
        this.pieChartData = this.student;
        this.pieChartType = 'pie';
    }
}
