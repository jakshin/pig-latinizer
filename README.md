# pig-latinizer

Translates English text to Pig Latin, with proper handling of capitalization, punctuation, and hyphenated phrases.

*Igpay Atinlay orfay ouryay AvascriptJay ojectpray. Atwhay ouldcay ebay etterbay?*

### Why?

Other Pig-Latin translators exist, but none of them worked as well as I wanted, so I created this one. Highlights:

* It preserves all punctuation and whitespace perfectly, including tabs and line breaks.

* It splits input words on whitespace, slashes, underscores, and dashes (not just whitespace), so `perfectly-fried bacon and/or ham is _so_tasty_` translates to `erfectlypay-iedfray aconbay andyay/oryay amhay isyay _osay_astytay_`.

* It handles capitalization and all-caps nicely, so `This is AWESOME!` translates to `Isthay isyay AWESOMEYAY!`.

* It knows that `Y` is a consonant at the beginning of a word, and a vowel otherwise, so `yellow` becomes `ellowyay` and `bytes` becomes `ytesbay`.

* When moving consonants to the end of a word during translation, it hyphenates when needed to prevent hard-to-read repeated consonants at the end of the translated word, so `Church test YAY` becomes `Urch-chay est-tay AY-YAY`.

* It removes apostrophes in order to avoid mangling possessives and contractions, e.g. `A pig's ears aren't tasty` translates to `Ayay igspay earsyay arentyay astytay`, not `Ayay ig'spay earsyay aren'tyay astytay`.

* It doesn't mangle words for which there is no rational Pig Latin translation, such as `HTML`, `Odd13`, or `v1.0` - they're passed though as-is.

* It allows words can be added to an exclusions list, to be passed through without translation.

* It comes with TypeScript bindings.

### Install/Uninstall

```sh
yarn add pig-latinizer
yarn remove pig-latinizer
```

### Usage in TypeScript

```typescript
import PigLatin from "pig-latinizer"

const pigLatin: PigLatin = new PigLatin()
pigLatin.exclusions.push("woot")
const translated = pigLatin.translate("woot bacon!")  // woot aconbay
```

### Usage in Node

```javascript
const PigLatin = require("pig-latinizer").default

const pigLatin = new PigLatin()
pigLatin.exclusions.push("woot")
const translated = pigLatin.translate("woot bacon")  // woot aconbay
```
