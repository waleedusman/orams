from flask import (
    abort, current_app, jsonify, request, url_for
)
from flask_login import login_required
from app.api import api
from app.utils import (
    get_json_from_request, get_positive_int_or_400, get_valid_page_or_1, pagination_links
)
# from app.api.suppliers import get_supplier, update_supplier, list_suppliers
from app.api.helpers import role_required
from app.api.services import suppliers
from ...models import Supplier, SupplierFramework, SupplierContact, Contact


@api.route('/search/suppliers', methods=['GET'], endpoint='search_suppliers')
@login_required
@role_required('admin')
def find_suppliers():
    prefix = request.args.get('supplier_name_prefix')
    supplier_data = suppliers.find_suppliers(prefix)

    return jsonify(suppliers=supplier_data)
