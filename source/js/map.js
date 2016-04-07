(function() {

    if ( $(".map").size()){

        function initialize() {
            var mapOptions = {
                zoom: 18,
                center: new google.maps.LatLng(59.938039, 30.264719),
                disableDefaultUI: true
            };
            window.map = new google.maps.Map(document.getElementById("map"),
                mapOptions);

            var myLatLng1 = new google.maps.LatLng(59.938182, 30.264384);

            var imageMarker = {
                url: $(".map").data("marker-first"),
                size: new google.maps.Size(44, 60),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(22, 30)
            };

            var imageMarker2 = {
                url: $(".map").data("marker-second"),
                size: new google.maps.Size(44, 60),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(22, 30)
            };

            var beachMarker1 = new google.maps.Marker({
                position: myLatLng1,
                map: window.map,
                icon: imageMarker
            });

            beachMarker1.addListener("mouseover", function () {
                this.setIcon(imageMarker2);
                $("body").addClass("page--cover");
            });

            beachMarker1.addListener("mouseout", function () {
                this.setIcon(imageMarker);
                $("body").removeClass("page--cover");
            });
        }

        if ("google" in window) {
            google.maps.event.addDomListener(window, "load", initialize);
        }

    }

})();