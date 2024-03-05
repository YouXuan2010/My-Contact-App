from flask import request, jsonify
from config import app, db
from models import Contact

# List of status codes: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
# Test API with Postman: https://www.postman.com/

@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda contact: contact.to_json(), contacts))
    #return jsonify([contact.to_json() for contact in contacts])
    return jsonify({"contacts": json_contacts}) 

@app.route("/create_contact", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")

    if not first_name or not last_name or not email:
        return jsonify({"message": "You must provide a first name, last name and email"}), 400

    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 400
    
    return jsonify({"message": "Contact created successfully"}), 201

# The user_id is passed as a parameter
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id)
    if not contact:
        return jsonify({"message": "Contact not found"}), 404

    # Handle the data sent in the request, in case some fields are not sent we keep the old data
    data = request.json
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)

    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 400

    return jsonify({"message": "Contact updated successfully"}), 200

@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)
    if not contact:
        return jsonify({"message": "Contact not found"}), 404

    try:
        db.session.delete(contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": f"An error occurred: {str(e)}"}), 400

    return jsonify({"message": "Contact deleted successfully"}), 200

if __name__ == "__main__":
    # Create the database
    with app.app_context():
        db.create_all()

    app.run(debug=True)