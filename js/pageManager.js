const pages = document.querySelectorAll(".page");

function showPage(id){

    pages.forEach(page=>{
        page.classList.remove("active");
        page.scrollTop = 0;
    });

    // Force reflow untuk reset scroll
    void document.body.offsetHeight;

    const target = document.getElementById(id);
    target.classList.add("active");
    target.scrollTop = 0;

    window.scrollTo({
        top:0,
        behavior:"instant"
    });

}
