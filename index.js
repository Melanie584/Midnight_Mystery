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
function startGame() {
  const nameInput = document.getElementById("playerName");
  const name = nameInput ? nameInput.value.trim() : "";
  
  if (name) {
    window.location.href = `detective.html?name=${encodeURIComponent(name)}`;
  } else {
    window.location.href = "detective.html";
  }
}