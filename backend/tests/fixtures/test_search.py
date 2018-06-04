import json
from app.models import Supplier


def test_require_admin_role_for_search(client, suppliers):
    response = client.get('/2/search/suppliers')
    assert response.status_code == 401


def test_search_suppliers_all(client, admin_users, suppliers):
    res = client.post('/2/login', data=json.dumps({
        'emailAddress': 'testadmin@digital.gov.au', 'password': 'testpassword'
    }), content_type='application/json')
    assert res.status_code == 200

    response = client.get('/2/search/suppliers')
    assert response.status_code == 200

    data = json.loads(response.data)
    found_suppliers = data['suppliers']

    suppliers_length = len(found_suppliers)
    assert suppliers_length == 5


def test_search_suppliers_filter_supplier(client, admin_users, suppliers):
    res = client.post('/2/login', data=json.dumps({
        'emailAddress': 'testadmin@digital.gov.au', 'password': 'testpassword'
    }), content_type='application/json')
    assert res.status_code == 200

    response = client.get('/2/search/suppliers?supplier_name_prefix=Test+Supplier3')
    assert response.status_code == 200

    data = json.loads(response.data)
    found_suppliers = data['suppliers']

    suppliers_length = len(found_suppliers)
    assert suppliers_length == 1
