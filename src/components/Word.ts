export class Letter {
  id: number
  value: string

  constructor(id: number, value: string) {
    this.id = id
    this.value = value
  }
}

const max_words = 6

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
    if (this.current_letter_idx > 0) {
      this.current_letter_idx--
      this.letters[this.current_letter_idx].value = ''
    }
  }

  isFull(): boolean {
    return this.letters.every((item) => item.value !== '')
  }
}

export class WordleSolver {
  words: Array<Word> = [new Word(0)]

  removeWord(word_id: number): void {
    this.words = this.words.filter((word) => word.id !== word_id)
  }

  addLetter(value: string): void {
    const current_word = this.words[this.words.length-1]
    if (!current_word.isFull()) {
      current_word.addLetter(value)
    }
  }

  removeLetter(): void {
    const current_word = this.words[this.words.length-1]
    current_word.removeLetter()
  }

  submitWord(): void {
    const current_word = this.words[this.words.length-1]
    if (current_word.isFull() && !this.isFull()) {
      this.words.push(new Word(this.words.length))
    }
  }

  isFull(): boolean {
    return this.words.length >= max_words
  }
}
