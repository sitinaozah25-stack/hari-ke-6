const prompt = require('prompt-sync')();

function kalkulator() {
    let angka1 = parseFloat(prompt('Masukkan angka1: '));
    let angka2 = parseFloat(prompt('Masukkan angka2: '));
    
    console.log('Contoh operasi matematika +, -, *, /');
    let operasi = prompt('Masukkan operasi yang ingin dilakukan: ');
    
    if (operasi === "+") {
        let hasil = angka1 + angka2;
        console.log(`Hasil operasi penjumlahan ${angka1} dengan ${angka2} adalah ${hasil}.`);
        return hasil;
    } else if (operasi === "-") {
        let hasil = angka1 - angka2;
        console.log(`Hasil operasi pengurangan ${angka1} dengan ${angka2} adalah ${hasil}.`);
        return hasil;
    } else if (operasi === "*") {
        let hasil = angka1 * angka2;
        console.log(`Hasil operasi perkalian ${angka1} dengan ${angka2} adalah ${hasil}.`);
        return hasil;
    } else if (operasi === "/") {
        if (angka2 === 0) {
            console.log('Error: Tidak bisa membagi dengan nol!');
            return null;
        }
        let hasil = angka1 / angka2;
        console.log(`Hasil operasi pembagian ${angka1} dengan ${angka2} adalah ${hasil}.`);
        return hasil;
    } else {
        console.log('Error: Operasi tidak valid! Gunakan +, -, *, atau /');
        return null;
    }
}

kalkulator();