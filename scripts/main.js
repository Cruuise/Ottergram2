var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail'
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;
var thumnail_index = 0;


function setDetails(imageURL, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageURL);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb, index) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        //setIndexOfCurrentlyDisplayedImage(index);
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

// function resetbutton(){
//     var button_left = document.getElementsByClassName("btn-left")[0];
//     var button_right = document.getElementsByClassName("btn-right")[0];
//     button_left.disabled = false;
//     button_left.style.color = white;
//     button_left.style.backgroundColor = rgb(96, 125, 139);
//     // button_right.disabled = false;
//     // button_right.style.color = white;
//     // button_right.style.backgroundColor = rgb(96, 125, 139);
// }

function addNextHandler() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    if (thumnail_index == thumbnails.length - 1) {
        //greyButton("right");
        return;
    }
    //resetbutton();
    thumnail_index += 1;
    setDetailsFromThumb(thumbnails[thumnail_index]);
    showDetails();

}

function addPreviousHandler() {
    'use strict';
    if (thumnail_index == 0) {
        //greyButton("left");
        return;
    }
    //resetbutton();
    thumnail_index -= 1;
    var thumbnails = getThumbnailsArray();
    setDetailsFromThumb(thumbnails[thumnail_index]);
    showDetails();
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS)
}

function showDetails() {
    'use strict';

    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    //frame.classList.remove(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPresshandler() {
    'use strict'
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keyCode);
        if (event.keyCode == ESC_KEY) {
            hideDetails();
        }
    });
}

// function greyButton(position){
//     if(position == "left"){
//         var button = document.getElementsByClassName("btn-left")[0].style;
//         document.getElementsByClassName("btn-left")[0].disabled = true;
//         button.color="black";
//         button.backgroundColor="grey";
//     }
//     else if(position == "right"){
//         var button = document.getElementsByClassName("btn-right")[0].style;
//         document.getElementsByClassName("btn-right")[0].disabled = true;
//         button.color="black";
//         button.backgroundColor="grey";
//     }
// }

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPresshandler();
    //greyButton("left");
}

initializeEvents();