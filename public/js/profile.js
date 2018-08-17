/* eslint-disable */

const init = function(){

    if(document.getElementById("profile_photo")){
        const uploader = new Dropzone("#profile_photo",{
            url: "/profile/img",
            maxFiles: 1,
            maxFilesize: 2, // in Mb
            acceptedFiles: 'image/*',
        });

        uploader.on("sending", function(file) {
            console.log("sending file...");
        });

        uploader.on("success", function(file) {

            const img = document.getElementById("profile_photo_img");
            const response = JSON.parse(file.xhr.response);
            img.src = response.path;
        });
    }

    if(document.getElementById("group_photo")){
        const input = document.getElementById("group_photo");
        const preview = document.getElementById("group_photo_img");

        input.addEventListener('change', ()=>{
            const currFiles = input.files;
            if(currFiles.length !== 0){
                preview.src = window.URL.createObjectURL(currFiles[0]);
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", init);