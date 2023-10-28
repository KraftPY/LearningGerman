"use client";

import styles from "./nouns.module.scss";
import classNames from "classnames/bind";
const cn = classNames.bind(styles);

import { useEffect, useState } from "react";
import { INoun, TArticle } from "@/types";
import nounsAll from "@/dictionary/nouns.json";
const articles: TArticle[] = ["der", "die", "das"];

export default function Nouns() {
  const [selectedNoun, setSelectedNoun] = useState<INoun | null>(null);
  const [articel, setArticel] = useState<TArticle | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * nounsAll.length);
    setSelectedNoun(nounsAll[randomNum] as INoun);
  }, []);

  const onCheckAnswer = (): void => {
    setChecked(true);
  };

  const nextWord = (): void => {
    const randomNum = Math.floor(Math.random() * nounsAll.length);
    setSelectedNoun(nounsAll[randomNum] as INoun);
    setChecked(false);
    setAnswer("");
    setArticel(null);
  };

  const getArticlesStyle = (art: string): string => {
    return cn("articleBtn", {
      "articleBtn-active": articel === art,
      "articleBtn-correct": checked && selectedNoun?.definite_article === art,
      "articleBtn-incorrect":
        checked && selectedNoun?.definite_article !== art && articel === art
    });
  };

  const getInputStyle = (): string => {
    return cn("nounField", {
      "nounField-correct":
        checked && answer.toLowerCase() === selectedNoun?.word.toLowerCase(),
      "nounField-incorrect":
        checked && answer.toLowerCase() !== selectedNoun?.word.toLowerCase()
    });
  };

  const checkingAnswer = (): boolean => {
    return checked && answer.toLowerCase() === selectedNoun?.word.toLowerCase();
  };

  return (
    <div className={cn("container")}>
      <h1 className={cn("title")}>
        {selectedNoun
          ? selectedNoun.translations.russian.singular.common
          : "..."}
      </h1>
      <div className={cn("articles")}>
        {articles.map((value: TArticle, i: number) => (
          <button
            className={getArticlesStyle(value)}
            key={i}
            onClick={() => setArticel(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <input
        className={getInputStyle()}
        type="text"
        placeholder="Some nouns"
        value={answer}
        onChange={({ target }) => setAnswer(target.value)}
      />
      <p>
        {checked && selectedNoun?.word.toLowerCase() !== answer.toLowerCase()
          ? selectedNoun?.word
          : ""}
      </p>
      {!checked ? (
        <button
          onClick={onCheckAnswer}
          className={cn("checkBtn")}
          disabled={answer && articel ? false : true}
        >
          Проверить
        </button>
      ) : (
        <button onClick={nextWord} className={cn("checkBtn")}>
          Далее
        </button>
      )}
    </div>
  );
}
