"use client";

import Image from "next/image";
import { useState } from "react";
import "./page.scss";
import {
  bodyConfident,
  introConfident,
  introNotConfident,
  bodyNotConfident,
  notFood,
} from "./utilities/responses";
export default function Home() {
  const [result, setResult] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const classify = async (imageUrl) => {
    if (!imageUrl) {
      return;
    }
    setLoading(true);
    const result = await fetch(
      `/api/huggingFace?image=${encodeURIComponent(imageUrl)}`
    );
    const json = await result.json();
    setResult(json);
    setLoading(false);
  };

  return (
    <div className="main">
      <div className="container">
        <Image
          src={loading ? "/../../gordonPreparing.png" : "/../../gordon.png"}
          alt="GordonRamsay"
          width={280}
          height={300}
          className="gordon"
        />
        {!result && !loading && (
          <div className="inputContainer">
            <p className="paragraph">
              {`Show me your top-notch favorite dish, come on!`}
            </p>

            <input
              type="text"
              className="inputPhoto"
              placeholder="Enter image url here"
              value={imageUrl}
              onInput={(e) => {
                setImageUrl(e.target.value);
                classify(e.target.value);
              }}
            />
            <p className="paragraph">{`or insert directly`}</p>
            <input
              type="file"
              className="inputPhoto"
              onChange={(e) => {
                setImageUrl(e.target.files[0]);
              }}
            />
          </div>
        )}
      </div>
      {loading && (
        <p className="paragraph">{`Let's see what you gave me, mate.`}</p>
      )}
      {result && !loading && (
        <div className="container chat">
          <p className="paragraph">
            {parseFloat(result.certainty) > 70
              ? introConfident
              : parseFloat(result.certainty) > 37
              ? introNotConfident
              : ""}
          </p>
          {parseFloat(result.certainty) > 37 && (
            <Image src={imageUrl} alt="foodGiven" width={200} height={150} />
          )}
          <p className="paragraph">
            {parseFloat(result.certainty) > 70
              ? bodyConfident({
                  imageGiven: result.imageGiven,
                  certainty: result.certainty,
                  name: result.name,
                })
              : parseFloat(result.certainty) > 37
              ? bodyNotConfident({
                  imageGiven: result.imageGiven,
                  certainty: result.certainty,
                  name: result.name,
                })
              : notFood({ name: result.name })}
          </p>
          <button
            className="button"
            onClick={() => {
              setResult(null);
              setImageUrl("");
            }}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}
