import pendulum
from flask_login import current_user
from flask import current_app
from app.api.helpers import Service, abort
from app.models import ServiceTypePriceCeiling
from app import db
from .prices import PricesService
from .audit import AuditService, AuditTypes


class CeilingPriceService(Service):
    __model__ = ServiceTypePriceCeiling

    def __init__(self, *args, **kwargs):
        super(CeilingPriceService, self).__init__(*args, **kwargs)
        self.audit = AuditService()
        self.prices_service = PricesService()

    def get_ceiling_price(self, ceiling_id):
        price = db.session.query(ServiceTypePriceCeiling)\
            .filter(ServiceTypePriceCeiling.id == ceiling_id)\
            .first()
        return price

    def _match_current_price(self, price_id, ceiling_price):
        """
        :param price_id:    identifier of the db-record to be updated
        :param new_price:   numeric value for new price
        """
        existing_price = self.prices_service.get(price_id) if price_id else None

        date_from = pendulum.tomorrow(current_app.config['DEADLINES_TZ_NAME']).date()
        date_to = pendulum.Date.create(2050, 1, 1)

        if existing_price and (ceiling_price.price > existing_price.service_type_price_ceiling.price):
            raise Exception('new_price {} must be less than existing ceiling_price: {}'
                            .format(
                                ceiling_price.price,
                                existing_price.service_type_price_ceiling.price))

        if existing_price:
            existing_price.date_to = date_from.subtract(days=1)
            self.prices_service.add_price(existing_price, date_from, date_to, ceiling_price.price)
        else:
            self.prices_service.create(
                supplier_code=ceiling_price.supplier_code,
                service_type_id=ceiling_price.service_type_id,
                region_id=ceiling_price.region_id,
                date_from=pendulum.today(current_app.config['DEADLINES_TZ_NAME']).date(),
                date_to=date_to,
                price=ceiling_price.price,
                sub_service_id=ceiling_price.sub_service_id,
                service_type_price_ceiling_id=ceiling_price.id
            )

    def update_ceiling_price(self, ceiling_id, new_price, match_current_price=False):
        """We only validate against a SINGLE (most recently updated) service_price.
        See the query in prices_service.get_prices() for further details on how prices are ordered.

        If multiple prices are related to the same ceiling_price, they will all be updated.
        """
        ceiling_price = self.get_ceiling_price(ceiling_id)

        # Validate against current service price
        supplier_prices = self.prices_service.get_prices(
            ceiling_price.supplier_code,
            ceiling_price.service_type_id,
            ceiling_price.sub_service_id,
            pendulum.today(current_app.config['DEADLINES_TZ_NAME']).date())
        if supplier_prices:
            current_price = supplier_prices[0]['price']
            if new_price < float(current_price.strip(' "')):
                abort('Ceiling price cannot be lower than ${} (current price)'.format(
                    current_price))

        old_price = ceiling_price.price
        ceiling_price.price = new_price
        db.session.commit()

        if match_current_price:
            price_id = supplier_prices[0]['id'] if supplier_prices else None
            self._match_current_price(price_id, ceiling_price)

        self.audit.create(
            audit_type=AuditTypes.update_ceiling_price,
            user=current_user.id,
            data={
                "oldPrice": old_price,
                "newPrice": new_price
            },
            db_object=ceiling_price)
