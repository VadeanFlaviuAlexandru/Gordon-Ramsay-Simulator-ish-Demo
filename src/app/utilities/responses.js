export const introConfident = "So, you've thrust this image upon me: ";
export const introNotConfident =
  "So, you've presented this image, but I'm not entirely convinced... ";
//------------------------------
export const bodyConfident = (props) =>
  `Now, take a look at this – what I'm deciphering in the culinary puzzle is ${props.imageGiven}, right? I'm confidently sitting at about ${props.certainty}%, and I must say, you've boldly served up a plate of ${props.name}. Keep it up, fantastic job!"`;
export const bodyNotConfident = (props) =>
  `Now, let's take a moment here – what I'm trying to figure out in this culinary puzzle is ${props.imageGiven}, I suppose? I'm somewhat hovering around ${props.certainty}%, and I must admit, it's a bit challenging to pinpoint exactly what you've presented on this plate. A curious creation of ${props.name}, perhaps?`;
//------------------------------
export const notFood = (props) =>
  `What on earth is this? You've sent me... ${props.imageGiven}! Are you trying to test my patience? This is absolutely ludicrous! Get it together and show me a proper image of some food, pronto!`;
//------------------------------
export const nothing =
  "Fantastic, you've brought me all the way here to show me... absolutely nothing. I must say, your favorite dish is truly invisible. Save the disappearing acts for the magicians, will you?";
//------------------------------
export const recipeWithIngredients = (props) =>
  `Seriously? It's like you're asking me to teach you how to tie your shoelaces. It's ${props.name}!${props.ingredients} – it's as basic as it gets.`;
