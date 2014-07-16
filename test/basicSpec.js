jasmine.getFixtures().fixturesPath = 'base/test/fixtures';
jasmine.getStyleFixtures().fixturesPath = 'base/test/fixtures';

describe('Scrolling', function() {
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

  it('scroll down should not affect bar before offset is reached', function() {
    var $topbar = $('#topbar');

    // Install the Jasmine Clock to mock setTimeout.
    jasmine.clock().install();

    // Invoke scroll-up-bar plugin on topbar.
    $topbar.scrollupbar();

    scrollDown(50);

    // Expect the bar to be on its original position.
    expect($topbar.offset().top).toBe(100);

    // Wait 401ms, when the complete hiding will be triggered.
    jasmine.clock().tick(401);

    // Expect the bar to still be on its original position
    expect($topbar.offset().top).toBe(100);

    // Uninstall Jasmine Clock.
    jasmine.clock().uninstall();
  });

  it('scroll up should not affect bar before offset is reached', function() {
    var $topbar = $('#topbar');

    // Install the Jasmine Clock to mock setTimeout.
    jasmine.clock().install();

    // Invoke scroll-up-bar plugin on topbar.
    $topbar.scrollupbar();

    scrollDown(120);

    scrollUp(50);

    // Expect the bar to be on its original position.
    expect($topbar.offset().top).toBe(100);

    // Wait 401ms, when the complete hiding will be triggered.
    jasmine.clock().tick(401);

    // Expect the bar to still be on its original position
    expect($topbar.offset().top).toBe(100);

    // Uninstall Jasmine Clock.
    jasmine.clock().uninstall();
  });

  it('should hide the bar on scroll down', function() {
    var $topbar = $('#topbar'),
        topbarHeight = $topbar.outerHeight();

    $topbar.scrollupbar();

    // Scroll down 'till bar offset.
    scrollDown(100);

    scrollDown(topbarHeight);

    // Expect the bar not to be visible.
    expect($topbar.offset().top + topbarHeight <= pageY()).toBeTruthy();
  });

  it('should show the bar on scroll up', function() {
    var $topbar = $('#topbar'),
        topbarHeight = $topbar.outerHeight();

    $topbar.scrollupbar();

    // Scroll down 'till bar offset.
    scrollDown(100);

    // In order to scroll up, we need to scroll down first.
    scrollDown(2 * topbarHeight);
    scrollUp(topbarHeight);

    // Expect the bar to be visible.
    expect($topbar.offset().top).toBe(pageY());
  });

  it('should finish showing the bar after a tiny scroll up', function() {
    var $topbar = $('#topbar'),
        topbarHeight = $topbar.outerHeight();

    // Install the Jasmine Clock to mock setTimeout.
    jasmine.clock().install();

    $topbar.scrollupbar();

    // Scroll down 'till bar offset.
    scrollDown(100);

    // In order to scroll up, we need to scroll down first.
    scrollDown(2 * topbarHeight);
    scrollUp(0.5 * topbarHeight);

    // Expect the bar to be partially visible.
    expect($topbar.offset().top).toBe(pageY() - 0.5 * topbarHeight);

    // Wait 401ms, when the complete showing will be triggered.
    jasmine.clock().tick(401);

    // Expect the bar to be fully visible.
    expect($topbar.offset().top).toBe(pageY());

    // Uninstall Jasmine Clock.
    jasmine.clock().uninstall();
  });

  it('should finish hiding the bar after a tiny scroll down', function() {
    var $topbar = $('#topbar'),
        topbarHeight = $topbar.outerHeight();

    // Install the Jasmine Clock to mock setTimeout.
    jasmine.clock().install();

    $topbar.scrollupbar();

    // Scroll down 'till bar offset.
    scrollDown(100);

    // Scroll away from page top, then scroll up to reveal the bar and finally
    // do a tiny scroll down.
    scrollDown(2 * topbarHeight);
    scrollUp(topbarHeight);
    scrollDown(0.5 * topbarHeight);

    // Expect the bar to be partially visible.
    expect($topbar.offset().top).toBe(pageY() - 0.5 * topbarHeight);

    // Wait 401ms, when the complete hiding will be triggered.
    jasmine.clock().tick(401);

    // Expect the bar not to be visible.
    expect($topbar.offset().top + topbarHeight <= pageY()).toBeTruthy();

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

    // Scroll down 'till bar offset.
    scrollDown(100);

    scrollDown(0.5 * topbarHeight);

    // Expect the bar to be partially visible.
    expect($topbar.offset().top).toBe(pageY() - 0.5 * topbarHeight);

    // Wait 401ms, when the complete hiding might be triggered.
    jasmine.clock().tick(401);

    // Expect the bar to still be partially visible.
    expect($topbar.offset().top).toBe(pageY() - 0.5 * topbarHeight);

    // Uninstall Jasmine Clock.
    jasmine.clock().uninstall();
  });
});
