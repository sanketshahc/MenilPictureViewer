var links = {
    imageLink1: "https://bit.ly/2rMf896",
    imageLink2: "https://bit.ly/2GCkurM",
    imageLink3: "https://bit.ly/2k6uReQ",
    imageLink4: "https://bit.ly/2k78uGf",
    imageLink5: 'https://bit.ly/2kf0uTF',
    imageLink6: 'https://bit.ly/2x0gLET',
    imageLink7: 'https://bit.ly/2IGmBwU',
    imageLink8: 'https://bit.ly/2LlCMkL',
    imageLink9: 'https://bit.ly/2GDUWL4',
    imageLink10: 'https://bit.ly/2GCbcMA'
};

var thumbDiv = document.querySelectorAll('div')[1];
var linkKeys = Object.keys(links);
var view = document.querySelector("[data-imageview]");
var linkKeysIndex = '';
 
linkKeys.forEach(key => {
    var anchorCreate = document.createElement('a');
    var imgCreate = document.createElement('img');
    anchorCreate.setAttribute('data-thumb','');
    anchorCreate.setAttribute('data-link', links[key]);
    anchorCreate.setAttribute('data-index', key);
    anchorCreate.setAttribute('class','nav-item card d-block');
    imgCreate.setAttribute('src',links[key]);
    imgCreate.setAttribute('class','img-thumbnail');
    anchorCreate.appendChild(imgCreate);
    thumbDiv.appendChild(anchorCreate)
});

// function-event pair for enlarging image
function zoom(event) {
    event.preventDefault();
    var key = event.currentTarget.getAttribute('data-index');
    var url = event.currentTarget.getAttribute('data-link');
    document.querySelector('section').classList.remove('d-none');
    view.setAttribute("src",url);
    view.setAttribute("data-index",key);
    console.log(key);
    linkKeysIndex = linkKeys.indexOf(view.getAttribute('data-index'));
    console.log(linkKeysIndex);
    document.querySelectorAll('[data-arrow]').forEach(element => {element.classList.remove('d-none')}); 
}

// function-event pair for navigating with arrows

function arrowNav(event) {
    event.preventDefault();
    // find the index of the data-index in the object.keys, and then find the next item in object.keys, and find the url from that link. 
    if (event.currentTarget.getAttribute('data-arrow')=='left') {
        if (linkKeysIndex>0) {
            var url = links[linkKeys[linkKeysIndex-1]];
            linkKeysIndex -= 1;
        } else {
            var url = links[linkKeys[linkKeysIndex+linkKeys.length -1]]
            linkKeysIndex = linkKeysIndex+linkKeys.length -1;
        }
    } else if (event.currentTarget.getAttribute('data-arrow')=='right') {
        if (linkKeysIndex<linkKeys.length-1) {
            var url = links[linkKeys[linkKeysIndex+1]];
            linkKeysIndex += 1;
        } else {
            var url = links[linkKeys[0]]
            linkKeysIndex = 0;
        }
    }
    view.setAttribute("src",url);
}

function interact(element, fn) {
    element.addEventListener('click',fn);
} 

document.querySelectorAll('[data-arrow]').forEach(item => {
    interact(item, arrowNav)
});

document.querySelectorAll('[data-thumb]').forEach(item => {
    interact(item, zoom)
});