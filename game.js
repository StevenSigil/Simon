buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var playing = false;
var level = 0;

// Start the game at beginning
$(document).on("keypress", function () {
  if (!playing) {
    $("#level-title").text("Level " + level);
    playing = true;
    nextSequence();
  }
});

// User's input
$(".btn").click(function (event) {
  if (playing) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
    console.log(userClickedPattern.slice(-1));
  } else {
    playing = true;
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("Success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");

    $("body")
      .addClass("game-over")
      .delay(150)
      .queue(function (next) {
        $(this).removeClass("game-over");
        next();
      });

    $("#level-title").text("GAME OVER! Press Any Key to Restart");
    startOver();

    console.log("Wrong");
  }
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // Blink the button
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  console.log(gamePattern);
}

function startOver() {
  level = 0;
  gamePattern = [];
  playing = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour)
    .addClass("pressed")
    .delay(100)
    .queue(function (next) {
      $(this).removeClass("pressed");
      next();
    });
}
