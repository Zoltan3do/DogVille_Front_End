/* eslint-disable react/prop-types */
import anime from 'animejs';
import opentype from 'opentype.js';
import { useEffect } from 'react';

function DigitalSign({ name }) {
    useEffect(() => {
        const fontSize = 96;
        const font = 'https://cdn.jsdelivr.net/npm/@fontsource/caveat/files/caveat-latin-400-normal.woff';
        opentype.load(font, (err, font) => {
            if (err) {
                console.error('Font loading error:', err);
                return;
            }
            const textPath = font.getPath(name, 0, fontSize, fontSize);
            const pathData = textPath.toPathData();
            const path = document.querySelector('#signature-path');
            path.setAttribute('d', pathData);
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
            anime({
                targets: path,
                strokeDashoffset: [length, 0],
                duration: 2000,
                easing: 'easeInOutSine',
            });
        });
    }, [name]);

    return (
        <div className='flex justify-center items-center'>
            <svg width="500" height="200" xmlns="http://www.w3.org/2000/svg">
                <path
                    id="signature-path"
                    fill="black"
                    stroke="black"
                    strokeWidth="2"
                />
            </svg>
        </div>

    );
}

export default DigitalSign;
