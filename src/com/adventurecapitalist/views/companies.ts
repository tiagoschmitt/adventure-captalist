import { View } from "../../gameclosure/views/view";
import { Game } from "../../gameclosure/game";
import { GameState } from "../store/gameState";
import { CompanyState } from "../store/companyState";
import { CompanyItem } from "../components/display/company/companyItem";
import { DisplayComponent } from "../../gameclosure/components/display/DisplayComponent";
import { Graphics, Text, TextStyle, Container } from "pixi.js";
import { ScrollContainer } from "../../gameclosure/utils/scrollContainer";
import { GraphicsUtil } from "../../gameclosure/utils/graphicsUtil";
import { Money } from "../../gameclosure/utils/money";

export class Companies extends View {
    private _totalText: Text;
    private _totalUnitText: Text;

    constructor() {
        super("companies", new ScrollContainer(200));
    }

    public show(): void {
        super.show();
        
        this.drawBackground();
        var companiesData: GameState = (Game.store.data as GameState);
        var company: DisplayComponent;
        var timeLine: TimelineLite = new TimelineLite();

        companiesData.companies.forEach((state: CompanyState, index: number) => {
            company = Game.displayFactory.create<CompanyItem>(state.id, CompanyItem);
            this.add(company);

            company.x = 30;
            company.y = 100 + (index * 120);

            timeLine.from(company.content, { y: company.y - 20, alpha: 0, duration: 0.1});
        });

        timeLine.play();

        this.createInterface();
    }

    public update(): void {
        super.update();

        var money: Money = new Money((Game.store.data as GameState).total);
        
        this._totalText.text = money.formatted;
        this._totalUnitText.text = money.unit;
    }

    protected createInterface(): void {
        var container: Container = new Container();
        this.content.parent.addChild(container);

        var bg: Graphics = GraphicsUtil.drawRect(Game.app.renderer.width, 80, 0x000000, 0.3);
        container.addChild(bg);

        var style = new TextStyle({
            fontFamily: "Arial",
            fontSize: 40,
            fill: "white"
        });

        this._totalText = new Text("", style);
        this._totalText.x = 40;
        this._totalText.y = 10;
        container.addChild(this._totalText);

        style = style.clone();
        style.fontSize = 20;

        this._totalUnitText = new Text("", style);
        this._totalUnitText.x = 40;
        this._totalUnitText.y = 50;
        container.addChild(this._totalUnitText);
    }

    protected drawBackground(): Graphics {
        var bg:Graphics = new Graphics(true);
        bg.beginFill(0x6fa2b3);
        bg.drawRect(0, 0, Game.app.renderer.width, Game.app.renderer.height);
        bg.endFill();

        (this.content as ScrollContainer).addChildToContainer(bg);

        return bg;
    }
}