/** @odoo-module **/
import {registry} from "@web/core/registry";

const {Component, useState} = owl;
const {xml} = owl.tags;

class DemoClient extends Component {
    static template = xml`
        <div>
            <button class="btn btn-success" t-on-click="btnClick">Click Me</button>
            <div t-foreach="users.list" t-as="user">
                <span>姓名：</span>
                <span t-esc="user.name"></span>
                <span style="margin-left: 10px;">年龄：</span>
                <span t-esc="user.age"></span>
            </div>
        </div>
    `;

    users = useState({'list': []});

    setup() {
        console.log('=====', DemoClient);
    }

    btnClick(e) {
        this.users.list.push({'name': '张三', 'age': 18})
    }
}

registry.category('actions').add('iym_test_one', DemoClient);

const reloadClient = function (env, action) {
    //重刷页面
    env.services['action'].doAction({
        'type': 'ir.actions.client',
        'tag': 'reload'
    })
}
registry.category('actions').add('iym_test_two', reloadClient)

const logoutClient = function (env, action) {
    //退出登录
    env.services['action'].doAction({
        'type': 'ir.actions.client',
        'tag': 'logout'
    })
}
registry.category('actions').add('iym_test_three', logoutClient)

const loadUserClient = function (env, action) {
    //退出登录
    env.services['action'].doAction({
        'type': 'ir.actions.act_window',
        'res_model': 'res.users',
        'views': [[false, 'list']],
        'name': '用户界面'
    })
}
registry.category('actions').add('iym_test_four', loadUserClient)

