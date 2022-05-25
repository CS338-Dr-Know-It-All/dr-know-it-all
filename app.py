import json
import os

from flask import Flask, Response, request
from flask_cors import CORS
from transformers import AutoTokenizer, AutoModelForCausalLM
from transformers import pipeline

app = Flask(__name__)
CORS(app)

print("\nLoading models...")

if os.path.exists("./models"):
    joetokenizer = "./models/joebiden"
    joemodel = "./models/joebiden"
    donaldtokenizer = "./models/realdonaldtrump"
    donaldmodel = "./models/realdonaldtrump"
    elontokenizer = "./models/elonmusk"
    elonmodel = "./models/elonmusk"
    shakespearetokenizer = "./models/wwm_shakespeare"
    shakespearemodel = "./models/wwm_shakespeare"
    buddhatokenizer = "./models/_buddha_quotes"
    buddhamodel = "./models/_buddha_quotes"
else:
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


@app.route("/generate", methods=["POST"])
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
    texts = generator(prompt, num_return_sequences=5)

    longest_response = max(texts, key=lambda text: len(text['generated_text']))['generated_text']
    generated_text = longest_response.split(prompt, 1)  # begins with '' (empty string), then new text

    if len(generated_text) > 1:  # if there is newly generated text
        new_words = generated_text[1].split(' ')
        if len(new_words) > 1 and new_words[0] == '' or new_words[0] == '\n':
            prompt = prompt + ' ' + new_words[1]  # actual word
        elif new_words[0] != '' and new_words[0] != '\n':
            prompt = prompt + new_words[0]  # punctuation

    else:  # re-generate text based on last word
        last_word = prompt.split(' ')[-1]
        texts = generator(last_word, num_return_sequences=5)
        longest_response = max(texts, key=lambda text: len(text['generated_text']))['generated_text']
        generated_text = longest_response.split(last_word, 1)  # begins with '' (empty string), then new text

        if len(generated_text) > 1:  # if there is newly generated text
            new_words = generated_text[1].split(' ')
            if len(new_words) > 1 and new_words[0] == '' or new_words[0] == '\n':
                prompt = prompt + ' ' + new_words[1]  # actual word
            elif new_words[0] != '' and new_words[0] != '\n':
                prompt = prompt + new_words[0]  # punctuation

    return Response(json.dumps({"generated_text": prompt}),
                    mimetype="application/json", status=200)


# enables flask app to run using "python3 app.py"
if __name__ == '__main__':
    app.run(debug=True)
