# ScrollUpBar Plugin

The scroll up bar plugin (jQuery) hides the top bar when scrolling down, and
show it when scrolling up. It's specially useful on mobile interfaces to save
some precious space.

## Demos

* [Simple](http://eduardomb.github.io/scroll-up-bar)
* [Bar with offset](http://eduardomb.github.io/scroll-up-bar/offset.html)
* [Viewport callbacks](http://eduardomb.github.io/scroll-up-bar/callback.html)

## Installation

Include [jQuery](http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js) and `scroll-up-bar.min.js` scripts:
```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="scroll-up-bar.min.js"></script>
```

[Bower](https://github.com/bower/bower) users can get the source with:

```sh
bower install scroll-up-bar
```

## Basic Usage

Create a top bar using position absolute.
```html
<div id="topbar" style="position: absolute; top: 0; left: 0; width: 100%; background: #ccc;">
  Top bar
</div>
```
_Tip: you can also add top different than zero_

And then invoke `scrollupbar()` on the element.
```javascript
$('#topbar').scrollupbar();
```
_Alternatively you can invoke with `$.scrollupbar($('#topbar'))`_

## Options

You can pass callback functions in initialization to handle bar visibility events.

* `enterViewport` - when the bar enters the viewport
* `fullyEnterViewport` - when the bar is completely in the viewport
* `exitViewport` - when the bar completely leaves the viewport
* `partiallyExitViewport` - when the bar goes from being fully in the viewport to only partially

Checkout the [callback example](http://eduardomb.github.io/scroll-up-bar/callback.html).


## Properties

There are two global boolean properties that are updated according to bar visibility.

* `$.scrollupbar.isInViewport` - true if any part of the bar is visible, false if not
* `$.scrollupbar.isFullyInViewport` - true if the entire bar is visible

## Methods

* `$.scrollupbar.destroy` - restores bar to original position and disables plugin

## Browser support

The plugin was tested on:

* Chrome
* Firefox
* Safari
* Opera
* IE

## Contributing

Read the [Contributing document](CONTRIBUTING.md) for instructions on how to set up your development environment to build and test scroll-up-bar.
