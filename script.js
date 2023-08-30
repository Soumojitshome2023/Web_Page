// Typewrite script 

var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};


// --------------------------------------------------------------------------

//  read more script 
function myFunction(btn) {
    var dots = btn.previousElementSibling.querySelector(".dots");
    var moreText = btn.previousElementSibling.querySelector(".more");
    var btnText = btn.innerHTML;

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btn.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btn.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}


// --------------------------------------------------------------------------

//  video lazy load script

document.addEventListener("DOMContentLoaded", function () {
    var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

    if ("IntersectionObserver" in window) {
        var lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (video) {
                if (video.isIntersecting) {
                    for (var source in video.target.children) {
                        var videoSource = video.target.children[source];
                        if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
                            videoSource.src = videoSource.dataset.src;
                        }
                    }

                    video.target.load();
                    video.target.classList.remove("lazy");
                    lazyVideoObserver.unobserve(video.target);
                }
            });
        });

        lazyVideos.forEach(function (lazyVideo) {
            lazyVideoObserver.observe(lazyVideo);
        });
    }
});



// --------------------------------------------------------------------------

//  page load script
document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector(
            "body").style.visibility = "hidden";
        document.querySelector(
            "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
            "#loader").style.display = "none";
        document.querySelector(
            "body").style.visibility = "visible";
    }
};


// --------------------------------------------------------------------------


// active page header link color change script

// Get all the <a> elements inside the navigation
const navLinks = document.querySelectorAll('nav a');

// Function to update the active link based on scroll position
function updateActiveLink() {
    const scrollPosition = window.scrollY;

    // Loop through each section and determine the active link
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
            // Remove the 'active' class from all links
            navLinks.forEach(link => link.classList.remove('active'));

            // Add the 'active' class to the corresponding link
            document.querySelector(`nav a[href="#${sectionId}"]`).classList.add('active');
        }
    });
}

// Add event listener for scroll
window.addEventListener('scroll', updateActiveLink);

// Add event listener for page load
window.addEventListener('load', updateActiveLink);



// --------------------------------------------------------------------------




save("name");
save("email");
save("message");


// =====================Form Submit =====================

function myFormFunction() {
    const scriptURL = 'https://docs.google.com/forms/d/e/1FAIpQLSf9_C8qmYg-Jf23mhKQXKk5T1uCn2CI_GkHFOkkBN3SsgL3nA/formResponse'
    const form = document.forms['submit-to-google-sheet']
    const success = document.getElementById('success');
    form.addEventListener('submit', e => {
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => console.log('Success!', response))


            .catch(error => console.error('Error!', error.message))
    })

    success.style.fontSize = "30px";
    success.style.color = "white";

    document.getElementById("submit-btn").style.display = 'none';
    success.innerHTML = "...Please Wait...";
    setTimeout(() => {

        document.getElementById("message").value = "";

        success.innerHTML = "";
        success.innerHTML = "Data Submit Successfully";
    }, 2000);

    setTimeout(() => {
        success.innerHTML = `Thank you so much ${document.getElementById("name").value}`;
    }, 4000);

    setTimeout(() => {
        // success.innerHTML = "";
        location.reload();

    }, 20000);
}


// ===================Disable submit button===================
var form = document.getElementById("myForm");
var submitButton = document.getElementById("submit-btn");

// Add event listener to the form's submit event
form.addEventListener("submit", function (event) {
    // Prevent the form from submitting
    event.preventDefault();
});

let inputs;
let stat;
let flag;

setInterval(() => {

    flag = true;
    // submitButton.disabled = false;
    // submitButton.disabled = true;

    inputs = form.querySelectorAll("input[required], textarea[required]");

    inputs.forEach(function (input, index) {

        inputs = form.querySelectorAll("input[required], textarea[required]");

        stat = inputs[index].value.trim() !== "";

        if (stat == false) {
            // submitButton.disabled = true;
            flag = false;


        }
    });

    if (flag == false) {
        submitButton.disabled = true;
    }
    else {
        submitButton.disabled = false;

    }


}, 500);




// =========================Form Auto Save=========================


function save(idv) {

    if (localStorage.getItem(idv) != null) {

        let b = document.getElementById(idv);
        b.value = localStorage.getItem(idv);
    }

    setInterval(() => {

        if (document.getElementById(idv).value != localStorage.getItem(idv)) {

            console.log("data update");

            let a = document.getElementById(idv).value;
            localStorage.setItem(idv, a);
        }

    }, 1000);

}


// --------------------------------------------------------------------------