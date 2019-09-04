import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Users } from './models/users';
import { Teachers } from './models/teachers';
import { Courses } from './models/courses';
import { Students } from './models/students';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

/*const apiUrl = 'https://traineeprominas-bds-sandbox.herokuapp.com/api/v1.1/user';
const apiUrlTeacher = 'https://traineeprominas-bds-sandbox.herokuapp.com/api/v1.1/teacher';
const apiUrlCourse = 'https://traineeprominas-bds-sandbox.herokuapp.com/api/v1.1/course';
const apiUrlStudent = 'https://traineeprominas-bds-sandbox.herokuapp.com/api/v1.1/student';*/

const apiUrl = 'http://localhost:3000/api/v1.1/user';
const apiUrlTeacher = 'http://localhost:3000/api/v1.1/teacher';
const apiUrlCourse = 'http://localhost:3000/api/v1.1/course';
const apiUrlStudent = 'http://localhost:3000/api/v1.1/student';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(private http: HttpClient) { }

    /*Users*/
    getUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(`${apiUrl}/JSON`)
            .pipe(
                tap(userReturn => console.log('leu os usuários')),
                catchError(this.handleError('getUsers', []))
            );
    }
    getUser(id: number): Observable<Users> {
        const url = `${apiUrl}/JSON/${id}`;
        return this.http.get<Users>(url).pipe(
            tap(_ => console.log(`leu o usuário id=${id}`)),
            catchError(this.handleError<Users>(`getUser id=${id}`))
        );
    }
    addUser(user): Observable<Users> {
        return this.http.post<Users>(apiUrl, user, httpOptions).pipe(
            // tslint:disable-next-line:no-shadowed-variable
            tap((user: Users) => console.log(`adicionou o usuário com w/ id=${user.id}`)),
            catchError(this.handleError<Users>('addUser'))
        );
    }
    updateUser(id, user): Observable<any> {
        const url = `${apiUrl}/${id}`;
        return this.http.put(url, user, httpOptions).pipe(
            tap(_ => console.log(`atualizou o usuário com id=${id}`)),
            catchError(this.handleError<any>('updateUser'))
        );
    }
    deleteUser(id): Observable<Users> {
        const url = `${apiUrl}/${id}`;
        return this.http.delete<Users>(url, httpOptions).pipe(
            tap(_ => console.log(`remove o usuário com id=${id}`)),
            catchError(this.handleError<Users>('deleteUser'))
        );
    }
    /*Teachers*/
    getTeachers(): Observable<Teachers[]> {
        return this.http.get<Teachers[]>(`${apiUrlTeacher}/JSON`)
            .pipe(
                tap(userReturn => console.log('leu os professores')),
                catchError(this.handleError('getTeachers', []))
            );
    }
    getTeacher(id: number): Observable<Teachers> {
        const url = `${apiUrlTeacher}/JSON/${id}`;
        return this.http.get<Teachers>(url).pipe(
            tap(_ => console.log(`leu o professor id=${id}`)),
            catchError(this.handleError<Teachers>(`getTeacher id=${id}`))
        );
    }
    addTeacher(teacher): Observable<Teachers> {
        return this.http.post<Teachers>(apiUrlTeacher, teacher, httpOptions).pipe(
            // tslint:disable-next-line:no-shadowed-variable
            tap((teacher: Teachers) => console.log(`adicionou o professor com w/ id=${teacher.id}`)),
            catchError(this.handleError<Teachers>('addTeacher'))
        );
    }
    updateTeacher(id, teacher): Observable<any> {
        const url = `${apiUrlTeacher}/${id}`;
        return this.http.put(url, teacher, httpOptions).pipe(
            tap(_ => console.log(`atualizou o professor com id=${id}`)),
            catchError(this.handleError<any>('updateTeacher'))
        );
    }
    deleteTeacher(id): Observable<Teachers> {
        const url = `${apiUrlTeacher}/${id}`;
        return this.http.delete<Teachers>(url, httpOptions).pipe(
            tap(_ => console.log(`remove o professor com id=${id}`)),
            catchError(this.handleError<Teachers>('deleteTeacher'))
        );
    }
    /*Courses*/
    getCourses(): Observable<Courses[]> {
        return this.http.get<Courses[]>(`${apiUrlCourse}/JSON`)
            .pipe(
                tap(userReturn => console.log('leu os cursos')),
                catchError(this.handleError('getCourses', []))
            );
    }
    getCourse(id: number): Observable<Courses> {
        const url = `${apiUrlCourse}/JSON/${id}`;
        return this.http.get<Courses>(url).pipe(
            tap(_ => console.log(`leu o curso id=${id}`)),
            catchError(this.handleError<Courses>(`getTeacher id=${id}`))
        );
    }
    addCourse(course): Observable<Courses> {
        return this.http.post<Courses>(apiUrlCourse, course, httpOptions).pipe(
            // tslint:disable-next-line:no-shadowed-variable
            tap((course: Courses) => console.log(`adicionou o curso com w/ id=${course.id}`)),
            catchError(this.handleError<Courses>('addCourse'))
        );
    }
    updateCourse(id, course): Observable<any> {
        const url = `${apiUrlCourse}/${id}`;
        return this.http.put(url, course, httpOptions).pipe(
            tap(_ => console.log(`atualizou o curso com id=${id}`)),
            catchError(this.handleError<any>('updateCourse'))
        );
    }
    deleteCourse(id): Observable<Courses> {
        const url = `${apiUrlCourse}/${id}`;
        return this.http.delete<Courses>(url, httpOptions).pipe(
            tap(_ => console.log(`remove o curso com id=${id}`)),
            catchError(this.handleError<Courses>('deleteCourse'))
        );
    }
    /*Students*/
    getStudents(): Observable<Students[]> {
        return this.http.get<Students[]>(`${apiUrlStudent}/JSON`)
            .pipe(
                tap(userReturn => console.log('leu os cursos')),
                catchError(this.handleError('getStudents', []))
            );
    }
    getStudent(id: number): Observable<Students> {
        const url = `${apiUrlStudent}/JSON/${id}`;
        return this.http.get<Students>(url).pipe(
            tap(_ => console.log(`leu o estudante id=${id}`)),
            catchError(this.handleError<Students>(`getStudent id=${id}`))
        );
    }
    addStudent(student): Observable<Students> {
        return this.http.post<Students>(apiUrlStudent, student, httpOptions).pipe(
            // tslint:disable-next-line:no-shadowed-variable
            tap((student: Students) => console.log(`adicionou o estudante com w/ id=${student.id}`)),
            catchError(this.handleError<Students>('addStudent'))
        );
    }
    updateStudent(id, student): Observable<any> {

        const url = `${apiUrlStudent}/${id}`;
        console.log('entrou',url);
        return this.http.put(url, student, httpOptions).pipe(
            tap(_ => console.log(`atualizou o estudante com id=${id}`)),
            catchError(this.handleError<any>('updateStudent'))
        );
    }
    deleteStudent(id): Observable<Students> {
        const url = `${apiUrlStudent}/${id}`;
        return this.http.delete<Students>(url, httpOptions).pipe(
            tap(_ => console.log(`remove o estudante com id=${id}`)),
            catchError(this.handleError<Students>('deleteStudent'))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.error(error);

            return of(result as T);
        };
    }
}
