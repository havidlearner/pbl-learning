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
    
    if (window.innerWidth < 768) {
        //do stuff
    } else {
        //do other stuff
    }
    
});

