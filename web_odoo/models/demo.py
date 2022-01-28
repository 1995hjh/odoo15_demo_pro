from odoo import models, api


class Demo(models.TransientModel):
    _name = 'odoo_web.demo.one'

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
