
$(document).ready(function ($) {
    "use strict";

    jQuery(".filters").on("click", function () {
        jQuery("#menu-dish").removeClass("bydefault_show");
    });
    $(function () {
        var filterList = {
            init: function () {
                $("#menu-dish").mixItUp({
                    selectors: {
                        target: ".dish-box-wp",
                        filter: ".filter",
                    },
                    animation: {
                        effects: "fade",
                        easing: "ease-in-out",
                    },
                    load: {
                        filter: ".all, .breakfast, .lunch, .dinner",
                    },
                });
            },
        };
        filterList.init();
    });

    jQuery(".menu-toggle").click(function () {
        jQuery(".main-navigation").toggleClass("toggled");
    });

    jQuery(".header-menu ul li a").click(function () {
        jQuery(".main-navigation").removeClass("toggled");
    });

    gsap.registerPlugin(ScrollTrigger);

    var elementFirst = document.querySelector('.site-header');
    ScrollTrigger.create({
        trigger: "body",
        start: "30px top",
        end: "bottom bottom",

        onEnter: () => myFunction(),
        onLeaveBack: () => myFunction(),
    });

    function myFunction() {
        elementFirst.classList.toggle('sticky_head');
    }

    var scene = $(".js-parallax-scene").get(0);
    var parallaxInstance = new Parallax(scene);


});


jQuery(window).on('load', function () {
    $('body').removeClass('body-fixed');

    //activating tab of filter
    let targets = document.querySelectorAll(".filter");
    let activeTab = 0;
    let old = 0;
    let dur = 0.4;
    let animation;

    for (let i = 0; i < targets.length; i++) {
        targets[i].index = i;
        targets[i].addEventListener("click", moveBar);
    }

    // initial position on first === All 
    gsap.set(".filter-active", {
        x: targets[0].offsetLeft,
        width: targets[0].offsetWidth
    });

    function moveBar() {
        if (this.index != activeTab) {
            if (animation && animation.isActive()) {
                animation.progress(1);
            }
            animation = gsap.timeline({
                defaults: {
                    duration: 0.4
                }
            });
            old = activeTab;
            activeTab = this.index;
            animation.to(".filter-active", {
                x: targets[activeTab].offsetLeft,
                width: targets[activeTab].offsetWidth
            });

            animation.to(targets[old], {
                color: "#0d0d25",
                ease: "none"
            }, 0);
            animation.to(targets[activeTab], {
                color: "#fff",
                ease: "none"
            }, 0);

        }

    }
});
if (typeof document !== 'undefined') {
    var myCard = document.querySelectorAll(".dish-title");
    console.log(myCard);


    // const nutriList = [1003, 1004, 1005, 1008, 1018, 1057, 1079, 2000, 1092, 1093, 1253, 1264, 1265]


    for (var card of myCard) {

        card.addEventListener("click", cardClick);
        var cardClick = e => {

            var myId = e.target.id;
            console.log(myId);
            // let dish = document.getElementById(myId);
        
    //         let dishName = dish.innerHTML
    //         console.log(dishName);
    //         dishName = '"' + dishName + '"';

    //         // let url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=kqvZi97I2hm9MevWKm8QBKRrVW2e1iTCvZHW3ioQ&query=${dishName}`
    //         // console.log(url);

            if (typeof(Storage) !== "undefined") {

                localStorage.setItem("dishId", myId);
            }

            function Redirect() {
                location.assign("..//Card/card.html");
            }

            Redirect();
            

            // fetch(url).then((response) => response.json()
            //     .then((data) => {

            //         // if (typeof(Storage) !== "undefined") {
            //         //     // Store
            //         //     localStorage.setItem("url", url);
            //         // }

            //         function Redirect() {
            //             location.assign("..//Card/card.html");
            //         }
            //         Redirect();



            //         // function myfun(i) {
            //         //     // console.log(data.foods[0].foodNutrients.length);
            //         //     for (let j = 0; j < data.foods[0].foodNutrients.length; j++) {
            //         //         // console.log(data.foods[0].foodNutrients[j].nutrientId);
            //         //         if (data.foods[0].foodNutrients[j].nutrientId === i) {

            //         //             console.log(data.foods[0].foodNutrients[j].nutrientName, " : ", data.foods[0].foodNutrients[j].value);
            //         //             break;
            //         //         }
            //         //     }
            //         // }

            //         // nutriList.forEach(myfun);
            //     }));
        }
    }






}

