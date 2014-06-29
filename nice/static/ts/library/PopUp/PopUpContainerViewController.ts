/// <reference path="../../typings/tsd.d.ts" />
import $ = require('jquery');
import BrowserEvents = require('../Core/BrowserEvents');
import PopUpCommon = require('./PopUpCommon');
import PopUpView = require('./PopUpView');
import View = require('../CoreUI/View');
import ViewController = require('../CoreUI/ViewController');

enum PopUpType { main, detached };

class PopUpContainerViewController extends ViewController
{
    constructor(view)
    {
        super(view);
        this.view.attachEventHandler(BrowserEvents.Events.mouseDown, PopUpCommon.CssSelector, (ev: JQueryEventObject) =>
                {
                    ev.preventDefault();
                    var popUpView : PopUpView = <PopUpView> PopUpView.fromJQuery($(ev.target));
                    this.giveFocus(popUpView);
                });
    }

    /**
     * Give focus to its PopUpView and cause all other PopUps to lose focus
     */
    public giveFocus(toBeFocused : PopUpView) : void
    {
        // find a way to get all popups
        this.map((popUpView : PopUpView) => {
            popUpView === toBeFocused ? popUpView.focusView() : popUpView.blurView();
        });
    }

    public map(apply : (popUpView : PopUpView) => any) : void
    {
        // TODO must be overridden to support sidebar
        $.each(this.view.children, (index : number, childView : View) => {
            if (childView instanceof PopUpView)
            {
                return apply(<PopUpView>childView);
            }
        });
    }

    public getPopUpById(popUpId : number) : PopUpView
    {
        var ret = null;
        this.map((popUpView : PopUpView) => {
            if (popUpView.popUpId === popUpId)
            {
                ret = popUpView;
                return false;
            }
        });
        return ret;
    }
}
