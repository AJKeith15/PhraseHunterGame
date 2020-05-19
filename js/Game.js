/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    // constructor method which can be given a number of lives to start the user with
    constructor(lives = 5) {
        this.lives = lives
        // missed is the number of wrong guesses
        this.missed = 0
        // this array instantiates 5 Phrase objects
        this.phrases = [new Phrase('javascript'),
                        new Phrase('template literal'),
                        new Phrase('ternary operator'),
                        new Phrase('modulus'),
                        new Phrase('concatenation')]
        this.activePhrase = null;
    }

    // startGame hides the overlay, calls the getRandomPhrase method, and adds the retrieved phrase to the game board by calling addPhraseToDisplay
    startGame() {
        document.getElementById('overlay').style.display = 'none'
        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay()
    }

    // getRandomPhrase picks a random number which is used to choose a phrase from the phrases array
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)]
    }

    // handleInteraction takes the guessed button and checks if it part of the phrase by calling the checkLetter method of the Phrase class
    // if the guess is correct, the showMatchedLetter method is called and then the checkForWin method is called. If it is a win, the win screen is shown.
    // if the guess is wrong, the removeLife method is called
    // the button is then disabled
    handleInteraction(button) {
        let letter = button.textContent
        if (this.activePhrase.checkLetter(letter)) {
            button.classList.add('chosen')
            this.activePhrase.showMatchedLetter(letter)
            if (this.checkForWin()) {
                this.gameOver('win')
            }
        } else {
            button.classList.add('wrong')
            this.removeLife()
        }
        button.disabled = true
    }

    // removeLife creates an array of the remaining lives, then sets the first index in the array to the lost life image
    // if their was only one life left (which is removed when this method is called) then the lose screen is shown
    removeLife() {
        let lives = document.querySelectorAll("img[src='images/liveHeart.png']")
        lives[0].setAttribute('src', 'images/lostHeart.png')
        if (lives.length === 1) {
            this.gameOver('lose')
        }
    }

    // checkForWin checks if there are no hidden letters left and returns true if they are all revealed
    checkForWin() {
        return document.getElementsByClassName('letter hide').length === 0 ? true : false
    }

    // gameOver redisplays the overlay screen and depending on the input parameter, changes the className to win or lose
    // the game over message is displayed here as well.
    gameOver(reason = 'lose') {
        let overlay = document.getElementById('overlay')
        overlay.style.display = 'inherit'
        if (reason === 'win') {
            document.getElementById('game-over-message').textContent = `You win! The phrase was "${this.activePhrase.phrase}"!`
            overlay.className = reason
        } else {
            // when the game is lost, the phrase is revealed to the user
            document.getElementById('game-over-message').textContent = `The phrase was "${this.activePhrase.phrase}". Better luck next time!`
            overlay.className = reason
        }
    }
}