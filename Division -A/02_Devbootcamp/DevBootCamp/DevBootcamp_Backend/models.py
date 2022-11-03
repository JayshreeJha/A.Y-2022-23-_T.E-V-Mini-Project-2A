# from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import UUID
# if __name__ == '__main__':
from app import db

# try:
#     from app import db
# except ImportError:
#     print("aaa")
# db = SQLAlchemy(app)


class Tags(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fid = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    tags = db.Column(db.String(100), nullable=False)


class Instructors(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fid = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(300), nullable=False)


class Images(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fid = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    image = db.Column(db.String(300), nullable=False)


class Index(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # indexid = db.Column(db.Integer, db.ForeignKey('index.id'), nullable=False)
    fid = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    parent = db.Column(db.String(100), nullable=False)
    key = db.Column(db.String(300), nullable=False)


class Certificate(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cid = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    uid = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    marks = db.Column(db.Integer, nullable=False)
    date = db.Column(db.Date, nullable=False)


class Enrollment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    cid = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    marks = db.Column(db.Integer, nullable=True)
    date = db.Column(db.Date, nullable=True)
    certificateid = db.Column(db.Boolean, default=False)


class Completion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cid = db.Column(db.Integer, db.ForeignKey('courses.id'), nullable=False)
    uid = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    indexid = db.Column(db.Integer, db.ForeignKey(
        'index.id'), nullable=False)


class Courses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rate = db.Column(db.Integer)
    views = db.Column(db.Integer)
    title = db.Column(db.String(300), nullable=False)
    link = db.Column(db.String(300), nullable=False)
    dis = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String(300), nullable=False)


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(UUID(as_uuid=True))
    name = db.Column(db.String(300))
    email = db.Column(db.String(300))
    password = db.Column(db.String(300))
    admin = db.Column(db.Boolean)
    confirmed = db.Column(db.Boolean, nullable=False, default=False)
