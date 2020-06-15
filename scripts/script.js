// Document Ready
$(document).ready(function() {

// Namespace object
const app = {};

// Global Variables - Scoped to Doc Ready Func
// I have declared these in the doc ready function scope because I need access them in my app's functions but I feel like this defeats the purpose of namespacing? What is the best practice here? Should I try to re-write them as part of the namespace object &&|| use them in my functions and pass them around as arguments? I'd like to improve this: 

const $canvas = $('.etch-a-sketch'); 

const $shake = $('.shake-btn');
const ctx = $canvas[0].getContext('2d');
let lineWidth = 25;
let speed = 3;
let strokeStyle = 'grey';

// Canvas Set Up == Thanks @ Wes Bos 'Beginner JS' Etch a Sketch Tutorial 
const width = $canvas[0].width;
const height = $canvas[0].height;

// Randomize starting coordinates for line
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// Line styleing
ctx.strokeStyle = strokeStyle;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = lineWidth;

// Initialize line
ctx.beginPath(); 
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Canvas Set Up Ends == Thanks @ Wes Bos 'Beginner JS' Etch a Sketch Tutorial 

// Draw Function - takes input from arrow keys to move canvas line along 2d coordinates
app.draw = (arrowKey) => {
  speed = speed;
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(x, y);

  if (arrowKey === 'ArrowRight') {
    x += 10 * speed;
  } else if (arrowKey === 'ArrowLeft') {
    x -= 10 * speed;
  } else if (arrowKey === 'ArrowDown') {
    y += 10 * speed;
  } else if (arrowKey === 'ArrowUp') {
    y -= 10 * speed;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
}

// EVENT HANDLERS 

app.handleKeyDown = () => {
  $(document).keydown(function(e) {
    if (e.key.includes('Arrow')) {
      let arrowKey = e.key;
      e.preventDefault();
      // Call Draw Function
      app.draw(arrowKey);
    }
  });
}

// Clear the canvas and add shake animation 
// I tried using the jQuery shake effect (which I've used a few times before with no issues), but it was adding a wrapper to my canvas and shrinking it's dimensons to fit within a wrapper of the canvas's original size
app.handleShake = () => {
  $shake.click(function() {
  $canvas.removeClass('shake');
  setTimeout(() => {
    $canvas.addClass('shake');
    ctx.clearRect(0, 0, width, height);
  }, 200);
  
});
} 

// HANDLE THEMES === 
// Unique theme event handlers, not DRY but offers better readability as there is a lot of chained code in these functions
// Theme styles to be converted into SASS in order to conform with best practices

app.handleClassic = () => {
  $('#classic').click(function() {
  $('body').css('background', '#222').css('color', 'whitesmoke').css('fontFamily', 'Courier New');
  $canvas.css('border', '50px solid crimson').css('background', 'whitesmoke');
  $shake.css('background', 'whitesmoke').css('color', '#222').css('fontFamily', 'Arial');
  $('.control-panel').css('background', 'lightslategray').css('color', '#222');
  $('.control-btn').css('background', 'slategray').css('color', '#222').css('fontFamily', 'Arial');
  })
}

app.handleGoth = () => {
  $('#goth').click(function() {
    $('body').css('background', '#111').css('color', 'grey').css('fontFamily', 'Carrois Gothic');
    $canvas.css('border', '50px solid #222').css('background', 'black');
    $shake.css('background', '#222').css('color', 'grey').css('fontFamily', 'Carrois Gothic');
    $('.control-panel').css('background', 'black').css('color', 'grey');
    $('.control-btn').css('background', '#111').css('color', 'grey').css('fontFamily', 'Carrois Gothic');
  })
} 

app.handlePastel = () => {
  $('#pastel').click(function() {
    $('body').css('background', 'whitesmoke').css('color', '#111').css('fontFamily', 'Kalam');
    $canvas.css('border', '50px solid pink').css('background', 'white');
    $shake.css('background', 'white').css('color', '#111').css('fontFamily', 'Kalam');
    $('.control-panel').css('background', 'white').css('color', '#222').css('fontFamily', 'Arial');
    $('.control-btn').css('background', 'whitesmoke').css('color', '#222').css('fontFamily', 'Kalam');
  })
}

app.handleCyber = () => {
  $('#cyber').click(function() {
    $('body').css('background', 'maroon').css('color', 'yellow').css('fontFamily', 'Comic Sans');
    $canvas.css('border', '50px solid lawngreen').css('background', 'blue');
    $shake.css('background', 'purple').css('fontFamily', 'Times New Roman').css('color', 'yellow');
    $('.control-panel').css('background', 'red').css('color', 'yellow');
    $('.control-btn').css('background', 'orange').css('borderRadius', '0').css('color', 'purple').css('fontFamily', 'Times New Roman');
  })
}

// HANDLE CONTROLS

// Event handlers for btns that change stroke color, thickness and speed
app.handleSettings = () => {
  $('.control-btn').click(function() {
    let setting = $(this).attr('data-control');
    // Handle Color
    strokeStyle = setting;
    // Handle Settings
    if (setting === 'thick') {
      lineWidth = 40;
    } else if (setting === 'thin') {
      lineWidth = 25;
    } else if (setting === 'fast') {
      speed = 10;
    } else if (setting === 'slow') {
      setting = 3;
    }
  })
} 

// Draw function for smaller veiwport touch screen devices (hidden on desktop)
// Question: Should both draw functions be inside ONE function? ( I wasn't sure what to do here, because I have a button event listener and a document keydown listener and they behave the same but have different triggers)
app.drawMobile = () => {
  $('.control-btn').on('click', function() {
    let direction = $(this).attr('data-control');
    speed = speed;
    ctx.strokeStyle = strokeStyle;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x, y);
  
    console.log(direction);
  
    if (direction === 'right') {
      x += 10 * speed;
    } else if (direction === 'left') {
      x -= 10 * speed;
    } else if (direction === 'down') {
      y += 10 * speed;
    } else if (direction === 'up') {
      y -= 10 * speed;
    }
  
    ctx.lineTo(x, y);
    ctx.stroke();
  })
  }

// Initalizes application
app.init = () => {
  app.drawMobile();
  app.handleShake();
  app.handleKeyDown();
  app.handleSettings();
  app.handleClassic();
  app.handleGoth();
  app.handlePastel();
  app.handleCyber();
}

// CALL IT!
app.init();

// Document Ready ENDS
})