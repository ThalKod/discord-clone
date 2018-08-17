/* eslint-disable */

// const init = function(){
//     if(document.getElementById("group_photo")){
//         const uploader = new Dropzone("#group_photo",{
//             url: `/channel/${channelID}/img`,
//             maxFiles: 1,
//             maxFilesize: 2, // in Mb
//             acceptedFiles: 'image/*',
//         });

//         uploader.on("sending", function(file) {
//             console.log("sending file...");
//         });

//         uploader.on("success", function(file) {
//             const img = document.getElementById("group_photo_img");
//             const response = JSON.parse(file.xhr.response);
//             img.src = response.path;
//         });
//     }
// }

// document.addEventListener("DOMContentLoaded", init);