import { DisplayComponent } from "../../../../gameclosure/components/display/DisplayComponent";
import { Game } from "../../../../gameclosure/game";
import { Sprite, Point, Graphics, filters, TextStyle } from "pixi.js";
import { CompanyState } from "../../../store/companyState";

export class InvestmentLogoButton extends DisplayComponent {
    private _investmentCounter: PIXI.Text;
    private _frame: Sprite;
    private _highlight: Graphics;
    private _state: CompanyState;
    
    constructor(id: string) {
        super(id);
    }
    
    protected draw() {
        this._state = Game.store.getState(this.id, "companies") as CompanyState;
        this._frame = Game.imageFactory.getImage("investmentFrame");
        
        this._highlight = new Graphics();
        this._highlight.beginFill(0x64cc47);
        this._highlight.drawCircle(0, 0, 82);
        this._highlight.x = 75;
        this._highlight.y = 75;
        this._highlight.visible = false;

        var bg: Graphics = new Graphics();
        bg.beginFill(0x3b79b8);
        bg.drawCircle(0, 0, 70);
        bg.x = 75;
        bg.y = 75;

        this.content.addChild(this._highlight);
        this.content.addChild(bg);
        this.content.addChild(this._frame);

        var logoImage: Sprite = Game.imageFactory.getImage(this.id);
        this.content.addChild(logoImage);

        logoImage.x = (this._frame.width - logoImage.width) / 2;
        logoImage.y = (this._frame.height - logoImage.height) / 2 - 21;
        
        var style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 35,
            fill: "white"
        });
        
        this._investmentCounter = new PIXI.Text("", style);
        this._investmentCounter.y = 108; 
        this.content.addChild(this._investmentCounter);
        
        this.content.scale = new Point(0.6, 0.6);

        this.addEvents();
    }

    public update() {
        this._investmentCounter.x = (this._frame.width - this._investmentCounter.width) / 2; 
        this._investmentCounter.text = this._state.owned ? this._state.owned.toString() : "";

        if (!this._state.progressStarted && !this._state.hasManager && this._state.owned > 0) {
            this._highlight.visible = true; 
        } else {
            this._highlight.visible = false;
        }
    }

    protected addEvents() {
        this.content.interactive = true;
        this.content.buttonMode = true;

        this.content.on("click", this.onClick.bind(this));
    }

    public onClick(e: any): void {
        this._state.progressStarted = true;
    }
}