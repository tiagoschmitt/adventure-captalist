import { Game } from "../../../../gameclosure/game";
import { DisplayComponent } from "../../../../gameclosure/components/display/DisplayComponent";
import { InvestmentLogoButton } from "./investmentLogoButton";
import { InvestmentProgressBar } from "./investmentProgressBar";
import { InvestmentBuyButton } from "./investmentBuyButton";
import { InvestmentTimer } from "./investmentTimer";
import { BuyButton } from "./buyButton";
import { HireManagerButton } from "./hireManagerButton";

export class CompanyItem extends DisplayComponent {
    constructor(id: string) {
        super(id);
    }

    protected draw() {
        var logo: InvestmentLogoButton = Game.displayFactory.create<InvestmentLogoButton>(this.id, InvestmentLogoButton);
        this.add(logo);

        var progressBar: InvestmentProgressBar = Game.displayFactory.create<InvestmentProgressBar>(this.id, InvestmentProgressBar);
        this.add(progressBar);
        progressBar.x = 100;

        var buy: InvestmentBuyButton = Game.displayFactory.create<InvestmentBuyButton>(this.id, InvestmentBuyButton);
        this.add(buy);
        buy.x = 100;
        buy.y = 35;

        var timer: InvestmentTimer = Game.displayFactory.create<InvestmentTimer>(this.id, InvestmentTimer);
        this.add(timer);
        timer.x = 252;
        timer.y = 35;

        var hireManagerBtn: HireManagerButton = Game.displayFactory.create<HireManagerButton>(this.id, HireManagerButton);
        this.add(hireManagerBtn);
        hireManagerBtn.x = 315;
        hireManagerBtn.y = 0;

        var buyBtn: BuyButton = Game.displayFactory.create<BuyButton>(this.id, BuyButton);
        //this.add(buyBtn);
        buyBtn.x = 150;
        buyBtn.y = 8;
    }
}