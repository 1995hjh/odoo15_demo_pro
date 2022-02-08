from odoo import models, api, fields, exceptions


class IymError(exceptions.ValidationError):
    """自定义错误弹框
        """


class Demo(models.TransientModel):
    _name = 'web_odoo.demo1'
    _description = 'first model test'

    name = fields.Char(string='名称')
    age = fields.Integer(string="年龄")

    @api.model
    def notify(self):
        return {
            'type': 'ir.actions.client',
            'tag': 'display_notification',
            'params': {
                'type': 'warning',
                'message': 'i am client',
                'next': {
                    'type': 'ir.actions.act_window',
                    'name': 'Next',
                    'res_model': 'res.users',
                    'view_type': 'list',
                    'target': 'new',
                    'views': [[False, 'list']]
                }
            }
        }

    @api.model
    def action_server(self):
        return {
            'type': 'ir.actions.client',
            'name': 'Demo Client',
            'tag': "logout",
            'params': {}
        }

    @api.model
    def error_action(self):
        '''
        抛错方法
        :return:
        '''
        raise exceptions.ValidationError('演示抛错！！！')

    @api.model
    def error_custom_action(self):
        raise IymError('错误内容')
