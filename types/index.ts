export type TLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type TWord = "Noun" | "Verb" | "Adjective";
export type TArticle = "der" | "die" | "das";

export interface ITranslation {
  readonly common: string;
  readonly other: string[];
}

export interface ISynonym {
  readonly word: string;
  readonly definite_article: string;
}

export interface INoun {
  readonly level: TLevel;
  readonly word_id: 1;
  readonly word: string;
  readonly word_type: TWord;
  readonly definite_article: TArticle;
  readonly plural_form: string;
  synonym: ISynonym;
  translations: {
    english: {
      singular: ITranslation;
      plural: ITranslation;
    };
    russian: {
      singular: ITranslation;
      plural: ITranslation;
    };
  };
}
