import pymongo
from datetime import datetime, timezone
from flask import Flask, request, jsonify, g, current_app, Response, url_for, send_from_directory
from flask_cors import CORS
from flask_mail import Mail, Message
from email.mime.text import MIMEText


import os
from pymongo.errors import PyMongoError
import sys

import smtplib


# Basado en: https://github.com/mongodb-university/atlas_starter_python/blob/master/atlas-starter.py

# Configura la conexión a MongoDB Atlas
try:
    conexion= "mongodb+srv://hdanielqg:rkyde4mRHsWYGzU7@proyecto2.y96zzh2.mongodb.net/?retryWrites=true&w=majority&appName=Proyecto2"
    client = pymongo.MongoClient(conexion)

# return a friendly error if a URI error is thrown 
except pymongo.errors.ConfigurationError:
  print("An Invalid URI host error was received. Is your Atlas host name correct in your connection string?")
  sys.exit(1)

try:
    # Seleccionar la base de datos y la colección
    db = client.proyecto_ap
    collection = db.projects

except pymongo.errors as e:
    print("Error: ", e)

port = int("8000")


# Inicializa Flask
app = Flask(__name__)
CORS(app)

app.config['MAIL_SERVER'] = 'smtp.office365.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.environ.get('proyectocrowd@outlook.com')  # Your email address
app.config['MAIL_PASSWORD'] = os.environ.get('patata13')  # Your email password
app.config['MAIL_DEFAULT_SENDER'] = os.environ.get('proyectocrowd@outlook.com')  # Default sender email


mail = Mail(app)


# contador de tiempo por request hecho utilizando https://sureshdsk.dev/flask-decorator-to-measure-time-taken-for-a-request
@app.before_request
def logging_before():
    pass

@app.route('/addUser', methods=['POST'])
def addUsuario():
    data = request.get_json()
    usuario = data.get("name")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")
    wallet = data.get("wallet")

    # Guarda la solicitud en MongoDB
    solicitud = {
        "name": usuario,
        "email": email,
        "password": str(password),
        "phone": phone,
        "isActive": 1,
        "wallet": int(wallet),
        "isAdmin": 0,
        "isMentor": 0
    }
    coleccion = db.users
    coleccion.insert_one(solicitud)
    send_welcome_email(email, usuario)

    return jsonify({"mensaje": "Solicitud guardada exitosamente y correo enviado"}), 200

def send_welcome_email(to_email, username):
    try:
        smtp = smtplib.SMTP('smtp.office365.com', 587)
        smtp.starttls()  # Initiate TLS

        smtp.login('proyectocrowd@outlook.com', 'patata13')  # Login to your email

        # Create the email content
        from_email = "proyectocrowd@outlook.com"
        subject = "Welcome to our crowdfunding service!"
        body = f"Hello {username},\n\nThanks to subscribe to our crowdfunding app!\nThanks for your trust in us.\n\nBest regards,\nCrowdfunding team"

        msg = MIMEText(body)
        msg['From'] = from_email
        msg['To'] = to_email
        msg['Subject'] = subject

        # Send email
        smtp.sendmail(from_email, [to_email], msg.as_string())

        smtp.quit()
        return "Email sent successfully!"
    except Exception as e:
        print(f"Failed to send email: {e}")

@app.route('/addProyecto', methods=['POST'])
def addProyecto():
    data = request.get_json()
    nombre = data.get("name")
    description = data.get("description")
    goal = data.get("goal")
    endDate = data.get("endDate")
    creator = data.get("creator")
    logo = data.get("logo")

    # Guarda la solicitud en MongoDB
    solicitud = {
        "name": nombre,
        "description": description,
        "goal": int(goal),
        "endDate": endDate,
        "gathered": 0,
        "state": 1,
        "creator": creator,
        "logo" : logo
    }
    coleccion = db.projects
    coleccion.insert_one(solicitud)
    
    return jsonify({"mensaje": "Solicitud guardada exitosamente"}), 200

