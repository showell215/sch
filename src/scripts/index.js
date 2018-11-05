'use strict';

var currentlyFocusedNavElement = null,
    contentSections, autoTyper, autoTyperDemo, topBannerElement, showHideNav, navMenu;

function triggerTopBanner (text) {
    topBannerElement.innerText = text;
    topBannerElement.classList.remove('hidden');
    setTimeout(function () {
        topBannerElement.classList.remove('transparent');
        topBannerElement.classList.remove('collapsed');
    }, 200);
    setTimeout(function () {
        topBannerElement.classList.add('transparent');
        topBannerElement.classList.add('collapsed');
        setTimeout(function () {
            topBannerElement.classList.add('hidden');
        }, 200);
    }, 5000);
}
function setNavFocusOnScroll () {
    var elementInView = null;
    [].slice.call(contentSections).forEach(function (contentSection) {
        if (window.scrollY >= (contentSection.offsetTop - window.innerHeight + 80)) {
            elementInView = contentSection;
        }
    });
    if (elementInView) {
        setFocusClassOnNav(document.querySelector('a[href="#' + elementInView.getAttribute('id') + '"]').parentElement);
    }
}

function scrollToSection (that) {
    window.scroll(
        {
            top: document.querySelector(that.querySelector('a').getAttribute('href')).offsetTop,
            behavior: 'smooth'
        }
    );
}

function handleNavSectionClick (event) {
    event.preventDefault();
    scrollToSection(this);
    
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

function closeMobileNav () {
    navMenu.classList.add('transparent'); //TODO check on support here
    setTimeout(function () {
        navMenu.classList.add('collapsed'); //TODO check on support here
        setTimeout(function () {
            navMenu.classList.add('hidden'); //TODO check on support here
        }, 400);
    }, 200);
}

function openMobileNav () {
    navMenu.classList.remove('hidden');
    setTimeout(function () {
        navMenu.classList.remove('collapsed'); //TODO check on support here
        setTimeout(function () {
            navMenu.classList.remove('transparent'); //TODO check on support here
        }, 20);
    }, 200);
}

document.addEventListener('DOMContentLoaded', function () {
    // set timer to close mobile nav menu after scroll completes
    var timer = null;
    window.addEventListener('scroll', function () {
        if (timer !== null) {
            clearTimeout(timer);        
        }
        timer = setTimeout(function () {
            closeMobileNav();
        }, 750);
    });

    navMenu = document.querySelector('.nav-menu');

    var navItems = navMenu.querySelectorAll('.nav-item'),
        copyToClipboardItems = document.querySelectorAll('.copy-to-clipboard');

    showHideNav = document.querySelector('.show-hide-container');
    contentSections = document.querySelectorAll('.content-section');
    topBannerElement = document.querySelector('.top-banner');

    showHideNav.addEventListener('click', function () {
        if (navMenu.classList.contains('transparent')) {
            openMobileNav();
        } else {
            closeMobileNav();
        }
    });
    
    [].slice.call(copyToClipboardItems).forEach(function (copyToClipboardElement) {
        copyToClipboardElement.addEventListener('click', function (e) {
            var textElementToCopy = document.querySelector(this.dataset.textElement);
            if (textElementToCopy) {
                textElementToCopy.select();
            }

            if (document.execCommand('copy')) {
                e.preventDefault();
                triggerTopBanner('"stevenclarkhowell@gmail.com" was copied to the clipboard.', topBannerElement);
            }
        });
    });
    [].slice.call(navItems).forEach(function (navElement) {
        navElement.addEventListener('click', handleNavSectionClick);
    });
    
    autoTyper = new window.AutoTyper({deleteDelay: 2500});
    setTimeout(autoTyper.init.bind(autoTyper), 2000);
    autoTyperDemo = new window.AutoTyper({targetSelector: '#auto-typer-target-2'});
    setTimeout(autoTyperDemo.init.bind(autoTyperDemo), 2000);
    
    window.addEventListener('scroll', setNavFocusOnScroll);

    var year = new Date().getFullYear();
    if (year > 2018) {
        document.querySelector('#present-year').innerText = ' - ' + year;
    }
});
