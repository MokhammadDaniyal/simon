var KEYS = ['c', 'd', 'e', 'f'];
var NOTE_DURATION = 1000;
var SEQUENCE = [];
var delay = 2500;
var delayTimer;
var lvl = 0;
var i = 0;
var sequence = true;

// NoteBox
//
// Acts as an interface to the coloured note boxes on the page, exposing methods
// for playing audio, handling clicks,and enabling/disabling the note box.
function NoteBox(key, onClick) {
    // Create references to box element and audio element.
    var boxEl = document.getElementById(key);
    var audioEl = document.getElementById(key + '-audio');
    if (!boxEl) throw new Error('No NoteBox element with id' + key);
    if (!audioEl) throw new Error('No audio element with id' + key + '-audio');

    // When enabled, will call this.play() and this.onClick() when clicked.
    // Otherwise, clicking has no effect.
    var enabled = true;
    // Counter of how many play calls have been made without completing.
    // Ensures that consequent plays won't prematurely remove the active class.
    var playing = 0;

    enabled;
    this.key = key;
    this.onClick = onClick || function () {
        };

    // Plays the audio associated with this NoteBox
    this.play = function () {
        playing++;
        // Always play from the beginning of the file.
        audioEl.currentTime = 0;
        audioEl.play();

        // Set active class for NOTE_DURATION time
        boxEl.classList.add('active');
        setTimeout(function () {
            playing--
            if (!playing) {
                boxEl.classList.remove('active');
            }
        }, NOTE_DURATION)
    }

    this.checkKeys = function () {
            if (this.key != SEQUENCE[i].key) {
                alert('You Lost :(')
                SEQUENCE = [];
                lvl = 0;
                i = 0;
                sequence = true;
                    generateKeys();
            } else {
                console.log('Correct!')
                this.play();
                i++;
            }
    }.bind(this)




    // Enable this NoteBox
    this.enable = function () {
        enabled = true;
    }

    // Disable this NoteBox
    this.disable = function () {
        enabled = false;
    }


    // Call this NoteBox's clickHandler and play the note.
    this.clickHandler = function () {
        if (sequence) return;
        this.onClick(this.key)
        this.checkKeys();
        if (i == lvl) {
            sequence = true;
            setTimeout(function () {
                generateKeys();
            }, 2000);
            i = 0;
        }
    }.bind(this)

    boxEl.addEventListener('mousedown', this.clickHandler);
}

// Example usage of NoteBox.
//
// This will create a map from key strings (i.e. 'c') to NoteBox objects so that
// clicking the corresponding boxes on the page will play the NoteBox's audio.
// It will also demonstrate programmatically playing notes by calling play directly.
var notes = {};

KEYS.forEach(function (key, i) {
    KEYS[i] = new NoteBox(key);
});


function playSequence() {
    SEQUENCE.forEach(function (key, i) {
        setTimeout(function () {sequence = false} , NOTE_DURATION * SEQUENCE.length)
    setTimeout(SEQUENCE[i].play.bind(null, key), i * NOTE_DURATION);
    });
}

function generateKeys() {
    var random = Math.floor(Math.random()*4)
    SEQUENCE.push(KEYS[random])
    lvl++;
    document.getElementById("level").innerHTML = "Your Level: " + lvl.toString();
    playSequence()
}

generateKeys()



function wait() {
    
}




