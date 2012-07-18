REQUIREMENTS - Be sure to include these files above jquery.pingrid :
* JQuery (http://jquery.com/)
* Undersore JS (https://github.com/documentcloud/underscore/)
* ImagesLoaded (https://github.com/desandro/imagesloaded/)

PinGrid
=======

PinGrid is a simple Pinterest Inspired jQuery plugin for rendering html dom elements in a html dom container elements in the vertically staggered Pinterest style.

First you need a container element that has a width, and position:[relative|absolute].
```html
<style>
  #container {
    width:600px;
    position:relative;
    border:1px solid #000;
  }
</style>

<div id="container"></div>
```

Next, you will need the elements that will be placed in your container.  If the elements are pre-rendered in your container, you can simply set:

```javascript
 var boxes = $(".<element-class>",".<container-class>")
```

In the example below, we generate random box elements in a for loop for demo purposes.
```javascript
//generate random boxes
var boxes = [];
for(var i=0; i<50; i++) {
  var newBox = $("<div></div>");
  newBox.css({
    border: "1px solid #ccc",
    height: (Math.round((Math.random()*100)) + 100)+"px" //random height
  });
  boxes.push(newBox);
}
```

Once things are in place, you can initialize pingrid as follows
```javascript
// initialize pingrid
$("#container").pinGrid("initialize",{
  colPadLeft: 4,
  colPadRight: 4,
  boxMarginTop: 8
});
```

Here is a list of initialization parameters that can be included:
* numCols: //The number of columns you want your grid to have, default:4
* colPadLeft: //Pixel padding to the left of each column, default:4px
* colPadRight: //Pixel padding to the right of each column, default:4px
* boxMarginTop: //Top pixel padding for each box elemenet in the container, default:8px


Now, simply add your first set of elements to the grid. NOTE: The elements you are adding MUST be in an array.
```javascript
//add elements to the grid
$("#container").pinGrid("append", {collection:boxes});
```
﻿
You can continue to add elements to the pingrid by making subsequent calls to append, just as you did the first time.

[See it in Action!](http://mgauthier.github.com/pingrid/demo.html)