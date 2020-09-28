/********** TEMPLATE GENERATION FUNCTIONS **********/

function startDisplay() {
  return `
    <div id="startDisplay" class="startDisplay">
        <p>Start Page for Quiz App</p>
        <p>Click the button below to get started!</p>
        <button type='button' id='startButton'>Start Quiz</button>
    </div>`;
}

function quizInfoDisplay() {
    let quizInfoDisplay = 
        `<div id="info" class="info">
            <ul>
                <li>Question:${STORE.questionNumber + 1}/${STORE.questions.length}</li>
                <li>Score:${STORE.score}/${STORE.questions.length}</li>
            </ul>
        </div>`
    return quizInfoDisplay;
  }

  function questionDisplay() {
    let questionDisplay = `
        <form class="form">
            <h3>${STORE.questions[STORE.questionNumber].question}</h3>
                <div>
                    <label for="cityOption1">${STORE.questions[STORE.questionNumber].answers[0]}</label>
                    <input type="radio" id="cityOption1" name="options" required value="${STORE.questions[STORE.questionNumber].answers[0]}">
                </div>
                <div>
                    <label for="cityOption2">${STORE.questions[STORE.questionNumber].answers[1]}</label>
                    <input type="radio" id="cityOption2" name="options" value="${STORE.questions[STORE.questionNumber].answers[1]}">
                </div>
                <div>
                    <label for="cityOption3">${STORE.questions[STORE.questionNumber].answers[2]}</label>
                    <input type="radio" id="cityOption3" name="options" value="${STORE.questions[STORE.questionNumber].answers[2]}">
                </div>
                <div>
                    <label for="cityOption4">${STORE.questions[STORE.questionNumber].answers[3]}</label>
                    <input type="radio" id="cityOption4" name="options" value="${STORE.questions[STORE.questionNumber].answers[3]}">
                </div>
                <br>
            <button type='submit' id='submitButton'>Submit Answer</button>
        </form>`
    return questionDisplay;
  }

function finalDisplay() {
    $('main #nextButton').hide('#nextButton');
    let finalText = `<p class="finalText">Thank you for playing! Your final score was ${STORE.score} out of ${STORE.questions.length}.</p>
        <p class="finalText">Click the button to play again!</p>`;
    $('main').html(finalText);
    let displayRestartButton = `<br><button type='button' id='restartButton'>Restart Quiz</button>`;
    $('main').append(displayRestartButton);
    restartButton();
  }

  /********** RENDER FUNCTION(S) **********/

function render() {
    let html = '';
    if (STORE.quizStarted === false) {
        $('main').html(startDisplay());
        return;
    } 
    else if (STORE.questionNumber >= 0 && STORE.questionNumber < STORE.questions.length ) {
        html = quizInfoDisplay();
        html += questionDisplay();
        $('main').html(html);
    } 
    else {
        $('main').html(finalDisplay());
    }
};

function formSubmission() {
    $('body').submit(function (event) {
        event.preventDefault();
        const correctAnswer = STORE.questions[STORE.questionNumber].correctAnswer;
        const selectedOption = $('input[name="options"]:checked').val();
        if (correctAnswer === selectedOption) {
            let correct = `<p class="correct">Correct!</p><br><button type='button' id='nextButton'>Next Question</button>`;
            $('main').append(correct);
            STORE.score++;
        } 
        else {
            let wrong = `<p class="wrong">Wrong! The correct answer is ${STORE.questions[STORE.questionNumber].correctAnswer}.</p><br><button type='button' id='nextButton'>Next Question</button>`;
            $('main').append(wrong);
            }
        STORE.questionNumber++
        $('form').hide('#submitButton');
        nextButton();
        });
    }

  /********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function startButton() {
    $('main').on('click', '#startButton', function(event) {
        event.preventDefault();
        STORE.quizStarted = true;
        render();
    });
  }

  function nextButton() {
    $('main').on('click', '#nextButton', function(event){
        event.preventDefault();
        render();
    });
  }
  
  function restartButton() {
    $('main').on('click', '#restartButton', function(event) {
        STORE.questionNumber = 0;
        STORE.score = 0;
        STORE.quizStarted = false;
        render()
    });
  }
  
  /********** CALL FUNCTIONS **********/
  
  function masterRender() {
    render();
    startButton();
    formSubmission();
  }
  
  $(masterRender);
  