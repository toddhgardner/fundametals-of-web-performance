
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

console.table(
  [...document.images].map((img) => {
    const entry = performance.getEntriesByName(img.currentSrc)[0];
    const bytes = (entry?.encodedBodySize * 8);
    const pixels = (img.width * img.height);
    return { src: img.currentSrc, bytes, pixels, entropy: (bytes / pixels) };
  })
)




function task1() {
  task2();
}

function task2() {
  task3();
}

function task3() {
  // something
}


Date.now()
//> 1727181644813

performance.now()
//> 8994.199999988079

performance.timeOrigin
//> 1727181678939.8

performance.timeOrigin + performance.now()
//> 1727181763103.9001



const performanceObserver = new PerformanceObserver((list, observer) => {
  list.getEntries().forEach((entry) => {
    console.log(`Layout shifted by ${entry.value}`);
  })
});
performanceObserver.observe({ type: "layout-shift", buffered: true });


import { onLCP, onCLS, onINP } from "./web-vitals.mjs";

onLCP(console.log);
onCLS(console.log);
onINP(console.log);


import { RM } from "@request-metrics/browser-agent";

RM.install({
  token: "your-app-token",
  /* other settings */
})

const el = document.createElement("script")
el.setAttribute("src", "/otherScript.js");
document.body.appendChild(el);



<picture class="illustration">
  <source media="(max-width: 720px)"
    srcset="/hero-mobile.png?width=360 360w,
            /hero-mobile.png?width=720 720w,
            /hero-mobile.png?width=1440 1440w" />
  <source media="(min-width: 721px)"
    srcset="/hero-desktop.png?width=720 720w,
            /hero-desktop.png?width=1440 1440w,
            /hero-desktop.png?width=2800 2800w">
    <img src="/hero-desktop.png?width=2800"
      alt="Developer Stickers Online"
      fetchpriorty="high"
      height="1200" width="2800" />
</picture>



