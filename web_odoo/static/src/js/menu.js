/** @odoo-module **/
import {registry} from "@web/core/registry";
const systrayRegistry = registry.category("systray");
const {Component} = owl;


class SystrayDemo extends Component {
    static template = 'odoo_web.demo'
    setup() {
        this.items = ['标签一','标签二','标签三','标签四']
    }
}


systrayRegistry.add("odoo_web.systray.demo",
    {
        Component: SystrayDemo,
    },
    {sequence: 100}
);