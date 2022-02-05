// Client facing scripts here

const addQuestion = function(questionNumber) {
  return $(`<article id="q${questionNumber}" class="question-box">
  <div>Question</div>
  <input type="text" class="question-input" name="question" placeholder="Enter question">
  <input type="text" class="answer-input" name="correct_answer" placeholder="Correct answer">
  <input type="text" class="answer-input" name="wrong_answer1" placeholder="Wrong answer">
  <input type="text" class="answer-input" name="wrong_answer2" placeholder="Wrong answer">
  <input type="text" class="answer-input" name="wrong_answer3" placeholder="Wrong answer">
  <button class="remove-question-bttn" data-question="${questionNumber}" type="button" name="remove-question">- Remove Question</button>
  </article>`)
};


$(document).ready(function() {

  let questionCounter = 1;

  $(".questions-container").append(addQuestion(questionCounter));

  $(".add-question-bttn").on('click', function(event) {
    questionCounter++;
    event.preventDefault();
    $(".questions-container").append(addQuestion(questionCounter));
  })

  $(".questions-container").on('click', ".remove-question-bttn", function(event) {
    const questionNumber = $(event.target).data("question");
    const questionID = `q${questionNumber}`;
    $(`#${questionID}`).remove();
  })
});
