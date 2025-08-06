from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

# MongoDB Connection
client = MongoClient('mongodb://localhost:27017/')
db = client['eventdb']
events_collection = db['events']
bookings_collection = db['bookings']

# Get All Events
@app.route('/api/events', methods=['GET'])
def get_events():
    events = list(events_collection.find({}, {"_id": 0}))  # Exclude _id for cleaner frontend
    return jsonify(events)

@app.route('/')
def home():
    return "✅ Event Booking API is running!"

# Book an Event
@app.route('/api/book', methods=['POST'])
def book_event():
    data = request.get_json()
    user_id = data.get('userId')
    event_id = data.get('eventId')

    if not user_id or not event_id:
        return jsonify({'error': 'Missing user ID or event ID'}), 400

    booking = {
        'userId': user_id,
        'eventId': event_id
    }
    bookings_collection.insert_one(booking)
    return jsonify({'message': 'Booking successful'}), 201

# Get bookings for a user (by email)
@app.route('/api/bookings', methods=['GET'])
def get_user_bookings():
    email = request.args.get('email')
    if not email:
        return jsonify([])  # or return an error
    bookings = list(bookings_collection.find({'userEmail': email}))
    for booking in bookings:
        booking['_id'] = str(booking['_id'])
    return jsonify(bookings)

# Cancel a booking by ID
@app.route('/api/bookings/<booking_id>', methods=['DELETE'])
def cancel_booking(booking_id):
    result = bookings_collection.delete_one({'_id': ObjectId(booking_id)})
    if result.deleted_count == 1:
        return jsonify({'message': 'Booking cancelled'})
    else:
        return jsonify({'message': 'Booking not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)