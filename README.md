# ScrollUpBar Plugin

The scroll up bar plugin (jQuery) hides the top bar when scrolling down, and
show it when scrolling up. It's specially useful on mobile interfaces to save
some precious space.

[Live demo](http://eduardomb.github.io/scroll-up-bar).

## Installation

Include [jQuery](http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js) and `scroll-up-bar.min.js` scripts:
```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="jquery.panelslider.min.js"></script>
```

[Bower](https://github.com/bower/bower) users can get the source with:

```sh
bower install scroll-up-bar
```

## Usage

Create a fixed top bar.
```html
<div id="topbar" style="position: fixed; top: 0; left: 0; width: 100%; background: #ccc;">
  Top bar
</div>
```

and then invoke `scrollupbar()` on the element.
```javascript
$('#topbar').panelslider();
```
