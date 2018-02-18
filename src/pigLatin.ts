/**
 * Translates English to Pig Latin.
 * Used to mock translations for non-English-speaking users, in dev mode only, until we get translated strings.
 * It has zero dependencies, to keep its footprint as light as possible in consuming web clients.
 */
class PigLatin {
  /** Words which should be excluded from translation. Case-sensitive. */
  public readonly exclusions: string[] = []

  /**
   * Translates an English string, containing an arbitrary amount of text, to Pig Latin.
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
    const parts: RegExpExecArray = /^([\W_]*)([^\W_]+)(['\u2019\u02bc][^\W_]+|)([\W_]*)$/.exec(fragment)
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
      // begins with a consonant; treat "y" as a vowel unless it starts the word
      const firstVowelPos: number = (firstLetterUpped === "Y")
        ? word.substring(1).search(/[aeiouy]/i) + 1
        : word.search(/[aeiouy]/i)

      if (firstVowelPos !== -1) {
        // (can't translate a word without vowels; maybe it's an acronym?)
        // move leading consonants to the end, hyphenating if we're doubling them up, and append "ay"
        const isCapitalized: boolean = (!isAllCaps && word[0] === firstLetterUpped)
        let consonants: string = word.substring(0, firstVowelPos)
        if (isCapitalized) {
          consonants = consonants.toLowerCase()
        }

        const hyphen: string = ((word.substr(-consonants.length).toUpperCase() === consonants.toUpperCase())
            || word.substr(-1).toUpperCase() === consonants[0].toUpperCase()) ? "-" : ""

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
      const result: RegExpExecArray = re.exec(str)

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
}

export default PigLatin
