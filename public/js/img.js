// <!-- 🔥 Live Image Preview Script 

document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("image");
    const previewImg = document.getElementById("previewImg");

    imageInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            previewImg.src = URL.createObjectURL(file);
        }
    });
});