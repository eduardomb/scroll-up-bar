(function($) {
  'use strict';

  $.fn.scrollupbar = function() {
    function isFullyInViewport() {
      return $window.scrollTop() <= $bar.offset().top;
    }

    function isInViewport() {
      return $window.scrollTop() < $bar.offset().top + $bar.outerHeight();
    }

    var $window = $(window),
        $document = $(document),
        $bar = this,
        minY = $bar.css('position') == 'fixed' ? 0 : $bar.offset().top,
        lastY = $window.scrollTop(), // Use last Y to detect scroll direction.
        initialPosTop = $bar.position().top,
        iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent),
        timeout;

    // iOS can't handle momentum scroll properly (See discussion on
    // http://stackoverflow.com/questions/2863547).
    if (!iOS) {
      $window.scroll(function() {
        var y = $window.scrollTop(),
            barHeight = $bar.outerHeight();

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
          if (!isInViewport() && lastY - barHeight >= minY) {
            $bar.css('top', lastY - barHeight);
          }

          // Scrolls up bigger than the bar's height fixes the bar on top.
          if (isFullyInViewport()) {
            if (y >= minY) {
              $bar.css({
                'position': 'fixed',
                'top': 0
              });
            } else {
              $bar.css({
                'position': 'absolute',
                'top': initialPosTop
              });
            }
          }

          // Fire an event to reveal the entire bar after 400ms if the scroll
          // wasn't big enough.
          timeout = setTimeout(function() {
            if (!isFullyInViewport()) {
              $bar.css({
                'position': 'fixed',
                'top': $bar.offset().top - y
              });

              $bar.animate({'top': 0}, 100);
            }
          }, 400);
        } else if (y > lastY) { // Scrolling down
          // Unfix the bar allowing it to scroll with the page.
          if (isFullyInViewport()) {
            $bar.css({
              'position': 'absolute',
              'top': lastY > minY ? lastY : initialPosTop
            });
          }

          // Fire an event to hide the entire bar after 400ms if the scroll
          // wasn't big enough.
          timeout = setTimeout(function() {
            if (isInViewport() && y - barHeight >= minY) {
              $bar.animate({'top': y - barHeight}, 100);
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

        if (y < lastY || y < $bar.outerHeight()) { // Scrolling up
          $bar.slideDown();
        } else if (y > lastY) { // Scrolling down
          $bar.slideUp();
        }

        lastY = y;
      });
    }

    return this;
  };
})(jQuery);
