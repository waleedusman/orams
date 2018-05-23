from .prices import PricesService
from .audit import AuditService, AuditTypes
from .assessments import AssessmentsService
from .suppliers import SuppliersService
from .brief_responses import BriefResponsesService
from .users import UsersService

prices = PricesService()
audit_service = AuditService()
audit_types = AuditTypes
assessments = AssessmentsService()
suppliers = SuppliersService()
brief_responses_service = BriefResponsesService()
users = UsersService()
