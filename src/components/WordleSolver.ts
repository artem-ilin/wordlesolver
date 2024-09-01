import dictionary from './dictionary/main'

enum LetterState {
  MISS = 'MISS',
  WRONG_PLACE = 'WRONG_PLACE',
  HIT = 'HIT'
}

function getNextEnumValue<T extends object>(enumObj: T, currentValue: T[keyof T]): T[keyof T] {
  let returnCurrent = false
  for (const key in enumObj) {
    if (returnCurrent) {
      return enumObj[key as keyof T]
    }
    if (enumObj[key as keyof T] === currentValue) {
      returnCurrent = true
    }
  }
  for (const key in enumObj) {
    return enumObj[key as keyof T]
  }
  throw new RangeError() // impossible for a non empty enum, stub for TS
}

export class Letter {
  id: number
  value: string
  state: LetterState = LetterState.MISS

  constructor(id: number, value: string) {
    this.id = id
    this.value = value
  }

  nextState(): void {
    if (this.value !== '') {
      this.state = getNextEnumValue(LetterState, this.state)
    }
  }

  resetState(): void {
    this.value = ''
    this.state = LetterState.MISS
  }
}

const max_words = 6

let id = 0

export class Word {
  letters: Array<Letter> = [
    new Letter(id++, ''),
    new Letter(id++, ''),
    new Letter(id++, ''),
    new Letter(id++, ''),
    new Letter(id++, '')
  ]
  current_letter_idx: number = 0

  addLetter(value: string): void {
    this.letters[this.current_letter_idx].value = value
    this.current_letter_idx++
  }

  removeLetter(): void {
    if (this.current_letter_idx > 0) {
      this.current_letter_idx--
      this.letters[this.current_letter_idx].resetState()
    }
  }

  isFull(): boolean {
    return this.letters.every((item) => item.value !== '')
  }
}

export class WordleSolver {
  words: Array<Word> = [new Word()]
  guessCandidates: Array<string> = []

  removeWord(word_idx: number): void {
    this.words.splice(word_idx, 1)
  }

  addLetter(value: string): void {
    const current_word = this.words[this.words.length - 1]
    if (!current_word.isFull()) {
      current_word.addLetter(value)
    }
  }

  removeLetter(): void {
    const current_word = this.words[this.words.length - 1]
    current_word.removeLetter()
  }

  submitWord(): void {
    const current_word = this.words[this.words.length - 1]
    if (current_word.isFull() && !this.isFull()) {
      this.words.push(new Word())
    }
  }

  isFull(): boolean {
    return this.words.length >= max_words
  }

  analyzeLetters(): [Set<string>, Set<string>, Set<string>[], Array<string>] {
    const lettersToExclude: Set<string> = new Set()
    const lettersToInclude: Set<string> = new Set()
    const notInPosition: Set<string>[] = [new Set(), new Set(), new Set(), new Set(), new Set()]
    const hitMask: Array<string> = ['', '', '', '', '']
    this.words.forEach((word) => {
      word.letters.forEach((letter, idx) => {
        if (letter.value !== '') {
          switch (letter.state) {
            case LetterState.MISS:
              lettersToExclude.add(letter.value)
              break
            case LetterState.WRONG_PLACE:
              lettersToInclude.add(letter.value)
              notInPosition[idx].add(letter.value)
              break
            case LetterState.HIT:
              lettersToInclude.add(letter.value)
              hitMask[idx] = letter.value
              break
          }
        }
      })
    })
    return [lettersToExclude, lettersToInclude, notInPosition, hitMask]
  }

  guess(locale: string): void {
    const [lettersToExclude, lettersToInclude, notInPosition, hitMask] = this.analyzeLetters()
    console.log('lettersToExclude')
    console.log(lettersToExclude)
    console.log('lettersToInclude')
    console.log(lettersToInclude)
    console.log('notInPosition')
    console.log(notInPosition)
    console.log('hitMask')
    console.log(hitMask)
    const words = dictionary[locale as keyof typeof dictionary]
    const filteredWords = words
      .map((word) => word.toUpperCase())
      .filter((word) => {
        return (
          !Array.from(word).some((letter) => lettersToExclude.has(letter)) &&
          Array.from(lettersToInclude).every((letter) => word.includes(letter)) &&
          !Array.from(word).some((letter, idx) => notInPosition[idx].has(letter)) &&
          hitMask.every((char, index) => char === '' || word[index] === char)
        )
      })
    console.log(filteredWords)
    this.guessCandidates = filteredWords
  }

  reset(): void {
    this.words = [new Word()]
    this.guessCandidates = []
  }
}
