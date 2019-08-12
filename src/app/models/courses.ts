import { Teachers } from './teachers';

export class Courses {
    id: number;
    name: string;
    period: number;
    teacher: Teachers[];
    city: string;
}
