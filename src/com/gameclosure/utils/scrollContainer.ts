import { Container, Graphics, DisplayObject } from "pixi.js";
import { Game } from "../game";

/* globals TweenMax, Quad, Back, Elastic */

/*
 * Original implementation: https://codepen.io/wiledal/pen/ZYoNEa?editors=0010
 * Requires GreenSockss GSAP 2.0.1
 * Works with PixiJS 4.7.3
 */

export class ScrollContainer extends Container {
    public scrollContainer: Container;
    public x: number;
    public y: number;
    public height: number;
    public itemHeight: number;
    public containerMask: Graphics;
    public isMouseDown: boolean;
    public lastPos: any;
    public lastDiff: number;
    public scrollTween: TweenMax;
    public offset: number;

    constructor(offset: number) {
        super();

        this.offset = offset;

        this.scrollContainer = new Container();
        super.addChild(this.scrollContainer);

        this.containerMask = new Graphics();
        this.containerMask
            .beginFill(0x000000)
            .drawRect(this.x, this.y, Game.app.renderer.width, Game.app.renderer.height)
            .endFill();

        super.addChild(this.containerMask);
        this.scrollContainer.mask = this.containerMask;

        this.isMouseDown = false;
        this.lastPos = null;
        this.lastDiff = null;
        this.scrollTween = null;

        this.interactive = true;
        this.on("mousemove", this.onmousemove.bind(this));
        this.on("mousedown", this.onmousedown.bind(this));
        this.on("mouseup", this.onmouseup.bind(this));
        this.on("mouseupoutside", this.onmouseup.bind(this));
        this.on("touchmove", this.onmousemove.bind(this));
        this.on("touchstart", this.onmousedown.bind(this));
        this.on("touchend", this.onmouseup.bind(this));
        this.on("touchendoutside", this.onmouseup.bind(this));
    }

    onmousemove(e: any): void {
        const { originalEvent } = e.data;
        var clientY = !originalEvent.touches ? originalEvent.clientY : originalEvent.touches[0].clientY;

        if (this.isMouseDown) {
            this.lastDiff = clientY - this.lastPos.y;
            this.lastPos.y = clientY;

            if (-this.scrollContainer.y < 0) {
                this.scrollContainer.y += this.lastDiff / 2;
            } else {
                this.scrollContainer.y += this.lastDiff;
            }
        }
    }

    onmousedown(e: any): void {
        const { originalEvent } = e.data;
        const clientY = !originalEvent.touches ? originalEvent.clientY : originalEvent.touches[0].clientY;
        this.isMouseDown = true;

        if (this.scrollTween) {
            this.scrollTween.kill();
        }

        this.lastPos = {
            y: clientY
        };
    }

    onmouseup(e: any): void {
        if (this.lastDiff) {
            let goY = this.scrollContainer.y + this.lastDiff * 10;
            let ease = Quad.easeOut;
            let time = Math.abs(this.lastDiff / 150);
            if (goY < -this.scrollContainer.height - this.offset + this.containerMask.height + this.y) {
                goY = -this.scrollContainer.height - this.offset + this.containerMask.height + this.y;
            }

            if (goY > this.y) {
                goY = this.y;
            }

            ease = Back.easeOut;
            time = 0.5;

            this.scrollTween = TweenMax.to(this.scrollContainer, time, {
                y: goY,
                ease
            });
        }

        this.isMouseDown = false;
        this.lastPos = null;
        this.lastDiff = null;
    }

    public addChild(child:PIXI.DisplayObject):PIXI.DisplayObject;
    public addChild(...child: PIXI.DisplayObject[]): PIXI.DisplayObject[];
    public addChild(child:PIXI.DisplayObject | PIXI.DisplayObject[]):PIXI.DisplayObject | PIXI.DisplayObject[] {
        return this.scrollContainer.addChild(child as Container);
    }

    public addChildToContainer(child: DisplayObject): DisplayObject {
        return super.addChildAt(child, 0);
    }
}