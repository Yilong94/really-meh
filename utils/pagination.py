from rest_framework.pagination import PageNumberPagination


class BaseResultsSetPagination(PageNumberPagination):
    page_size_query_param = 'page_size'


class LargeResultsSetPagination(BaseResultsSetPagination):
    page_size = 1000
    max_page_size = 10000


class StandardResultsSetPagination(BaseResultsSetPagination):
    page_size = 100
    max_page_size = 1000


class SmallResultsSetPagination(BaseResultsSetPagination):
    page_size = 10
    max_page_size = 100
