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

  var elementFirst = document.querySelector(".site-header");
  ScrollTrigger.create({
    trigger: "body",
    start: "30px top",
    end: "bottom bottom",

    onEnter: () => myFunction(),
    onLeaveBack: () => myFunction(),
  });

  function myFunction() {
    elementFirst.classList.toggle("sticky_head");
  }

  var scene = $(".js-parallax-scene").get(0);
  var parallaxInstance = new Parallax(scene);
});

jQuery(window).on("load", function () {
  $("body").removeClass("body-fixed");

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
    width: targets[0].offsetWidth,
  });

  function moveBar() {
    if (this.index != activeTab) {
      if (animation && animation.isActive()) {
        animation.progress(1);
      }
      animation = gsap.timeline({
        defaults: {
          duration: 0.4,
        },
      });
      old = activeTab;
      activeTab = this.index;
      animation.to(".filter-active", {
        x: targets[activeTab].offsetLeft,
        width: targets[activeTab].offsetWidth,
      });

      animation.to(
        targets[old],
        {
          color: "#0d0d25",
          ease: "none",
        },
        0
      );
      animation.to(
        targets[activeTab],
        {
          color: "#fff",
          ease: "none",
        },
        0
      );
    }
  }
});

if (typeof Storage !== "undefined") {
  // Retrieve
  var retrieve = localStorage.getItem("dishId");
}
fetch("../database.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var retrieve = localStorage.getItem("dishId");

    const tableBody = document.querySelector("tbody");
    console.log(data.dataArr[retrieve - 1].itemId);
    console.log(data.dataArr[retrieve - 1].nutritionInfo);
    keys = Object.keys(data.dataArr[retrieve - 1].nutritionInfo);
    console.log(keys);
    var nutriList = [2400, 130, 56, 65, 29, 160, 36, 24, 400, 1500, 28];
    for (key in keys) {
      var rdaValue = (
        (data.dataArr[retrieve - 1].nutritionInfo[keys[key]] * 100) /
        nutriList[key]
      ).toFixed(2);
      if (rdaValue <= 20 || key < 3) {
        tableBody.innerHTML += `<tr>
                                    <td>${keys[key]}</td>
                                    <td>${
                                      data.dataArr[retrieve - 1].nutritionInfo[
                                        keys[key]
                                      ]
                                    }</td>
                                    <td id="rda">${rdaValue}</td>
                                </tr>`;
      } else {
        tableBody.innerHTML += `<tr class="danger">
                                    <td>${keys[key]}</td>
                                    <td>${
                                      data.dataArr[retrieve - 1].nutritionInfo[
                                        keys[key]
                                      ]
                                    }</td>
                                    <td>${rdaValue}</td>
                                </tr>`;
      }
    }

    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
    const productImage = document.getElementById("productImage");
    const productName = document.getElementById("prodName");
    const ingredients = document.getElementById("ingr");

    newProductName = data.dataArr[retrieve - 1].name;
    newProductName = toTitleCase(newProductName);
    productName.innerHTML = `${newProductName}`;
    ingredients.innerHTML = `<b>Ingredients:</b> ${
      data.dataArr[retrieve - 1].ingredients
    }`;
    productImage.src =
      "../assets/images/dish/" + data.dataArr[retrieve - 1].itemId + ".jpg";
  });
