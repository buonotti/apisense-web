import type {Galaxy} from "./Galaxy";
import type {Viewport} from "./Viewport";

export interface GalaxyResponse {
    total: number;
    galaxies: Galaxy[];
    viewports: Viewport[];
}