/** @odoo-module **/
import {registry} from "@web/core/registry";
import {useService} from "@web/core/utils/hooks";

const {Component, useState} = owl;
const {xml} = owl.tags;

class DemoClient extends Component {
    static template = xml`
        <div>
            <button class="btn btn-success" t-on-click="btnClick">添加人员</button>
            <button class="btn btn-success" t-on-click="btnClick2('create')" style="margin: 20px;">rpc-create</button>
            <button class="btn btn-success" t-on-click="btnClick2('call')" style="margin: 20px;">rpc-call</button>
            <button class="btn btn-success" t-on-click="btnClick2('readGroup')" style="margin: 20px;">rpc-readGroup</button>
            <button class="btn btn-success" t-on-click="btnClick2('search')" style="margin: 20px;">rpc-search</button>
            <button class="btn btn-success" t-on-click="btnClick2('searchRead')" style="margin: 20px;">rpc-searchRead</button>
            <button class="btn btn-success" t-on-click="errClick('normal')" style="margin: 20px;">错误提示</button>
            <button class="btn btn-success" t-on-click="errClick('custom')" style="margin: 20px;">自定义错误提示</button>
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
        this.actionService = useService("action");
        this.orm = useService('orm');
        this.notification = this.env.services.notification
    }

    btnClick(e) {
        this.users.list.push({'name': '张三', 'age': 18})
    }

    btnClick2(type) {
        switch (type) {
            case 'create':
                //create演示
                this.orm.create("web_odoo.demo1", {
                    name: "张" + Math.random().toFixed(2) * 400 + 100,
                    'age': 22
                }).then((data) => {
                    console.log(data);
                    this.notification.add('create 演示', {type: "info"})
                })
                break;
            case 'call':
                //call演示
                this.orm.call('web_odoo.demo1', "read", [[3, 6], ['name', 'age']]).then((data) => {
                    console.log(data);
                    this.notification.add('call演示', {type: "info"})
                })
                break;
            case 'readGroup':
                // readGroup演示
                this.orm.readGroup("web_odoo.demo1", [["id", "in", [3, 4, 5]]], ["age:sum"], ["age"]).then((data) => {
                    console.log(data);
                    this.notification.add('readGroup演示', {type: "info"})
                })
                break;
            case 'search':
                // search演示
                this.orm.search("web_odoo.demo1", [["id", "in", [3, 4, 5]]]).then((data) => {
                    console.log(data);
                    this.notification.add('search演示', {type: "info"})
                })
                break;
            case 'searchRead':
                // searchRead演示
                this.orm.searchRead("web_odoo.demo1", [["id", "in", [3, 4, 5]]]).then((data) => {
                    console.log(data);
                    this.notification.add('searchRead演示', {type: "info"})
                })
                break;
        }
    }

    errClick(type) {
         switch (type) {
             case 'normal':
                 // error 错误机制演示
                 this.orm.call("web_odoo.demo1", "error_action").then((data) => {
                     console.log(data);
                     this.notification.add('error 错误机制演示', {type: "info"})
                 })
                 break;
             case 'custom':
                 // error 错误机制演示
                 this.orm.call("web_odoo.demo1", "error_custom_action").then((data) => {
                     console.log(data);
                     this.notification.add('error 错误机制演示', {type: "info"})
                 })
                 break;
         }
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
    //用户界面
    env.services['action'].doAction({
        'type': 'ir.actions.act_window',
        'res_model': 'res.users',
        'views': [[false, 'list']],
        'name': '用户界面'
    })
}
registry.category('actions').add('iym_test_four', loadUserClient)


const fncClient = async function (env, action) {
    let result = env.services['orm'].call(
        'web_odoo.demo1',
        'notify'
    ).then(() => {
        env.services['action'].doAction(result)
    })

}
registry.category('actions').add('FncClient', fncClient);

