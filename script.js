const loader=document.getElementById('loader');
const imageContainer = document.getElementById("imagecontainer");
let initialCount = 5;
let count=5;
const apiKey = "v01ybHEvR_Hop9q7c1cNruU1HuxscjE8nIKUrvHDNZ8";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let photosArray = [];
let ready=false;
let imagesLoaded=0;
let totalImages=0;
const setAttributes = (element, attributes) => {
  Object.keys(attributes).map((key) =>
    element.setAttribute(key, attributes[key])
  );
};
// check if all images are loaded
const imageLoaded=()=>{
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded===totalImages){
    ready=true;
   count=30;
   apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
loader.hidden=true;
    console.log(ready);
    }
    
}
//Create elements for links and photos, add to DOM
const displayPhotos = () => {
    //  totalImages array to  fetched photos length
    totalImages=photosArray.length;
  photosArray.map((photo) => {
    const item = document.createElement("a");
    const img = document.createElement("img");
    setAttributes(item, { href: photo.links.html, target: "_blank" });
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // img.setAttribute("src", photo.urls.regular);
    // img.setAttribute("alt", photo.alt_description);
    // img.setAttribute("title", photo.alt_description);
    img.addEventListener('load',imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
};
//Get photos from Unsplash API
const getPhotos = async () => {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    console.log(error);
  }
};
//check to see if scrolling near bottom of page and all images have been loaded, load more photos
window.addEventListener('scroll',()=>{
    if (window.innerHeight+window.scrollY>=document.body.offsetHeight-1000&&ready){
        imagesLoaded=0;
        ready=false;
    getPhotos();
    console.log('load');
}
})
//get photos onload
getPhotos();
