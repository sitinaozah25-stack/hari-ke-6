const prompt = require("prompt-sync")();

const luasLingkaran = function (jariJari) {
    return 3.14 * jariJari * jariJari;
};

let jariJari = parseFloat(prompt('Masukan jari-jari: '));

console.log(`Luas lingkaran adalah: ${luasLingkaran(jariJari)}`);