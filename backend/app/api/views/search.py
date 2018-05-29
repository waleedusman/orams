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
    page = get_valid_page_or_1()
    prefix = request.args.get('supplier_name_prefix')
    
    results_per_page = get_positive_int_or_400(
        request.args,
        'per_page',
        current_app.config['DM_API_SUPPLIERS_PAGE_SIZE']
    )

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

    suppliers = suppliers.distinct(Supplier.name, Supplier.code)

    try:
        if results_per_page > 0:
            paginator = suppliers.paginate(
                page=page,
                per_page=results_per_page,
            )
            links = pagination_links(
                paginator,
                '.search_suppliers',
                request.args
            )
            supplier_results = paginator.items
        else:
            links = {
                'self': url_for('.search_suppliers', _external=True, **request.args),
            }
            supplier_results = suppliers.all()
        supplier_data = [supplier.serializable for supplier in supplier_results]
    except DataError:
        abort(400, 'invalid framework')
    return jsonify(suppliers=supplier_data, links=links)
