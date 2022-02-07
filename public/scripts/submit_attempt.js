
// {
//   question: 'Whatever is the questions',
//     options: ['answer 1', 'answer 2', 'answer 3', 'answer 4'],
//       //index of the correct answer
//       answer: 2
// }

//how does the request body will look like
// transform the data into what I need in backend

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
