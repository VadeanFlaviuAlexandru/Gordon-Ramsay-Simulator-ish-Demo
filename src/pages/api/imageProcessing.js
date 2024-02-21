import { HfInference } from "@huggingface/inference";
import fs from "fs";
import multiparty from "multiparty";

export const token = process.env.HF_TOKEN;
export const inference = new HfInference(token);

async function processing(imageFile) {
  try {
    const imageResult = await inference.imageToText({
      data: imageFile,
      model: "nlpconnect/vit-gpt2-image-captioning",
    });
    const detection = await inference.visualQuestionAnswering({
      wait_for_model: true,
      inputs: {
        image: imageFile,
        question:
          "Is this food, yes or no? if yes, what's the name of the food?",
      },
      model: "dandelin/vilt-b32-finetuned-vqa",
    });
    const certainty = (detection.score * 100).toFixed(2);
    return {
      imageGiven: imageResult.generated_text,
      certainty: certainty,
      name: detection.answer,
    };
  } catch (error) {
    throw new Error("Error processing the image");
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        const form = new multiparty.Form();
        form.parse(req, async (error, fields, files) => {
          if (error) {
            res.status(500).json({ message: "Form parsing error" });
            return;
          }

          const { path: imagePath } = files.image[0];
          const imageBuffer = await fs.promises.readFile(imagePath);
          const imageBlob = new Blob([imageBuffer], { type: "image/jpeg" });

          const result = await processing(imageBlob);
          res.status(200).json({ message: "Done", ...result });
        });
        break;

      case "GET":
        const imageUrl = req.query.image;
        const imageFile = await fetch(imageUrl).then((res) => res.blob());
        const result = await processing(imageFile);
        res.status(200).json({ message: "Done", ...result });
        break;

      default:
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
