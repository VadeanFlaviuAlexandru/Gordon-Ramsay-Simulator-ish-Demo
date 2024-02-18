import { HfInference } from "@huggingface/inference";
import { NextResponse } from "next/server";

const token = process.env.HF_TOKEN;
const inference = new HfInference(token);

async function processImage(imageFile) {
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
          "Is this food, yes or no? if yes, what food is in this image?",
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

export async function GET(request) {
  const imageUrl = request.nextUrl.searchParams.get("image");
  if (!imageUrl) {
    return NextResponse.json(
      {
        error: "Missing image url parameter",
      },
      { status: 400 }
    );
  }

  try {
    const imageFile = await (await fetch(imageUrl)).blob();
    const result = await processImage(imageFile);

    return NextResponse.json({
      message: "done",
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error processing the image",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const imageFile = await request.blob();
  if (!imageFile) {
    return NextResponse.json(
      {
        error: "Missing image file in the request body",
      },
      { status: 400 }
    );
  }

  try {
    const result = await processImage(imageFile);

    return NextResponse.json({
      message: "done",
      ...result,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error processing the image",
      },
      { status: 500 }
    );
  }
}
