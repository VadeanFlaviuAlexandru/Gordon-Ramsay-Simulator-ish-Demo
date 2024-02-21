import { inference } from "./imageProcessing";

async function processing(food) {
  try {
    const recipeResult = await inference.textGeneration({
      inputs: `ingredients for a ${food}:`,
      model: "auhide/chef-gpt-en",
    });
    const response = recipeResult.generated_text;
    let responseReplace1 = response.replace(/(\r\n|\n|\r)/gm, ", ");
    let responseReplace2 = responseReplace1.replace(/recipe>>/g, "");
    const responseReplaceSplit = responseReplace2.split(":");
    const ingredients = responseReplaceSplit[1];
    return {
      name: food,
      ingredients: ingredients,
    };
  } catch (error) {
    throw new Error("Error getting the recipe");
  }
}

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        const food = req.body;

        const result = await processing(food);

        res.status(200).json({ message: "Done", recipe: result });
        break;

      default:
        res.status(405).end(`Method ${req.method} Not Allowed`);
        break;
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
