'use strict';

// нужно чекнуть все слова с "(мужчина)" или "(женщина)" 

const fs = require('fs');
const { german_nouns , A1 } = require('../top100nouns.json');
const german_words = require('./dictionary.json');
// const {german_words} = require('./dictionaryOld.json');

const nounsList = german_words.map(({word}) => word);
console.log(german_words.filter(({level}) => level === "A1").length)

// const nounsList = german_words.map(word => {
//   delete word.examples;
//   delete word.indefinite_article;
//   delete word.plural_translations;
//   delete word.definite_article_plural;
//   delete word.indefinite_article_plural;
//   delete word.indefinite_article_plural_some;
//   return {
//     level: A1.includes(word.word) ? "A1": "",
//     ...word
//   };
// });
// let data = JSON.stringify(nounsList, null, 2);
// fs.writeFileSync('dictionaryNew.json', data);


const needToAddA1 = A1.filter(word => !nounsList.includes(word));
let data = JSON.stringify(needToAddA1, null, 2);
fs.writeFileSync('needToAddA1.json', data);

// const answer = german_nouns.filter(word => A1.includes(word));


console.log("A1 length: ", A1.length);
console.log("top100 length: ", german_nouns.length);
console.log("dictionary length: ", nounsList.length);
console.log("Need to add A1: ", needToAddA1.length);
// console.log("-------------------");
// console.log(answer);
// console.log("A1 in top100: ", answer.length);
