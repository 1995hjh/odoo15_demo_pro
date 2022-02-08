/** @odoo-module **/
import {registry} from "@web/core/registry";
import {useService} from "@web/core/utils/hooks";

const {Component, useState} = owl;

class TableClient extends Component {
    static template = 'web_odoo.table';

    constructor() {
        super(...arguments);
        this.users = useState([])
    }

    setup() {
        this.orm = useService('orm')
        this.actionService = useService("action");
    }

    async willStart() {
        this.users = await this.orm.searchRead("web_odoo.demo1", [])
    }

    btnClick(id, name) {
        this.actionService.doAction({
            type: 'ir.actions.act_window',
            res_model: 'web_odoo.demo1',
            views: [[false, 'form']],
            name: name + '的信息',
            res_id: id,
            target: 'new'
        })
    }
}

registry.category('actions').add('table_client', TableClient);