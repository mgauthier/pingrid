(function( $ ) {
var methods = {
  initialize: function ( options ) {
    $(this).data('pingrid', $.extend({
      minCol:0,
      maxCol:0,
      numColsFunc: function(){ var width = $(document).width(); return (width > 815 ? 4 : (width > 615 ? 3 : 2)); },
      numCols: 4,
      colPadLeft: 4,
      colPadRight: 4,
      boxMarginTop: 8,
      colHeights: [],
      collection: []
    },options));

    var numCols = $(this).data('pingrid').numColsFunc ? $(this).data('pingrid').numColsFunc() : $(this).data('pingrid').numCols;
    for(var i = 0; i < numCols; i++) {
      $(this).data('pingrid').colHeights[i] = 0;
    }
    $(this).empty();

    if(options.fluid) {
      var self = this;
      $(window).smartresize(function(){ methods[ "refresh" ].apply( self ) });
    }
  },
  //append items to collection and position only those items
  append: function( options ) {
    //add elements to overall collection
    for(var i=0; i< options.collection.length; i++) {
      $(this).data('pingrid').collection.push(options.collection[i]);
    }
    //add elements to container
    for(var i=0; i<options.collection.length; i++) {
      $(options.collection[i]).appendTo($(this));
    }
    methods[ "position_elements" ].apply( this, [{collection:options.collection}]);
  },
  //reposition all elements in data collection
  refresh: function() {
    $(this).data('pingrid').colHeights = [];
    $(this).data('pingrid').minCol = 0;
    var numCols = $(this).data('pingrid').numColsFunc ? $(this).data('pingrid').numColsFunc() : $(this).data('pingrid').numCols;
    for(var i = 0; i < numCols; i++) {
      $(this).data('pingrid').colHeights[i] = 0;
    }
    methods[ "position_elements" ].apply( this, [{collection:$(this).data('pingrid').collection}]);
  },
  position_elements: function( options ) {
    var numCols = $(this).data('pingrid').numColsFunc ? $(this).data('pingrid').numColsFunc() : $(this).data('pingrid').numCols;
    var collection = options.collection;
    var container = this;
    var containerWidth = container.width();
    var colWidth = Math.floor(containerWidth / numCols);

    for(var i = 0; i < collection.length; i++) {
      var xPos = $(this).data('pingrid').minCol * colWidth;
      var yPos = $(this).data('pingrid').colHeights[$(this).data('pingrid').minCol];

      var newBox = collection[i];
      var w = colWidth - $(this).data('pingrid').colPadLeft - $(this).data('pingrid').colPadRight;

      $(newBox).css({
        width:w+"px",
        position:"absolute",
        left:xPos+$(this).data('pingrid').colPadLeft,
        top:yPos+$(this).data('pingrid').boxMarginTop,
        float:"none",
        opacity:1,
        visibility:"visible"
      });

      //add new box height to current col
      $(this).data('pingrid').colHeights[$(this).data('pingrid').minCol] += $(newBox).height()+$(this).data('pingrid').boxMarginTop;
      //find new minCol and maxCol
      for(var k = 0; k < numCols; k++) {
        if($(this).data('pingrid').colHeights[k] < $(this).data('pingrid').colHeights[$(this).data('pingrid').minCol]) {
          $(this).data('pingrid').minCol = k;
        }
        if($(this).data('pingrid').colHeights[k] > $(this).data('pingrid').colHeights[$(this).data('pingrid').maxCol]) {
          $(this).data('pingrid').maxCol = k;
        }
      }
    }

    //set height of container since collection items are positioned absolute
    $(container).css( "height", $(this).data('pingrid').colHeights[$(this).data('pingrid').maxCol]+"px");
  }
};

// Method calling logic
$.fn.pinGrid = function(method) {
  if ( methods[method] ) {
    return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
  } else if ( typeof method === 'object' || ! method ) {
    return methods.init.apply( this, arguments );
  } else {
    $.error( 'Method ' +  method + ' does not exist on jQuery.pinGrid' );
  }
  return this;
};
})( jQuery );