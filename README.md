<h1 align="center">
  Gordon Ramsay Simulator-ish Demo
  <br>
</h1>

<h4 align="center">Personal project to understand how to use HuggingFace's JS libraries, such as inference, hub, and agents.</h4>
<h5 align="center"> This is a simple demo. I'm planning to expand this in a different repository. </h5>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#screenshots">Screenshots</a> •
</p>

## Key Features

* <a href="https://gordon-ramsay-sim-demo.netlify.app/">Hosted on netlify</a>
* You can paste the link (or upload) a file of a food item, then chef Gordon Ramsay will analyze it. The analyzation of the item is done using the 'nlpconnect/vit-gpt2-image-captioning' model, after which we use 'dandelin/vilt-b32-finetuned-vqa' to ask a simple question: "Is this food, yes or no? if yes, what food is in this image?"
* I used Next.js and scss (again, this is a simple demo for me)
* Based on the image, Ramsay will give different responses.

## Screenshots


![image](https://github.com/VadeanFlaviuAlexandru/Gordon-Ramsay-Simulator-ish-Demo/assets/103831098/e5032e75-2006-4efa-8809-956a19392631)

![image](https://github.com/VadeanFlaviuAlexandru/Gordon-Ramsay-Simulator-ish-Demo/assets/103831098/001516bf-fb05-4af3-a859-0f348847f6e3)

![image](https://github.com/VadeanFlaviuAlexandru/Gordon-Ramsay-Simulator-ish-Demo/assets/103831098/0b89f49f-62bd-4e92-9ebe-9d4c6afd9405)

![image](https://github.com/VadeanFlaviuAlexandru/Gordon-Ramsay-Simulator-ish-Demo/assets/103831098/26c69f1f-1286-4fdd-b092-b1b9fd2af04e)

![image](https://github.com/VadeanFlaviuAlexandru/Gordon-Ramsay-Simulator-ish-Demo/assets/103831098/94d34ade-5254-4e3b-a198-0ccb37151538)
