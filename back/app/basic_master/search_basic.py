from flask import current_app
import re
from app import db


class BasicSearchableMixin(object):
    @classmethod
    def search(cls, expression,  page, per_page):
        ids, total = bas_query_index(
            cls.__tablename__, expression,  page, per_page)
        if total == 0:
            return cls.query.filter_by(id=0), 0
        when = {}
        for i in range(len(ids)):
            when[ids[i]] = i
        return cls.query.filter(cls.id.in_(ids)).order_by(db.case(when, value=cls.id)), total

    @classmethod
    def bas_before_commit(cls, session):

        session._changes = {
            'add': list(session.new),
            'update': list(session.dirty),
            'delete': list(session.deleted),
        }

    @classmethod
    def bas_after_commit(cls, session):
        is_used = False
        for obj in session._changes['add']:
            if isinstance(obj, BasicSearchableMixin):
                is_used = True
                bas_add_to_index(obj.__tablename__, obj)
        for obj in session._changes['update']:
            if isinstance(obj, BasicSearchableMixin):
                is_used = True
                bas_add_to_index(obj.__tablename__, obj)
        for obj in session._changes['delete']:
            if isinstance(obj, BasicSearchableMixin):
                is_used = True
                bas_remove_from_index(obj.__tablename__, obj)
        if is_used:
            session._changes = None

    @classmethod
    def bas_reindex(cls):
        for obj in cls.query:
            bas_add_to_index(cls.__tablename__, obj)


db.event.listen(db.session, 'before_commit',
                BasicSearchableMixin.bas_before_commit)
db.event.listen(db.session, 'after_commit',
                BasicSearchableMixin.bas_after_commit)


def bas_add_to_index(index, model):
    if not current_app.es:
        return
    payload = {}

    for field in model.__searchable__:
        payload[field] = getattr(model, field)
    current_app.es.index(index='pim_'+index, id=model.id, body=payload)


def bas_remove_from_index(index, model):
    if not current_app.es:
        return
    current_app.es.delete(index='pim_'+index, id=model.id)


def bas_query_index(index, query, page, per_page):
    if not current_app.es:
        return [], 0
    solved_q = re.sub(
        pattern=r'([+\-=&|><(){}\[\]\^"~*?:\/])', repl=r'\\\1', string=query)
    try:
        search = current_app.es.search(index='pim_'+index,
                                    body={'query': {
                                        "bool": {
                                                                                    "minimum_should_match": 1,

                                            "should": [
                                                {

                                                    "match_phrase": {
                                                        "name": query
                                                    }
                                                },
                                                {

                                                    "query_string": {
                                                        "query": "*"+solved_q+"*",

                                                        "fields": ["*"],
                                                    }
                                                }
                                            ]
                                
                                        }

                                    },
                                        'from': (page - 1) * per_page, 'size': per_page})
        ids = [int(hit['_id']) for hit in search['hits']['hits']]
        return ids, search['hits']['total']['value']
    except Exception as e:
        print('----->>>   ',str(e))
