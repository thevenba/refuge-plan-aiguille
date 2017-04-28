$(document).ready(function () {
    /***** BEGIN: SCROLL *****/
    /*
     * On anime la redirection au clique sur les liens internes
     */
    $('a[href*=#section]').on('click', function (e) {
        if (this.hash !== "") {
            e.preventDefault();
            var hash = this.hash;
            $('html, body').animate({scrollTop: $($(this).attr('href')).offset().top - 52}, 1200, function () {
                window.location.hash = hash;
            });
        }
    });

    /*
     * On anime les sections au scroll de la fenetre
     */
    $(window).scroll(function () {
        if ($(document).scrollTop() > $("#section-about").offset().top - 53) {
            $("#header").removeClass("alt");
            $("#nav").addClass("w3-card-8");
        } else {
            $("#header").addClass("alt");
            $("#nav").removeClass("w3-card-8");
        }

        if ($(document).scrollTop() > $("#section-about").offset().top / 2) {
            $("#section-intro > div").addClass("hidden");
        } else {
            $("#section-intro > div").removeClass("hidden");
        }

        if ($(document).scrollTop() < $("#section-about").offset().top / 2 || $(document).scrollTop() > $("#section-about").offset().top + $("#section-about").offset().top / 2) {
            $("#section-about > div").addClass("hidden");
        } else {
            $("#section-about > div").removeClass("hidden");
        }

        if ($(document).scrollTop() < $("#section-about").offset().top + $("#section-about").offset().top / 2 || $(document).scrollTop() > $("#section-menu").offset().top + $("#section-about").offset().top / 2) {
            $("#section-menu > div").addClass("hidden");
        } else {
            $("#section-menu > div").removeClass("hidden");
        }

        if ($(document).scrollTop() < $("#section-menu").offset().top + $("#section-about").offset().top / 2) {
            $("#section-gallery > div").addClass("hidden-bottom");
        } else if ($(document).scrollTop() > $("#section-gallery").offset().top + $("#section-about").offset().top / 2) {
            $("#section-gallery > div").addClass("hidden-top");
        } else {
            $("#section-gallery > div").removeClass("hidden-bottom");
            $("#section-gallery > div").removeClass("hidden-top");
        }

        if ($(document).scrollTop() < $("#section-gallery").offset().top + $("#section-about").offset().top / 2) {
            $("#section-contact > div").addClass("hidden");
        } else {
            $("#section-contact > div").removeClass("hidden");
        }
    });
    /***** END: SCROLL *****/

    /***** BEGIN: PARALLAX *****/
    $('#section-intro').parallax("center", 0.1, true);
    $('#section-about').parallax("center", 0.4, true);
    $('#section-menu').parallax("center", 0.2, true);
    $('#section-gallery').parallax("center", 0.1, true);
    /***** END: PARALLAX *****/

    // On appelle le carousel
    $('.carousel').carousel();

    // On insert l'année actuelle
    $('span.year').text(new Date().getFullYear());
    // On insert l'année prochaine
    $('span.next-year').text(new Date().getFullYear() + 1);

});

/*
 * La fonction qui affiche le menu de navigation
 */
function openNav() {
    var x = document.getElementById("sidenav");
    var openNav = document.getElementById("open-nav");
    console.log(openNav.firstElementChild);
    if (x.className.indexOf("show") == -1) {
        x.className += " show";
        openNav.firstElementChild.style.transform = "translateY(8px) rotate(45deg)";
        openNav.children[1].style.opacity = "0";
        openNav.lastElementChild.style.transform = "translateY(-8px) rotate(-45deg)";
    } else {
        x.className = x.className.replace(" show", "");
        openNav.firstElementChild.style.transform = "rotate(0deg)";
        openNav.children[1].style.opacity = "1";
        openNav.lastElementChild.style.transform = "rotate(0deg)";
    }
}

/***** BEGIN: LIGHTBOX *****/
/*
 * La foction qui affiche la lightbox
 */
function openModal() {
    document.getElementById('lightbox').style.display = "block";
}

/*
 * La fonction qui cache la lightbox
 */
function closeModal() {
    document.getElementById('lightbox').style.display = "none";
}

// L'index du slide
var slideIndex = 1;
showDivs(slideIndex);

/*
 * La fonction qui augmente d'un nombre l'index du slide
 * @param n le nombre
 */
function plusDivs(n) {
    showDivs(slideIndex += n);
}

/*
 * La fonction qui affiche le slide actuel
 * @param n l'index du slide actuel
 */
function currentDiv(n) {
    showDivs(slideIndex = n);
}

/*
 * La fonction qui affiche un slide et cache les autres
 * @param n l'index du slide affiché
 */
function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > x.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = x.length;
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-opacity-off", "");

    }
    x[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " w3-opacity-off";
    captionText.innerHTML = dots[slideIndex - 1].alt;
}
/***** END: LIGHTBOX *****/

/*
 * La fonction qui affiche la route cliquée et cache toutes les autres
 * Et enleve les bordures des boutons sauf le bouton actif
 * @param evt le bouton actif
 * @param routeName la route cliquée
 */
function openRoute(evt, routeName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("route");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("route-tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-border-theme", "");
    }
    document.getElementById(routeName).style.display = "block";
    evt.currentTarget.className += " w3-border-theme";
}