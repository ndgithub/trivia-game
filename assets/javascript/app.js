var question_one = {
    question: "function whatDoesItDo(color){\nif (color !== 'blue' || color !== 'green') {\ncolor = 'red';\n}\nreturn color;\n}",
    answers: ["Something", "Something Else", "3", "4"],
    correctIndex: 0,
}

var question_two = {
    question: "2 What is the answer?",
    answers: ["1", "2", "3", "4"],
    correctIndex: 1,
}

var question_three = {
    question: "var myVar = 4;console.log(76);",
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
        $(".your-class").slick({
            // Slick Settings
            swipe:false,
            arrows: false,
            draggable:false,
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
        ui.question(currQuestion.question);
        ui.answers("");
        ui.dialogue("");

        //Display answer
        var slideHtml = $("<div>").addClass("aSlide");
        var styledCode = $("<code>").addClass("question").text(currQuestion.question);
        var questionContainer = $("<pre>").append(styledCode);
        var answersContainer = $("<div>").addClass("answers-container");

        for (var i = 0; i < currQuestion.answers.length; i++) {
            var answerChoice = $("<div>").addClass("answer-choice").attr("answerNumber", i).html(currQuestion.answers[i]);
            answersContainer.append(answerChoice);
        }

        slideHtml.append(questionContainer, answersContainer);
        $(".your-class").slick("slickAdd",slideHtml);
        $(".your-class").slick("slickNext");
        
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
          });
          hljs.configure({useBR: true});
          $('div.code').each(function(i, block) {
            hljs.highlightBlock(block);
          });
          

        
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
                ui.dialogue("Right");
                game.questionOver();
            } else {
                var currentQuestion = game.questions[game.currentQuestionIndex];
                var correctAnswer = currentQuestion.answers[currentQuestion.correctIndex];
                $("#dialogue-box").append("Incorrect. The correct answer was:");
                $("#dialogue-box").append(correctAnswer);
                game.questionOver();
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
