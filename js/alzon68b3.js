
function scrollEffectsHidden(e) {
  if ( e.data('ix') == 'apear-from-left' ) {
    e.css({
      transform: 'translateX(-50%) translateY(0px) translateZ(0px)'
    });
  }
  if ( e.data('ix') == 'apear-from-bottom' ) {
    e.css({
      transform: 'scaleX(0.01) scaleY(0.01) scaleZ(1)'
    });
  }
  if ( e.data('ix') == 'apear-from-right' ) {
    e.css({
      transform: 'translateX(50%) translateY(0px) translateZ(0px)'
    });
  }
}
function scrollEffectsVisible(e) {
  if ( e.data('ix') == 'apear-from-left' || e.data('ix') == 'apear-from-right' ) {
    e.css({
      transform: 'translateX(0%) translateY(0px) translateZ(0px)'
    });
  }
  if ( e.data('ix') == 'apear-from-bottom' ) {
    e.css({
      transform: 'scaleX(1) scaleY(1) scaleZ(1)'
    });
  }
}

$("[data-ix]").each( function( index, value ) {
  $(this).css({
    opacity: 0,
    transition: 'opacity 500ms ease-out, transform 600ms'
  });
  scrollEffectsHidden($(this));
});

$.fn.isOnScreen = function(){
  var win = $(window);
  var viewport = {
    top : win.scrollTop(),
    left : win.scrollLeft()
  };
  viewport.right = viewport.left + win.width();
  viewport.bottom = viewport.top + win.height();
  var bounds = this.offset();
  bounds.right = bounds.left + this.outerWidth();
  bounds.bottom = bounds.top + this.outerHeight();
  return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));
};

$(window).scroll(function(){
  $("[data-ix]").each( function( index, value ) {
    if ( $(this).isOnScreen() ) {
      $(this).css({
        opacity: 1,
      });
      scrollEffectsVisible($(this)); 
    } else {
      $(this).css({
        opacity: 0,
      });
      scrollEffectsHidden($(this));    
    }
  });
});