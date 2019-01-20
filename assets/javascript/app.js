var question_one = {
    question: "1 What is the whatever?",
    answers: ["Something", "Something Else", "3", "4"],
    correctIndex: 0,
}

var question_two = {
    question: "2 What is the answer?",
    answers: ["1", "2", "3", "4"],
    correctIndex: 1,
}

var question_three = {
    question: "3 What is the answer?",
    answers: ["1", "2", "3", "4"],
    correctIndex: 2,
}

var question_four = {
    question: "4 What is the answer?",
    answers: ["1", "2", "3", "4"],
    correctIndex: 3,
}

var timer = {
    time: 30,
}


var ui = {
    dialogue: function (dialogueText) {
        $("#dialogue-box").html(dialogueText)
    },
    timer: function (secondsRemaining) {
        $("#timer").html(secondsRemaining + "");
    },
    question: function (questionText) {
        $("#question").html(questionText);
    },
    answers: function (questionText) {
        $("#answers-container").html(questionText);
    },


}



var game = {
    questions: [question_one, question_two, question_three, question_four],
    time: 30,
    currentQuestionIndex: -1,
    isTimesUp: false,
    totalCorrect: 0,
    init: function () {
        $("#start-button").on("click", function () {
            $("#start-button").css("display", "none");
            game.goToNextQuestion();
        });
    },
    goToNextQuestion: function () {
        this.currentQuestionIndex++;
        this.time = 30;
       
        var currQuestion = this.questions[this.currentQuestionIndex];
        
        ui.timer(this.time);
        ui.question(currQuestion.question);
        ui.answers("");
        ui.dialogue("");

        //Display answer
        for (var i = 0; i < currQuestion.answers.length; i++) {
            var questionDiv = $("<div>").addClass("answer-choice").attr("answerNumber", i).html(currQuestion.answers[i]);;
            $("#answers-container").append(questionDiv);
        
        }

        var questionTimer = setInterval(function () {
            game.time--;
            ui.timer(game.time);
            if (game.time <= 0) {
                clearInterval(questionTimer);
                game.isTimesUp = true;
                ui.dialogue("Times Up!")
                questionOver();
            }
        }, 1000);
        $(".answer-choice").on("click", function () {
            $(".answer-choice").off("click");
            clearInterval(questionTimer);
            if (parseInt($(this).attr("answerNumber")) === currQuestion.correctIndex) {
                game.totalCorrect++;
                $("#dialogue-box").html("Right");
                questionOver();
            } else {
                var currentQuestion = game.questions[game.currentQuestionIndex];
                var correctAnswer = currentQuestion.answers[currentQuestion.correctIndex];
                $("#dialogue-box").append("Incorrect. The correct answer was:");
                $("#dialogue-box").append(correctAnswer);
                questionOver();
            }
        });
    },
    timesUp: function () {
    },
    gameOver: function () {
        ui.dialogue("Game Over <br>You got "
            + game.totalCorrect + " out of " +
            game.questions.length + 'correct<br> <div id ="reset-button">Play Again?</button>');
        $("#reset-button").on("click", game.reset);
    },
    reset: function () {
        game.time = 30;
        game.currentQuestionIndex = -1;
        game.isTimesUp = false;
        game.userCorrect = false;
        game.totalCorrect = 0;
        game.goToNextQuestion();
    }

}

function questionOver() {
    setTimeout(function () {
        if (game.currentQuestionIndex === game.questions.length - 1) {
            game.gameOver();
        } else {
            game.goToNextQuestion();
        }
    }, 1000)

}


game.init();


