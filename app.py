import json
import random


from flask import Flask, Response, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForCausalLM
from transformers import pipeline

app = Flask(__name__)
CORS(app, resources={r"/generate": {"origins": "*"}})

print("\nLoading models...")

joetokenizer = AutoTokenizer.from_pretrained("huggingtweets/joebiden")
joemodel = AutoModelForCausalLM.from_pretrained("huggingtweets/joebiden")
donaldtokenizer = AutoTokenizer.from_pretrained("huggingtweets/realdonaldtrump")
donaldmodel = AutoModelForCausalLM.from_pretrained("huggingtweets/realdonaldtrump")
elontokenizer = AutoTokenizer.from_pretrained("huggingtweets/elonmusk")
elonmodel = AutoModelForCausalLM.from_pretrained("huggingtweets/elonmusk")
tstokenizer = AutoTokenizer.from_pretrained("huggingtweets/tswiftlyricsbot")
tsmodel = AutoModelForCausalLM.from_pretrained("huggingtweets/tswiftlyricsbot")
buddhatokenizer = AutoTokenizer.from_pretrained("huggingtweets/_buddha_quotes")
buddhamodel = AutoModelForCausalLM.from_pretrained("huggingtweets/_buddha_quotes")

print("Models loaded.\n")

people = {
    "joe": (joemodel, joetokenizer),
    "donald": (donaldmodel, donaldtokenizer),
    "elon": (elonmodel, elontokenizer),
    "ts": (tsmodel, tstokenizer),
    "buddha": (buddhamodel, buddhatokenizer)
}


@app.post("/generate")
def hello_world():
    body = request.json
    prompt = body.get("prompt")
    person = body.get("person")

    if not prompt:
        return Response(
            json.dumps({"message": "Parameter 'prompt' is required."}),
            mimetype="application/json", status=400)
    if not person or person not in people:
        return Response(
            json.dumps({"message": f"'person' needs to be one of {list(people.keys())}."}),
            mimetype="application/json", status=400)

    model, tokenizer = people[person]
    generator = pipeline('text-generation', model=model,
                         tokenizer=tokenizer, max_length=max(15, len(prompt)))
    text = generator(prompt, num_return_sequences=5)

    rand_num = random.randint(0, 4)
    new_text = text[rand_num]['generated_text'].split(prompt)[1]
    if len(new_text) <= 1:  # if last token (punctuation or stop)
        prompt += new_text
    else:  # add first word from new text
        prompt += ' ' + new_text.split(' ')[1]

    response = jsonify({"generated_text": prompt})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


# enables flask app to run using "python3 app.py"
if __name__ == '__main__':
    app.run(debug=True)
