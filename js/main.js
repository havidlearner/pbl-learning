var $html = document.getElementsByTagName ( 'html' )[0],
    page_classes = $html.classList,
    $menu_opener = document.getElementById( 'nav-jump' ),
    $menu_closer = document.getElementById( 'menu-close' );

var drawer_enabled_class = 'drawer-nav-enabled';

function toggleDrawerNav() {
    //toggle the "open" class on the html element
    page_classes.toggle( 'drawer_nav_open' );
}

 // toggle the open class on the html element
var toggleDrawerNav_running = false;
function toggleDrawerNav( event ){
    event.preventDefault();
    
    //check to make sure it's not already running
    if( toggleDrawerNav_running ) { return; }
    
    //block any secondary requests until we're done
    toggleDrawerNav_running = true;
    
    page_classes.toggle( 'drawer_nav_open' );

    
    //timeout after .5 second
    setTimeout(function() { toggleDrawerNav_running = false; }, 500);
}

// Get the active Media Query as defined in the CSS
// https://gist.github.com/aarongustafson/a0558c185264355df359
// Use the following format:
// #getActiveMQ-watcher { font-family: "default"; }
// @media only screen and (min-width:20em){ #getActiveMQ-watcher { font-family: "small"; } }
// etc.
window.getActiveMQ = function() {
      // Build the watcher
  var $watcher = document.createElement('div'),
      // alias getComputedStyle
      computed = window.getComputedStyle,
      // Regexp for removing quotes
      re = /['"]/g;
      
  // set upt the watcher and add it to the DOM
  $watcher.setAttribute( 'id', 'getActiveMQ-watcher' );
  $watcher.style.display = 'none';
  document.body.appendChild( $watcher );
      
  // For modern browsers
  if ( computed )
  {
    window.getActiveMQ = function() {
      return computed( $watcher, null ).getPropertyValue( 'font-family' ).replace( re, '' );
    };
  }
  // For everything else
  else
  {
    window.getActiveMQ = function() {
      return 'unknown';
    };
  }
  return window.getActiveMQ();
};


// resize method borrowed from https://gist.github.com/aarongustafson/4157402

(function( window ){
    window.watchResize = function( callback ){
        var resizing;
        callback.size = 0;
        function done()
        {
            var curr_size = window.innerWidth;
            clearTimeout( resizing );
            resizing = null;
            // only run on a true resize
            if ( callback.size != curr_size )
            {
                callback();
                callback.size = curr_size;
            }
        }
        window.addEventListener('resize', function(){
            if ( resizing )
            {
                clearTimeout( resizing );
                resizing = null;
            }
            resizing = setTimeout( done, 50 );
        });
        // init
        callback();
    };
}(window));

//add class for smaller screen sizes
window.watchResize(function(){
    var current_MQ = window.getActiveMQ();
    
    if (current_MQ == 'small' &&  ! page_classes.contains ( drawer_enabled_class )) {
        //add the event handlers
        $menu_opener .addEventListener( 'click', toggleDrawerNav, false );
        $menu_opener .addEventListener( 'touchdown', toggleDrawerNav, false );
        $menu_closer .addEventListener( 'click', toggleDrawerNav, false );
        $menu_closer .addEventListener( 'touchdown', toggleDrawerNav, false );
        page_classes.add( 'drawer-nav-enabled' );
    } else {
        //remove the event handlers
        $menu_opener .removeEventListener( 'click', toggleDrawerNav, false );
        $menu_opener .removeEventListener( 'touchdown', toggleDrawerNav, false );
        $menu_closer .removeEventListener( 'click', toggleDrawerNav, false );
        $menu_closer .removeEventListener( 'touchdown', toggleDrawerNav, false );
        page_classes.remove( 'drawer-nav-enabled' );
    }
});

