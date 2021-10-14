minutes = 1440
pixelToMinuteRatio = 2/3
isBurgerOpen = false;
isFormOpen = true;
function setRatio() {
    if (window.innerHeight < 800){
        pixelToMinuteRatio = 2/3
    }
}
/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("header").style.paddingLeft = "5px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("header").style.paddingLeft = "60px";
} 

function burger(x) {
    x.classList.toggle("change");
    if (!isBurgerOpen) {
        isBurgerOpen = true;
        openNav();
    }
    else {
        isBurgerOpen = false;
        closeNav();
    }
}

function openForm() {
    document.getElementById("bg-modal").style.display = "flex";
}
  
function closeForm() {
    document.getElementById("bg-modal").style.display = "none";
}

function toggleForm(){
    if (isFormOpen == false){
        isFormOpen = true;
        openForm();
    } else {
        isFormOpen = false;
        closeForm();
    }
}