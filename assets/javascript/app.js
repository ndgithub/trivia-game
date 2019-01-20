var question_one = {
    question: "1 What is the whatever?",
    answers: ["Something", "Something Else", "3", "4"],
    correctIndex: 1,
}

var question_two = {
    question: "2 What is the answer?",
    answers: ["1", "2", "3", "4"],
    correctIndex: 2,
}

var question_three = {
    question: "3 What is the answer?",
    answers: ["1", "2", "3", "4"],
    correctIndex: 3,
}

var question_four = {
    question: "4 What is the answer?",
    answers: ["1", "2", "3", "4"],
    correctIndex: 4,
}

var timer = {
    time: 30,
}

var game = {
    questions: [question_one, question_two, question_three, question_four],
    time: 30,
    currentQuestionIndex: 0,
    isTimesUp: false,
    userCorrect: false,

    start: function () {
        this.time = 30;
        var currQuestion = this.questions[this.currentQuestionIndex]
        $("#answers-container").html("");
        $("#question").html(currQuestion.question);
        $("#timer").html(game.time + "");
        //Display answer
        for (var i = 0; i < currQuestion.answers.length; i++) {
            var questionDiv = $("<div>").addClass("answer-choice").attr("answerNumber", i).html(currQuestion.answers[i]);;
            $("#answers-container").append(questionDiv);
        }
        var questionTimer = setInterval(function () {
            game.time--;
            $("#timer").html(game.time + "");

            if (game.time <= 0) {
                clearInterval(questionTimer);

                game.isTimesUp = true;
                questionOver();
            }
        }, 1000);
        $(".answer-choice").on("click", function () {
            clearInterval(questionTimer);
            
            if (parseInt($(this).attr("answerNumber")) === currQuestion.correctIndex) {
                game.userCorrect = true;
                questionOver();
            } else {
                game.userCorrect = false;
                questionOver();
            }
        });
    },
    goToNextQuestion: function () {
        console.log("next question");
        this.start();
    },
    //console.count("poops")
    timesUp: function () {
        console.log("times up");
    }
}

function questionOver() {
    game.currentQuestionIndex++;
    if (game.isTimesUp === true) {
        $("#question-over-text").html("TimesUp");
        setTimeout(function () {
            game.goToNextQuestion();
        }, 1000)

    } else if (game.userCorrect) {
        $("#question-over-text").html("Right");
        setTimeout(function () {
            game.goToNextQuestion();
        }, 1000)
    } else {
        $("#question-over-text").html("wrong");
        setTimeout(function () {
            game.goToNextQuestion();
        }, 1000)
    }
    //goo to next question;
}


$("#start-button").on("click", function () {
    $("#start-button").css("display", "none");
    game.start();
});

