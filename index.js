const pageMenu = document.querySelector("#page-menu");

pageMenu.addEventListener("change", function() {
    const selectedPage = pageMenu.value;
    
    window.location.href = selectedPage;
})