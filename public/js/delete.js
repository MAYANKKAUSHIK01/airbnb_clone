const deleteForms = document.querySelectorAll(".delete");

deleteForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (confirm("Do you want to delete this message?")) {
            form.submit();
        }
    });
});
