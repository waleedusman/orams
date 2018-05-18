from .prices import PricesService
from .audit import AuditService, AuditTypes
from .assessments import AssessmentsService
from .suppliers import SuppliersService
from .users import UsersService

prices = PricesService()
audit_service = AuditService()
audit_types = AuditTypes
assessments = AssessmentsService()
suppliers = SuppliersService()
users = UsersService()
