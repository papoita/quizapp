const shuffleAnswers = function ()
{
  let answersArr = ['answer_1', 'answer_2', 'answer_3', 'answer_correct'];
  return answersArr.sort((a, b) => 0.5 - Math.random());
};

const appendQuestion = function (quiz, i)
{
  const answersOrder = shuffleAnswers();
  return $(`<article class="question-box">
    <header><h5 class="show-quiz-question">${quiz.question}</h5></header>
    <div class="show-quiz-alternatives">
      <label for="question${i}-alternative-1">
        <input type="radio" class="question${i}-alternative-1" name="question${i}-alternative" required>${quiz[answersOrder[0]]}</input>
      </label>
      <label for="question${i}-alternative-2">
        <input type="radio" class="question${i}-alternative-2" name="question${i}-alternative">${quiz[answersOrder[1]]}</input>
      </label>
      <label for="question${i}-alternative-3">
        <input type="radio" class="question${i}-alternative-3" name="question${i}-alternative">${quiz[answersOrder[2]]}</input>
      </label>
      <label for="question${i}-alternative-4">
        <input type="radio" class="question${i}-alternative-4" name="question${i}-alternative">${quiz[answersOrder[3]]}</input>
      </label>
    </div>
  </article>`);
};

$(document).ready(function ()
{
  const id = window.location.href.slice(34);
  $.get(`/api/questions/${id}`).then(data =>
  {
    for (let x = 0; x < data.quiz.length; x++)
    {
      $(".quiz-container").append(appendQuestion(data.quiz[x], x));
    };
  })
});












// $(document).ready(function() {

//   let userAnswers = req.body.answers;
//   let correct_answers = db.query(`SELECT answer_correct FROM questions WHERE quiz_id = $1`, req.body.id);
//   let number_questions = db.query(`SELECT COUNT(*) FROM quizzes WHERE quiz_id = $1`, req.body.id);
//   let score = 0;

  // $(".questions-container").append(addQuestion(questionCounter));

  // $(".add-question-bttn").on('click', function(event) {
  //   questionCounter++;
  //   event.preventDefault();
  //   $(".questions-container").append(addQuestion(questionCounter));
  // })



  // $(".quiz_submit").on('click', function(event) {
  //   // const questionNumber = $(event.target).data("question");
  //   // const questionID = `q${questionNumber}`;
  //   // $(`#${questionID}`).remove();

  //   testFunction = req.body => {
  //     for (let i=0; i <userAnswers.length; i++) {
  //       if (correct_answers[i] === userAnswers[i]) {
  //         score++;
  //       }
  //     }
  //   }
  //   .then (score => ) db.query(`INSERT INTO quiz_attempts (quiz_id, user_id, score, date) VALUES($1, $2, $3, $4) RETURNING *;`, [quiz_id, user_id, score, date])
  //   .then(data => {
  //     const attempt = data.rows[0];
  //     templateVars = { attempt: attempt };

  //     return res.render("test_page", templateVars);

  //   // const finalScore = (score/number_questions)
  //   return `${score} out of ${number_questions}`;

  // })

// });
