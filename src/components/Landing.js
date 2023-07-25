import React, { useState } from 'react';
import ColorThief from 'colorthief';
import './css/landing.css';

function Landing() {
const [colors, setColors] = useState([]);
const [uploadedImages, setUploadedImages] = useState([]);


const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
    const images = [];
    const promises = [];

    // Create an array of promises to read all the uploaded images
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;
            img.onload = () => {
            images.push({ src: reader.result, colors: analyzeImageColors(img) });
            resolve();
            };
        };
        reader.readAsDataURL(file);
        });
        promises.push(promise);
    }

    // Wait for all promises to resolve and then update the state
    Promise.all(promises).then(() => {
        setUploadedImages(images);
    });
    }
};

const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
    handleImageUpload({ target: { files } });
    }
};

const handleDragOver = (e) => {
    e.preventDefault();
};

const analyzeImageColors = (image) => {
    const colorThief = new ColorThief();
    const colorPalette = colorThief.getPalette(image, 10); // Get the top 5 dominant colors
    const hexColors = colorPalette.map(color => rgbToHex(color[0], color[1], color[2]));
    return hexColors;
};

const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
};

const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

const handleCopyColor = (color) => {
    const textarea = document.createElement('textarea');
    textarea.value = color;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert(`Color "${color}" copied to clipboard!`);
};

return (
    <>
    <div className='made-by'>
        Made By <a target='_blank' href="https://abdulrhmanelsawy.github.io/abdelrhman-elsawy/"> Abdelrhman Elsawy </a>
    </div>
    <section className='landing'>
        <div className='container-fluid'>
        <div className='landing-content'>

            <div className='row'>


                
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                <div className='generalinputs'>

                <div className='another-tools'>
                        <h6> 
                            Another Tools
                        </h6>

                        <a href='https://abdulrhmanelsawy.github.io/PixelWise-Resize/'>
                            Pixelwise resize
                        </a>

                        <a href='https://abdulrhmanelsawy.github.io/FormatFlipper/'>
                            Format Flipper
                        </a>


                    </div>


                    <h1> Chroma Select </h1>

                    
                    </div>

                </div>

                    
            {/* Display the uploaded images and their extracted colors */}
            {uploadedImages.length > 0 && (
            <>
                {uploadedImages.map((image, index) => (
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                        <div className='image-container' key={index}>
                            <img src={image.src} alt={`Uploaded ${index}`}  />
                            <h3 className='color-text'>Extracted Colors:</h3>
                            {image.colors.map((color, colorIndex) => (
                                <>
                            <div
                                key={colorIndex}
                                className='color'
                                style={{ backgroundColor: color, cursor: 'pointer' }}
                                onClick={() => handleCopyColor(color)}
                            />
                                <h3 className='color-text' onClick={() => handleCopyColor(color)}> {color} </h3>
                            </>
                            ))}
                        </div>

                </div>
                ))}
            </>
            )}


    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
        <div
            id='fileInput'
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <input
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            multiple // Allow multiple file selection
            />
        </div>

        </div>

        </div>
        </div>

        </div>
    </section>
    </>
);
}

export default Landing;
    