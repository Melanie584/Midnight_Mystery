const pageMenu = document.querySelector("#page-menu");

pageMenu.addEventListener("change", function() {
    const selectedPage = pageMenu.value;
    
    window.location.href = selectedPage;
})
function startGame() {
  const nameInput = document.getElementById("playerName").value.trim() || "Guest";
  
  window.location.href = `detective.html?name=${encodeURIComponent(nameInput)}`;
}