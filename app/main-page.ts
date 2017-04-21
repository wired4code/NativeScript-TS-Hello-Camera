/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/

import { Page } from 'ui/page';
import * as camera from "nativescript-camera";
import { Image } from "ui/image";

const options = { width: 150, height: 150, keepAspectRatio: true, saveToGallery: true };
let myImage;
let cameraPermissionReceived = false;

export function pageLoaded (args) {

    const page = args.object;
    myImage = page.getViewById("myImage");
    myImage.src = "https://placehold.it/150x150";
    page.bindingContext = {};
}

export function onTap () {

    if (!cameraPermissionReceived) {
        openCamera();
        cameraPermissionReceived = true;
        return;
    }

    return camera.isAvailable() ? openCamera() : alert("No device camera");
}

export function openCamera () {
    camera.takePicture(options)
        .then((imageAsset) => {
            console.log("Result is an image asset instance");
            myImage = new Image();
            myImage.src = imageAsset;
        }).catch( err => console.log("Error -> " + err.message))
}
