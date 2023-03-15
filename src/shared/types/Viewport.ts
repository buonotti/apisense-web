import type {Galaxy} from "./Galaxy";
import {AzimuthalCoordinate} from "./AzimuthalCoordinate";
import {EquatorialCoordinate} from "./EquatorialCoordinate";

export interface Viewport {
    equatorialPosition: EquatorialCoordinate;
    azimuthalPosition: AzimuthalCoordinate;
    galaxies: Galaxy[];
    viewportEdges: ViewportEdges;

}

export interface ViewportEdges {
    topLeft: AzimuthalCoordinate;
    topRight: AzimuthalCoordinate;
    bottomLeft: AzimuthalCoordinate;
    bottomRight: AzimuthalCoordinate;
    azimuthalPos: AzimuthalCoordinate;
}