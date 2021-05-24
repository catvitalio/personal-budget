from rest_framework.response import Response
from rest_framework.validators import ValidationError

from budget.services import (
    get_stats_for_year,
    get_stats_for_month,
)


class ObjectStatsViewSet:
    model = None
    service = None

    def list(self, request):
        queryset = self.model.objects.filter(budget__creator=self.request.user)
        year = self.request.query_params.get('year')
        month = self.request.query_params.get('month')
        day = self.request.query_params.get('day')
        if year is not None and len(year) != 4 or \
           month is not None and len(month) != 7 or \
           day is not None and len(day) != 10:
            raise ValidationError(
                'Query-параметры введены неверно'
                '(?year=YYYY или ?month=YYYY-MM или ?day=YYYY-MM-DDDD)'
            )
        if year:
            return Response(self.service(queryset, year))
        if month:
            return Response(self.service(queryset, month))
        if day:
            return Response(self.service(queryset, day))
        raise ValidationError('Query-параметры не были введены (?year=YYYY, '
                              '?month=YYYY-MM, ?day=YYYY-MM-DDDD)')


class ObjectTimePeriodStatsViewSetMixin:
    model = None

    def list(self, request):
        queryset = self.model.objects.filter(budget__creator=self.request.user)
        year = self.request.query_params.get('year')
        month = self.request.query_params.get('month')
        if year is not None and len(year) != 4 or \
           month is not None and len(month) != 7:
            raise ValidationError(
                'Query-параметры введены неверно '
                '(?year=YYYY или ?month=YYYY-MM)'
            )
        if year:
            return Response(get_stats_for_year(queryset, year))
        if month:
            return Response(get_stats_for_month(queryset, month))
        raise ValidationError('Query-параметры не были введены (?year=YYYY, '
                              '?month?=YYYY-MM)')
