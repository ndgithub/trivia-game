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


var questions = [question_one, question_two, question_three, question_four];


var game = {
    questions: [question_one, question_two, question_three, question_four],
    time: 30,
    currentQuestionIndex: 0,
    isTimesUp: false,
    userCorrect:false,

    start: function () {
        var currQuestion = this.questions[this.currentQuestionIndex]
        $("#question").html(currQuestion.question);
        $("#timer").html(game.time + "");
        for (var i = 0; i < currQuestion.answers.length; i++) {
            $("#answers-container").append('<div class = "answer-choice" answerNumber=' + i + '>' + currQuestion.answers[i] + '</div>');
        }
        var interval = setInterval(function () {
            game.time--;
            $("#timer").html(game.time + "");
            if (game.time <= 0) {
                isTimesUp = true;
                questionOver();
            }
        }, 1000);
        $(".answer-choice").on("click", function () {
            if (parseInt($(this).attr("answerNumber")) === currQuestion.correctIndex) {
                game.userCorrect = true;
                questionOver();
            } else {
                game.userCorrect = false;
                questionOver();
            }
            // show screen with right or wrong.
            // 
        });
    },

    timesUp: function () {
        console.log("times up");
    }

}

function questionOver() {
    if (game.isTimesUp === true) {
        console.log("timesUp");
    } else if (game.userCorrect) {
        console.log("right")
    } else {
        console.log("wrong")
    }
    //goo to next question;
}


$("#start-button").on("click", function () {
    $("#start-button").css("display", "none");
    game.start();
});

