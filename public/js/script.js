let currentValue = 0;

// assign random positions to each entity
randomPosition = () => {
    let positionArray = {};

    const min = -20;
    const max = 20;

    let x = (Math.random() * (max - min + 1)) + min;
    let y = (Math.random() * (max - -5 + 1)) + -5;
    let z = (Math.random() * (max - min + 1)) + min;
    positionArray.x = x;
    positionArray.y = y;
    positionArray.z = y;

    return positionArray;
}

// assign random rotations
randomRotation = () => {
    let rotationArray = {};

    const min = 0;
    const max = 90;

    let x = (Math.floor(Math.random() * (max - min + 1)) + min);
    let y = (Math.floor(Math.random() * (max - min + 1)) + min);
    let z = (Math.floor(Math.random() * (max - min + 1)) + min);
    rotationArray.x = x;
    rotationArray.y = y;
    rotationArray.z = z;

    return rotationArray;
}

// make an http request to the URl in question
load = (callback) => {
    let xhr;

    if (typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();

    xhr.onreadystatechange = ensureReadiness;

    function ensureReadiness() {
        if (xhr.readyState < 4) {
            return;
        }
        if (xhr.status !== 200) {
            return;
        }
        // all is well  
        if (xhr.readyState === 4) {
            callback(xhr);
        }
    }
    xhr.open('GET', currentUrl, true);
    xhr.send('');
}

imageFunction = (numberOfImages, div) => {
    // create aframe primitives for images
    // preload them first by appending them to
    // a-assets
    let firstImage = div.getElementsByTagName('img');
    let preloadImages = document.querySelector('a-assets');
    let secondElement = document.querySelector('a-scene');

    for (i = 0; i < numberOfImages; i++) {
        let rawImageSrc = firstImage[i];
        let src = rawImageSrc.src;

        // these image types won't show
        if (src.indexOf("data:image" || "gif" || "svg") <= -1) {
            if (rawImageSrc.width <= 1024 && rawImageSrc.height <= 512) {
                let positionArray = randomPosition();
                let rotationArray = randomRotation();

                let imagePreload = document.createElement('img');
                imagePreload.setAttribute('id', "imageEl" + i);
                imagePreload.setAttribute('crossorigin', 'anonymous');
                imagePreload.setAttribute('src', src);

                let imageEntity = document.createElement('a-image');
                imageEntity.setAttribute('position', positionArray);
                imageEntity.setAttribute('rotation', rotationArray);
                imageEntity.setAttribute('src', "#imageEl" + i)
                imageEntity.setAttribute("scale", "3 2 1");

                preloadImages.appendChild(imagePreload);
                secondElement.appendChild(imageEntity);
            }
        }
    }
}

showResults = (xhr) => {
    let div = document.createElement('div');
    div.innerHTML = xhr.responseText;
    let tags = div.getElementsByTagName('span');

    let firstElement = document.querySelector('a-scene');

    // create an aframe text component for spans and text
    for (i = 0; i < tags.length; i++) {
        let positionArray = randomPosition();

        let textLines = document.createElement('a-text');
        textLines.setAttribute('position', positionArray);
        textLines.setAttribute("value", tags[i].innerText);
        textLines.setAttribute("mixin", "text");
        textLines.setAttribute("class", "myElementLol");
        textLines.setAttribute("font", "/assets/AktivGrotesk2.fnt");
        textLines.setAttribute("fontimage", "#AktivGroteskImg");

        firstElement.appendChild(textLines);
    }

    // change the image number depending whether we're on a page or not
    if (window.location.href.indexOf("page") != -1) {
        imageFunction(20, div);
    }
    else {
        imageFunction(30, div);
    }
}

urls = () => {
    let url = "https://edition.cnn.com/world";
    currentUrl = url;

    load(showResults);
}

urls();