@app.route('/addDonacion', methods=['POST'])
def addDonacion():
    try:
        data = request.get_json()
        nombreDonator = data.get("name")
        date = data.get("date")
        amount = int(data.get("amount"))
        projectName = data.get("projectName")

        # Verificar que todos los datos requeridos están presentes
        if not (nombreDonator and date and amount and projectName):
            return jsonify({"error": "Datos incompletos"}), 400

        # Conectar con la colección de usuarios
        user_collection = db.users
        user = user_collection.find_one({"name": nombreDonator})

        if not user:
            return jsonify({"error": "Donador no encontrado"}), 404

        # Verificar si el donador tiene suficiente saldo en su billetera
        wallet_balance = user.get("wallet", 0)
        if wallet_balance < amount:
            return jsonify({"error": "Fondos insuficientes en la billetera"})

        # Descontar el monto de la donación del wallet del usuario
        user_collection.update_one(
            {"name": nombreDonator},
            {"$inc": {"wallet": -amount}}
        )

        # Guardar la solicitud en la colección de donaciones
        solicitud = {
            "nameDonator": nombreDonator,
            "date": date,
            "amount": amount,
            "project": projectName
        }
        donacion_collection = db.donations
        donacion_collection.insert_one(solicitud)

        # Actualizar el campo gathered en la colección projects
        project_collection = db.projects
        result = project_collection.update_one(
            {"name": projectName},
            {"$inc": {"gathered": amount}}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Proyecto no encontrado"}), 404

        proyecto = project_collection.find_one({"name": projectName})

        # Verificar si se ha alcanzado la meta
        gathered = proyecto.get("gathered", 0)
        goal = proyecto.get("goal", 0)
        current_state = proyecto.get("state", 1)

        if gathered >= goal and current_state != 2:
            project_collection.update_one(
                {"name": projectName},
                {"$set": {"state": 2}}
            )

        # Obtener el correo del donador
        to_email_donator = user.get("email")

        # Buscar el correo del creador del proyecto
        creador_name = proyecto.get("creator")
        creador = user_collection.find_one({"name": creador_name})

        if not creador:
            return jsonify({"error": "Creador del proyecto no encontrado"}), 404

        to_email_creador = creador.get("email")

        # Enviar el email de agradecimiento al donador
        send_thanks_email(to_email_donator, nombreDonator, projectName)

        # Enviar notificación al creador del proyecto
        send_notification_to_creator(to_email_creador, creador_name, projectName, amount, nombreDonator)

        return jsonify({"donacion": "exitosa"}), 200

    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def send_thanks_email(to_email, username, projectName):
    try:
        smtp = smtplib.SMTP('smtp.office365.com', 587)
        smtp.starttls()  # Initiate TLS

        smtp.login('proyectocrowd@outlook.com', 'patata13')  # Login to your email

        # Create the email content
        from_email = "proyectocrowd@outlook.com"
        subject = "Thanks for supporting my project<3!"
        body = f"Hello {username},\n\nThanks for making a donation to {projectName}!\nThanks for your trust in my idea.\n\nBest regards,\n{projectName} team"

        msg = MIMEText(body)
        msg['From'] = from_email
        msg['To'] = to_email
        msg['Subject'] = subject

        # Send email
        smtp.sendmail(from_email, [to_email], msg.as_string())

        smtp.quit()
        return "Email sent successfully!"
    except Exception as e:
        print(f"Failed to send email: {e}")

def send_notification_to_creator(to_email, creador, projectName, amount, nombreDonator):
    try:
        smtp = smtplib.SMTP('smtp.office365.com', 587)
        smtp.starttls()  # Initiate TLS

        smtp.login('proyectocrowd@outlook.com', 'patata13')  # Login to your email

        # Create the email content
        amountStr=str(amount)
        from_email = "proyectocrowd@outlook.com"
        subject = f"Someone supports your project {projectName}!"
        body = f"Hello {creador},\n\nThe user {nombreDonator}, JUST MAKE A DONATION TO YOUR PROJECT!\nWith an amount of:{amountStr}\n\nBest regards,\ncrowdfunding team"

        msg = MIMEText(body)
        msg['From'] = from_email
        msg['To'] = to_email
        msg['Subject'] = subject

        # Send email
        smtp.sendmail(from_email, [to_email], msg.as_string())

        smtp.quit()
        return "Email sent successfully!"
    except Exception as e:
        print(f"Failed to send email: {e}")

@app.route('/update_password', methods=['POST'])
def actualizar_password():
    try:
        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.users

        # Obtener los datos enviados en el cuerpo de la solicitud
        data = request.get_json()
        usuario = data.get('userName') 
        password = data.get('password')  # La nueva contraseña
        password = str(password)

        if not usuario or not password:
            return jsonify({"error": "userId y password son requeridos"}), 400

        # Actualizar el campo password para el usuario con el user_id dado
        result = collection.update_one(
            {"name": usuario},
            {"$set": {"password": password}}  # Actualizar el campo password
        )

        # Verificar si se actualizó algún documento
        if result.modified_count == 1:
            return jsonify({"message": "Contraseña actualizada exitosamente"}), 200
        else:
            return jsonify({"error": "Usuario no encontrado o la contraseña no se actualizó"}), 404

    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/updateProject', methods=['POST'])
def actualizar_proyecto():
    try:
        # Obtener los datos enviados en el cuerpo de la solicitud
        data = request.get_json()
        nombre = data.get("name")
        description = data.get("description")
        goal = data.get("goal")
        endDate = data.get("endDate")
        logo = data.get("logo")
        # Verificar que se envíe el nombre del proyecto
        if not nombre:
            return jsonify({"error": "El nombre del proyecto es requerido"}), 400

        # Actualizar el proyecto con los campos proporcionados
        update_fields = {}

        if description:
            update_fields["description"] = description
        if goal is not None:
            update_fields["goal"] = int(goal)
        if endDate:
            update_fields["endDate"] = endDate
        if logo:
            update_fields["logo"] = logo

        # Seleccionar la base de datos y la colección
        project_collection = db.projects

        # Actualizar el proyecto con los datos proporcionados
        result = project_collection.update_one(
            {"name": nombre},  # Filtro: Proyecto donde coincida el nombre
            {"$set": update_fields}  # Actualizar los campos proporcionados
        )

        # Verificar si se actualizó algún proyecto
        if result.matched_count == 0:
            return jsonify({"error": "Proyecto no encontrado"}), 404

        return jsonify({"mensaje": "Proyecto actualizado exitosamente"}), 200

    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500


@app.route('/user/<userName>', methods=['GET'])
def getUser(userName):
    try:
        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.users

        # Realizar la búsqueda en el campo deseado
        regex = f"\\b{userName}\\b"       # Expresión para buscar la palabra exacta
        resultado = collection.find({"name": { "$regex": regex, "$options": "i" }})

        resultados_json = [documento for documento in resultado]

        # Convertir la lista de diccionarios a JSON y luego a bytes
        for documento in resultados_json:
            documento['_id'] = str(documento['_id'])

        return resultados_json

    except PyMongoError as e:
        return jsonify({"error": str(e)})
    
    
    
@app.route('/verifyUser', methods=['POST'])
def verifyUser():
    try:
        data = request.get_json()
        usuario = data.get("username")
        password = data.get("password")

        # Seleccionar la colección
        coleccion = db.users

        # Verificar si el usuario con ese nombre y contraseña existe
        user = coleccion.find_one({"name": usuario, "password": str(password)})

        if user:
            # Si existe, retornar si es admin y que existe
            return jsonify({"existe": 1, "isAdmin": user.get("isAdmin", 0)}), 200
        else:
            # Si no existe, retornar que no existe
            return jsonify({"existe": 0}), 200

    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500


@app.route('/donation/<donatorName>', methods=['GET'])
def getDonations(donatorName):
    try:
        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.donations

        # Realizar la búsqueda en el campo deseado
        regex = f"\\b{donatorName}\\b"       # Expresión para buscar la palabra exacta
        resultado = collection.find({"nameDonator": { "$regex": regex, "$options": "i" }})

        resultados_json = [documento for documento in resultado]

        # Convertir la lista de diccionarios a JSON y luego a bytes
        for documento in resultados_json:
            documento['_id'] = str(documento['_id'])

        return resultados_json

    except PyMongoError as e:
        return jsonify({"error": str(e)})
    
@app.route('/projects', methods=['GET'])
def getAllProjects():
    try:
        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.projects

        # Realizar la búsqueda de todos los proyectos (sin filtro)
        resultado = collection.find({})

        # Convertir el cursor a una lista de diccionarios (JSON)
        resultados_json = [documento for documento in resultado]

        # Convertir ObjectId a cadena para cada documento
        for documento in resultados_json:
            documento['_id'] = str(documento['_id'])

        # Retornar los proyectos como JSON
        return jsonify(resultados_json), 200

    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/mentors', methods=['GET'])
def get_all_mentors():
    try:
        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.users

        # Buscar solo los usuarios que son mentores (isMentor = 1)
        resultado = collection.find({"isMentor": 1})

        # Convertir el cursor a una lista de diccionarios (JSON)
        resultados_json = [documento for documento in resultado]

        # Convertir ObjectId a cadena para cada documento
        for documento in resultados_json:
            documento['_id'] = str(documento['_id'])

        # Retornar los mentores como JSON
        return jsonify(resultados_json), 200

    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500


@app.route('/users', methods=['GET'])
def getAllUsers():
    try:
        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.users

        # Realizar la búsqueda de todos los proyectos (sin filtro)
        resultado = collection.find({})

        # Convertir el cursor a una lista de diccionarios (JSON)
        resultados_json = [documento for documento in resultado]

        # Convertir ObjectId a cadena para cada documento
        for documento in resultados_json:
            documento['_id'] = str(documento['_id'])

        # Retornar los proyectos como JSON
        return jsonify(resultados_json), 200

    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/donations', methods=['GET'])
def getAllDonations():
    try:
        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.donations

        # Realizar la búsqueda de todos los proyectos (sin filtro)
        resultado = collection.find({})

        # Convertir el cursor a una lista de diccionarios (JSON)
        resultados_json = [documento for documento in resultado]

        # Convertir ObjectId a cadena para cada documento
        for documento in resultados_json:
            documento['_id'] = str(documento['_id'])

        # Retornar los proyectos como JSON
        return jsonify(resultados_json), 200

    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500
    


@app.route('/projectFull/<projectName>', methods=['GET'])
def getProjectFull(projectName):
    try:
        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.projects

        # Realizar la búsqueda en el campo deseado
        regex = f"\\b{projectName}\\b"       # Expresión para buscar la palabra exacta
        resultado = collection.find({"name": { "$regex": regex, "$options": "i" }})
        resultados_json = [documento for documento in resultado]

        # Convertir la lista de diccionarios a JSON y luego a bytes
        for documento in resultados_json:
            documento['_id'] = str(documento['_id'])

        return resultados_json

    except PyMongoError as e:
        return jsonify({"error": str(e)})
    
@app.route('/projectByName/<creatorName>', methods=['GET'])
def getProjectByName(creatorName):
    try:
        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.projects

        # Realizar la búsqueda en el campo deseado
        regex = f"\\b{creatorName}\\b"       # Expresión para buscar la palabra exacta
        resultado = collection.find({"creator": { "$regex": regex, "$options": "i" }})
        resultados_json = [documento for documento in resultado]

        # Convertir la lista de diccionarios a JSON y luego a bytes
        for documento in resultados_json:
            documento['_id'] = str(documento['_id'])

        return resultados_json
    except PyMongoError as e:
        return jsonify({"error": str(e)})

@app.route('/getUserCounts', methods=['GET'])
def get_user_counts():
    try:
        users_collection = db.users
        
        # Contar usuarios activos (isActive = 1)
        active_users = users_collection.count_documents({"isActive": 1})
        
        # Contar usuarios inactivos (isActive = 0)
        inactive_users = users_collection.count_documents({"isActive": 0})
        
        # Retornar la respuesta en formato JSON
        return jsonify({
            "activeUsers": active_users,
            "inactiveUsers": inactive_users
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/getProjectCounts', methods=['GET'])
def get_project_counts():
    try:
        projects_collection = db.projects
        
        # Contar proyectos por estado
        state_0_count = projects_collection.count_documents({"state": 0})
        state_1_count = projects_collection.count_documents({"state": 1})
        state_2_count = projects_collection.count_documents({"state": 2})
        state_3_count = projects_collection.count_documents({"state": 3})
        
        return jsonify({
            "state_0": state_0_count,
            "state_1": state_1_count,
            "state_2": state_2_count,
            "state_3": state_3_count
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/getDonationsByMonth', methods=['GET'])
def get_donations_by_month():
    try:
        donations_collection = db.donations

        # Usar aggregate para agrupar por mes y contar donaciones
        pipeline = [
            {
                "$addFields": {
                    "month": {"$substr": ["$date", 3, 2]}  # Extraer el mes de la fecha dd-mm-yyyy
                }
            },
            {
                "$group": {
                    "_id": "$month",
                    "count": {"$sum": 1}
                }
            },
            {
                "$sort": {"_id": 1}  # Ordenar por mes
            }
        ]

        results = list(donations_collection.aggregate(pipeline))
        
        # Formatear la respuesta como un diccionario
        donations_by_month = {result["_id"]: result["count"] for result in results}
        
        return jsonify(donations_by_month), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/events', methods=['GET'])
def get_all_events():
    try:
        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.events

        # Realizar la búsqueda de todos los eventos
        resultado = collection.find({})

        # Convertir el cursor a una lista de diccionarios (JSON)
        eventos_json = [documento for documento in resultado]

        # Convertir ObjectId a cadena para cada documento
        for documento in eventos_json:
            documento['_id'] = str(documento['_id'])

        # Retornar los eventos como JSON
        return jsonify(eventos_json), 200

    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/createEvent', methods=['POST'])
def create_event():
    try:
        # Obtener los datos del cuerpo de la solicitud (JSON)
        event_data = request.get_json()

        # Validar que se recibieron los campos necesarios
        required_fields = ["logo", "nombre", "modalidad", "material", "creador", "date"]
        for field in required_fields:
            if field not in event_data:
                return jsonify({"error": f"Falta el campo {field} en la solicitud"}), 400

        # Crear el evento con los datos recibidos
        event = {
            "logo": event_data["logo"],
            "nombre": event_data["nombre"],
            "modalidad": event_data["modalidad"],
            "material": event_data["material"],
            "isActive": 1,
            "participantes": [],  # Si el array está vacío, se asigna un array vacío
            "creador": event_data["creador"],
            "date": event_data["date"]
        }

        # Insertar el evento en la colección 'events'
        events_collection = db.events
        result = events_collection.insert_one(event)

        # Retornar la respuesta con el evento creado
        return jsonify({"message": "Evento creado exitosamente", "event_id": str(result.inserted_id)}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# @app.route('/getImageLink', methods=['GET'])
# def get_image_link():
#     IMAGE_FOLDER = r"C:\Users\hdani\OneDrive\Escritorio\Harlen\Semestre 2 2024\AP\App repo"
#     try:
#         users_collection = db.users
#         # Contar usuarios activos (isActive = 1)
#         active_users = users_collection.count_documents({"isActive": 1})
        
#         # Contar usuarios inactivos (isActive = 0)
#         inactive_users = users_collection.count_documents({"isActive": 0})
        
#         projects_collection = db.projects
#         state_0_count = projects_collection.count_documents({"state": 0})
#         state_1_count = projects_collection.count_documents({"state": 1})
#         state_2_count = projects_collection.count_documents({"state": 2})

#         # Devolver los resultados como JSON
#         generate_user_chart(active_users, inactive_users)
#         generar_grafico_pastel(state_2_count, state_1_count, state_0_count)

#         user_activity_chart_path = os.path.join(IMAGE_FOLDER, 'user_activity_chart.jpg')
#         grafico_pastel_path = os.path.join(IMAGE_FOLDER, 'grafico_pastel_proyectos.jpg')
#         image_urls = {}

#         if os.path.exists(user_activity_chart_path):
#             image_urls['user_activity_chart'] = url_for('serve_image', image_name='user_activity_chart.jpg', _external=True)
#         else:
#             image_urls['user_activity_chart'] = 'Image not found'

#         if os.path.exists(grafico_pastel_path):
#             image_urls['grafico_pastel_proyectos'] = url_for('serve_image', image_name='grafico_pastel_proyectos.jpg', _external=True)
#         else:
#             image_urls['grafico_pastel_proyectos'] = 'Image not found'

#         return jsonify(image_urls), 200
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# @app.route('/images/<image_name>', methods=['GET'])
# def serve_image(image_name):
#     IMAGE_FOLDER = r"C:\Users\hdani\OneDrive\Escritorio\Harlen\Semestre 2 2024\AP\App repo"
#     try:
#         # Serve the image from the 'images' folder
#         return send_from_directory(IMAGE_FOLDER, image_name)
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

@app.route('/pendingMentors', methods=['GET'])
def get_pending_mentors():
    try:
        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.users

        # Realizar la búsqueda de usuarios con isMentor = 2
        resultado = collection.find({"isMentor": 2})

        # Convertir el cursor a una lista de diccionarios (JSON)
        resultados_json = [documento for documento in resultado]

        # Convertir ObjectId a cadena para cada documento
        for documento in resultados_json:
            documento['_id'] = str(documento['_id'])

        # Retornar los usuarios como JSON
        return jsonify(resultados_json), 200

    except PyMongoError as e:
        return jsonify({"error": str(e)}), 500

@app.route('/toggleUserActive', methods=['POST'])
def toggle_user_active():
    try:
        # Get the data from the request
        data = request.get_json()
        user_name = data.get("name")
        action = data.get("action")  # "activate" or "deactivate"
        
        if not user_name or not action:
            return jsonify({"error": "Name and action are required"}), 400

        # Determine the value for `isActive` based on action
        is_active = 1 if action == "activate" else 0
        users_collection = db.users 
        # Update the user's `isActive` status based on the action
        result = users_collection.update_one(
            {"name": user_name},
            {"$set": {"isActive": is_active}}
        )

        # Check if any user was updated
        if result.matched_count == 0:
            return jsonify({"error": "User not found"}), 404

        action_status = "activated" if is_active == 1 else "deactivated"
        return jsonify({"message": f"User '{user_name}' has been {action_status}"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/updateMentorStatus', methods=['POST'])
def update_mentor_status():
    try:
        # Obtener los datos del cuerpo de la solicitud (JSON)
        data = request.get_json()

        # Validar que los campos necesarios estén presentes
        if "name" not in data or "isMentor" not in data:
            return jsonify({"error": "Falta el campo 'name' o 'isMentor' en la solicitud"}), 400

        # Validar que el valor de isMentor sea 0, 1 o 2
        if data['isMentor'] not in [0, 1, 2]:
            return jsonify({"error": "El campo 'isMentor' debe ser 0, 1 o 2"}), 400

        username = data['name']
        new_status = data['isMentor']

        # Si isMentor es 2, validar que los campos 'experience' y 'price' estén presentes
        if new_status == 2:
            if "price" not in data or "experience" not in data:
                return jsonify({"error": "Faltan los campos 'price' y 'experience' para isMentor = 2"}), 400

            # Validar que el campo 'price' sea un número (double)
            try:
                data['price'] = float(data['price'])
            except ValueError:
                return jsonify({"error": "El campo 'price' debe ser un número válido"}), 400

            price = data['price']
            experience = data['experience']

        # Seleccionar la base de datos y las colecciones
        db = client.proyecto_ap
        users_collection = db.users
        mentor_appointment_collection = db.mentor_appointment

        # Actualizar el usuario según el valor de isMentor
        update_data = {"isMentor": new_status}

        # Si isMentor es 2, agregar también 'price' y 'experience' a los datos de actualización
        if new_status == 2:
            update_data.update({
                "price": price,
                "experience": experience
            })

        # Realizar la actualización en la base de datos
        result = users_collection.update_one(
            {"name": username},
            {"$set": update_data}
        )

        # Verificar si se actualizó algún documento
        if result.modified_count == 0:
            return jsonify({"message": "Usuario no encontrado o sin cambios"}), 404
        if new_status == 1:
            # Agregar al usuario a la colección mentor_appointment con mentorName y slots vacíos
            mentor_appointment_data = {
                "mentorName": username,  # Cambiado a mentorName
                "slots": []  # Slots vacíos al principio
            }
            mentor_appointment_collection.insert_one(mentor_appointment_data)
            return jsonify({"message": "Usuario actualizado exitosamente y agregado a mentor_appointment"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/createAvailability', methods=['POST'])
def create_availability():
    try:
        # Obtener los datos del cuerpo de la solicitud (JSON)
        data = request.get_json()
        mentor_name = data.get('mentorName')
        date = data.get('date')
        time = data.get('time')

        # Validar que los campos requeridos estén presentes
        if not mentor_name or not date or not time:
            return jsonify({"error": "Faltan datos requeridos"}), 400

        db = client.proyecto_ap
        collection = db.mentor_appointment

        # Crear un nuevo slot
        new_slot = {
            "date": date,
            "time": time,
            "isBooked": 0,
            "bookedBy": ""
        }

        collection.update_one(
            {"mentorName": mentor_name},
            {"$push": {"slots": new_slot}}
        )
        message = "Slot agregado al mentor existente"

        return jsonify({"message": message}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/getAvailableSlots/<mentorName>', methods=['GET'])
def get_available_slots(mentorName):
    try:
        if not mentorName:
            return jsonify({"error": "Se requiere el nombre del mentor"}), 400

        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.mentor_appointment

        # Realizar la agregación para obtener los slots disponibles del mentor y ordenarlos
        pipeline = [
            {
                "$match": {
                    "mentorName": mentorName
                }
            },
            {
                "$unwind": "$slots"  # Descomponer la lista de slots para filtrar
            },
            {
                "$match": {
                    "slots.isBooked": 0  # Filtrar solo los slots disponibles
                }
            },
            {
                "$sort": {
                    "slots.date": 1,
                    "slots.time": 1
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "mentorName": 1,
                    "date": "$slots.date",
                    "time": "$slots.time"
                }
            }
        ]

        # Ejecutar el pipeline de agregación
        available_slots = list(collection.aggregate(pipeline))

        # Verificar si hay resultados
        if not available_slots:
            return jsonify({"message": "No hay slots disponibles para este mentor"}), 404

        return jsonify(available_slots), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/bookSlot', methods=['POST'])
def book_slot():
    try:
        # Obtener los datos del cuerpo de la solicitud (JSON)
        data = request.get_json()

        # Validar que todos los campos necesarios estén presentes
        required_fields = ["mentorName", "date", "time", "bookedBy"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Falta el campo {field} en la solicitud"}), 400

        mentor_name = data['mentorName']
        date = data['date']
        time = data['time']
        booked_by = data['bookedBy']

        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.mentor_appointment

        # Buscar el slot que coincida y esté disponible
        result = collection.update_one(
            {
                "mentorName": mentor_name,
                "slots": {
                    "$elemMatch": {
                        "date": date,
                        "time": time,
                        "isBooked": 0
                    }
                }
            },
            {
                "$set": {
                    "slots.$.isBooked": 1,
                    "slots.$.bookedBy": booked_by
                }
            }
        )

        # Verificar si se encontró y actualizó algún documento
        if result.matched_count == 0:
            return jsonify({"message": "Slot no disponible o no encontrado"}), 404

        return jsonify({"message": "Slot reservado exitosamente"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/getAvailableSlotsByDate', methods=['POST'])
def get_available_slots_by_date():
    try:
        # Obtener los datos del cuerpo de la solicitud (JSON)
        data = request.get_json()

        # Validar que los campos requeridos estén presentes
        if not data or 'mentorName' not in data or 'date' not in data:
            return jsonify({"error": "Faltan campos requeridos (mentorName y date)"}), 400

        mentor_name = data['mentorName']
        date = data['date']

        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.mentor_appointment
        
        # Buscar slots disponibles para la fecha y mentor proporcionados
        result = collection.find_one(
            {
                "mentorName": mentor_name,
                "slots.date": date
            },
            {
                "slots": 1
            }
        )

        # Verificar si se encontró disponibilidad
        if not result or not result.get('slots'):
            return jsonify({"message": "No hay horas disponibles para esa fecha"}), 404

        # Filtrar las horas disponibles (isBooked = 0)
        available_times = [slot['time'] for slot in result['slots'] if slot['date'] == date and slot['isBooked'] == 0]

        # Si no hay horas disponibles para esa fecha
        if not available_times:
            return jsonify({"message": "No hay horas disponibles para esa fecha"}), 404

        return jsonify(available_times), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/getBookedSlotsByMentor/<mentorName>', methods=['GET'])
def get_booked_slots_by_mentor(mentorName):
    try:
        # Validar que el parámetro mentorName esté presente
        if not mentorName:
            return jsonify({"error": "El parámetro 'mentorName' es requerido"}), 400

        # Seleccionar la base de datos y la colección
        db = client.proyecto_ap
        collection = db.mentor_appointment

        # Buscar todos los slots que tienen isBooked = 1 para el mentor especificado
        pipeline = [
            {
                "$match": {"mentorName": mentorName}
            },
            {
                "$unwind": "$slots"
            },
            {
                "$match": {"slots.isBooked": 1}
            },
            {
                "$project": {
                    "_id": 0,
                    "mentorName": 1,
                    "slots": 1
                }
            }
        ]

        # Ejecutar la consulta
        booked_slots = list(collection.aggregate(pipeline))

        # Verificar si hay resultados
        if not booked_slots:
            return jsonify({"message": f"No hay citas reservadas para el mentor {mentorName}"}), 404

        return jsonify(booked_slots), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


#probarlo
#https://oyster-robust-ghost.ngrok-free.app/getImageLink/user_activity_chart.jpg

if __name__ == '__main__':
    app.run(host='0.0.0.0')


