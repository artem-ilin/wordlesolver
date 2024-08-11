export class Letter {
  id: number
  value: string

  constructor(id: number, value: string) {
    this.id = id
    this.value = value
  }
}

let id = 0

export class Word {
  id: number
  letters: Array<Letter> = [
    new Letter(id++, ''),
    new Letter(id++, ''),
    new Letter(id++, ''),
    new Letter(id++, ''),
    new Letter(id++, '')
  ]
  current_letter_idx: number = 0

  constructor(id: number) {
    this.id = id
  }

  addLetter(value: string): void {
    this.letters[this.current_letter_idx].value = value
    this.current_letter_idx++
  }

  removeLetter(): void {
    this.current_letter_idx--
    this.letters[this.current_letter_idx].value = ''
  }

  isFull(): boolean {
    return this.letters.every((item) => item.value !== '')
  }
}

export class WordleSolver {
  words: Array<Word> = [new Word(0)]
  current_word_idx: number = 0

  addLetter(value: string): void {
    if (!this.words[this.current_word_idx].isFull()) {
      this.words[this.current_word_idx].addLetter(value)
    } else {
      if (!this.isFull()) {
        this.words.push(new Word(this.words.length))
        this.current_word_idx++
        this.words[this.current_word_idx].addLetter(value)
      }
    }
  }

  isFull(): boolean {
    return this.words.length >= 6
  }
}
