SELECT quiz_name as name, questions.question as question, questions.answer_1, questions.answer_2, questions.answer_3, questions.answer_correct FROM quizzes
JOIN questions ON quiz_id = quizzes.id
WHERE quiz_id = 1;
GROUP BY quiz_name
