import json
import pendulum


def test_ceiling_price_updated_with_new_value(client, supplier_user, admin_users, service_type_prices):
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
    print(ceiling_price)
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


def test_ceiling_price_update_audited():
    raise Exception('NOT IMPLEMENTED')


def test_ceiling_price_update_failed_when_new_value_less_than_zero():
    raise Exception('NOT IMPLEMENTED')
