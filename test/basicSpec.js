jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
jasmine.getStyleFixtures().fixturesPath = 'base/test/fixtures';

describe('Scrolling', function() {
  'use strict';

  // Perform the scroll up and fire the scroll event.
  var scrollUp = function(px) {
    window.scrollTo(0, window.scrollY - px);
    $('html').trigger('scroll');
  };

  // Perform the scroll down and fire the scroll event.
  var scrollDown = function(px) {
    window.scrollTo(0, window.scrollY + px);
    $('html').trigger('scroll');
  };

  beforeEach(function() {
    loadFixtures('topbar.html');
    loadStyleFixtures('styles.css');

    // Disable animations.
    jQuery.fx.off = true;

    // Reset scroll before each test.
    window.scrollTo(0, 0);
  });

  it('should hide the bar on scroll down', function() {
    var $topbar = $('#topbar'),
        topbarHeight = $topbar.outerHeight();

    $topbar.scrollupbar();

    scrollDown(topbarHeight);

    // Expect the bar not to be visible.
    expect($topbar.offset().top + topbarHeight <= window.scrollY).toBeTruthy();
  });

  it('should show the bar on scroll up', function() {
    var $topbar = $('#topbar'),
        topbarHeight = $topbar.outerHeight();

    $topbar.scrollupbar();

    // In order to scroll up, we need to scroll down first.
    scrollDown(2 * topbarHeight);
    scrollUp(topbarHeight);

    // Expect the bar to be visible.
    expect($topbar.offset().top).toBe(window.scrollY);
  });

  it('should finish showing the bar after a tiny scroll up', function() {
    var $topbar = $('#topbar'),
        topbarHeight = $topbar.outerHeight();

    // Install the Jasmine Clock to mock setTimeout.
    jasmine.clock().install();

    $topbar.scrollupbar();

    // In order to scroll up, we need to scroll down first.
    scrollDown(2 * topbarHeight);
    scrollUp(0.5 * topbarHeight);

    // Expect the bar to be partially visible.
    expect($topbar.offset().top).toBe(window.scrollY - 0.5 * topbarHeight);

    // Wait 401ms, when the complete showing will be triggered.
    jasmine.clock().tick(401);

    // Expect the bar to be fully visible.
    expect($topbar.offset().top).toBe(window.scrollY);

    // Uninstall Jasmine Clock.
    jasmine.clock().uninstall();
  });

  it('should finish hiding the bar after a tiny scroll down', function() {
    var $topbar = $('#topbar'),
        topbarHeight = $topbar.outerHeight();

    // Install the Jasmine Clock to mock setTimeout.
    jasmine.clock().install();

    $topbar.scrollupbar();

    // Scroll away from page top, then scroll up to reveal the bar and finally
    // do a tiny scroll down.
    scrollDown(2 * topbarHeight);
    scrollUp(topbarHeight);
    scrollDown(0.5 * topbarHeight);

    // Expect the bar to be partially visible.
    expect($topbar.offset().top).toBe(window.scrollY - 0.5 * topbarHeight);

    // Wait 401ms, when the complete hiding will be triggered.
    jasmine.clock().tick(401);

    // Expect the bar not to be visible.
    expect($topbar.offset().top + topbarHeight <= window.scrollY).toBeTruthy();

    // Uninstall Jasmine Clock.
    jasmine.clock().uninstall();
  });

  it('should not finish hiding the bar if it is near page top', function() {
    var $topbar = $('#topbar'),
        topbarHeight = $topbar.outerHeight();

    // Install the Jasmine Clock to mock setTimeout.
    jasmine.clock().install();

    // Invoke scroll-up-bar plugin on topbar.
    $topbar.scrollupbar();

    scrollDown(0.5 * topbarHeight);

    // Expect the bar to be partially visible.
    expect($topbar.offset().top).toBe(window.scrollY - 0.5 * topbarHeight);

    // Wait 401ms, when the complete hiding might be triggered.
    jasmine.clock().tick(401);

    // Expect the bar to still be partially visible.
    expect($topbar.offset().top).toBe(window.scrollY - 0.5 * topbarHeight);

    // Uninstall Jasmine Clock.
    jasmine.clock().uninstall();
  });
});
