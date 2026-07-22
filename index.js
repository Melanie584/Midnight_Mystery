const pageMenu = document.querySelector("#page-menu");

if (pageMenu) {
    pageMenu.addEventListener("change", function() {
    const selectedPage = pageMenu.value;
    
    window.location.href = selectedPage;
    });
}


const contactForm = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

if(contactForm && successMessage) {
    contactForm.addEventListener("submit", function (event){
        event.preventDefault();

        successMessage.textContent =
        "Thank You! Your message has been recived";

        contactForm.reset();
    });
}