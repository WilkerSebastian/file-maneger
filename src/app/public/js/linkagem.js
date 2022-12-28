$(".img-link").on("click", (e) => {

    window.location.href = e.target.getAttribute("alt")

})