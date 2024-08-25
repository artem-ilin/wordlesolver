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
      this.letters[this.current_letter_idx].value = ''
    }
  }

  isFull(): boolean {
    return this.letters.every((item) => item.value !== '')
  }
}

export class WordleSolver {
  words: Array<Word> = [new Word()]

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
}
