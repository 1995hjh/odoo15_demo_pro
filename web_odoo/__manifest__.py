# -*- coding: utf-8 -*-
{
    'name': "web_odoo",

    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com""",

    'description': """
        Long description of module's purpose
    """,

    'author': "My Company",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/14.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base'],

    # always loaded
    'data': [
        # 'security/ir.model.access.csv',
        'views/iym_client.xml',
    ],
    # only loaded in demonstration mode
    'demo': [

    ],
    'assets': {
        'web.assets_backend': [
            'web_odoo/static/src/scss/menu.scss',
            'web_odoo/static/src/js/iym_client.js',
            'web_odoo/static/src/js/menu.js'
        ],
        'web.assets_qweb': ['web_odoo/static/src/xml/*']
    }
}
