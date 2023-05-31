//Counter
const counts = document.querySelectorAll('.count')
const speed = 500

counts.forEach((counter) => {
    function upDate(){
        const target = Number(counter.getAttribute('data-target'))
        const count = Number(counter.innerText)
        const inc = target / speed        
        if(count < target){
            counter.innerText = Math.floor(inc + count) 
            setTimeout(upDate, 20)
        }else{
            counter.innerText = target
        }
    }
    upDate()
})
//End of counter

//Button pulse
var buttons = document.getElementsByClassName('pulse');
var activeButton = null;

// Attach click event listener to each button
Array.from(buttons).forEach(function(button) {
  button.addEventListener('click', function() {
    // Remove pulse from previously active button
    if (activeButton !== null){
        activeButton.classList.remove('pulsing');
    }

    // Add pulse to clicked button
    button.classList.add('pulsing');

   // Set the clicked button as active
   activeButton = button;
  });
});

//End of button pulse

//Bubble pop
function popBubble(bubbleID) {
    document.getElementById(bubbleID).style.scale = 0

    setTimeout(() => {
      document.getElementById(bubbleID).style.scale = 1
    }, 5000);

  }
//End of bubble pop