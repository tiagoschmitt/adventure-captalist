import { RouterOption, RouterOptionType } from "./routerOption";
import { View } from "../views/view";
import { Container } from "pixi.js";
import { Intro } from "../../adventurecapitalist/views/intro";

export class Router {
    private _container: Container;
    private _routeOptions: RouterOption[];
    private _previousRoute: RouterOption;
    private _currentRoute: RouterOption;
    private _nextRoute: RouterOption;

    constructor(container: Container, routeOptions: RouterOption[]) {
        this._container = container;
        this._routeOptions = routeOptions;    
    }

    public init(): void {
        this._routeOptions.forEach((option: RouterOption) => {
            if (option.isDefault) {
                this.show(option.path);
                return;
            }
        })
    }

    public update() {
        if (this._currentRoute != null) {
            this._currentRoute.componentRef.update();
        }
    }

    public show(path: string) {
        if (this._nextRoute == null) {
            var routeOption: RouterOption = this.getRouteOptionByPath(path);

            if (this._currentRoute != null && path != this._currentRoute.path) {
                if (routeOption.type == RouterOptionType.MODAL) {
                    this._previousRoute = this._currentRoute;
                    this._currentRoute = routeOption;

                    this.showContent();
                } else {
                    this._nextRoute = routeOption;
                    this._currentRoute.componentRef.hide();
                }
            } else {
                this._currentRoute = routeOption;
                this.showContent();
            }
        }
    }

    private close() {
        if (this._nextRoute != null) {
            this._previousRoute = this._currentRoute;
            this._currentRoute = this._nextRoute 
            this._nextRoute = null;
            
            this.removeContent(this._previousRoute);

        } else if (this._currentRoute.type == RouterOptionType.MODAL){
            this.removeContent(this._currentRoute);
            this._currentRoute = this._previousRoute;
        }
        
        this.showContent();
    }

    private showContent() {
        var view: View = this.getComponent(this._currentRoute);
        this._container.addChild(view.content);

        view.show();
    }

    private removeContent(routerOption: RouterOption) {
        let view: View = this.getComponent(routerOption);

        this._container.removeChild(view.content);
    }

    private getComponent(option: RouterOption): View {
        if (option.componentRef != null) {
            return option.componentRef;
        }
        
        option.componentRef = new option.component();
        option.componentRef.on(ViewEvent.VIEW_DESTROYED, this.close.bind(this));

        return option.componentRef;
    }

    private getRouteOptionByPath(path: string): RouterOption {
        for (var option of this._routeOptions) {
            if (option.path == path) {
                return option;
            }
        }
  
        return null;
    }

    
}