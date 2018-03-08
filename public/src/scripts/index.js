'use strict';

var currentlyFocusedNavElement = null,
    contentSections, typingWidget;

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
    var navItems = document.querySelectorAll('.nav-item');
    contentSections = document.querySelectorAll('.content-section');
    // currentlyFocusedNavElement = document.querySelector('a[href="#introduction"]').parentElement;

    [].slice.call(navItems).forEach(function (navElement) {
        navElement.addEventListener('click', scrollToSection);
    });
    
    typingWidget = new TypingWidget();
    setTimeout(typingWidget.init.bind(typingWidget), 2000);
    
    window.addEventListener('scroll', setNavFocusOnScroll);
});
