$( function () {
    $('img.screenfull').on("click", function () {
        if (screenfull.enabled) {
            // We can use `this` since we want the clicked element
            screenfull.toggle(this);
        }
    });
});
