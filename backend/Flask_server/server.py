from flask import Flask, request, jsonify
import joblib
import numpy as np
from scipy.sparse import hstack
app = Flask(__name__)

model = joblib.load('./model/name_to_gender_detector.pkl')
tokenizer=joblib.load('./model/tokenizer.pkl')
scaler=joblib.load('./model/scaler.pkl')
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    name = data.get('name', '')
    count = data.get('count', 0)
    probability = data.get('probability', 0.0)

    name_processed = tokenizer.transform([name])
    count_probability_processed = scaler.transform(np.array([[count, probability]]))
    x_input = hstack([name_processed, count_probability_processed])

    prediction = model.predict(x_input)
    gender = 'M' if prediction[0] == 1 else 'F'

    return jsonify({'gender': gender})

if __name__ == '__main__':
    app.run(port=5000)
