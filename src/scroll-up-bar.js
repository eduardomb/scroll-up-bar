(function($) {
  'use strict';

  $.fn.scrollupbar = function() {
    var $window = $(window),
        $document = $(document),
        $topbar = this,
        lastY = $window.scrollTop(), // Use last Y to detect scroll direction.
        offsetTop = $topbar.offset().top,
        iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
        timeout;

    // iOS can't handle momentum scroll properly (See discussion on
    // http://stackoverflow.com/questions/2863547).
    if (!iOS) {
      $window.scroll(function() {
        var y = $window.scrollTop(),
            topbarHeight = $topbar.outerHeight(),
            offsetBottom = $topbar.offset().top + topbarHeight,
            barIsHidden = offsetBottom <= y && y >= topbarHeight;

        // Ignore elastic scrolling.
        if (y < 0 || y > ($document.height() - $window.height())) {
          return;
        }

        // Cancel the event fired by the previous scroll.
        if (timeout) {
          clearTimeout(timeout);
        }

        if (y < lastY) { // Scrolling up
          // If the bar is hidden, place it right above the top frame.
          if (barIsHidden && y >= lastY - topbarHeight) {
            $topbar.css('top', lastY - topbarHeight);
          }

          // Scrolls up bigger than the bar's height fixes the bar on top.

          if ($topbar.offset().top >= y) {
            $topbar.css({
              'position': 'fixed',
              'top': 0
            });
          }

          // Scrolls up bigger than bar's offset fixes the bar to offset

          if ($topbar.offset().top <= offsetTop) {
            $topbar.css({
              'position': 'absolute',
              'top': offsetTop
            });
          }

          // Fire an event to reveal the entire bar after 400ms if the scroll
          // wasn't big enough.
          timeout = setTimeout(function() {
            if (y > $topbar.offset().top) {
              $topbar.css({
                'position': 'fixed',
                'top': $topbar.offset().top - y
              });

              $topbar.animate({'top': 0}, 100);
            }
          }, 400);
        } else if (y > lastY && y > offsetTop) { // Scrolling down
          // Unfix the bar allowing it to scroll with the page.
          if ($topbar.css('position') === 'fixed') {
            $topbar.css({
              'position': 'absolute',
              'top': lastY
            });
          }

          // Fire an event to hide the entire bar after 400ms if the scroll
          // wasn't big enough.
          timeout = setTimeout(function() {
            if (!barIsHidden && (y - offsetTop) > topbarHeight) {
              $topbar.animate({'top': y - topbarHeight}, 100);
            }
          }, 400);
        }

        lastY = y;
      });
    } else { // Fallback simplified behaviour for iOS.
      $(document).on('touchstart', function () {
        lastY = $window.scrollTop();
      });

      $(document).on('touchend', function () {
        var y = $window.scrollTop();

        if (y < lastY || y < $topbar.outerHeight()) { // Scrolling up
          $topbar.slideDown();
        } else if (y > lastY) { // Scrolling down
          $topbar.slideUp();
        }

        lastY = y;
      });
    }

    return this;
  };
})(jQuery);