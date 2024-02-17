import { NextResponse } from "next/server";
import { HfInference } from "@huggingface/inference";
import { HfAgent } from "@huggingface/agents";

const token = process.env.HF_TOKEN;
const inference = new HfInference(token);

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
    let imageResult = await inference.imageToText({
      data: await (await fetch(imageUrl)).blob(),
      model: "nlpconnect/vit-gpt2-image-captioning",
    });

    let detection = await inference.visualQuestionAnswering({
      wait_for_model: true,
      inputs: {
        image: await (await fetch(imageUrl)).blob(),
        question: "what food in this image?",
      },
      model: "dandelin/vilt-b32-finetuned-vqa",
    });

    let certainty = (detection.score * 100).toFixed(2);

    return NextResponse.json({
      message: "done",
      imageGiven: imageResult.generated_text,
      certainty: certainty,
      name: detection.answer,
    });
  } catch (error) {
    console.log(error);
  }
}
