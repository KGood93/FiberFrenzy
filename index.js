let questionNum = 0;
let stash = 0;

//Start Quiz
function startKnitting () {
    $('.letTheFrenzyBegin').on('click', '.frenzy', function (event) {
        $('.letTheFrenzyBegin').remove();
        $('.qandaForm').css('display', 'block');
        $('.row-counter').text(1); 
    });
}    
//Genreate Questions one at a time with function form and buttons
function generateFrenzy () {
    if (questionNum <= (STORE.length-1)) {
        return `<div>
        <h3 class="question">${STORE[questionNum].question}</h3>
        <form>
        <fieldset>
        <label class="patternSelection">
        <input type="radio" value="${STORE[questionNum].answers[0]}" name="answer a" class="answers" required>
        <span class="radioCover"></span>
        <span>${STORE[questionNum].answers[0]}</span><br>
        </label>
        <label class="patternSelection">
        <input type="radio" value="${STORE[questionNum].answers[1]}" name="answer a" required>
        <span class="radioCover"></span>
        <span>${STORE[questionNum].answers[1]}</span><br>
        </label>
        <label class="patternSelection">
        <input type="radio" value="${STORE[questionNum].answers[2]}" name="answer a" required>
        <span class="radioCover"></span>
        <span>${STORE[questionNum].answers[2]}</span><br>
        </label>
        <label class="patternSelection">
        <input type="radio" value="${STORE[questionNum].answers[3]}" name="answer a" required>
        <span class="radioCover"></span>
        <span>${STORE[questionNum].answers[3]}</span><br>
        </label>
        <div class="submitCenter">
        <button type="submit" class="submitButton">Submit</button>
        </div>
        </fieldset>
        </form>
        </div>`;
    }
    else {
        finalStashCount();
        tink();
        $('.questionNum').text(10)
    }
}
//Render Questions to the DOM
function renderQuestion() {
    $('.qandaForm').html(generateFrenzy());
}

//Update Question Count
function updateRowCount () {
  if(questionNum < (STORE.length-1)) {  
    console.log(questionNum);
    questionNum++;
    //console.log(questionNum);
    $('.row-counter').text(questionNum+1);  
  }
  else {
    questionNum++;
    $('.row-counter').text(questionNum);
  }
}
//User Answer Selection
function userAnswer(){
    $('form').on('submit', function (event) {
        event.preventDefault();
        let userChoice = $('input:checked');
        let finalAnswer = userChoice.val();
        let correctAnswer = `${STORE[questionNum].correctAnswer}`;
        if (finalAnswer === correctAnswer) {
            userChoice.parent().addClass('correct');
            answerCorrect();
        }
        else {
            userChoice.parent().addClass('incorrect');
            answerIncorrect();
        }
    });
}
//If answer is correct
function answerCorrect(){
    let correctAnswer = `${STORE[questionNum].correctAnswer}`;
    $('.qandaForm').html(`<div class="stashEarned"><div class="yarnBall2">
    <img src="${STORE[questionNum].icon}" alt="${STORE[questionNum].alt}" class="yarnBall2"/></div>
    <p>You Earned Yarn For Your Stash!</p><button type=button class="nextPattern">
    Next</button></div>`);
    updateStash();
    $('.addYarn').append('<li><img src="YarnBall1.png" alt="yarn ball" class="stashBall" /></li>');
}
//If answer is incorrect
function answerIncorrect(){
    let correctAnswer = `${STORE[questionNum].correctAnswer}`;
    $('.qandaForm').html(`<div class="stashEarned"><div class="yarnBall2">
    <img src="SheepNoBackground.png" alt="Motivational Sheep" class="motivationSheep"/></div>
    <p>Answer Incorrect - No Yarn Earned<br>The correct answer is : <span>${correctAnswer}
    </span></p><button type=button class="nextPattern">
    Next</button></div>`);
}
//update user score
function updateStash(){
    stash++;
    $('.stash').text(stash);
}

//Final Screen with final score and restart button
function finalStashCount(){
  if (stash >= 8) {
    $('.qandaForm').html(`<div class="finalStash"><h3>You are a Fiber Finatic</h3>
    <img src="SheepNoBackground.png" alt="Happy Motivational Sheep" class="motivationSheep"/><p>You got ${stash} / 10</p>
    <p>You LOVE everything knitting and fiber related!</p><button class="tinkButton">Restart Quiz</button></div>`);
  } 
  if (stash <= 7) {
    $('.qandaForm').html(`<div class="finalStash"><h3>Happy Knitting</h3>
    <img src="SheepNoBackground.png" alt="Motivational Sheep" class="motivationSheep"/><p>You got ${stash} / 10</p>
    <p>You have definitly worked on a few projects and are on your way to being a fiber finatic!</p><button class="tinkButton">Restart Quiz</button></div>`);
  }
  if (stash <= 5) {
    $('.qandaForm').html(`<div class="finalStash"><h3>Keep Knitting</h3>
    <img src="SheepNoBackground.png" alt="Motivational Sheep" class="motivationSheep"/><p>You got ${stash} / 10</p>
    <p>You will be fiber obcessed in no time!</p><button class="tinkButton">Restart Quiz</button></div>`);
  }
}

function nextPattern() {
    $('main').on('click', '.nextPattern', function (event){
        updateRowCount();
        renderQuestion();
        userAnswer();
    });
}
//restart quiz (tinking is undoing your knitting - restarting)
function tink() {
    $('.qandaForm').on('click', '.tinkButton', function (event) {
        location.reload();
   });
}    
//run functions
function letFrenzyBegin () {
    startKnitting();
    renderQuestion();
    userAnswer();
    nextPattern();
}

$(letFrenzyBegin);