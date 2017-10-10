export function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }) 
}

// function showPosition(position) {
//     var position = `${position.coords.latitude}, ${position.coords.longitude}`;
//     return position;
//     alert(`${position.coords.latitude}, ${position.coords.longitude}`);
      
// }
