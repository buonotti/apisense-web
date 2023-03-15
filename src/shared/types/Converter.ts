import {Degree} from "./Degree";

export function degreeComponentsToDegree(degree: Degree) {
    if (degree.degrees < 0) {
        return degree.degrees - (degree.minutes / 60 + degree.S / 3600);
    } else {
        return degree.degrees + degree.minutes / 60 + degree.S / 3600;
    }
}

export function degreeToDegreeComponents(degree: number) {
    let deg: Degree = {
        degrees: 0,
        minutes: 0,
        S: 0,
    };
    deg.degrees = Math.floor(degree);
    deg.minutes = Math.floor(((degree - deg.degrees) * 60));
    deg.S = Math.floor((degree - deg.degrees - deg.minutes) * 360);
    return deg;
}