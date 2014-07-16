jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
jasmine.getStyleFixtures().fixturesPath = 'base/test/fixtures';

describe('Callbacks', function() {
  'use strict';

  // Returns page Y offset. Don't use window.scrollY or tests will crash on IE.
  var pageY = function() {
    return $(window).scrollTop();
  };

  // Perform the scroll up and fire the scroll event.
  var scrollUp = function(px) {
    window.scrollTo(0, pageY() - px);
    $('html').trigger('scroll');
  };

  // Perform the scroll down and fire the scroll event.
  var scrollDown = function(px) {
    window.scrollTo(0, pageY() + px);
    $('html').trigger('scroll');
  };

  beforeEach(function() {
    loadFixtures('topbar.html');
    loadStyleFixtures('styles.css');

    // Disable animations.
    jQuery.fx.off = true;

    // Destroy plugin instances from previous tests.
    $.scrollupbar.destroy();

    // Reset scroll before each test.
    window.scrollTo(0, 0);
  });

  it('should trigger enterViewport', function() {
    var $topbar = $('#topbar'),
        barHeight = $topbar.outerHeight(),
        callback = jasmine.createSpy('callback');

    // Invoke scroll-up-bar plugin on topbar.
    $topbar.scrollupbar({enterViewport: callback});

    // Scroll down enough to hide bar
    scrollDown($topbar.offset().top + barHeight);

    // Scroll up to make bar enter viewport
    scrollUp(1);

    // Expect the callback to have been called
    expect(callback).toHaveBeenCalled();
  });

  it('should trigger fullyEnterViewport', function() {
    var $topbar = $('#topbar'),
        barHeight = $topbar.outerHeight(),
        callback = jasmine.createSpy('callback');

    // Invoke scroll-up-bar plugin on topbar.
    $topbar.scrollupbar({fullyEnterViewport: callback});

    // Scroll down enough to hide bar
    scrollDown($topbar.offset().top + barHeight);

    // Scroll up to make bar fully enter viewport
    scrollUp(barHeight);

    // Expect the callback to have been called
    expect(callback).toHaveBeenCalled();
  });

  it('should trigger exitViewport', function() {
    var $topbar = $('#topbar'),
        barHeight = $topbar.outerHeight(),
        callback = jasmine.createSpy('callback');

    // Invoke scroll-up-bar plugin on topbar.
    $topbar.scrollupbar({exitViewport: callback});

    // Scroll down enough to hide bar
    scrollDown($topbar.offset().top + barHeight);

    // Expect the callback to have been called
    expect(callback).toHaveBeenCalled();
  });

  it('should trigger partiallyExitViewport', function() {
    var $topbar = $('#topbar'),
        callback = jasmine.createSpy('callback');

    // Invoke scroll-up-bar plugin on topbar.
    $topbar.scrollupbar({partiallyExitViewport: callback});

    // Scroll down enought to start hiding the bar.
    scrollDown($topbar.offset().top + 1);

    // Expect the callback to have been called
    expect(callback).toHaveBeenCalled();
  });
});
