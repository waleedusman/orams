from flask import (
    abort, current_app, jsonify, request, url_for
)
from flask_login import login_required
from sqlalchemy.exc import DataError
from sqlalchemy.sql import or_
from app.api import api
from app.utils import (
    get_json_from_request, get_positive_int_or_400, get_valid_page_or_1, pagination_links
)
# from app.api.suppliers import get_supplier, update_supplier, list_suppliers
from app.api.helpers import role_required
from ...models import Supplier, SupplierFramework, SupplierContact, Contact


@api.route('/search/suppliers', methods=['GET'], endpoint='search_suppliers')
@login_required
@role_required('admin')
def find_suppliers():
    orams_framework_id = 8
    prefix = request.args.get('supplier_name_prefix')

    suppliers = Supplier.query.join(Supplier.frameworks) \
        .filter(SupplierFramework.framework_id == orams_framework_id) \
        .filter(Supplier.abn.is_(None) | (Supplier.abn != Supplier.DUMMY_ABN)) \
        .filter(Supplier.status != 'deleted')

    if prefix:
        suppliers = suppliers.outerjoin(SupplierContact).outerjoin(Contact)
        # case insensitive LIKE comparison for matching supplier names, supplier email and contact email
        suppliers = suppliers.filter(or_(
            Supplier.name.ilike(prefix + '%'),
            Supplier.data['email'].astext.ilike('%{}%'.format(prefix)),
            Contact.email.ilike('%{}%'.format(prefix))
            ))

    suppliers = suppliers.distinct(Supplier.name, Supplier.code)\
        .order_by(Supplier.name)

    supplier_data = [supplier.serializable for supplier in suppliers.all()]

    return jsonify(suppliers=supplier_data)
