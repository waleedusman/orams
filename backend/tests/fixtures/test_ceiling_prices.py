import json
import pendulum


def test_ceiling_price_updated_with_new_value(client, admin_users, service_type_prices):
    res = client.post('/2/login', data=json.dumps({
        'emailAddress': admin_users[0].email_address, 'password': 'testpassword'
    }), content_type='application/json')
    assert res.status_code == 200

    ceiling_id = 1
    new_price = 250
    response = client.post(
        '/2/ceiling-prices/{}'.format(ceiling_id),
        data=json.dumps({'price': new_price}),
        content_type='application/json')
    assert response.status_code == 200

    response = client.get('/2/ceiling-prices/{}'.format(ceiling_id))
    ceiling_price = json.loads(response.data)
    assert ceiling_price['price'] == 250


def test_ceiling_price_update_failed_when_requested_by_supplier(client, supplier_user):
    res = client.post('/2/login', data=json.dumps({
        'emailAddress': supplier_user.email_address, 'password': 'testpassword'
    }), content_type='application/json')
    assert res.status_code == 200

    ceiling_id = 1
    new_price = 100
    response = client.post(
        '/2/ceiling-prices/{}'.format(ceiling_id),
        data=json.dumps({'price': new_price}),
        content_type='application/json')
    assert response.status_code == 403


def test_ceiling_price_update_failed_when_requested_by_agency(client, users):
    buyer = next(user for user in users if user.id == 7)
    res = client.post('/2/login', data=json.dumps({
        'emailAddress': buyer.email_address, 'password': 'testpassword'
    }), content_type='application/json')
    assert res.status_code == 200

    ceiling_id = 1
    new_price = 100
    response = client.post(
        '/2/ceiling-prices/{}'.format(ceiling_id),
        data=json.dumps({'price': new_price}),
        content_type='application/json')
    assert response.status_code == 403


def test_ceiling_price_update_audited(client, app, admin_users, service_type_prices):
    from app.models import AuditEvent

    with app.app_context():
        res = client.post('/2/login', data=json.dumps({
            'emailAddress': admin_users[0].email_address, 'password': 'testpassword'
        }), content_type='application/json')
        assert res.status_code == 200

        ceiling_id = 1
        new_price = 224.99
        response = client.post(
            '/2/ceiling-prices/{}'.format(ceiling_id),
            data=json.dumps({'price': new_price}),
            content_type='application/json')
        assert response.status_code == 200
        audit_event = AuditEvent.query\
            .filter(AuditEvent.type == 'update_ceiling_price')\
            .order_by(AuditEvent.created_at.desc())\
            .first()
        assert audit_event.data['oldPrice'] == 321.56
        assert audit_event.data['newPrice'] == 224.99


def test_ceiling_price_update_failed_when_new_value_less_than_current_price(client, admin_users, service_type_prices):
    res = client.post('/2/login', data=json.dumps({
        'emailAddress': admin_users[0].email_address, 'password': 'testpassword'
    }), content_type='application/json')
    assert res.status_code == 200

    ceiling_id = 1
    new_price = -1
    response = client.post(
        '/2/ceiling-prices/{}'.format(ceiling_id),
        data=json.dumps({'price': new_price}),
        content_type='application/json')
    assert response.status_code == 400
    response_body = json.loads(response.get_data())
    assert response_body['message'] == 'Ceiling price cannot be lower than $200.50 (current price)'


# def test_current_price_unaffected_when_matching_not_required(client, admin_users, supplier_user, service_type_prices):
#     """This is the default case (i.e. leaving it blank is the same as specifying it as False)
#     """
#     # update price
#     code = supplier_user.supplier_code
#     res = client.post('/2/login', data=json.dumps({
#         'emailAddress': admin_users[0].email_address, 'password': 'testpassword'
#     }), content_type='application/json')
#     assert res.status_code == 200

#     ceiling_id = 1
#     new_price = 500
#     response = client.post(
#         '/2/ceiling-prices/{}'.format(ceiling_id),
#         data=json.dumps({'price': new_price}),
#         content_type='application/json')
#     assert response.status_code == 200

#     # check the current price
#     res = client.post('/2/login', data=json.dumps({
#         'emailAddress': 'j@examplecompany.biz', 'password': 'testpassword'
#     }), content_type='application/json')
#     assert res.status_code == 200

#     response = client.get('/2/prices/suppliers/{}/services/1/categories/1'.format(code))
#     assert response.status_code == 200

#     price = json.loads(response.data)['prices'][0]
#     assert price['capPrice'] == '500.00'
#     assert price['price'] == '200.50'

# TODO test last write wins

# TODO ??? test that new ceiling price is greater than or equal to current price it is assigned to


# def test_current_price_updated_when_matching_required(client, admin_users, supplier_user, service_type_prices):
#     """Service-price updated when option checked and service-price exists (end-dated and new entry created)
#     """
#     code = supplier_user.supplier_code
#     res = client.post('/2/login', data=json.dumps({
#         'emailAddress': admin_users[0].email_address, 'password': 'testpassword'
#     }), content_type='application/json')
#     assert res.status_code == 200

#     ceiling_id = 1
#     new_price = 90
#     response = client.post(
#         '/2/ceiling-prices/{}'.format(ceiling_id),
#         data=json.dumps({'price': new_price, 'matchCurrentPrice': True}),
#         content_type='application/json')
#     # TODO should return new current price
#     assert response.status_code == 200

#     res = client.post('/2/login', data=json.dumps({
#         'emailAddress': 'j@examplecompany.biz', 'password': 'testpassword'
#     }), content_type='application/json')
#     assert res.status_code == 200

#     response = client.get('/2/prices/suppliers/{}/services/1/categories/1'.format(code))
#     assert response.status_code == 200
#     price = json.loads(response.data)['prices'][0]
#     assert price['capPrice'] == '90.00'
#     assert price['price'] == '200.50'
#     assert price['endDate'] == today

    # TODO get new service price

# TODO test service-price created when option checked and all existing service-price have expired
# TODO test service-price created when option checked and no service-price exists
