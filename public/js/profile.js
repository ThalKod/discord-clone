/* eslint-disable */

const init = function(){
    if(document.getElementById("profile_photo")){
        const uploader = new Dropzone("#profile_photo",{
            url: "/profile/img",
            maxFiles: 1,
            maxFilesize: 2, // in Mb
            acceptedFiles: 'image/*',
        });
        console.log("Create it");

        uploader.on("sending", function(file) {
            console.log("sending file...");
        });
    }
}

document.addEventListener("DOMContentLoaded", init);