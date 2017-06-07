//button click to start quiz

//user gets promped to answer a series of >=5 multiple choice questions one at a time.

//must not be able to skip questions

//must display current score and which question the user is on

//when an answer is submitted the user should receive feedback on if their is correct and display the correct answer

//after the last question is submitted the user should be shown the final score and be able to start the game again.

$(document).ready(function () {

    $(".reset").click(function() {
        location.reload(true);
    });

    $(".start").click(quizItems);

    function quizItems() {
        var score = [];
        var questions = [{
            q: "In which country has esports had the longest strongest following since its inception?",
            s: ["Japan", "South Korea", "United States", "Russia"],
            a: "South Korea",
            correct: 0
        }, {
            q: "Which game has the overall largest tournament prize pool as of 2017?",
            s: ["Dota 2", "League of Legends", "Starcraft Brood War", "Counter-Strike"],
            a: "Dota 2",
            correct: 0
        }, {
            q: "Esports greatly assisted the rise and prominence of which video platform?",
            s: ["Youtube", "Facebook Video", "Vimeo", "Twitch.tv"],
            a: "Twitch.tv",
            correct: 0
        }, {
            q: "Which prominent Esports title is avaiable on mobile devices?",
            s: ["Starcraft 2", "Hearthstone", "Counter-Strike", "Street Fighter"],
            a: "Hearthstone",
            correct: 0
        }, {
            q: "The most-watched Esports tournament final was the ____.",
            s: ["2005 USA World Cyber Games", "2015 Dota 2 The International, Seattle", "2014 ESL Intel Extreme Masters, San Jose", "2013 League of Legends World Finals, LA"],
            a: "2013 League of Legends World Finals, LA",
            correct: 0
        }, {
            q: "The most watched Esport in general is ____.",
            s: ["Starcraft 2", "League of Legends", "Starcraft Brood War", "Dota 2"],
            a: "Dota 2",
            correct: 0
        }, {
            q: "The Esports industry is projected to reach $____ in 2017.?",
            s: ["1 billion", "780 million", "900 million", "1.25 billion"],
            a: "1 billion",
            correct: 0
        }, {
            q: "____ is widely regarded as the single most influential game is Esports history.",
            s: ["Street Fighter", "Counter-Strike", "Starcraft Brood War", "Dota 2"],
            a: "Starcraft Brood War",
            correct: 0
        }];


        var counter = questions.length;

        
        function createQuestion(questions) {
            for (var i = 0; i < counter; i++) {
                $(".start").hide();
                $("#questions").append('<form id="' + i + '"><center><p class="question-num">Question ' +
                    (i + 1) + ' of ' + questions.length + '</p></center><h3 class="question">' +
                    questions[i].q + '</h3><br>' + radioButtons(questions[i].s, i) +
                    '<br><br><button type="submit" class="btn btn-primary next">NEXT</button></p></form>');
            }
            // hide all questions EXCEPT the first
            for (var i = counter - 1; i > 0; i--) {
                $('#' + i).hide();
            }
        }

        // create radio buttons
        function radioButtons(ary, questionNumber) {
            var answers = [];
            for (i = 0; i < ary.length; i++) {
                answers.push('<div class="radio-inline"><label><input type="radio" name="' +
                    questionNumber + '" value="' + ary[i] + '">' + ary[i] + '</label></div>');
            }
            return answers.join(" ");
        }

        // sums the correct values
        function sumScore(questions) {
            return score.reduce(function (previousValue, currentValue, index, array) {
                return previousValue + currentValue;
            });
        }

        // checks answer, updates score
        function checkAnswer(answer, questionNumber, questions) {
            if (answer == questions[questionNumber].a) {
                questions[questionNumber].correct = 1;
                score.push(questions[questionNumber].correct);
            } else {
                score.push(questions[questionNumber].correct);
            }
        }

        createQuestion(questions);

        $(".next").click(function (event) {
            event.preventDefault();
            var questionNumber = $(this).closest("form").attr("id"); // question number
            var userInput = $('input[name=' + questionNumber + ']:radio:checked').val(); // get answer
            if (counter > 1) {
                // hide current question, show next question
                checkAnswer(userInput, questionNumber, questions);
                $("#" + questionNumber).hide();
                $("#" + questionNumber).next().show();
                counter--;
            } else if (counter === 1) {
                // remove questions, add results
                checkAnswer(userInput, questionNumber, questions);
                $("#questions").find("form").remove();
                $("#questions").append('<h3 class="result"></h3>');
                $(".result").text('You answered ' + sumScore(questions) + ' question(s) correctly out of 8.');
                   for (i = 0; i < score.length; i++) {
                        if (score[i] === 0) {
                            console.log(questions[i].q, questions[i].a);
                            $("#questions").append('<p class="missed-' + i + '">You missed:<br> ' +
                                questions[i].q + '<br>Answer: ' + questions[i].a + '</p>');
                        }
                    }
            } else {
                return false;
            }
        });
    }
});