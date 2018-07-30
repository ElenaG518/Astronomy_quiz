'use strict'

let indexNumber = 0;
let score=0;

// generate the quiz item for the form
function generateItemElementString(item) {
  console.log("`generateItemString` ran")
  console.log(item);

  let output = [`
  <legend>Question ${item.page} out of 10: ${item.question}</legend>`];

    // Object.keys(item.answers).forEach(function(key) {
    //   output.push(`<button type="submit" name="option" class="option" value= "${key}">${item.answers[key]}</button>`);
    // });

  for (let i=0; i<item.answers.length; i++) {
    output.push(`<button type="submit" name="option" class="option" value= "${i}"><span class="darken">${item.answers[i]}</span></button>`);
  };

  console.log(output);
  return output;
}

// render each question and answer choices
function renderQuestion() {
  console.log("`renderQuestion` ran");
  if (indexNumber<CHOICE.length) {
  const quizItemString = generateItemElementString(CHOICE[indexNumber]);
  // insert that HTML in to the DOM
  $('.questions').show();
  $('.quiz-content').html(quizItemString);
  } else {
    finalResult();
  };
}

function correctAnswer() {
  console.log("correctAnswer ran")
  score++;
  $('.questions').hide();
  $('.feedback').show().html(`
    <h2>You are correct!</h2>
    <p>Score: ${score}</p>
    <button class="next">next</button>`);
}

function wrongAnswer(text) {
  console.log("wrongAnswer ran")
  $('.questions').hide();
  $('.feedback').show().html(`
    <h2>Wrong Answer!</h2>
  <p class="correct">The correct answer is: ${text}</p>
  <p>Score: ${score}</p>
  <button class="next">next</button>`);
}

// evaluate if selected answer matches correct answer
function evaluateAnswer(selected) {
  console.log('`evaluateAnswer` ran');
  let correctAnswerIndex=CHOICE[indexNumber].correctAnswer;
  let correctAnswerText=CHOICE[indexNumber].answers[correctAnswerIndex];
  console.log(`the selected answer value is ${selected} and the correct answer index is ${correctAnswerIndex} and the correct answer text is ${correctAnswerText}`);
  indexNumber++;
  $('.feedback').removeClass('hidden');

  if(correctAnswerIndex==selected) {
    correctAnswer();
  } else {
    wrongAnswer(correctAnswerText);
  }

}

// at the end, you should see your result and restart quiz
function finalResult() {
  console.log('`finalResult` ran');
  $('.final').removeClass('hidden');
  if (score<5) {
    $('.final h1').text('Like this, you\'ll never make it to platinum!!');
  } else if ((score>=5)&&(score<8)) {
    $('.final h1').text('You need to watch more episodes of Cosmos!');
  } else {
    $('.final h1').text('You are ready for space exploration!');
  }
  $('.final span').text(score);
}

// this function will be our callback when the page loads. it's responsible for adding eventListeners.

// $(document).ready(function(){
  $(function() {

//  When button in intro page is pressed, quiz starts and start page disapears.

$("#js-launch").click(function(event) {
    $('.start').hide();
    renderQuestion();
    });

// relaunch quiz
$('#js-relaunch').click(event=> {
    event.preventDefault();
    console.log('Play again button has been pressed');
    $('.start').show();
    $('.questions, .feedback').hide;
    $('.final').addClass('hidden');
    indexNumber =0;
    score=0;

  });

// get the value of the selected answer
  $('.questions').on('click','.option', event=> {
    event.preventDefault();

        // var selectedAnswerValue = $("input[class='option']:checked").val();
    let selectedAnswerValue = $('.questions').find(event.currentTarget).attr('value');
    console.log(`the selected item index is ${selectedAnswerValue}`);
    evaluateAnswer(selectedAnswerValue);
  });

// call renderQuestion() when next button is pressed to create the next quiz item
$('.feedback').on('click', '.next', event=> {
    console.log("Next Question calling renderQuestion");
    renderQuestion();
    $('.feedback').hide();
  });

})
