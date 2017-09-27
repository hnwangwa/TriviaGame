//To ensure the page fully loads before any script gets run
$(document).ready(function() {
var panel = $("#quiz-container");
var countStartNumber = 30;


///////////////////////////////////////////////////////////////////////////////

//CLICK EVENTS

///////////////////////////////////////////////////////////////////////////////

$(document).on("click", "#start-over", function(e) {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start-button", function(e) {
  $("#button-container").prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
  game.loadQuestion();
});

///////////////////////////////////////////////////////////////////////////////


//Question set


///////////////////////////////////////////////////////////////////////////////

var questions = [{
	question: "How old is Hans Moleman?",
	answers: ["31","108","12","77"],
	rightAnswer: "31",
	picture:"assets/images/hans-moleman.gif"
}, {
	question: "What is the name of Bart's evil Twin?",
	answers: ["Ernie","Hugo","Merlin","Bart"],
	rightAnswer: "Hugo",
	picture:"assets/images/hugo-gif.gif"
}, {
	question: "What is Lisa's best friend called?",
	answers: ["Janey","Jenny","Julie","Janet"],
	rightAnswer: "Janey",
	picture:"assets/images/janey.gif"
}, {
	question: "In Treehouse of Horror, where is the porthole to another dimension?",
	answers: ["In the closet","Behind the bookcase","Under the couch","In the fridge"],
	rightAnswer: "Behind the bookcase",
	picture:"assets/images/dimension.gif"
}, {
	question: "What was Mr. Burns' teddy bear called?",
	answers: ["Bouncer","Beans","Bo bo","Bubble"],
	rightAnswer: "Bo bo",
	picture:"assets/images/bobo.gif"
}, {
	question: "What does the scanner say when Maggie is scanned in the opening titles?",
	answers: ["NRA4EVER","$39.99","Eat my shorts","$847.63"],
	rightAnswer: "$847.63",
	picture:"assets/images/maggiescan.gif"

}, {
	question: "How does Maude die?",
	answers: ["Electric shock","Falling from a stadium stand","Cancer","Drinking"],
	rightAnswer: "Falling from a stadium stand",
	picture:"assets/images/byemaude.gif"

}, {
	question: "Where was Maggie when she shot Mr Burns?",
	answers: ["At Moes Tavern", "Next to the sundial","In the mall","In the car"],
	rightAnswer: "In the car",
	picture:"assets/images/maggieshoot.gif"

}, {
	question: "What is Apu's last name?",
	answers: ["Nahasapeemapetilon","Nashapenapetalon","Nahasapenapetaloon","Nashapenapetaloon"],
	rightAnswer: "Nahasapeemapetilon",
	picture:"assets/images/apu.gif"
}, {
	question: "What is Selma's pet iguana's name?",
	answers: ["Boo Boo","Tom Tom","Jub Jub","Cutley"],
	rightAnswer: "Jub Jub",
	picture:"assets/images/selma-jubjub.gif"

}];

var game = {
  questions:questions,
  currentQuestion:0,
  counter:countStartNumber,
  correct:0,
  incorrect:0,
  countdown: function(){
    game.counter--;
    $('#counter-number').html(game.counter);

    if (game.counter === 0){
      console.log('TIME UP');
      game.timeUp();
    }
  },
  loadQuestion: function(){
    timer = setInterval(game.countdown, 1000);
    panel.html('<h2>' + questions[this.currentQuestion].question + '</h2>' );
    for (var i = 0; i<questions[this.currentQuestion].answers.length; i++){
      panel.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i]+ '</button>');
    }
  },
  nextQuestion: function(){
    game.counter = countStartNumber;
    $('#counter-number').html(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },
  timeUp: function (){
    clearInterval(timer);
    $('#counter-number').html(game.counter);

    panel.html('<h2>Out of Time!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[this.currentQuestion].rightAnswer);
    panel.append('<img src="' + questions[this.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  results: function() {
    clearInterval(timer);

    panel.html('<h2>All done, heres how you did!</h2>');
    $('#counter-number').html(game.counter);
    panel.append('<h3>Correct Answers: ' + game.correct + '</h3>');
    panel.append('<h3>Incorrect Answers: ' + game.incorrect + '</h3>');
    panel.append('<h3>Unanswered: ' + (questions.length - (game.incorrect + game.correct)) + '</h3>');
    panel.append('<br><button id="start-over">Start Over?</button>');
  },
  clicked: function(e) {
    clearInterval(timer);

    if ($(e.target).data("data-name") === questions[this.currentQuestion].correctAnswer){
      this.answeredCorrectly();
    } else {
      this.answeredIncorrectly();
    }
  },
  answeredIncorrectly: function() {
    game.incorrect++;
    clearInterval(timer);
    panel.html('<h2>Nope!</h2>');
    panel.append('<h3>The Correct Answer was: ' + questions[game.currentQuestion].rightAnswer + '</h3>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  answeredCorrectly: function(){
    clearInterval(timer);
    game.correct++;
    panel.html('<h2>Correct!</h2>');
    panel.append('<img src="' + questions[game.currentQuestion].image + '" />');

    if (game.currentQuestion === questions.length - 1){
      setTimeout(game.results, 3 * 1000);
    } else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },
  reset: function(){
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};
});