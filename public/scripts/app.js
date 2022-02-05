// Client facing scripts here

// $(document).ready(function() {

//   let counter = 2;

//   $("#add-question").on( "click", function( event ) {

//     event.preventDefault();

//     $("#questions").append(`<section class="question-box">
//     <h2>Question ${counter}</h2>
//     <input type="text" name="question" placeholder="Enter a question">
//     <input type="text" name="correct_answer" placeholder="Correct answer">
//     <input type="text" name="wrong_answer1" placeholder="Wrong answer">
//     <input type="text" name="wrong_answer2" placeholder="Wrong answer">
//     <input type="text" name="wrong_answer3" placeholder="Wrong answer">
//     </section>`)

//     counter ++;

//   });


const addQuestion = function(questionNumber) {
  return $(`<article id="q${questionNumber}" class="question-box">
  <div>Question</div>
  <input type="text" class="question-input" name="question${questionNumber}" placeholder="Enter question">
  <input type="text" class="answer-input" name="question${questionNumber}-correct-answer" placeholder="Correct answer">
  <input type="text" class="answer-input" name="question${questionNumber}-wrong-answer1" placeholder="Wrong answer">
  <input type="text" class="answer-input" name="question${questionNumber}-wrong-answer2" placeholder="Wrong answer">
  <input type="text" class="answer-input" name="question${questionNumber}-wrong-answer3" placeholder="Wrong answer">
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

    console.log("About to remove", questionID);
    $(`#${questionID}`).remove();
  })
});
