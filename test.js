$('.start').on('click', function() {
  countDown();
  })

$('.start').on('click', function() {
    countDown();
})

const countDown = function() {
    let seconds = 5;
    let count = setInterval(function() {
        seconds = seconds - 1;
        $('.seconds').text(seconds);
        if(seconds <= 0) {
          window.clearInterval(count);
          countDown()
        }
    }, 1000)
    $('.seconds').text(seconds);
  }