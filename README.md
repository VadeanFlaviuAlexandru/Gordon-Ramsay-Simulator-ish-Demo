<h1 align="center">
  Gordon Ramsay Simulator-ish Demo
  <br>
</h1>

<h4 align="center">Personal project to understand how to use HuggingFace's JS libraries, such as inference, hub, and agents.</h4>
<h5 align="center"> This is a simple demo. I'm planning to expand this in a different repository. </h5>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#screenshots">Screenshots</a> •
  <a href="#HuggingFace">Screenshots</a>
</p>

## Key Features

* <a href="https://gordon-ramsay-sim-demo.netlify.app/">Hosted on netlify</a>
* You can paste the link (or upload) a file of a food item, then chef Gordon Ramsay will analyze it. The analyzation of the item is done using the '<a href="https://huggingface.co/nlpconnect/vit-gpt2-image-captioning">nlpconnect/vit-gpt2-image-captioning</a>' model, after which we use '<a href="https://huggingface.co/dandelin/vilt-b32-finetuned-vqa">dandelin/vilt-b32-finetuned-vqa</a>' to ask a simple question: "Is this food, yes or no? if yes, what food is in this image?"
* I used Next.js and scss
* Based on the image, Ramsay will give different responses.

## Hugging Face Libraries

* <a href="https://huggingface.co/docs/huggingface.js/en/index"> Everything is taken from their official documentation </a>, but in general:
  * @huggingface/inference: Use Inference Endpoints (serverless or dedicated) to make calls to 100,000+ Machine Learning models
  * @huggingface/agents: Interact with HF models through a natural language interface

## Screenshots


![image](https://github.com/VadeanFlaviuAlexandru/Gordon-Ramsay-Simulator-ish-Demo/assets/103831098/e5032e75-2006-4efa-8809-956a19392631)

![image](https://github.com/VadeanFlaviuAlexandru/Gordon-Ramsay-Simulator-ish-Demo/assets/103831098/001516bf-fb05-4af3-a859-0f348847f6e3)

![image](https://github.com/VadeanFlaviuAlexandru/Gordon-Ramsay-Simulator-ish-Demo/assets/103831098/0b89f49f-62bd-4e92-9ebe-9d4c6afd9405)

![image](https://github.com/VadeanFlaviuAlexandru/Gordon-Ramsay-Simulator-ish-Demo/assets/103831098/26c69f1f-1286-4fdd-b092-b1b9fd2af04e)

![image](https://github.com/VadeanFlaviuAlexandru/Gordon-Ramsay-Simulator-ish-Demo/assets/103831098/94d34ade-5254-4e3b-a198-0ccb37151538)
