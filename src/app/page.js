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
        setImageUrl(null);
        setResult(null);
        setLoading(true);
      })
      .catch((error) => {
        console.error("Error while fetching recipe:", error);
        setError(true);
      });
  };

  const yesButton = (
    <button
      className="button"
      onClick={() => {
        setResult(null);
        setImageUrl("");
        setLoading(false);
        setRecipe(null);
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
        {!result && !recipe && !loading && (
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
        {loading && !recipe && (
          <p className="paragraph">Let's see what you gave me, mate...</p>
        )}
        {result && !loading && (
          <div className="container chat">
            <p className="paragraph">
              {result.name == "no"
                ? ""
                : parseFloat(result.certainty) > 70
                ? introConfident
                : parseFloat(result.certainty) > 37 && introNotConfident}
            </p>
            {parseFloat(result.certainty) > 37 && (
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
                : parseFloat(result.certainty) > 37 && result.name !== "no"
                ? bodyNotConfident({
                    imageGiven: result.imageGiven,
                    certainty: result.certainty,
                    name: result.name,
                  })
                : nothing}
            </p>
            {yesButton}
            {!recipe && result.name !== "no" && (
              <button
                className="button"
                onClick={() => {
                  askRecipe(result.name);
                }}
              >
                I don't know the recipe, chef!
              </button>
            )}
          </div>
        )}
      </div>
      <div>
        {recipe && !error && (
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
    </div>
  );
}
