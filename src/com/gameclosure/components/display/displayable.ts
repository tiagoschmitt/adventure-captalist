import { DisplayObject } from "pixi.js";
import { Positionable } from "../positionable";

export interface Displayable extends Positionable {
    id: string;
    content:DisplayObject;
}