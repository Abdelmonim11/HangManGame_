// set letters
let letters = "abcdefghijklmnopqrstuvwxyz",
  lettersDiv = document.querySelector(".letters"),
  lettersArray = Array.from(letters);
// get elements
let hollBody = document.body,
  catgo = document.querySelector(".catogory .catogoryName");
// create letters box
lettersArray.forEach((e) => {
  let letterSpan = document.createElement("span");
  letterSpan.innerHTML = e;

  letterSpan.classList.add("letterBox");

  lettersDiv.appendChild(letterSpan);
});

// get random word from obj above
fetch("./hangman.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    let allKeys = Object.keys(data),
      ranKeyName = allKeys[Math.floor(Math.random() * allKeys.length)],
      ranKeyLen = data[ranKeyName].length,
      ranValueNum = Math.floor(Math.random() * ranKeyLen),
      ranValue = data[ranKeyName][ranValueNum];

    // add catogory name
    catgo.innerHTML = ranKeyName;

    // letter quess
    let lettersQuess = document.querySelector(".letter-quess");

    // get the draw
    let theDraw = document.querySelector(".hangman");

    let letterAndSpace = Array.from(ranValue);

    letterAndSpace.forEach((el) => {
      let letterSpan = document.createElement("span");

      if (el === " ") {
        letterSpan.classList.add("letter-space");
      }
      lettersQuess.appendChild(letterSpan);
    });

    let quessSpan = document.querySelectorAll(".letter-quess span");

    // set wrong attempts
    let wrongAttempts = 0;

    // set currect attempts
    let currect = 0;

    document.addEventListener("click", (e) => {
      // set status
      let theStatus = false;

      if (e.target.className === "letterBox") {
        e.target.classList.add("clicked");

        // get clicked letter
        let clickedLetter = e.target.innerHTML;

        letterAndSpace.forEach((wordLetter, wordLetterInd) => {
          if (clickedLetter == wordLetter) {
            theStatus = true;

            quessSpan.forEach((span, spanInd) => {
              if (wordLetterInd == spanInd) {
                span.innerHTML = clickedLetter;
              }
            });
          }
        });

        // on wrong answer
        if (theStatus !== true) {
          wrongAttempts++;
          theDraw.classList.add(`wrong-${wrongAttempts}`);

          // play sound
          document.querySelector(".feild").play();

          // on lose
          if (wrongAttempts === 6) {
            hollBody.classList.add("finished");
            endGame();
          }
        } else {
          currect++;

          let newSet = new Set(letterAndSpace);

          // filter word from space
          let newSetArray = Array.from(newSet);

          filtterWordLetter = newSetArray.filter((el) => {
            return el !== " " ? el : "";
          });

          if (currect === filtterWordLetter.length) {
            hollBody.classList.add("finished");

            victory();
            document.querySelector(".victory").play();
          }
          document.querySelector(".success").play();
        }
      }
    });

    // end game function
    function endGame() {
      let div = document.createElement("div"),
        randomWord = document.createElement("span");
      randomWord.appendChild(document.createTextNode(ranValue));
      randomWord.classList.add("answer");

      let endGameText = document.createTextNode(`Game Over, The Word Is `);

      // play again button
      let playAgainBtn = document.createElement("button");
      playAgainBtn.innerHTML = "Play Again";
      playAgainBtn.classList.add("play-again")
      // add style class to div
      div.classList.add("endGame");

      // apped elements
      div.appendChild(endGameText);
      div.appendChild(randomWord);
      div.appendChild(playAgainBtn);
      document.body.appendChild(div);
    }

    // victory game function
    function victory() {
      let div = document.createElement("div"),
        endGameText = document.createTextNode(
          `Well Done (: | ${wrongAttempts} Mistiks`
        );

      // add style class to div
      div.classList.add("endGame");
      // play again button
      let playAgainBtn = document.createElement("button");
      playAgainBtn.innerHTML = "Play Again";
      playAgainBtn.classList.add("play-again")
      // apped elements
      div.appendChild(endGameText);
      document.body.appendChild(div);
      div.appendChild(playAgainBtn);
    }
  });


  // play again button
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("play-again")) {
    window.location.reload();
    }
  })