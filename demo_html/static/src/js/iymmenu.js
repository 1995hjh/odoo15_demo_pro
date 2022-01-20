/** @odoo-module **/
import SystrayMenu from "web.SystrayMenu";
import Widget from "web.Widget";

class IymMenu extends owl.Component {
    static  template = 'demo_html.IymMenuWidget'

    onTogglerClick(ev) {
        alert(ev.target.outerText)
    }
}
SystrayMenu.Items.push(IymMenu)


/*const IymMenu = Widget.extend({
    template: 'demo_html.IymMenuWidget'
})*/
/*
odoo.define("demo_html.iymmenu", function (require) {
    //引入模块
    const SystrayMenu = require('web.SystrayMenu');
    const Widget = require('web.Widget');
    const IymMenu = Widget.extend({
        template: 'demo_html.IymMenuWidget'
    })
    SystrayMenu.Items.push(IymMenu)
});
*/
