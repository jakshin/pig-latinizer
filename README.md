# pig-latinizer

Translates English text to Pig Latin, with proper handling of capitalization, punctuation, and hyphenated phrases.

*Igpay Atinlay orfay ouryay AvaScriptjay/YpeScript-tay ojectpray. Atwhay ouldcay ebay etterbay? (Exceptyay aconbay, ofyay oursecay.)*

[![Build Status](https://circleci.com/gh/jakshin/pig-latinizer.svg?style=shield)](https://app.circleci.com/pipelines/github/jakshin/pig-latinizer?branch=main&filter=all) [![Coverage Status](https://coveralls.io/repos/github/jakshin/pig-latinizer/badge.svg?branch=main)](https://coveralls.io/github/jakshin/pig-latinizer?branch=main) [![CodeQL](https://github.com/jakshin/pig-latinizer/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/jakshin/pig-latinizer/actions/workflows/github-code-scanning/codeql)


### Why?

Other Pig-Latin translators exist, but none of them worked as well as I wanted, so I created this one. Highlights:

* It preserves all punctuation and whitespace perfectly, including tabs and line breaks.

* It splits input words on whitespace, slashes, underscores, and dashes (not just whitespace), so `perfectly-fried bacon and/or ham is _so_tasty_` translates to `erfectlypay-iedfray aconbay andyay/oryay amhay isyay _osay_astytay_`.

* It handles capitalization and all-caps nicely, so `Bacon is AWESOME!` translates to `Aconbay isyay AWESOMEYAY!`.

* It knows that `Y` is a consonant at the beginning of a word, and a vowel otherwise, so `yellow` becomes `ellowyay` and `bytes` becomes `ytesbay`.

* It hyphenates when needed to prevent hard-to-read repeated consonants from appearing at the end of translated words, so `sheesh` and `peep` become `eesh-shay` and `eep-pay`.

* It removes apostrophes in possessives and contractions to avoid mangling them, while still preserving leading and trailing apostrophes, e.g. `A pig's ears aren't tasty, don't eat 'em` translates to `Ayay igspay earsyay arentyay astytay, ontday eatyay 'emyay` - no awkward `ig'spay`, `aren'tyay`, or `on'tday`.

* It doesn't mangle words for which there is no rational Pig Latin translation, such as `HTML`, `Odd13`, and `v1.0` - they're passed though as-is.

* It allows words to be added to an exclusions list; excluded words will be passed through without translation.

* It has no dependencies, so it won't bloat up your bundle.

* It comes with TypeScript bindings.


### Usage in TypeScript

```typescript
import PigLatin from "pig-latinizer"

const pigLatin: PigLatin = new PigLatin()
pigLatin.exclusions.push("woot")
const translated: string = pigLatin.translate("Bacon, woot!")  // Aconbay, woot!
```

### Usage in Node

```javascript
const PigLatin = require("pig-latinizer").default

const pigLatin = new PigLatin()
pigLatin.exclusions.push("woot")
const translated = pigLatin.translate("Bacon, woot!")  // Aconbay, woot!
```
