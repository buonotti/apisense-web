import type {EquatorialCoordinate} from "./EquatorialCoordinate";
import type {AzimuthalCoordinate} from "./AzimuthalCoordinate";

export interface Galaxy {
    morphology: string;
    id: number;
    preferredName: string;
    magnitude: number;
    equatorialCoordinates: EquatorialCoordinate;
    azimuthalCoordinates: AzimuthalCoordinate;
    semiMajorAxis: number;
    semiMinorAxis: number;
    distance: number;
    quality: number;
}