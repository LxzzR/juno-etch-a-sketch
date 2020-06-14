// Document Ready
$(document).ready(function() {

// Global Variables
const $canvas = $('.etch-a-sketch'); 
const $shake = $('.shake-btn');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

  // Settings Variables
let lineWidth = 25;
let speed = 3;
let strokeStyle = 'grey';

// Canvas Set Up == Wes Bos Beginner JS Tutorial 
const width = canvas.width;
const height = canvas.height;

// Randomize starting coordinates
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

// Line style
ctx.strokeStyle = strokeStyle;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = lineWidth;

// Initialize line
ctx.beginPath(); 
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Canvas Set Up Ends == Wes Bos Beginner JS Tutorial 

// Draw Function
const draw = (arrowKey) => {
  speed = speed;
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();
  ctx.moveTo(x, y);
// Change line coordinates
switch (arrowKey) {
  case 'ArrowRight':
    x += 10 * speed;
    break;
  case 'ArrowLeft':
    x -= 10 * speed;
    break;
  case 'ArrowDown':
    y += 10 * speed;
    break;
  case 'ArrowUp':
    y -= 10 * speed;
  default:
    break;
}
  ctx.lineTo(x, y);
  ctx.stroke();
}

// EVENT HANDLERS 

const handleShake = () => {
  $shake.click(function() {
  $canvas.removeClass('shake');
  setTimeout(() => {
    $canvas.addClass('shake');
    ctx.clearRect(0, 0, width, height);
  }, 200);
  
});
}

const handleKeyDown = () => {
  $(document).keydown(function(e) {
    if (e.key.includes('Arrow')) {
      let arrowKey = e.key;
      e.preventDefault();
      // Call Draw Function
      draw(arrowKey);
    }
  });
}

// HANDLE THEMES

const handleClassic = () => {
  $('#classic').click(function() {
    $('body').css('background', '#222').css('color', 'whitesmoke').css('fontFamily', 'Courier New');
    $canvas.css('border', '50px solid crimson').css('background', 'whitesmoke');
    $shake.css('background', 'whitesmoke').css('color', '#222').css('fontFamily', 'Arial');
    $('.control-panel').css('background', 'lightslategray').css('color', '#222');
    $('.control-btn').css('background', 'slategray').css('color', '#222').css('fontFamily', 'Arial');
  })
}


const handleGoth = () => {
  $('#goth').click(function() {
    $('body').css('background', '#111').css('color', 'grey').css('fontFamily', 'Carrois Gothic');
    $canvas.css('border', '50px solid #222').css('background', 'black');
    $shake.css('background', '#222').css('color', 'grey').css('fontFamily', 'Carrois Gothic');
    $('.control-panel').css('background', 'black').css('color', 'grey');
    $('.control-btn').css('background', '#111').css('color', 'grey').css('fontFamily', 'Carrois Gothic');
  })
} 

const handlePastel = () => {
  $('#pastel').click(function() {
    $('body').css('background', 'whitesmoke').css('color', '#111').css('fontFamily', 'Kalam');
    $canvas.css('border', '50px solid pink').css('background', 'white');
    $shake.css('background', 'white').css('color', '#111').css('fontFamily', 'Kalam');
    $('.control-panel').css('background', 'white').css('color', '#222').css('fontFamily', 'Arial');
    $('.control-btn').css('background', 'whitesmoke').css('color', '#222').css('fontFamily', 'Kalam');
  })
}

const handleCyber = () => {
  $('#cyber').click(function() {
    $('body').css('background', 'maroon').css('color', 'yellow').css('fontFamily', 'Comic Sans');
    $canvas.css('border', '50px solid lawngreen').css('background', 'blue');
    $shake.css('background', 'purple').css('fontFamily', 'Times New Roman').css('color', 'yellow');
    $('.control-panel').css('background', 'red').css('color', 'yellow');
    $('.control-btn').css('background', 'orange').css('borderRadius', '0').css('color', 'purple').css('fontFamily', 'Times New Roman');
  })
}

// HANDLE SETTINGS

// HANDLE COLOURS

const handleSettings = () => {
  $('.control-btn').click(function() {
    console.log($(this).attr('data-control'));
    switch ($(this).attr('data-control')) {
      case 'thick': 
      lineWidth = 40;
        break;
      case 'thin':
        lineWidth = 25;
        break;
      case 'fast':
        speed = 10;
        break;
      case 'slow':
        speed = 3;
        break;
    }
  })
}  

const handleColor = () => {
  $('.control-btn').click(function() {
    let color = $(this).attr('data-control');
    strokeStyle = color;
  })
}



// CALL IT!
handleShake();
handleKeyDown();
handleSettings();
handleColor();
handleGoth();
handleClassic();
handlePastel();
handleCyber();


// Document Ready ENDS
})