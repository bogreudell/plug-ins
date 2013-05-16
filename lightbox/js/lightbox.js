// PROBLEM: on('swipeleft') on('swiperight') events (commented out on lines 178 - 208),
// are intended to mimick the functionality of left & right arrow keys, 
// don't seem to be responding at all.

$(document).ready(function(){
  // disable rubberbanding
  $('body').on('touchmove', function(e) { e.preventDefault(); });

  // define global varials & functions
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

        //freeze body scroll
        $('body').css('overflow','hidden')

      } 

  function rmLightbox() {
    $('#lightbox').fadeOut(300)
    $('body').css('overflow','scroll')
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

      // if #lightbox exists, fade in, freeze body scroll
      $('body').css('overflow','hidden')
      $('#lightbox').fadeIn(300)
  
    } else {                                
  
      // create markup, insert into body
      addLightbox()
  
    }
    
    // setting size based on number of objects in slideshow
    size = $('#slideshow ul > li').length
    
    // hide all slide, then show the selected slide
    $('#slideshow ul > li').hide()
    $('#slideshow ul > li:eq(' + slideNum + ')').show()
    
    // set current to selected slide
    current = slideNum
  })
  
  //Click anywhere on the page to get rid of lightbox window
  $('body').on('click', '#lightbox', function() { 
    rmLightbox()
  })

  //For touch interfaces, tap anywhere on the page to get rid of lightbox window
  $('body').hammer().on('touch', '#lightbox', function() {
    rmLightbox()
  })

  //For touch interfaces, swipe down or swipe up to close lightbox as well
  $('body').hammer().on('swipedown', '#lightbox', function(e) {
      e.preventDefault
      e.stopPropagation()
      $('#lightbox').hide()
      $('body').css('overflow','scroll')
  })

  $('body').hammer().on('swipeup', '#lightbox', function(e) {
      e.preventDefault
      e.stopPropagation()
      $('#lightbox').slideUp()
      $('body').css('overflow','scroll')
  })

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

  // touch navigation

  $('body').hammer().on('touch', '.lightboxImg', function(e){

    // prevent default click event, and prevent event bubbling to prevent 
    // 'touch' and 'click' event from being read simultaneously
    e.preventDefault()
    e.stopPropagation()

    var dest

    dest = current + 1
      if (dest > size - 1) {
        dest = 0
      }

    if (dest || dest === 0) {

       $('#slideshow ul > li:eq(' + current + ')').hide()
       $('#slideshow ul > li:eq(' + dest + ')').show()
    }

    current = dest
  })

  // PROBLEM AREA - the swipeleft and swiperight events are working 
  // inefficiently, swiping through two images as opposed to one.
  // I think this is a result of the browser reading a swipe and a touch
  // simultaneously, but e.preventDefault() doesn't seem to solve this.

  $('body').hammer().on('swiperight', '.lightboxImg', function(e){
      e.preventDefault()
      e.stopPropagation()

      var dest

      dest = current + 1
      if (dest > size - 1) {
        dest = 0
      }

      if (dest || dest === 0) {

       $('#slideshow ul > li:eq(' + current + ')').hide()
       $('#slideshow ul > li:eq(' + dest + ')').show()
    }

    current = dest
  })

  $('body').hammer().on('swipeleft', '.lightboxImg', function(e){
      e.preventDefault()
      e.stopPropagation()

      var dest

      dest = current - 1
      if (dest < 0) {
        dest = size - 1
      }

      if (dest || dest === 0) {

      $('#slideshow ul > li:eq(' + current + ')').hide()
      $('#slideshow ul > li:eq(' + dest + ')').show()
    }
  })

})