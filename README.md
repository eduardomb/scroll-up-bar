# ScrollUpBar Plugin

The scroll up bar plugin (jQuery) hides the top bar when scrolling down, and
show it when scrolling up. It's specially useful on mobile interfaces to save
some precious space.

[Live demo](http://eduardomb.github.io/scroll-up-bar).

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

## Usage

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

## Browser support

The plugin was tested on:

* Chrome
* Firefox
* Safari
* Opera
* IE

## Contributing

Read the [Contributing document](CONTRIBUTING.md) for instructions on how to set up your development environment to build and test scroll-up-bar.
