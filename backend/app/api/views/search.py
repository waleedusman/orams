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
    """Find suppliers by name prefix or email (role=admin)
    ---
    tags:
      - search
    security:
      - basicAuth: []
    parameters:
      - name: supplier_name_prefix
        in: path
        type: string
        required: true
    definitions:
      SupplierService:
        type: object
        properties:
          id:
            type: integer
          name:
            type: string
          subCategories:
            type: array
            items:
              $ref: '#/definitions/SupplierCategory'
      SupplierCategory:
        type: object
        properties:
          id:
            type: integer
          name:
            type: string
      Supplier:
        type: object
        properties:
          abn:
            type: string
          address_address_line:
            type: string
          address_country:
            type: string
          address_postal_code:
            type: string
          address_state:
            type: string
          address_suburb:
            type: string
          category_name:
            type: string
          code:
            type: string
          contact_email:
            type: string
          contact_name:
            type: string
          contact_phone:
            type: string
          email:
            type: string
          id:
            type: number
          linkedin:
            type: string
          name:
            type: string
          phone:
            type: string
          regions:
            type: array
            items:
                type: object
                properties:
                  name:
                    type: string
                  state:
                    type: string
          representative:
            type: string
          services:
            type: array
            items:
                $ref: '#/definitions/SupplierService'
          summary:
            type: string
          website:
            type: string
    responses:
      200:
        description: List of suppliers starting with prefix
        type: object
        properties:
            suppliers:
                type: array
                items:
                    $ref: '#/definitions/Supplier'
    """
    prefix = request.args.get('supplier_name_prefix')
    supplier_data = suppliers.find_suppliers(prefix)

    return jsonify(suppliers=supplier_data)
