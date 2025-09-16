const prompt = require("prompt-sync")();

const luasPersegiPanjang = function (panjang, lebar) {
    return panjang * lebar;
};

let panjang = parseFloat(prompt('Masukan panjang: '));
let lebar = parseFloat(prompt('Masukan lebar: '));

console.log(`Luas persegi panjang adalah: ${luasPersegiPanjang(panjang, lebar)}`);