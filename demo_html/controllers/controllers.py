# -*- coding: utf-8 -*-
# from odoo import http


# class DemoHtml(http.Controller):
#     @http.route('/demo_html/demo_html', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/demo_html/demo_html/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('demo_html.listing', {
#             'root': '/demo_html/demo_html',
#             'objects': http.request.env['demo_html.demo_html'].search([]),
#         })

#     @http.route('/demo_html/demo_html/objects/<model("demo_html.demo_html"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('demo_html.object', {
#             'object': obj
#         })
