/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    // constructor method which makes the phrase lowercase
    constructor(phrase) {
        this.phrase = phrase.toLowerCase()
    }

    // addPhraseToDisplay uses a for loop to create a li element for each character in the phrase
    // it also tests the character if it is a letter or space and adds the correct class names to the li element
    addPhraseToDisplay() {
        let phraseList = document.getElementById('phrase').firstElementChild
        for (let i = 0; i < this.phrase.length; i++) {
            let letter = document.createElement('li')
            letter.textContent = this.phrase[i]
            let result = /[a-z]/.test(this.phrase[i])
            if (result) {
                letter.classList.add('hide')
                letter.classList.add('letter')
                letter.classList.add(this.phrase[i])
            } else {
                letter.className = 'space'
            }
            phraseList.appendChild(letter)
        }
    }

    // checkLetter takes a guessed letter as the paramter and returns true if it exists in the phrase, false if not
    checkLetter(letter) {
        return this.phrase.search(letter) !== -1 ? true : false
    }

    // showMatchedLetter takes a guessed letter as the parameter, creates an array for each instance of that letter in the
    // phrase and loops over it to modify the className to make it appear on the game board
    showMatchedLetter(letter) {
        let letterArr = document.getElementsByClassName(letter)
        for (let letter of letterArr) {
            letter.classList.remove('hide')
            letter.classList.add('show')
        }
    }
}