import PigLatin from "./pigLatin"

describe("PigLatin", () => {
  let pigLatin

  beforeEach(() => {
    pigLatin = new PigLatin()
  })

  describe("translate()", () => {
    it("translates a string, preserving punctuation and whitespace", () => {
      const result = pigLatin.translate(`\n_THIS_ is...   Jason's super-duper "favorite" test\tstring/phrase!`)
      expect(result).toEqual(`\n_ISTHAY_ isyay...   Asonsjay upersay-uperday "avoritefay" est-tay\tingstray/asephray!`)
    })
    it("returns null/undefined and empty strings unmodified", () => {
      expect(pigLatin.translate(null)).toBe(null)
      expect(pigLatin.translate(undefined)).toBe(undefined)
      expect(pigLatin.translate("")).toBe("")
    })

    it("preserves leading and trailing punctuation", () => {
      expect(pigLatin.translate("foo,")).toBe("oofay,")
      expect(pigLatin.translate("({[foo]})")).toBe("({[oofay]})")
      expect(pigLatin.translate("_foo_")).toBe("_oofay_")
      expect(pigLatin.translate("**foo!**")).toBe("**oofay!**")
    })
    it("doesn't translate words which contain punctuation", () => {
      expect(pigLatin.translate("super A#1 best!")).toBe("upersay A#1 estbay!")
    })
    it("doesn't translate words which contain digits", () => {
      expect(pigLatin.translate("A4 paper")).toBe("A4 aperpay")
      expect(pigLatin.translate("Odd13")).toBe("Odd13")
      expect(pigLatin.translate("v1.0")).toBe("v1.0")
    })
    it("doesn't translate words which contain no vowels", () => {
      expect(pigLatin.translate("HTML")).toBe("HTML")
      expect(pigLatin.translate("ymmv")).toBe("ymmv")
      expect(pigLatin.translate("Y")).toBe("Y")
      expect(pigLatin.translate("yyy")).toBe("yyy")
      expect(pigLatin.translate("N")).toBe("N")
      expect(pigLatin.translate("Nn")).toBe("Nn")
      expect(pigLatin.translate("by")).toBe("ybay")
    })
    it("excludes requested words from translation, case-sensitively", () => {
      expect(pigLatin.translate("foo")).toBe("oofay")  // sanity check

      pigLatin.exclusions.push("foo")
      expect(pigLatin.translate("foo")).toBe("foo")
      expect(pigLatin.translate("FOO")).toBe("OOFAY")
    })

    describe("translates words which begin with vowels", () => {
      it("when they are lowercase", () => {
        expect(pigLatin.translate("after")).toBe("afteryay")
        expect(pigLatin.translate("angry")).toBe("angryay")  // no doubled Y
        expect(pigLatin.translate("a")).toBe("ayay")
      })
      it("when they are capitalized", () => {
        expect(pigLatin.translate("After")).toBe("Afteryay")
        expect(pigLatin.translate("Angry")).toBe("Angryay")  // no doubled Y
        expect(pigLatin.translate("A")).toBe("Ayay")
      })
      it("when they are all-caps", () => {
        expect(pigLatin.translate("AFTER")).toBe("AFTERYAY")
        expect(pigLatin.translate("ANGRY")).toBe("ANGRYAY")  // no doubled Y
      })
    })

    describe("translates words which begin with consonants", () => {
      it("when they are lowercase", () => {
        expect(pigLatin.translate("marker")).toBe("arkermay")
        expect(pigLatin.translate("school")).toBe("oolschay")
      })
      it("when they are capitalized", () => {
        expect(pigLatin.translate("Marker")).toBe("Arkermay")
        expect(pigLatin.translate("School")).toBe("Oolschay")
      })
      it("when they are all-caps", () => {
        expect(pigLatin.translate("MARKER")).toBe("ARKERMAY")
        expect(pigLatin.translate("SCHOOL")).toBe("OOLSCHAY")
      })

      it("with hyphenation when they begin and end with the same consontants", () => {
        expect(pigLatin.translate("test")).toBe("est-tay")
        expect(pigLatin.translate("Test")).toBe("Est-tay")
        expect(pigLatin.translate("TEST")).toBe("EST-TAY")

        expect(pigLatin.translate("church")).toBe("urch-chay")
        expect(pigLatin.translate("Church")).toBe("Urch-chay")
        expect(pigLatin.translate("CHURCH")).toBe("URCH-CHAY")

        expect(pigLatin.translate("that")).toBe("at-thay")
        expect(pigLatin.translate("That")).toBe("At-thay")
        expect(pigLatin.translate("THAT")).toBe("AT-THAY")
      })
      it("when they begin with Y, without doubling up a Y at the end", () => {
        expect(pigLatin.translate("yellow")).toBe("ellowyay")
        expect(pigLatin.translate("Yellow")).toBe("Ellowyay")
        expect(pigLatin.translate("YELLOW")).toBe("ELLOWYAY")

        expect(pigLatin.translate("yay")).toBe("ay-yay")
        expect(pigLatin.translate("Yay")).toBe("Ay-yay")
        expect(pigLatin.translate("YAY")).toBe("AY-YAY")
        expect(pigLatin.translate("yyaayy!")).toBe("aayy-yyay!")
      })
      it("treating Y as a vowel when it's not at the beginning of the word", () => {
        expect(pigLatin.translate("bytes")).toBe("ytesbay")
        expect(pigLatin.translate("Bytes")).toBe("Ytesbay")
        expect(pigLatin.translate("BYTES")).toBe("YTESBAY")

        expect(pigLatin.translate("why")).toBe("ywhay")
        expect(pigLatin.translate("Why")).toBe("Ywhay")
        expect(pigLatin.translate("WHY")).toBe("YWHAY")
      })
    })

    describe("handles words with embedded apostrophes", () => {
      it("by stripping valid apostrophes", () => {
        expect(pigLatin.translate("don't Don't DON'T")).toBe("ontday Ontday ONTDAY")
        expect(pigLatin.translate("jason's Jason's JASON'S")).toBe("asonsjay Asonsjay ASONSJAY")
        expect(pigLatin.translate("d'oh D'oh D'OH!")).toBe("ohday Ohday OHDAY!")
        expect(pigLatin.translate("'foo foo' 'foo'")).toBe("'oofay oofay' 'oofay'")  // punctuation here
        expect(pigLatin.translate("(can't) [[Can't]] ~{CAN'T...")).toBe("(antcay) [[Antcay]] ~{ANTCAY...")
        expect(pigLatin.translate("foo’s")).toBe("oosfay")  // 0x2019
        expect(pigLatin.translate("barʼs")).toBe("arsbay")  // 0x02bc
      })
      it("by ignoring words with invalid apostrophes", () => {
        const tests = [
          "don''t Don''t DON''T",
          "d''oh D''oh D''OH!",
          "' '' '''",
          "(can''t) [[Can''t]] ~{CAN''T...",
          "foo’’s barʼʼs foobar’ʼd" // 0x2019 x2, 0x02bc x2, one of each
        ]

        for (const i in tests) {
          const test = tests[i]
          const result = pigLatin.translate(test)
          expect(result).toEqual(test)
        }
      })
    })
  })

  describe("_split()", () => {
    it("splits a string on whitespace, slashes, underscores, and dashes", () => {
      expect(pigLatin._split("this is/was my\tsuper-duper\rtest_thingy\n")).toEqual(
        ["this", " ", "is", "/", "was", " ", "my", "\t", "super", "-", "duper", "\r", "test", "_", "thingy", "\n"]
      )
    })
    it("splits on Unicode dashes", () => {
      expect(pigLatin._split("a‐a‑a‒a–a—a―a")).toEqual(["a", "‐", "a", "‑", "a", "‒", "a", "–", "a", "—", "a", "―", "a"])
    })
    it("does not split on other punctuation", () => {
      expect(pigLatin._split("jason's")).toEqual(["jason's"])

      const punctuation = '`~!@#$%^&*()=+[]{}\\|;:",.<>?’ʼ'
      const result = pigLatin._split(punctuation)
      expect(result).toEqual([punctuation])
    })
    it("works with repeated separator characters", () => {
      expect(pigLatin._split("foo  bar // baz--quux")).toEqual(["foo", "  ", "bar", " // ", "baz", "--", "quux"])
    })
    it("works when no separators characters are present", () => {
      expect(pigLatin._split("jason")).toEqual(["jason"])
      expect(pigLatin._split("")).toEqual([])
      expect(pigLatin._split()).toEqual([])
    })
  })

  describe("_indexOfFirstVowel()", () => {
    it("finds the first vowel in a word that begins with a vowel", () => {
      expect(pigLatin._indexOfFirstVowel("a")).toBe(0)
      expect(pigLatin._indexOfFirstVowel("Is")).toBe(0)
      expect(pigLatin._indexOfFirstVowel("ENOUGH")).toBe(0)
    })
    it("finds the first vowel in a word that begins with a consonant", () => {
      expect(pigLatin._indexOfFirstVowel("grr")).toBe(-1)
      expect(pigLatin._indexOfFirstVowel("My")).toBe(1)
      expect(pigLatin._indexOfFirstVowel("BACON")).toBe(1)
    })
    it("finds the first vowel in a word that begins with one or more Ys", () => {
      expect(pigLatin._indexOfFirstVowel("Y")).toBe(-1)
      expect(pigLatin._indexOfFirstVowel("yyy")).toBe(-1)
      expect(pigLatin._indexOfFirstVowel("yay")).toBe(1)
      expect(pigLatin._indexOfFirstVowel("yyaayy!")).toBe(2)
    })
    it("doesn't find a vowel in an empty word", () => {
      expect(pigLatin._indexOfFirstVowel("")).toBe(-1)
    })
  })
})
