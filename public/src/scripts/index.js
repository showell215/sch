'use strict';

var currentlyFocusedNavElement = null,
    contentSections, autoTyper;

function setNavFocusOnScroll () {
    var elementInView = null;
    [].slice.call(contentSections).forEach(function (contentSection) {
        if (window.scrollY >= contentSection.offsetTop) {
            elementInView = contentSection;
        }
    });
    if (elementInView) {
        setFocusClassOnNav(document.querySelector('a[href="#' + elementInView.getAttribute('id') + '"]').parentElement);
    }
}

function scrollToSection (event) {
    event.preventDefault();
    window.scroll(
        {
            top: document.querySelector(this.querySelector('a').getAttribute('href')).offsetTop,
            behavior: 'smooth'
        }
    );
}

function setFocusClassOnNav (newFocusedNavElement) {
    if (newFocusedNavElement !== currentlyFocusedNavElement) {
        newFocusedNavElement.classList.add('focused');
        if (currentlyFocusedNavElement) {
            currentlyFocusedNavElement.classList.remove('focused');
        }
        currentlyFocusedNavElement = newFocusedNavElement;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var navMenu = document.querySelector('.nav-menu'),
        navItems = navMenu.querySelectorAll('.nav-item'),
        showHideNav = document.querySelector('.show-hide');
    contentSections = document.querySelectorAll('.content-section');

    showHideNav.addEventListener('click', function () {
        // [].slice.call(navMenu.children).forEach(function (element) {
        //     element.classList.toggle('hidden');
        // })
        if (navMenu.classList.contains('hidden')) {
            navMenu.classList.remove('collapsed'); //TODO check on support here
            setTimeout(function () {
                navMenu.classList.remove('hidden'); //TODO check on support here
            }, 200);
        } else {
            navMenu.classList.add('hidden'); //TODO check on support here
            setTimeout(function () {
                navMenu.classList.add('collapsed'); //TODO check on support here
            }, 200);
        }
    });

    [].slice.call(navItems).forEach(function (navElement) {
        navElement.addEventListener('click', scrollToSection);
    });
    
    autoTyper = new AutoTyper();
    setTimeout(autoTyper.init.bind(autoTyper), 2000);
    
    window.addEventListener('scroll', setNavFocusOnScroll);
});
