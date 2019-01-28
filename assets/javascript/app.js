var question_one = {
    question: "Where does Jim propose to Pam?",
    answers: ["A Restaurant", "The Office", "A Gas Station", "Niagara Falls"],
    correctIndex: 2,
}

var question_two = {
    question: "What does Michael Scott put in his scotch?",
    answers: ["Water", "Salt", "Splenda", "Vanilla"],
    correctIndex: 2,
}

var question_three = {
    question: "Who hosts a barbecue that is Michael NOT invited to?",
    answers: ["Jim", "Pam", "Ryan", "Dwight"],
    correctIndex: 0,
}

var question_four = {
    question: "What character does Dwight dress up as on Earth Day?",
    answers: ["The Green Machine", "The Solar Son", "Energy Man", "Recyclops"],
    correctIndex: 3,
}

var timer = {
    time: 30,
}

var ui = {
    dialogue: function (dialogueText) {
        $("#dialogue-box").html("<h3>" + dialogueText + "</h3>")
    },
    timer: function (secondsRemaining) {
        $("#timer").html(secondsRemaining + "");
    },
    
}

var game = {
    questions: [question_one, question_two, question_three, question_four],
    time: 30,
    currentQuestionIndex: -1,
    isTimesUp: false,
    totalCorrect: 0,
    init: function () {
        $(".your-class").slick({
            // Slick Settings
            swipe: false,
            arrows: false,
            draggable: false,
        });
        $("#start-button").on("click", function () {
            game.goToNextQuestion();
        });

    },
    goToNextQuestion: function () {
        this.currentQuestionIndex++;
        this.time = 30;

        var currQuestion = this.questions[this.currentQuestionIndex];

        ui.timer(this.time);
        ui.dialogue("");

        //Display answer
        var questionContainer = $("<h3>").text(currQuestion.question);

        var answersContainer = $("<div>").addClass("answers-container");
        for (var i = 0; i < currQuestion.answers.length; i++) {
            var answerChoice = $("<div>").addClass("answer-choice").attr("answerNumber", i).html(currQuestion.answers[i]);
            answersContainer.append(answerChoice);
        }

        var slideHtml = $("<div>").addClass("aSlide");
        slideHtml.append(questionContainer, answersContainer);
        $(".your-class").slick("slickAdd", slideHtml);
        $(".your-class").slick("slickNext");

        var questionTimer = setInterval(function () {
            game.time--;
            ui.timer(game.time);
            if (game.time <= 0) {
                clearInterval(questionTimer);
                game.isTimesUp = true;
                ui.dialogue("Times Up!")
                game.questionOver();
            }
        }, 1000);
        $(".answer-choice").on("click", function () {
            $(".answer-choice").off("click");
            clearInterval(questionTimer);
            if (parseInt($(this).attr("answerNumber")) === currQuestion.correctIndex) {
                game.totalCorrect++;
                ui.dialogue("Correct");
                game.questionOver();
            } else {
                var currentQuestion = game.questions[game.currentQuestionIndex];
                var correctAnswer = currentQuestion.answers[currentQuestion.correctIndex];
                ui.dialogue("Incorrect. The correct answer was: " + correctAnswer);
                
                game.questionOver();
            }
        });
    },
    timesUp: function () {
    },
    gameOver: function () {
        ui.dialogue("Game Over <br>You got "
            + game.totalCorrect + " out of " +
            game.questions.length + ' correct<br> <div id ="reset-button" class = "btn btn-primary">Play Again?</button>');
        $("#reset-button").on("click", game.reset);
    },
    questionOver: function () {
        setTimeout(function () {
            if (game.currentQuestionIndex === game.questions.length - 1) {
                game.gameOver();
            } else {
                game.goToNextQuestion();
            }
        }, 1000);
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

game.init();










