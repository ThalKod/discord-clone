/* eslint-disable */

const init = function(){
    if(document.getElementById("profile_photo")){
        const uploader = new Dropzone("#profile_photo",{
            url: "/profile/img",
            maxFiles: 1,
            maxFilesize: 2, // in Mb
        });
        console.log("Create it");
    }
}

document.addEventListener("DOMContentLoaded", init);