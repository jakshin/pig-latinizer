/**
 * Translates English to Pig Latin.
 */
class PigLatin {
  /** Words which should be excluded from translation. Case-sensitive. */
  public readonly exclusions: string[] = []

  /**
   * Translates an English string, containing an arbitrary amount of text, to Pig Latin.
   * Punctuation and whitespace are preserved, including blank lines.
   *
   * @param english The English string to translate.
   */
  public translate(english: string): string {
    if (!english) {
      return english
    }

    return this._split(english).map(this._translateOne.bind(this)).join("")
  }

  /**
   * Translates a single fragment (word or separator) to Pig Latin.
   * @param fragment The word to translate or ignore, or separator to ignore.
   */
  private _translateOne(fragment: string): string {
    // split into leading/trailing punctuation and the word itself;
    // part 1 = punctuation, or empty string
    // part 2 = the word up to any single apostrophe (if present)
    // part 3 = apostrophe & word characters following it, or empty string
    // part 4 = punctuation (including apostrophe if no word characters follow it), or empty string
    const parts = /^([\W_]*)([^\W_]+)(['\u2019\u02bc][^\W_]+|)([\W_]*)$/.exec(fragment)
    if (!parts) {
      return fragment  // we can't translate this non-word (it may be a separator)
    }

    let word: string = parts[2] + parts[3].substring(1)

    if (this.exclusions.indexOf(word) !== -1) {
      return fragment
    }
    if (/[0-9]/.test(word)) {
      return fragment  // don't translate words which contain a digit
    }

    const isAllCaps: boolean = (word === word.toUpperCase() && word.length > 1)
    const firstLetterUpped: string = word[0].toUpperCase()

    if ("AEIOU".indexOf(firstLetterUpped) !== -1) {
      // begins with vowel; append "yay", but without doubling up a trailing "y"
      const lastChar: string = word[word.length - 1]
      const append: string = (lastChar === "y" || lastChar === "Y") ? "ay" : "yay"
      word += isAllCaps ? append.toUpperCase() : append
    }
    else {
      // begins with a consonant; find the first vowel (including "y", except at the start of the word)
      const firstVowelPos: number = this._indexOfFirstVowel(word)

      if (firstVowelPos !== -1) {
        // (don't translate a word without vowels; maybe it's an acronym?)
        // move leading consonants to the end, hyphenating if we're doubling them up, and append "ay"
        const isCapitalized: boolean = (!isAllCaps && word[0] === firstLetterUpped)
        let consonants: string = word.substring(0, firstVowelPos)
        if (isCapitalized) {
          consonants = consonants.toLowerCase()
        }

        const consonantsRepeated: boolean = (word.substr(-consonants.length).toUpperCase() === consonants.toUpperCase())
        const firstConsonantRepeated: boolean = (word.substr(-1).toUpperCase() === consonants[0].toUpperCase())
        const hyphen: string = (consonantsRepeated || firstConsonantRepeated) ? "-" : ""

        word = word.substring(consonants.length) + hyphen + consonants + (isAllCaps ? "AY" : "ay")

        if (isCapitalized) {
          word = word[0].toUpperCase() + word.substring(1)
        }
      }
    }

    return parts[1] + word + parts[4]  // restore any leading and/or trailing punctuation
  }

  /**
   * Splits a string into an array of fragments, i.e. alternating words and separators.
   * @param str The string to split.
   */
  private _split(str: string): string[] {
    // word separator = any whitespace, slash, underscore, Unicode dashes, regular dash
    const re: RegExp = /[\s/_\u2010-\u2015-]+/gm

    const fragments: string[] = []
    let lastLastIndex: number = 0

    while (true) {
      const result = re.exec(str)

      if (result === null) {
        // no more separators, but there might be one more word
        if (str && str.length > lastLastIndex) {
          fragments.push(str.substring(lastLastIndex))
        }

        break
      }

      const word: string = str.substring(lastLastIndex, result.index)
      fragments.push(word)

      const separator: string = str.substring(result.index, re.lastIndex)
      fragments.push(separator)

      lastLastIndex = re.lastIndex
    }

    return fragments
  }

  /**
   * Gets the index of the first vowel in the given word, or -1 if it contains no vowels.
   * @param word The word in which to find a vowel.
   */
  private _indexOfFirstVowel(word: string): number {
    // split off any leading Ys (result[1]), then search whatever's left, if anything (result[2]), for the first vowel
    // (exec will never return null for this regex, even if the word parameter is empty)
    const result = /(y*)(.*)/i.exec(word) as RegExpExecArray

    const index: number = result[2].search(/[aeiouy]/i)
    return (index === -1) ? -1 : result[1].length + index
  }
}

export default PigLatin
