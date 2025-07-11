document.addEventListener('DOMContentLoaded', () => {
    const dropdown = document.querySelector('.nav-item.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropbtn = document.querySelector('.dropbtn'); // The 'Services' link
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const navItems = document.querySelectorAll('.nav-item a'); // All nav links

    // --- Dropdown functionality for mobile ---
    const handleDropdownClick = (e) => {
        // Only prevent default if it's the main dropdown toggle, not a sub-link
        if (e.target === dropbtn || dropbtn.contains(e.target)) {
            e.preventDefault();
        }
        dropdownContent.classList.toggle('show');
        const caretIcon = dropbtn.querySelector('.fas.fa-caret-down');
        if (caretIcon) {
            caretIcon.classList.toggle('fa-rotate-180');
        }
    };

    // Attach/detach event listener based on window size
    const setupDropdownListener = () => {
        if (window.innerWidth <= 768) {
            // Check if listener is already attached to avoid duplicates
            if (!dropbtn.hasAttribute('data-mobile-listener')) {
                dropbtn.addEventListener('click', handleDropdownClick);
                dropbtn.setAttribute('data-mobile-listener', 'true');
            }
        } else {
            // Remove listener if screen size is desktop
            if (dropbtn.hasAttribute('data-mobile-listener')) {
                dropbtn.removeEventListener('click', handleDropdownClick);
                dropbtn.removeAttribute('data-mobile-listener');
                // Ensure dropdown is closed on desktop if it was open from mobile
                dropdownContent.classList.remove('show');
                const caretIcon = dropbtn.querySelector('.fas.fa-caret-down');
                if (caretIcon) {
                    caretIcon.classList.remove('fa-rotate-180');
                }
            }
        }
    };

    // Initial setup
    setupDropdownListener();
    window.addEventListener('resize', setupDropdownListener);


    // --- Mobile Menu (Hamburger) functionality ---
    hamburgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('active'); // Toggles sidebar visibility
        hamburgerMenu.classList.toggle('active'); // For animating hamburger icon
    });

    // Close mobile menu when a nav link is clicked (or dropdown link)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                // Also close dropdown if open and a sub-link was clicked
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                    const caretIcon = dropbtn.querySelector('.fas.fa-caret-down');
                    if (caretIcon) {
                        caretIcon.classList.remove('fa-rotate-180');
                    }
                }
            }
        });
    });

    // --- Active Link highlighting ---
    const highlightActiveLink = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html'; // Gets filename or 'index.html'
        const currentHash = window.location.hash;

        navItems.forEach(item => {
            item.classList.remove('active'); // Remove active from all first

            let linkHref = item.getAttribute('href');
            // Remove current domain/path prefix and potential hash for comparison
            let cleanLink = linkHref.split('/').pop().split('#')[0]; // Get filename or filename#hash
            let linkHash = linkHref.includes('#') ? '#' + linkHref.split('#')[1] : '';


            // Special handling for index.html (home page)
            if (currentPath === 'index.html' && cleanLink === 'index.html') {
                // If it's index.html, check for specific hash sections as well
                if (currentHash && linkHash === currentHash) {
                     item.classList.add('active');
                } else if (!currentHash && linkHash === '') { // If on root index.html with no hash
                    item.classList.add('active');
                } else if (!currentHash && item.getAttribute('href') === 'index.html') {
                    // This handles the primary 'Home' link on the index page without a hash
                     item.classList.add('active');
                }
            }
            // For other pages (book-service.html, contact.html, etc.)
            else if (cleanLink === currentPath) {
                item.classList.add('active');
            }
        });
         // Ensure "Home" is active if no other specific page/hash is active and we are on index.html
        if (currentPath === 'index.html' && !currentHash && !document.querySelector('.nav-item a.active')) {
             document.querySelector('.nav-item a[href="index.html"]').classList.add('active');
        }
    };


    // Run on load and on hash change (for internal index links)
    highlightActiveLink();
    window.addEventListener('hashchange', highlightActiveLink);
    // Also, if someone navigates to a new page, the DOMContentLoaded will re-run on that page.

});
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const navList = document.querySelector('.nav-list');

    hamburgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Close nav when a link is clicked (for mobile)
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });

    // Dropdown functionality (for both desktop and mobile)
    const dropdownBtn = document.querySelector('.nav-item.dropdown .dropbtn');
    const dropdownContent = document.querySelector('.nav-item.dropdown .dropdown-content');

    // Toggle dropdown on click (useful for mobile, doesn't interfere with desktop hover)
    dropdownBtn.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        dropdownContent.classList.toggle('show');
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (!event.target.matches('.dropbtn') && !event.target.matches('.dropdown-content a') && !event.target.closest('.dropdown')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });

    // --- Background Slideshow for Interior Refurbishment Section ---
    const interiorSlideshowImages = document.querySelectorAll('#interior-refurbishment .slideshow-image');
    let currentInteriorImageIndex = 0;

    // Function to show a specific image
    const showInteriorImage = (index) => {
        interiorSlideshowImages.forEach((image, idx) => {
            if (idx === index) {
                image.classList.add('active');
            } else {
                image.classList.remove('active');
            }
        });
    };

    // Function to cycle to the next image
    const nextInteriorImage = () => {
        currentInteriorImageIndex = (currentInteriorImageIndex + 1) % interiorSlideshowImages.length;
        showInteriorImage(currentInteriorImageIndex);
    };

    // Initialize and start slideshow if images exist
    if (interiorSlideshowImages.length > 0) {
        showInteriorImage(currentInteriorImageIndex); // Show the first image immediately

        if (interiorSlideshowImages.length > 1) { // Only start cycling if more than one image
            setInterval(nextInteriorImage, 5000); // Change image every 5 seconds
        }
    }

}); // End of DOMContentLoaded