
     var var_menus=new Array();
     var var_content_items=new Array();
     var var_shift_x=new Array();
     var var_shift_y=new Array();
     var var_window_width = 630;
     var var_window_height = 460;
     var var_scrollbar_width=24;

//     alert("dynamics.js");
     
     function body_on_load()
      {
//        alert("body_on_load");
       window.addEventListener('resize', on_resize);
        
       var_scrollbar_width=getScrollbarWidth();

       calculate_window_size();

       var elems = document.getElementsByTagName('*'), i;
       
       for (i in elems) 
        {
         if( (' ' + elems[i].className + ' ').indexOf(' ' + 'dynamic_container' + ' ') > -1 ) 
          {
           var_menus.push(elems[i]);
           var_shift_x.push(random_sign());
           var_shift_y.push(random_sign());
           
           elems[i].style.left=Math.floor(Math.random()*(var_window_width-elems[i].offsetWidth))+"px";
           elems[i].style.top=Math.floor(Math.random()*(var_window_height-elems[i].offsetHeight))+"px";
           
            var child_elems = elems[i].getElementsByTagName('*'), y;
           
            for (y in child_elems) 
             {
              if( (' ' + child_elems[y].className + ' ').indexOf(' ' + 'dynamic_content' + ' ') > -1 ) 
               {
                var_content_items.push(child_elems[y]);
               }
             }

          }
        }     

          
       setInterval(move, 30);
      }
      
     function random_sign()
      {
       return 1-2*(Math.floor(Math.round(Math.random())));
      }
      
      function calculate_window_size()
       {
        var_window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var_window_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        var_window_width = var_window_width-(getSBLive(window)[1] ? var_scrollbar_width : 0 );
        var_window_height = var_window_height-(getSBLive(window)[0] ? var_scrollbar_width: 0 );
       }
      
      function on_resize()
       {
//         alert("on_resize");
//        calculate_window_size();
        setTimeout(calculate_window_size,10);
       }
      
function getScrollbarWidth() {
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
}      

  // check current presence of H & V scrollbars
  // @return array [ Boolean, Boolean ]
  function getSBLive(w) {
    var d = w.document, c = d.compatMode;
    r = c && /CSS/.test(c) ? d.documentElement : d.body;
    if (typeof w.innerWidth == 'number') {
      // incredibly the next two lines serves equally to the scope
      // I prefer the first because it resembles more the feature
      // being detected by its functionality than by assumptions 
      return [ w.innerHeight > r.clientHeight, w.innerWidth > r.clientWidth ];
      return [ w.innerWidth > r.clientWidth, w.innerHeight > r.clientHeight ];
    } else {
      return [ r.scrollWidth > r.clientWidth, r.scrollHeight > r.clientHeight ];
    }
  }

      
     function move()
      {
       var var_current_right; 
       var var_current_bottom; 
       var var_current_item;
       var var_items_number;
       
       var_items_number=var_menus.length;
       
       for (var i = 0; i < var_items_number; i++) 
        {
         var_current_item=var_menus[i];
         
         var_current_right = var_current_item.offsetLeft + var_content_items[i].offsetWidth;
//         var_current_right = var_current_item.offsetLeft + var_current_item.offsetWidth;
         var_current_bottom = var_current_item.offsetTop + var_current_item.offsetHeight;
         
         if( ( var_current_right >= var_window_width )&&(var_current_item.offsetLeft  > 0) )
          var_shift_x[i]=-1;
          else
           if( ( var_current_item.offsetLeft  <= 0 ) && ( var_current_right < var_window_width ) )
            var_shift_x[i]=1;
             else
              if( ( var_current_item.offsetLeft  <= 0 ) && ( var_current_right >= var_window_width ) )
               var_shift_x[i]=0;

         if( ( var_current_bottom >= var_window_height )&&(var_current_item.offsetTop  > 0) )
          var_shift_y[i]=-1;
          else
           if( ( var_current_item.offsetTop  <= 0 ) && ( var_current_bottom < var_window_height ) )
            var_shift_y[i]=1;
             else
              if( ( var_current_item.offsetTop  <= 0 ) && ( var_current_bottom >= var_window_height ) )
               var_shift_y[i]=0;

              
         var_current_item.style.left=parseInt(var_current_item.style.left)+var_shift_x[i]+"px";   
         var_current_item.style.top=parseInt(var_current_item.style.top)+var_shift_y[i]+"px";
        }
        
      }
     
     
