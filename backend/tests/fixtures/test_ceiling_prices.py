import json
import pendulum


def test_ceiling_price_updated_with_new_value(client, admin_users, service_type_prices):
    res = client.post('/2/login', data=json.dumps({
        'emailAddress': admin_users[0].email_address, 'password': 'testpassword'
    }), content_type='application/json')
    assert res.status_code == 200

    ceiling_id = 1
    new_price = 100
    response = client.post(
        '/2/ceiling-prices/{}'.format(ceiling_id),
        data=json.dumps({'price': new_price}),
        content_type='application/json')
    assert response.status_code == 200

    response = client.get('/2/ceiling-prices/{}'.format(ceiling_id))
    ceiling_price = json.loads(response.data)
    assert ceiling_price['price'] == 100


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
        new_price = 200
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
        assert audit_event.data['newPrice'] == 200


def test_ceiling_price_update_failed_when_new_value_less_than_zero(client, admin_users, service_type_prices):
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

# TODO test last write wins

# TODO test service-price updated when option checked and service-price exists (end-dated and new entry created)
# TODO test service-price created when option checked and all existing service-price have expired
# TODO test service-price created when option checked and no service-price exists
