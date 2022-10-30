from flask import send_from_directory
from uuid import uuid4
from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
import platform
from flask import make_response
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import jwt
import datetime
from functools import wraps
import os
import flask_cors
import pdfkit
import stripe
from flask_mail import Mail

stripe.api_key = os.environ['STRIPE_SECRET_KEY']
endpoint_secret = os.environ['STRIPE_PUBLISHABLE_KEY']
cors = flask_cors.CORS()
app = Flask(__name__)

app.config.from_object(os.environ['APP_SETTINGS'])
basedir = os.path.abspath(os.path.dirname(__file__))

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
cors.init_app(app)
mail = Mail(app)

try:
    from models import Users, Courses, Completion, Tags, Instructors, Images, Index, Enrollment, Certificate
    from emailtoken import generate_confirmation_token, confirm_token
    from emailSend import send_email
except ImportError:
    print("no models")


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None
        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']

        if not token:
            # return jsonify({'message': 'a valid token is missing'})
            return make_response(jsonify({'message': 'a valid token is missing'}), 404)

        try:
            data = jwt.decode(
                token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = Users.query.filter_by(
                public_id=data['public_id']).first()
        except:
            # return jsonify({'message': 'token is invalid'})
            return make_response(jsonify({'message': 'token is invalid'}), 404)

        kwargs['current_user'] = current_user
        return f(current_user, *args, **kwargs)
    return decorator


def remove_kwargs(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        try:
            kwargs['current_user']
            current_user = kwargs.pop('current_user')
        except:
            return make_response(jsonify({'message': 'user is unauthenticated'}), 404)
        return func(*args, **kwargs)

    return decorated_function


def check_confirmed(func):
    @wraps(func)
    def decorated_function(*args, **kwargs):
        try:
            kwargs['current_user']
            current_user = kwargs.pop('current_user')
        except:
            return make_response(jsonify({'message': 'user is unauthenticated'}), 404)
        if current_user.confirmed is False:
            return make_response(jsonify({'message': 'user is unauthenticated'}), 404)
        return func(*args, **kwargs)

    return decorated_function


UPLOAD_FOLDER = app.root_path
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def make_unique(string):
    ident = uuid4().__str__()
    return f"{ident}-{string}"


@app.route('/')
def homepage():
    the_time = datetime.datetime.now().strftime("%A, %d %b %Y %l:%M %p")

    return """
    <h1>Hello heroku</h1>
    <p>It is currently {time}.</p>

    <img src="http://loremflickr.com/600/400" />
    """.format(time=the_time)


@app.route('/api/')
def homepage2():
    the_time = datetime.datetime.now().strftime("%A, %d %b %Y %l:%M %p")

    return """
    <h1>Hello heroku</h1>
    <p>It is currently {time}.</p>

    <img src="http://loremflickr.com/600/400" />
    """.format(time=the_time)


@app.route('/api/upload/images', methods=['POST'])
def fileUpload():
    names = []
    target = os.path.join(UPLOAD_FOLDER, "static", 'images')
    if not os.path.isdir(target):
        os.mkdir(target)
    print("welcome to upload`")
    # file = request.files['file']
    files = request.files.getlist("file")
    for file in files:
        filename = secure_filename(make_unique(file.filename))
        destination = "/".join([target, filename])
        file.save(destination)
        names.append(filename)
    # session['uploadFilePath'] = destination
    response = jsonify({'message': 'uploaded', 'names': names})
    return response


@app.route('/api/upload/instructor', methods=['POST'])
def fileUploadForInstructor():
    # names = []
    # titles_arr = []
    output = []

    target = os.path.join(UPLOAD_FOLDER, "static", 'instructor')
    if not os.path.isdir(target):
        os.mkdir(target)
    print("welcome to upload`")
    # file = request.files['file']
    files = request.files.getlist("file")
    titles = request.form.getlist("input")

    if len(files) == len(titles):
        for i in range(len(files)):
            filename = secure_filename(make_unique(files[i].filename))
            destination = "/".join([target, filename])
            files[i].save(destination)
            dictn = {
                "instructor": titles[i],
                "instructorImage": filename,
            }
            output.append(dictn)
            # names.append(filename)
            # titles_arr.append(titles[i])
        response = jsonify(
            {'message': 'uploaded', 'Instructors': output})
    else:
        response = jsonify(
            {'message': 'diff lenght'})

    return response


@app.route('/api/upload/markdown', methods=['POST'])
def fileUploadForMaarkdown():
    names = ""
    target = os.path.join(UPLOAD_FOLDER + "/protected", 'markdown')
    if not os.path.isdir(target):
        os.mkdir(target)
    print("welcome to upload`")
    # file = request.files['file']
    files = request.files.getlist("file")
    for file in files:
        filename = secure_filename(make_unique(file.filename))
        destination = "/".join([target, filename])
        file.save(destination)
        names = filename
    # session['uploadFilePath'] = destination
    response = jsonify({'message': 'uploaded', 'names': names})
    return response


@app.route('/api/upload/json', methods=['POST'])
def fileUploadForJson():
    names = ""
    target = os.path.join(UPLOAD_FOLDER + "/protected", 'json')
    if not os.path.isdir(target):
        os.mkdir(target)
    print("welcome to upload`")
    # file = request.files['file']
    files = request.files.getlist("file")
    for file in files:
        filename = secure_filename(make_unique(file.filename))
        destination = "/".join([target, filename])
        file.save(destination)
        names = filename
    # session['uploadFilePath'] = destination
    response = jsonify({'message': 'uploaded', 'names': names})
    return response


@app.route('/api/register', methods=['POST'])
def signup_user():
    data = request.get_json()

    hashed_password = generate_password_hash(data['password'], method='sha256')

    new_user = Users(public_id=str(uuid4()),
                     name=data['name'], email=data['email'], password=hashed_password, admin=False, confirmed=False)
    db.session.add(new_user)
    db.session.commit()

    user = Users.query.filter_by(email=data['email']).first()

    token = jwt.encode({'public_id': str(user.public_id), 'exp': datetime.datetime.utcnow(
    ) + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'], "HS256")

    mail_token = generate_confirmation_token(user.email)
    # confirm_url = url_for('user.confirm_email', token=mail_token, _external=True)
    # html = render_template('user/activate.html', confirm_url=confirm_url)
    subject = "Please confirm your email"
    htmlText = """
    <p>Welcome! Thanks for signing up. Please follow this link to activate your account:</p>
    <p><a href="{{ confirm_url }}">{{ confirm_url }}</a></p>
    <br>
    <p>Cheers!</p>
    """
    confirm_url = "http://localhost:3000/DevBootCamp/confirm/%s" % mail_token
    html = render_template("email.html", confirm_url=confirm_url)
    send_email(user.email, subject, html)

    return jsonify({'user': {'name': data['name'], 'email': data['email']}, 'token': token, 'message': 'registeration successfully'})


@app.route('/api/confirm/<token>')
@token_required
@remove_kwargs
def confirm_email(current_user,  token):
    try:
        email = confirm_token(token)
    except:
        return jsonify({'message': ' Link Expired! '})
    if not email:
        return jsonify({'message': ' Link Expired! '})
    user = Users.query.filter_by(email=email).first_or_404()
    if user.confirmed:
        return make_response(jsonify(message="Account already confirmed!"), 404)
        # return jsonify({'message': ' Account already confirmed! '})
    else:
        user.confirmed = True
        db.session.commit()
        return jsonify({'message': ' Account confirmed! '})


@app.route('/api/login', methods=['POST'])
def login_user():

    # req = request.get_json(force=True)
    # username = req.get('username', None)
    # password = req.get('password', None)

    auth = request.authorization

    if not auth or not auth.username or not auth.password:
        return make_response(jsonify(message="Wrong Username or Password!"), 404)

    user = Users.query.filter_by(email=auth.username).first()

    if user and check_password_hash(user.password, auth.password):

        token = jwt.encode({'public_id': str(user.public_id), 'exp': datetime.datetime.utcnow(
        ) + datetime.timedelta(minutes=45)}, app.config['SECRET_KEY'], "HS256")
        return jsonify({'token': token, 'data': auth.username, 'name': user.name, 'email': user.email, 'message': 'registeration successfully'})

    # return make_response('could not verify',  401, {'Authentication': '"login required"'})
    return make_response(jsonify(message="Wrong Username or Password!"), 404)


@app.route('/api/login', methods=['GET'])
@token_required
@remove_kwargs
def fetchUserByToken(currentUser):
    data = currentUser
    return jsonify({'user': {'name': data.name, 'email': data.email}, 'message': 'registeration successfully'})


@app.route('/api/course', methods=['POST'])
@token_required
@check_confirmed
def create_course(current_user):

    data = request.get_json()

    new_course = Courses(rate=data['rate'], views=data['views'], title=data['title'],
                         link=data['link'], dis=data['dis'], category=data['category'], price=data['price'])
    db.session.add(new_course)

    names = db.session.query(Courses).order_by(Courses.id.desc()).first()
    if names is not None:
        names = names.id
    else:
        names = 1

    for child in data['tags']:
        new_tags = Tags(fid=names, tags=child)
        db.session.add(new_tags)

    for child in data['image']:
        new_images = Images(
            fid=names, image=child)
        db.session.add(new_images)

    for child in data['Instructors']:
        new_instructors = Instructors(
            fid=names, name=child['instructor'], image=child['instructorImage'])
        db.session.add(new_instructors)

    dictnry = data['Index']
    keys = dictnry.keys()
    for child in keys:
        for subchild in dictnry[child]:
            new_index = Index(
                fid=names, title=subchild["title"], key=subchild["key"], parent=child)
            db.session.add(new_index)

    # new_index = Index(fid=names, json=data['Index'])
    # db.session.add(new_index)

    db.session.commit()

    return jsonify({'message': 'new course added'})


@app.route('/api/allcoursesDetail', methods=['GET'])
@token_required
@check_confirmed
def get_allcoursesDetail(current_user):

    courses = db.session.query(Courses).all()
    print(courses)
    output = []
    for course in courses:
        # print('first')

        index = db.session.query(Index).filter(Index.fid == course.id).all()
        tags = db.session.query(Tags).filter(Tags.fid == course.id).all()
        images = db.session.query(Images).filter(Images.fid == course.id).all()
        instructors = db.session.query(Instructors).filter(
            Instructors.fid == course.id).all()

        course_data = {}
        course_data['id'] = course.id
        course_data['rate'] = course.rate
        course_data['views'] = course.views
        course_data['title'] = course.title
        course_data['link'] = course.link
        course_data['dis'] = course.dis
        course_data['price'] = course.price
        course_data['category'] = course.category

        # for i in index:
        #     course_data['Index'] = i.json

        IndexData = {}
        for i in index:
            if i.parent in index:
                IndexData[i.parent].append({
                    "title": i.title,
                    "key": i.key
                })
            else:
                IndexData[i.parent] = []
                IndexData[i.parent].append({
                    "title": i.title,
                    "key": i.key
                })
        course_data['Index'] = IndexData

        tag_data = []
        for i in tags:
            tag_data.append(i.tags)
        course_data['tags'] = tag_data

        tag_data = []
        for i in images:
            # tag_data.append(base64.b64decode(i.image).decode('ascii'))
            tag_data.append(i.image)
        course_data['image'] = tag_data

        tag_data = []
        for i in instructors:
            temp = {
                'instructor': i.name,
                # 'instructorImage': base64.b64decode(i.image).decode('ascii')
                'instructorImage': i.image
            }
            tag_data.append(temp)
        course_data['Instructors'] = tag_data
        tag_data = []

        output.append(course_data)

    return jsonify({'list_of_books': output})


@app.route('/api/allcourses', methods=['GET'])
def get_allcourses():
    courses = db.session.query(Courses).all()
    print(courses)
    output = []
    for course in courses:
        # print('first')
        images = db.session.query(Images).filter(
            Images.fid == course.id).first()

        course_data = {}
        course_data['id'] = course.id
        course_data['rate'] = course.rate
        course_data['views'] = course.views
        course_data['title'] = course.title
        course_data['link'] = course.link
        course_data['dis'] = course.dis
        # course_data['image'] = base64.b64decode(images.image).decode('ascii')
        course_data['image'] = images.image
        course_data['price'] = course.price
        course_data['category'] = course.category

        output.append(course_data)

    return jsonify({'list_of_books': output})


@app.route('/api/allcoursesofuser', methods=['GET'])
@token_required
@check_confirmed
def get_allcoursesofuser(current_user):
    enrollment = db.session.query(Enrollment).filter_by(
        uid=int(current_user.id)).all()
    print(enrollment)
    output = []
    for child in enrollment:
        courseid = child.cid
        courses = db.session.query(Courses).filter_by(id=courseid).first()
        if courses:
            course = courses
        # for course in courses:
            # print('first')
            images = db.session.query(Images).filter(
                Images.fid == course.id).first()

            course_data = {}
            course_data['id'] = course.id
            course_data['rate'] = course.rate
            course_data['views'] = course.views
            course_data['title'] = course.title
            course_data['link'] = course.link
            course_data['dis'] = course.dis
            # course_data['image'] = base64.b64decode(images.image).decode('ascii')
            course_data['image'] = images.image
            course_data['certification'] = child.certificateid
            course_data['price'] = course.price
            course_data['category'] = course.category

            output.append(course_data)

    return jsonify({'list_of_books': output})


@app.route('/api/course/<course_link>', methods=['GET'])
@token_required
@check_confirmed
def get_coursebyLInk(current_user, course_link):

    course = db.session.query(Courses).filter_by(link=course_link).first()
    # print(courses)
    output = {}
    if course:
        # print('first')
        checkCert = Enrollment.query.filter(
            Enrollment.cid == course.id, Enrollment.uid == current_user.id).first()
        index = db.session.query(Index).filter(Index.fid == course.id).all()
        completion = db.session.query(Completion).filter(
            Completion.cid == course.id, Completion.uid == int(current_user.id)).all()
        tags = db.session.query(Tags).filter(Tags.fid == course.id).all()
        images = db.session.query(Images).filter(Images.fid == course.id).all()
        instructors = db.session.query(Instructors).filter(
            Instructors.fid == course.id).all()

        course_data = {}
        course_data['id'] = course.id
        course_data['rate'] = course.rate
        course_data['views'] = course.views
        course_data['title'] = course.title
        course_data['link'] = course.link
        course_data['dis'] = course.dis
        course_data['certification'] = False
        course_data['price'] = course.price
        course_data['category'] = course.category
        try:
            course_data['certification'] = checkCert.certificateid
        except AttributeError:
            print("YOU link not found ... breaking out")

        IndexData = {}
        if completion:
            completionArr = []
            for c in completion:
                completionArr.append(c.indexid)
        else:
            completionArr = []

        # print(completionArr)

        for i in index:
            if i.id in completionArr:
                if i.parent in IndexData:
                    IndexData[i.parent].append({
                        "title": i.title,
                        "key": i.key,
                        "completion": True
                    })
                else:
                    IndexData[i.parent] = []
                    IndexData[i.parent].append({
                        "title": i.title,
                        "key": i.key,
                        "completion": True
                    })
            else:
                if i.parent in IndexData:
                    IndexData[i.parent].append({
                        "title": i.title,
                        "key": i.key,
                        "completion": False
                    })
                else:
                    IndexData[i.parent] = []
                    IndexData[i.parent].append({
                        "title": i.title,
                        "key": i.key,
                        "completion": False
                    })
        course_data['Index'] = IndexData

        tag_data = []
        for i in tags:
            tag_data.append(i.tags)
        course_data['tags'] = tag_data

        tag_data = []
        for i in images:
            # tag_data.append(base64.b64decode(i.image).decode('ascii'))
            tag_data.append(i.image)
        course_data['image'] = tag_data

        tag_data = []
        for i in instructors:
            temp = {
                'instructor': i.name,
                # 'instructorImage': base64.b64decode(i.image).decode('ascii')
                'instructorImage': i.image
            }
            tag_data.append(temp)
        course_data['Instructors'] = tag_data
        tag_data = []

        output = course_data

        return jsonify({'book': output})
    else:
        return make_response(jsonify(message="no course found"), 404)


@app.route('/api/md/<path>')
@token_required
@check_confirmed
def send_md(current_user, path):
    updatepath = path
    target = os.path.join(UPLOAD_FOLDER, "protected", 'markdown')
    target2 = os.path.join(UPLOAD_FOLDER, "protected", 'markdown', updatepath)
    if os.path.isfile(target2):
        return send_from_directory(target, updatepath)
    else:
        return make_response(jsonify(message="no such content!"), 404)


@app.route('/api/json/<path>')
@token_required
@check_confirmed
def send_json(current_user, path):
    updatepath = path
    target = os.path.join(UPLOAD_FOLDER, "protected", 'json')
    target2 = os.path.join(UPLOAD_FOLDER, "protected", 'json', updatepath)
    if os.path.isfile(target2):
        return send_from_directory(target, updatepath)
    else:
        return make_response(jsonify(message="no such content!"), 404)


@app.route('/api/enroll/<course_id>', methods=['POST'])
@token_required
@check_confirmed
def enrollUser(current_user, course_id):
    data = request.get_json()
    course = db.session.query(Courses).filter_by(link=course_id).first()
    if course:
        courseID = course.id
        eroll_User = Enrollment(cid=int(courseID), uid=current_user.id)
        db.session.add(eroll_User)
        db.session.commit()
        return jsonify({'message': 'user enrolled'})
    else:
        return make_response(jsonify(message="wrong course"), 404)


@app.route('/api/enroll/<course_id>', methods=['GET'])
@token_required
@check_confirmed
def enrollUserGet(current_user, course_id):
    course = db.session.query(Courses).filter_by(link=course_id).first()
    if course:
        courseID = course.id
        eroll_User = db.session.query(
            Enrollment).filter_by(uid=int(current_user.id)).all()
        for child in eroll_User:
            if int(courseID) == child.cid:
                return jsonify({'message': 'user enrolled'})
        return make_response(jsonify(message="not enrolled"), 404)
    else:
        return make_response(jsonify(message="wrong course"), 404)


@app.route('/api/completion/<course_link>/<index_id>', methods=['POST'])
@token_required
@check_confirmed
def updateCompletion(current_user, course_link, index_id):
    course = db.session.query(Courses).filter_by(link=course_link).first()
    index = db.session.query(Index).filter_by(key=index_id).first()
    if index:
        indexID = index.id
        courseID = course.id
        completion = db.session.query(Completion).filter(
            Completion.uid == current_user.id, Completion.cid == courseID, Completion.indexid == indexID).all()
        if completion:
            return make_response(jsonify(message="already marked completed"), 404)
        eroll_User = Completion(cid=int(courseID), uid=int(
            current_user.id), indexid=indexID)
        db.session.add(eroll_User)
        db.session.commit()
        return jsonify({'message': 'updated completion'})
    else:
        return make_response(jsonify(message="failed update completion"), 404)


@app.route('/api/course/check/<course_link>', methods=['POST'])
@token_required
@check_confirmed
def checkCompletionHalf(current_user, course_link):
    data = request.get_json()
    course = db.session.query(Courses).filter_by(link=course_link).first()
    if course:
        index = db.session.query(Index).filter(Index.fid == course.id).all()
        courseID = course.id
        completion = db.session.query(Completion).filter(Completion.cid == int(courseID), Completion.uid == int(
            current_user.id)).all()
        print(len(index))
        print(len(completion))
        if len(index) == len(completion) + 1:
            return jsonify({'message': 'ready for final quiz', 'status': 'incomplete'})
        elif len(index) == len(completion):
            # Add Certificate
            checkCert = Enrollment.query.filter(
                Enrollment.cid == courseID, Enrollment.uid == current_user.id).first()
            checkCertEnroll = checkCert.certificateid

            if checkCertEnroll:
                return jsonify({'message': 'already completed', 'status': 'completed'})
            else:
                try:
                    if data['marks']:
                        checkCert.certificateid = True
                        checkCert.marks = data['marks']
                        checkCert.date = datetime.date.today()
                        db.session.commit()
                        return jsonify({'message': ' generated certificate ', 'status': 'completed'})
                except:
                    return jsonify({'message': 'already completed FAILS', 'status': 'completed'})

        else:
            return make_response(jsonify(message="complete prev module"), 404)
    else:
        return make_response(jsonify(message="complete prev module"), 404)


@app.route('/api/course/<course_link>/certificate', methods=['GET'])
@token_required
@check_confirmed
def downloadCert(current_user, course_link):
    course = db.session.query(Courses).filter_by(link=course_link).first()
    if course:
        checkCert = Enrollment.query.filter(
            Enrollment.cid == course.id, Enrollment.uid == current_user.id).first()
        if (checkCert.certificateid):
            html = """
                <div style="width:800px; height:600px; padding:20px; text-align:center; border: 10px solid #787878">
                    <div style="width:750px; height:550px; padding:20px; text-align:center; border: 5px solid #787878">
                        <span style="font-size:50px; font-weight:bold">Certificate of Completion</span>
                        <br><br>
                        <span style="font-size:25px"><i>This is to certify that</i></span>
                        <br><br>
                        <span style="font-size:30px"><b>%s</b></span><br/><br/>
                        <span style="font-size:25px"><i>has completed the course</i></span> <br/><br/>
                        <span style="font-size:30px">%s</span> <br/><br/>
                        <span style="font-size:20px">with score of <b>%s</b></span> <br/><br/><br/><br/>
                        <span style="font-size:25px"><i>dated</i></span><br>
                        %s
                        <span style="font-size:30px"></span>
                    </div>
                </div>
            """ % (current_user.name, course.title, checkCert.marks,  checkCert.date)
            if (platform.system() == 'Darwin'):
                config = pdfkit.configuration()
            else:
                config = pdfkit.configuration(wkhtmltopdf='./bin/wkhtmltopdf')

            pdf = pdfkit.from_string(html, False, configuration=config)
            response = make_response(pdf)
            response.headers.set('Content-Type', 'application/pdf')
            response.headers.set('Content-Disposition',
                                 'inline', filename='certificate.pdf')
            return response
        return make_response(jsonify(message="wrong course"), 404)
    else:
        return make_response(jsonify(message="wrong course"), 404)


# Payment
user_info = {}


@app.route('/api/pay', methods=['POST'])
@token_required
@check_confirmed
def pay(current_user):
    data = request.get_json()
    email = data['email']
    amount = data['amount']
    print("amount : %s" % (amount))

    if not email:
        return 'You need to send an Email!', 400

    intent = stripe.PaymentIntent.create(
        amount=int(amount),
        currency='inr',
        receipt_email=email
    )

    return {"client_secret": intent["client_secret"]}, 200


@app.route('/webhook', methods=['POST'])
def webhook():
    payload = request.get_data()
    sig_header = request.headers.get('Stripe_Signature', None)

    if not sig_header:
        return 'No Signature Header!', 400

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        # Invalid payload
        return 'Invalid payload', 400
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return 'Invalid signature', 400

    if event['type'] == 'payment_intent.succeeded':
        # contains the email that will recive the recipt for the payment (users email usually)
        email = event['data']['object']['receipt_email']

        user_info['paid_50'] = True
        user_info['email'] = email
    else:
        return 'Unexpected event type', 400

    return '', 200


db.create_all()
if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
