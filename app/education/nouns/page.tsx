"use client";

import styles from "./nouns.module.scss";
import classNames from "classnames/bind";
const cn = classNames.bind(styles);

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { INoun, TArticle } from "@/types";
import nounsAll from "@/dictionary/nouns.json";
const articles: TArticle[] = ["der", "die", "das"];

export default function Nouns() {
  const [selectedNoun, setSelectedNoun] = useState<INoun | null>(null);
  const [articel, setArticel] = useState<TArticle | null>(null);
  const [answer, setAnswer] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);
  const [unknown, setUnknown] = useState<boolean>(false);
  const [shuffledAnswer, setShuffledAnswer] = useState<string[]>([]);

  useEffect(() => {
    const randomNum = Math.floor(Math.random() * nounsAll.length);
    setSelectedNoun(nounsAll[randomNum] as INoun);
    // const fNoun = nounsAll.find(
    //   (el) => el.translations.russian.singular.other.length > 1
    // );
    // if (fNoun) {
    //   setSelectedNoun(fNoun as INoun);
    // }
    localStorage.setItem("learned", JSON.stringify(["WTF", { key: 1 }]));
    const fromLS = localStorage.getItem("learned");
    if (fromLS) {
      let learned = JSON.parse(fromLS);
      // console.log(learned);
    }
  }, []);

  useEffect(() => {
    if (selectedNoun) {
      const shuffledLetters = selectedNoun.word
        .split("")
        .sort((a, b) => Math.random() - Math.random())
        .map((l) => l.toLowerCase());
      setShuffledAnswer(shuffledLetters);
    }
  }, [selectedNoun]);

  const onCheckAnswer = (): void => {
    setAnswer(answer.trim());
    setChecked(true);
  };

  const nextWord = (): void => {
    const randomNum = Math.floor(Math.random() * nounsAll.length);
    if ((selectedNoun && !answer) || (selectedNoun && !articel)) {
      setArticel(selectedNoun.definite_article);
      setAnswer(selectedNoun.word);
      setUnknown(true);
    } else {
      setSelectedNoun(nounsAll[randomNum] as INoun);
      setChecked(false);
      setAnswer("");
      setArticel(null);
      setShowHelp(false);
      setUnknown(false);
    }
  };

  const getArticlesStyle = (art: string): string => {
    return cn("articleBtn", {
      "articleBtn-active": articel === art,
      "articleBtn-correct": checked && selectedNoun?.definite_article === art,
      "articleBtn-incorrect":
        checked && selectedNoun?.definite_article !== art && articel === art,
      "articleBtn-unknown":
        !checked && unknown && selectedNoun?.definite_article === art
    });
  };

  const getInputStyle = (): string => {
    return cn("nounField", {
      "nounField-correct":
        checked && answer.toLowerCase() === selectedNoun?.word.toLowerCase(),
      "nounField-incorrect":
        checked && answer.toLowerCase() !== selectedNoun?.word.toLowerCase(),
      "nounField-unknown": !checked && unknown
    });
  };

  const onShowHelp = (): void => {
    setShowHelp(true);
  };

  const onSelectLetter = (letter: string): void => {
    setAnswer(answer + letter);
  };

  const dictionaryInfo = (): ReactNode | null => {
    if (nounsAll && selectedNoun) {
      return (
        <p>{`Всего слов: ${nounsAll.length} | Текущее: ${nounsAll.findIndex(
          (n) => selectedNoun === n
        )}`}</p>
      );
    } else null;
  };

  return (
    <div className={cn("container")}>
      {dictionaryInfo()}
      <h1 className={cn("title")}>
        {selectedNoun
          ? selectedNoun.translations.russian.singular.common
          : "..."}
      </h1>
      {selectedNoun?.translations.russian.singular.other.length ? (
        <p className={cn("other-translation")}>
          ({selectedNoun.translations.russian.singular.other.join(", ")})
        </p>
      ) : null}
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
      <div className={cn("help-container")}>
        <span>Подсказка:</span>
        {showHelp ? (
          <div className={cn("letters-help-container")}>
            {shuffledAnswer.length &&
              shuffledAnswer.map((l: string, i: number) => (
                <button
                  key={i}
                  className={cn("letter-btn")}
                  onClick={() => onSelectLetter(l)}
                >
                  {l}
                </button>
              ))}
          </div>
        ) : (
          <Image
            className={cn("help-img")}
            src="/question-mark.png"
            alt="help"
            width={28}
            height={28}
            onClick={onShowHelp}
          />
        )}
      </div>

      {checked && selectedNoun?.word.toLowerCase() !== answer.toLowerCase() ? (
        <p className={cn("correct-answer")}>
          Ответ: <strong>{selectedNoun?.word}</strong>
          {selectedNoun && selectedNoun.synonym.word !== ""
            ? ` (синоним: ${selectedNoun.synonym.definite_article} ${selectedNoun.synonym.word})`
            : ""}
        </p>
      ) : (
        ""
      )}

      {!checked ? (
        <button
          onClick={onCheckAnswer}
          className={cn("checkBtn")}
          disabled={!unknown && answer && articel ? false : true}
        >
          Проверить
        </button>
      ) : null}
      <button onClick={nextWord} className={cn("nextBtn")}>
        Далее
      </button>
    </div>
  );
}
