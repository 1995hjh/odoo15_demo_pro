/** @odoo-module **/
import {registry} from "@web/core/registry";
import {WarningDialog} from "@web/core/errors/error_dialogs";

export class IymErrorDialog extends WarningDialog {
    setup() {
        super.setup();
        this.title = '自定义错误演示标题';
        // this.inferTitle();
        const {data, message} = this.props;
        if (data && data.arguments && data.arguments.length > 0) {
            this.message = data.arguments[0];
        } else {
            this.message = message;
        }
    }

    // inferTitle() {
    //     if (this.props.exceptionName && odooExceptionTitleMap.has(this.props.exceptionName)) {
    //         this.title = odooExceptionTitleMap.get(this.props.exceptionName).toString();
    //     }
    // }
}

registry.category("error_dialogs").add("odoo.addons.web_odoo.models.demo.IymError", IymErrorDialog);