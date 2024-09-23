
window.addEventListener("DOMContentLoaded", (evt) => {
  console.log(`DOMContentLoaded at ${evt.timeStamp} ms`);
});

//> DOMContentLoaded at 1807.4000000059605 ms


window.addEventListener("load", (evt) => {
  console.log(`Load at ${evt.timeStamp} ms`);
});

//> Load at 17117 ms

/**
 * Get the Cart Items and update the item count in the header.
 * jQuery Syntax like it's 2008
 */
$(document).ready(function () {
  $.ajax("/cart", {
    complete: function (data) {
      $("#cart-count").val(data.length)
    }
  });
});


<html>
  <body>
    <div id="app"></div>
    <script>
      $(document).ready(function() {
        define('application.js', function (app) {
          app.initialize("#app");
        })
      })
    </script>
  </body>
</html>





