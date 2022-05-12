import json
import random

from flask import Flask, Response, request
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForCausalLM
from transformers import pipeline

app = Flask(__name__)
CORS(app)

print("\nLoading models...")

joetokenizer = AutoTokenizer.from_pretrained("huggingtweets/joebiden")
joemodel = AutoModelForCausalLM.from_pretrained("huggingtweets/joebiden")
donaldtokenizer = AutoTokenizer.from_pretrained("huggingtweets/realdonaldtrump")
donaldmodel = AutoModelForCausalLM.from_pretrained("huggingtweets/realdonaldtrump")
elontokenizer = AutoTokenizer.from_pretrained("huggingtweets/elonmusk")
elonmodel = AutoModelForCausalLM.from_pretrained("huggingtweets/elonmusk")
shakespearetokenizer = AutoTokenizer.from_pretrained("huggingtweets/wwm_shakespeare")
shakespearemodel = AutoModelForCausalLM.from_pretrained("huggingtweets/wwm_shakespeare")
buddhatokenizer = AutoTokenizer.from_pretrained("huggingtweets/_buddha_quotes")
buddhamodel = AutoModelForCausalLM.from_pretrained("huggingtweets/_buddha_quotes")

print("Models loaded.\n")

people = {
    "joe": (joemodel, joetokenizer),
    "donald": (donaldmodel, donaldtokenizer),
    "elon": (elonmodel, elontokenizer),
    "shakespeare": (shakespearemodel, shakespearetokenizer),
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

    r = [0] * len(text)
    for i in range(len(text)):
        r[i] = len(text[i]['generated_text'])
    longest_response = text[r.index(max(r))]['generated_text']
    b = longest_response.split(prompt)
    new_word = b[1].split(' ')
    if len(new_word) > 1 and new_word[0] == '' or new_word[0] == '\n':
        prompt = prompt + ' ' + new_word[1]
    elif new_word[0] != '' and new_word[0] != '\n':
        prompt = prompt + new_word[0]
    else:
        text = generator(prompt.split(' ')[-1], num_return_sequences=5)
        r = [0] * len(text)
        for i in range(len(text)):
            r[i] = len(text[i]['generated_text'])
        longest_response = text[r.index(max(r))]['generated_text']
        b = longest_response.split(prompt)
        new_word = b[1].split(' ')
        if new_word[0] == '':
            prompt = prompt + ' ' + new_word[1]
        else:
            prompt = prompt + ' ' + new_word[0]
        
    
    return Response(json.dumps({"generated_text": prompt}),
                    mimetype="application/json", status=200)


# enables flask app to run using "python3 app.py"
if __name__ == '__main__':
    app.run(debug=True)
