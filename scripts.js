
function regularOption()
{
    var otherText = document.getElementById('other-text');
    otherText.value="";
    otherText.disabled = true;
}
function otherOption()
{
    var otherText = document.getElementById('other-text')
    otherText.disabled = false;
    otherText.value = "";
}
    // Update the current slider value (each time you drag the slider handle)
function updateValue(val) 
{
    document.getElementById("slider-value").innerText = val;
}


document.addEventListener("DOMContentLoaded", function () {
    // Load navbar from external file
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => 
        {
            document.getElementById("navbar-container").innerHTML = data;

            // Now that navbar is loaded, re-run menu-related scripts
            initializeMenu();
        });

    function initializeMenu() 
    {
        const menuIcon = document.querySelector(".menu-icon");
        const topnavRight = document.querySelector(".topnav-right");

        if (menuIcon && topnavRight) 
        {
            // Toggle mobile menu
            menuIcon.addEventListener("click", function () 
            {
                topnavRight.classList.toggle("active");
            });

            // Close menu when clicking outside
            document.addEventListener("click", function (event) 
            {
                if (!topnavRight.contains(event.target) && !menuIcon.contains(event.target)) 
                {
                    topnavRight.classList.remove("active");
                }
            });
        }
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => 
    {
        anchor.addEventListener("click", function (event) 
        {
            event.preventDefault();
            let target = document.querySelector(this.getAttribute("href"));
            if (target) 
            {
                window.scrollTo({
                    top: target.offsetTop - 20,
                    behavior: "smooth"
                });
            }
        });
    });
    function updateFavicon() 
    {
        const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const favicon = document.querySelector("link[rel='icon']") || document.createElement("link");
    
        favicon.rel = "icon";
        favicon.href = darkMode ? "media/white_logo.png" : "media/logo.png";
        
        document.head.appendChild(favicon);
    }
    
    // Run on page load
    updateFavicon();
    
    // Listen for changes in theme
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateFavicon);

    
    window.countWord = function(id, show) 
    {
        // Get the input text value
        let words = document.getElementById(id).value;
    
        // Initialize the word counter
        let count = 0;
    
        // Split the words on each space character
        let split = words.split(' ');
    
        // Loop through the words and increase the counter
        for (let i = 0; i < split.length; i++) {
            if (split[i] !== "") {
                count += 1;
            }
        }
    
        // Display it as output
        document.getElementById(show).innerHTML = count;
    };
    const form = document.getElementById('voxel-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Send data to the API Gateway endpoint
        const response = await fetch('https://hxz64s4oo7.execute-api.us-east-2.amazonaws.com/dev/submit-form', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json(); 
        if (result.status === 'success') {
            alert('Form submitted successfully!');
            form.reset();
        } else {
            alert('Failed to submit the form. Please try again.');
        }
    });


});
 