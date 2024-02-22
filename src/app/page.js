"use client";

import Image from "next/image";
import { useState } from "react";
import "./page.scss";
import {
  bodyConfident,
  bodyNotConfident,
  introConfident,
  introNotConfident,
  notFood,
  nothing,
  recipeWithIngredients,
} from "./utilities/responses";

export default function Home() {
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [error, setError] = useState(false);
  const [outOfTokens, setOutOfTokens] = useState(false);

  const identify = (imageUrl) => {
    if (!imageUrl) {
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", imageUrl);

    let result;

    const fetchPromise =
      typeof imageUrl === "object"
        ? fetch(`/api/imageProcessing`, {
            method: "POST",
            body: formData,
          })
        : fetch(`/api/imageProcessing?image=${encodeURIComponent(imageUrl)}`, {
            method: "GET",
          });

    fetchPromise
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to process image");
        }
        return response.json();
      })
      .then((json) => {
        setResult(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error during image processing:", error);
        setLoading(false);
        setError(true);
        setOutOfTokens(true);
      });
  };

  const askRecipe = (food) => {
    if (!food) {
      return;
    }

    fetch("/api/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: food,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        return response.json();
      })
      .then((responseRecipe) => {
        setRecipe(responseRecipe.recipe);
        setImageUrl("");
        setResult(null);
        setLoading(true);
        console.log(imageUrl, loading, recipe, error);
      })
      .catch((error) => {
        console.error("Error while fetching recipe:", error);
        setError(true);
        setOutOfTokens(true);
      });
  };

  const yesButton = (
    <button
      className="button"
      onClick={() => {
        setResult(null);
        setImageUrl("");
        setLoading(false);
        setRecipe("");
      }}
    >
      Yes, chef!
    </button>
  );

  return (
    <div className="main">
      <div className="container">
        <img
          src={
            recipe
              ? "/../../gordonDissapointed.png"
              : loading
              ? "/../../gordonPreparing.png"
              : "/../../gordon.png"
          }
          alt="GordonRamsay"
          className="gordon"
        />
        {!result && !outOfTokens && !recipe && !loading && (
          <div className="inputContainer">
            <p className="paragraph">
              {`Show me your top-notch favorite dish, come on!`}
            </p>
            <form>
              <input
                type="text"
                className="inputPhoto"
                placeholder="Enter image url here"
                value={imageUrl}
                onInput={(e) => {
                  setImageUrl(e.target.value);
                  identify(e.target.value);
                }}
              />
              <p className="paragraph">{`or insert directly`}</p>
              <input
                type="file"
                className="inputPhoto"
                onChange={(e) => {
                  setImageUrl(e.target.files[0]);
                  identify(e.target.files[0]);
                }}
              />
            </form>
          </div>
        )}
      </div>
      <div>
        {loading && !outOfTokens && !recipe && (
          <p className="paragraph">{`Let's see what you gave me, mate...`}</p>
        )}
        {result && !outOfTokens && !loading && (
          <div className="container chat">
            <p className="paragraph">
              {result.name == "no"
                ? ""
                : parseFloat(result.certainty) > 70
                ? introConfident
                : parseFloat(result.certainty) > 20 && introNotConfident}
            </p>
            {parseFloat(result.certainty) > 20 && (
              <Image
                src={
                  typeof imageUrl == "string"
                    ? imageUrl
                    : URL.createObjectURL(imageUrl)
                }
                alt="foodGiven"
                width={200}
                height={150}
              />
            )}
            <p className="paragraph">
              {result.name == "no"
                ? notFood({ imageGiven: result.imageGiven })
                : parseFloat(result.certainty) > 70
                ? bodyConfident({
                    imageGiven: result.imageGiven,
                    certainty: result.certainty,
                    name: result.name,
                  })
                : parseFloat(result.certainty) > 20 && result.name !== "no"
                ? bodyNotConfident({
                    imageGiven: result.imageGiven,
                    certainty: result.certainty,
                    name:
                      result.name === "yes"
                        ? "We can do better than that!"
                        : `Perhaps ${result.name}?`,
                  })
                : nothing}
            </p>
            {yesButton}
            {!recipe && result.name !== "no" && result.name !== "yes" && (
              <button
                className="button"
                onClick={() => {
                  askRecipe(result.name);
                }}
              >
                {`I don't know the recipe, chef!`}
              </button>
            )}
          </div>
        )}
      </div>
      <div>
        {recipe && !outOfTokens && !error && (
          <div className="container chat">
            <p className="paragraph">
              {recipeWithIngredients({
                name: recipe.name,
                ingredients: recipe.ingredients,
              })}
            </p>
            {yesButton}
          </div>
        )}
      </div>
      <div className="container chat">
        {outOfTokens && (
          <p className="paragraph">{`Look, I've tasted the good, the bad, and the ugly in your kitchen. I've dished out my fair share of critiques, and I'm officially cooked. Whether you keep cooking or hang up your apron, it's your call. I'm taking a break from the food rodeo. Best of luck.`}</p>
        )}
      </div>
    </div>
  );
}
