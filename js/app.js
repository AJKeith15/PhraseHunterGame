/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
// create a variable to hold the Game object
let currentGame;

// this event listener calls resetGame if the reset button is clicked
document.getElementById('btn__reset').addEventListener('click', () => {
    resetGame()
 })
 
// this event listener listens for keydown events. If the keydown event has keyCode 32 (spacebar) and the overlay screen is shown, the resetGame method is called
document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32 && document.getElementById('overlay').style.display !== 'none') {
        resetGame()
    }
})

// this event listener listens for clicks of the keyboard displayed on the screen and calls the handleInteraction method on that button
document.getElementById('qwerty').addEventListener('click', (e) => {
    if (e.target.className === 'key') {
        currentGame.handleInteraction(e.target)
    }
})

// this event listener listens for keydown events 
document.addEventListener('keydown', (e) => {
    // If the keyCode of the event is 65-90 and the overlay is not displayed, the code is executed. It also checks if the overlay is not displayed
    // so that the user cannot cause errors while the game is not active.
    if (e.keyCode >= 65 && e.keyCode <= 90 && document.getElementById('overlay').style.display === 'none') {
        // the letter can be retrieved from the keyCode, but then needs to be turned to lowercase since the phrase is all lowercase
        // the method fromCharCode was found here: https://stackoverflow.com/questions/3977792/how-to-convert-keycode-to-character-using-javascript
        let letter = String.fromCharCode(e.keyCode).toLowerCase()
        let buttons = document.getElementsByClassName('key')
        let button
        // all of the buttons are looped through to find the html element which has the correct letter and assigns it to the button variable
        for (let html of buttons) {
            if (html.textContent === letter) {
                button = html
            }
        }
        // the html element is checked to see if it has already been guessed (has either 'wrong' or 'chosen' class on it)
        if (!button.classList.contains('wrong') && !button.classList.contains('chosen')) {
            // if the button has not been guessed, then the handleInteraction method is called
            currentGame.handleInteraction(button)
        }
    }
})

// resetGame changes all of the html elements back to the starting properties
function resetGame() {
    // assign the phrase list to lastPhrase variable
    let lastPhrase = document.getElementById('phrase').firstElementChild
    // while the lastPhrase list still has li elements, keep removing the first child until empty
    // idea below found on stackoverflow: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
    while (lastPhrase.firstElementChild) {
        lastPhrase.removeChild(lastPhrase.lastChild)
    }

    // this loop sets all keys back to only have the className 'key', getting rid of 'wrong' and 'chosen' coloring
    let keyArr = document.getElementsByClassName('key')
    for (let key of keyArr) {
        key.className = 'key'
    }

    // The lost lives are put into an array and looped through to change them back to full hearts
    let lostLives = document.querySelectorAll("img[src='images/lostHeart.png']")
    for (let heart of lostLives) {
        heart.setAttribute('src', 'images/liveHeart.png')
    }

    // the reset button is changed to say 'Start New Game' rather than 'Start Game' once the game has ended
    document.getElementById('btn__reset').textContent = 'Start New Game'

    // a new game is instantiated and the startGame method is called
    currentGame = new Game
    currentGame.startGame()
}