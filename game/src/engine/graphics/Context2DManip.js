function applyBrightness(data, brightness, pixel = -1) {
    if (-1 != pixel) {
        data[pixel * 4] += 255 * (brightness / 100);
        data[pixel * 4 + 1] += 255 * (brightness / 100);
        data[pixel * 4 + 2] += 255 * (brightness / 100);
    }
    else {
        for (var i = 0; i < data.length; i += 4) {
            data[i] += 255 * (brightness / 100);
            data[i + 1] += 255 * (brightness / 100);
            data[i + 2] += 255 * (brightness / 100);
        }
    }
}

function truncateColor(value) {
    if (value < 0) {
        value = 0;
    }
    else if (value > 255) {
        value = 255;
    }

    return value;
}

function applyContrast(data, contrast, pixel = -1) {
    if (-1 != pixel) {
        data[pixel * 4] = truncateColor(factor * (data[pixel * 4] - 128.0) + 128.0);
        data[pixel * 4 + 1] = truncateColor(factor * (data[pixel * 4 + 1] - 128.0) + 128.0);
        data[pixel * 4 + 2] = truncateColor(factor * (data[pixel * 4 + 2] - 128.0) + 128.0);
    }
    else {

        var factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));

        for (var i = 0; i < data.length; i += 4) {
            data[i] = truncateColor(factor * (data[i] - 128.0) + 128.0);
            data[i + 1] = truncateColor(factor * (data[i + 1] - 128.0) + 128.0);
            data[i + 2] = truncateColor(factor * (data[i + 2] - 128.0) + 128.0);
        }
    }
}

function invert(data, pixel = -1) {
    if (-1 != pixel) {
        data[pixel * 4] ^= 255;
        data[pixel * 4 + 1] ^= 255;
        data[pixel * 4 + 2] ^= 255;
    }
    else {
        for (var i = 0; i < data.length; i += 4) {
            data[i] ^= 255;
            data[i + 1] ^= 255;
            data[i + 2] ^= 255;
        }
    }
}

function grayscale(data, pixel = -1) {
    if (-1 != pixel) {
        let light = (data[pixel * 4] + data[pixel * 4 + 1] + data[pixel * 4 + 2]) / 3
        data[pixel * 4] = light;
        data[pixel * 4 + 1] = light;
        data[pixel * 4 + 2] = light;
    }
    else {
        for (var i = 0; i < data.length; i += 4) {
            let light = (data[i] + data[i + 1] + data[i + 2]) / 3
            data[i] = light;
            data[i + 1] = light;
            data[i + 2] = light;
        }
    }
}

function mixer(color1, color2, coef) {
    return {
        r: Math.round(color1.r * (1 - coef) + color2.r * coef),
        g: Math.round(color1.g * (1 - coef) + color2.g * coef),
        b: Math.round(color1.b * (1 - coef) + color2.b * coef),
    }
}

function hexaToRGB(hexa) {
    return {
        r: parseInt(hexa.substring(0, 2), 16),
        g: parseInt(hexa.substring(2, 4), 16),
        b: parseInt(hexa.substring(4, 6), 16)
    }
}

function createLinearSpectrum(palette) {
    if (2 > palette.length) {
        console.error("createSpectrum function takes at least 2 colors in its pallette");
        return;
    }

    let nb = palette.length;
    let spectrum = [];

    for (var i = 0; i < 256; i++) {
        let k = Math.floor(i / 256 * (nb - 1));
        spectrum[i] = mixer(palette[k], palette[k + 1], (i / 256 * (nb - 1)) % 1);
    }

    return spectrum;
}

function createSharpSpectrum(palette) {
    if (2 > palette.length) {
        console.error("createSpectrum function takes at least 2 colors in its pallette");
        return;
    }

    let nb = palette.length;
    let spectrum = [];

    for (var i = 0; i < 256; i++) {
        let k = Math.floor(i / 256 * (nb - 1));
        spectrum[i] = palette[k + Math.round((i / 256 * (nb - 1)) % 1)];
    }

    return spectrum;
}

function draw(data, color, pixel = -1) {
    if (-1 != pixel) {
        data[pixel * 4] = color.r;
        data[pixel * 4 + 1] = color.g;
        data[pixel * 4 + 2] = color.b;
    }
    else {
        for (var i = 0; i < data.length; i += 4) {
            data[i] = color.r;
            data[i + 1] = color.g;
            data[i + 2] = color.b;
        }
    }
}

function drawSpectrum(data, spectrum, width, name = "") {
    let a = (name == "") ? 0 : 30;

    for (var i = a; i < a + 30; i++) {
        for (var j = 0; j < 256; j++) {
            draw(data, spectrum[j], width * i + j)
        }
    }
    for (var i = a + 30; i < a + 60; i++) {
        for (var j = 0; j < 256; j++) {
            draw(data, { r: j, g: j, b: j }, width * i + j)
        }
    }
}

export { applyBrightness, applyContrast, invert, grayscale, hexaToRGB, mixer, draw, createLinearSpectrum, createSharpSpectrum, drawSpectrum };
