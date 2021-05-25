def get_stats_for_year(queryset, year):
    # get time period stats (year) | year - 'YYYY' string
    data = queryset.filter(date__contains=year)
    months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ]
    stats = [0] * 12
    for item in data:
        stats[int(item.date.strftime('%Y-%m-%d')[5:7])-1] += item.value
    return dict(zip(months, stats))


def get_stats_for_month(queryset, month):
    # get time period stats (month) | month - 'YYYY-MM' string
    data = queryset.filter(date__contains=month)
    days = [str(day).zfill(2) for day in range(1, 32)]
    stats = [0] * 31
    for item in data:
        stats[int(item.date.strftime('%Y-%m-%d')[8:10])-1] += item.value
    days = [int(day) for day in days]
    return dict(zip(days, stats))


def get_category_stats(self, queryset, year_month_or_day):
    # get stats for categories
    data = queryset.filter(date__contains=year_month_or_day)
    categories = list(set([item.category.name for item in data]))
    stats = [0] * len(categories)
    for item in data:
        if item.category.name in categories:
            stats[categories.index(item.category.name)] += item.value
    return dict(zip(categories, stats))


def get_budget_stats(self, queryset, year_month_or_day):
    # get stats for budgets
    data = queryset.filter(date__contains=year_month_or_day)
    budgets = list(set([item.budget.name for item in data]))
    stats = [0] * len(budgets)
    for item in data:
        if item.budget.name in budgets:
            stats[budgets.index(item.budget.name)] += item.value
    return dict(zip(budgets, stats))


def get_tag_stats(self, queryset, year_month_or_day):
    # get stats for tags
    data = queryset.filter(date__contains=year_month_or_day)
    tags = []
    for item in data:
        for tag in item.tags.all():
            tags.append(tag.name)
    tags = list(set(tags))
    stats = [0] * len(tags)
    for item in data:
        for tag in item.tags.all():
            if tag.name in tags:
                stats[tags.index(tag.name)] += item.value
    return dict(zip(tags, stats))
