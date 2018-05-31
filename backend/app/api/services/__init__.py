from .prices import PricesService, CeilingPriceService
from .audit import AuditService, AuditTypes
from .assessments import AssessmentsService
from .suppliers import SuppliersService
from .users import UsersService

prices = PricesService()
ceiling_prices = CeilingPriceService()
audit_service = AuditService()
audit_types = AuditTypes
assessments = AssessmentsService()
suppliers = SuppliersService()
users = UsersService()
