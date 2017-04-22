/*
In NativeScript, a file with the same name as an XML file is known as
a code-behind file. The code-behind is a great place to place your view
logic, and to set up your page’s data binding.
*/
import { EventData, Observable, fromObject } from "data/observable";
import { Page } from 'ui/page';
import { View } from 'ui/core/view';
import { takePicture } from "nativescript-camera";
import { Image } from "ui/image";
import * as appModule from "application";
import * as imageSourceModule from "image-source";

const options = { width: 300, height: 300, keepAspectRatio: false, saveToGallery: true };
let cameraPermissionReceived = false;

export function navigatingTo(args: EventData) {
    let page = <Page>args.object;
    let picturePath = null;

    page.bindingContext = fromObject({cameraImage: picturePath, saveToGallery: true});
}


export function onTakePictureTap (args: EventData) {

    let page = <Page>(<View>args.object).page;
    let saveToGallery = page.bindingContext.get("saveToGallery");
    takePicture({width: 180, height: 180, keepAspectRatio: false, saveToGallery: saveToGallery}).
        then((imageAsset) => {
            let source = new imageSourceModule.ImageSource();
            source.fromAsset(imageAsset).then((source) => {
                console.log(`Size: ${source.width}x${source.height}`);
            });
            page.bindingContext.set("cameraImage", imageAsset);
        },
        (err) => {
            console.log("Error -> " + err.message);
        });

}
