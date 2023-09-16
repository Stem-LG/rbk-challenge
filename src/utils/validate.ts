export function checkImageDimensions(img) {

    return new Promise((resolve) => {
        const image = new Image();

        image.onload = () => {
            if (image.width <= 1024 && image.height <= 1024) {
                resolve(true); // Image is within the specified dimensions
            } else {
                resolve(false); // Image exceeds the specified dimensions
            }
        };

        image.src = img;
    });
}
