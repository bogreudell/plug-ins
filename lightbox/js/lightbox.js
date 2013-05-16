// problem area: navigation touch events (lines 151 - end)

// PROBLEM #1: on('touch') event (line 153), which allows users to proceed
// to the next image by tapping the current one, only loops through
// the image set once.

// PROBLEM #2: on('swipeleft') on('swiperight') events (commented out on lines 180 - 210),
// are intended to mimick the functionality of left & right arrow keys, 
// don't seem to be responding at all.

$(document).ready(function(){
  /*$('body').bind('touchmove', function (e) { 
    e.preventDefault();
  });*/

  var current, size

  function addLightbox() {
        var lightbox =
            '<div id="lightbox">' +
            '<div class="nav">' +
            '<a href="#prev" class="prev slide-nav">&leftarrow;</a>' +
            '<span>&nbsp;&nbsp;&nbsp;</span>' +
            '<a href="#next" class="next slide-nav">&rightarrow;</a>' +
            '</div>' + 
            '<div id="slideshow">' +
            '<ul></ul>' +
            '</div>' +      
            '</div>' +
            '</div>'
        
        //insert lightbox HTML into page
        $('body').append(lightbox)
        
        // fill lightbox with .lightboxTrigger hrefs in #imageSet
        $('.trigger').each(function() {
          var $href = $(this).attr('href')
          $('#slideshow ul').append(
            '<li>' +
            '<img class="slide-nav lightboxImg" src="' + $href + '">' +
            '</li>'
          )
        })

        var lightboxImg = $('.lightboxImg');

      } 
  
  $('.trigger').click(function(e) {
    
    // prevent default click event
    e.preventDefault()
    
    // grab href from clicked element
    var image_href = $(this).attr("href")
    
    // determine the index of clicked trigger
    var slideNum = $('.trigger').index(this)
    
    // find out if #lightbox exists
    if ($('#lightbox').length > 0) {        
      // #lightbox exists
      $('#lightbox').fadeIn(300)
      // #lightbox does not exist - create and insert (runs 1st time only)

    } else {                                
      // create HTML markup for lightbox window
      addLightbox()
    }
    
    // setting size based on number of objects in slideshow
    size = $('#slideshow ul > li').length
    
    // hide all slide, then show the selected slide
    $('#slideshow ul > li').hide()
    $('#slideshow ul > li:eq(' + slideNum + ')').show()
    
    // set current to selected slide
    current = slideNum
  });
  
  //Click anywhere on the page to get rid of lightbox window
  $('body').on('click', '#lightbox', function() { 
    $('#lightbox').fadeOut(300)
  });

  /* =====================================
      NAVIGATION
     ===================================== */

  // prev/next arrows  
  $('body').on('click', '.slide-nav', function(e) {

    // prevent default click event, and prevent event bubbling to prevent lightbox from closing
    e.preventDefault()
    e.stopPropagation()
    
    var $this = $(this)
    var dest
    
    // looking for .prev
    if ($this.hasClass('prev')) {
      dest = current - 1
      if (dest < 0) {
        dest = size - 1
      }
    } else {
      // in absence of .prev, assume .next
      dest = current + 1
      if (dest > size - 1) {
        dest = 0
      }
    }
    
    // fadeOut curent slide, FadeIn next/prev slide
    $('#slideshow ul > li:eq(' + current + ')').hide()
    $('#slideshow ul > li:eq(' + dest + ')').show()
    
    // update current slide
    current = dest

  });

  //key commands
  $('body').keyup(function(e){
    var dest

    // left arrow
    if ((e.keyCode || e.which) == 37) {   
      dest = current - 1
      if (dest < 0) {
        dest = size - 1
      }
    }
    // right arrow
    if ((e.keyCode || e.which) == 39) {
      dest = current + 1
      if (dest > size - 1) {
        dest = 0
      }
    }  

    //esc key closes lightbox
    if ((e.keyCode || e.which) == 27) {
        $('#lightbox').fadeOut(300)
    }  
    
    if (dest || dest === 0) {

       $('#slideshow ul > li:eq(' + current + ')').hide()
       $('#slideshow ul > li:eq(' + dest + ')').show()
    }

    current = dest

    return false
  })

  // touch events

  $('body').hammer().on('touch', '.lightboxImg', function(){
    console.log('hammer time!')

    var dest

    dest = current + 1
    if (dest < 0) {
        dest = size - 1
    }

    if (dest || dest === 0) {

       $('#slideshow ul > li:eq(' + current + ')').hide()
       $('#slideshow ul > li:eq(' + dest + ')').show()
    }

    current = dest
  })

  /*$('body').hammer().on('swiperight', '.lightboxImg', function(){
      var dest

      dest = current + 1
      if (dest < 0) {
        dest = size - 1
      }

      if (dest || dest === 0) {

       $('#slideshow ul > li:eq(' + current + ')').hide()
       $('#slideshow ul > li:eq(' + dest + ')').show()
    }

    current = dest
  })

  $('body').hammer().on('swipeleft', '.lightboxImg', function(){
      var dest

      dest = current - 1
      if (dest < 0) {
        dest = size - 1
      }

      if (dest || dest === 0) {

       $('#slideshow ul > li:eq(' + current + ')').hide()
       $('#slideshow ul > li:eq(' + dest + ')').show()
    }
  })*/

})