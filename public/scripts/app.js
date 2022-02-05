// Client facing scripts here

$(document).ready(function() {

  let counter = 2;

  $("#add-question").on( "click", function( event ) {

    event.preventDefault();

    $("#questions").append(`<section class="question-box">
    <h2>Question ${counter}</h2>
    <input type="text" name="question" placeholder="Enter a question">
    <input type="text" name="correct_answer" placeholder="Correct answer">
    <input type="text" name="wrong_answer1" placeholder="Wrong answer">
    <input type="text" name="wrong_answer2" placeholder="Wrong answer">
    <input type="text" name="wrong_answer3" placeholder="Wrong answer">
    </section>`)

    counter ++;

  });

});
