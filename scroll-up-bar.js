/*
 * Scroll-up-bar plugin v0.0.1
 * https://github.com/eduardomb/scroll-up-bar
*/
(function($) {
  'use strict';

  $.fn.scrollupbar = function() {
    var $window = $(window),
        $document = $(document),
        $topbar = this,
        topbarHeight = $topbar.outerHeight(),
        lastY = 0, // Keep track of the last Y to detect scroll direction.
        revealing = false, // Indicate if the bar's reveal is in progress.
        timeout;

    $window.scroll(function() {
      var y = $window.scrollTop();

      // Cancel the event fired by the previous scroll.
      if (timeout) {
        clearTimeout(timeout);
      }

      // Ignore elastic scrolling.
      if (y < 0 || y > ($document.height() - $window.height())) {
        return;
      }

      if (y < lastY) { // Scrolling up
        // The first scroll up places the bar right above the top frame.
        if (!revealing) {
          revealing = true;

          if (y > topbarHeight) {
            $topbar.css('top', y - topbarHeight);
          }
        }

        // Scrolls up bigger than the bar's height fixes the bar on top.
        if (parseInt($topbar.css('top')) > y) {
          $topbar.css({
            'position': 'fixed',
            'top': 0
          });
        }

        // Fire an event to reveal the entire bar after 400ms if the scroll
        // wasn't big enough.
        timeout = setTimeout(function() {
          if (y < parseInt($topbar.css('top')) + topbarHeight) {
            $topbar.css({
              'position': 'fixed',
              'top': parseInt($topbar.css('top')) - y
            });

            $topbar.animate({'top': 0}, 100);
          }
        }, 400);
      } else { // Scrolling down
        revealing = false;

        // The first scroll down unfixes the bar allowing it to scroll with the
        // page.
        if ($topbar.css('position') == 'fixed') {
          $topbar.css({
            'position': 'absolute',
            'top': y
          });
        }

        // Fire an event to hide the entire bar after 400ms if the scroll
        // wasn't big enough.
        timeout = setTimeout(function() {
          if (y < parseInt($topbar.css('top')) + topbarHeight) {
            if (y > topbarHeight) {
              $topbar.animate({'top': y - topbarHeight}, 100);
            }
          }
        }, 400);
      }

      lastY = y;
    });

    return this;
  };
})(jQuery);
