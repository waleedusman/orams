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

    def update_ceiling_price(self, ceiling_id, new_price):
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
        self.audit.create(
            audit_type=AuditTypes.update_ceiling_price,
            user=current_user.id,
            data={
                "oldPrice": old_price,
                "newPrice": new_price
            },
            db_object=ceiling_price)
