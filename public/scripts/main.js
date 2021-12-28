AOS.init();

setTimeout(function() { $('.alert').alert('close'); }, 5000);

$(document).ready(function() {
 
    $("#owl-example").owlCarousel({
        
        items:1,
        loop:true,
        autoplay:true,
        autoplayTimeOut:1000,
        smartSpeed:450,
        margin:50

    });
   
  });