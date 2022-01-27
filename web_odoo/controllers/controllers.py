# -*- coding: utf-8 -*-
# from odoo import http


# class WebOdoo(http.Controller):
#     @http.route('/web_odoo/web_odoo', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/web_odoo/web_odoo/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('web_odoo.listing', {
#             'root': '/web_odoo/web_odoo',
#             'objects': http.request.env['web_odoo.web_odoo'].search([]),
#         })

#     @http.route('/web_odoo/web_odoo/objects/<model("web_odoo.web_odoo"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('web_odoo.object', {
#             'object': obj
#         })
