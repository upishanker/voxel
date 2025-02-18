document.addEventListener("DOMContentLoaded", function () {
    // Load navbar from external file
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;

            // Now that navbar is loaded, re-run menu-related scripts
            initializeMenu();
        });

    function initializeMenu() {
        const menuIcon = document.querySelector(".menu-icon");
        const topnavRight = document.querySelector(".topnav-right");

        if (menuIcon && topnavRight) {
            // Toggle mobile menu
            menuIcon.addEventListener("click", function () {
                topnavRight.classList.toggle("active");
            });

            // Close menu when clicking outside
            document.addEventListener("click", function (event) {
                if (!topnavRight.contains(event.target) && !menuIcon.contains(event.target)) {
                    topnavRight.classList.remove("active");
                }
            });
        }
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (event) {
            event.preventDefault();
            let target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });
    function updateFavicon() {
        const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
    
        favicon.rel = "icon";
        favicon.href = darkMode ? "white_logo.png" : "logo.png";
        
        document.head.appendChild(favicon);
    }
    
    // Run on page load
    updateFavicon();
    
    // Listen for changes in theme
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateFavicon);
    
});
