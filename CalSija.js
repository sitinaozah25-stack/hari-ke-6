// Fungsi untuk mengkonversi suhu
function konversiSuhu() {
    // Mengambil nilai dari input
    const inputSuhu = parseFloat(document.getElementById('inputSuhu').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const hasilDiv = document.getElementById('hasil');
    
    // Validasi input
    if (isNaN(inputSuhu)) {
        tampilkanError('Error: Mohon masukkan angka yang valid!');
        return;
    }
    
    // Cek jika unit asal dan tujuan sama
    if (fromUnit === toUnit) {
        tampilkanHasil(inputSuhu, fromUnit, inputSuhu, toUnit);
        return;
    }
    
    try {
        // Konversi suhu
        const hasil = hitungKonversiSuhu(inputSuhu, fromUnit, toUnit);
        tampilkanHasil(inputSuhu, fromUnit, hasil, toUnit);
    } catch (error) {
        tampilkanError('Error: ' + error.message);
    }
}

// Fungsi untuk melakukan perhitungan konversi suhu
function hitungKonversiSuhu(suhu, dari, ke) {
    // Konversi ke Celsius terlebih dahulu (sebagai base)
    let celsius;
    
    switch (dari) {
        case 'celsius':
            celsius = suhu;
            break;
        case 'fahrenheit':
            celsius = (suhu - 32) * 5/9;
            break;
        case 'kelvin':
            if (suhu < 0) {
                throw new Error('Suhu Kelvin tidak boleh kurang dari 0K');
            }
            celsius = suhu - 273.15;
            break;
        case 'rankine':
            if (suhu < 0) {
                throw new Error('Suhu Rankine tidak boleh kurang dari 0°R');
            }
            celsius = (suhu - 491.67) * 5/9;
            break;
        case 'reamur':
            celsius = suhu * 5/4;
            break;
        default:
            throw new Error('Unit suhu tidak valid');
    }
    
    // Konversi dari Celsius ke unit tujuan
    let hasil;
    switch (ke) {
        case 'celsius':
            hasil = celsius;
            break;
        case 'fahrenheit':
            hasil = (celsius * 9/5) + 32;
            break;
        case 'kelvin':
            hasil = celsius + 273.15;
            if (hasil < 0) {
                throw new Error('Hasil konversi menghasilkan suhu di bawah nol absolut');
            }
            break;
        case 'rankine':
            hasil = (celsius + 273.15) * 9/5;
            if (hasil < 0) {
                throw new Error('Hasil konversi menghasilkan suhu di bawah nol absolut');
            }
            break;
        case 'reamur':
            hasil = celsius * 4/5;
            break;
        default:
            throw new Error('Unit suhu tidak valid');
    }
    
    return hasil;
}

// Fungsi untuk menampilkan hasil
function tampilkanHasil(inputSuhu, fromUnit, hasil, toUnit) {
    const hasilDiv = document.getElementById('hasil');
    const fromSymbol = getUnitSymbol(fromUnit);
    const toSymbol = getUnitSymbol(toUnit);
    
    // Membulatkan hasil ke 2 desimal
    const hasilBulat = Math.round(hasil * 100) / 100;
    const inputBulat = Math.round(inputSuhu * 100) / 100;
    
    hasilDiv.innerHTML = `
        <strong>${inputBulat}${fromSymbol} = ${hasilBulat}${toSymbol}</strong>
        <br><small>Konversi dari ${getNamaUnit(fromUnit)} ke ${getNamaUnit(toUnit)}</small>
    `;
    hasilDiv.className = 'success';
}

// Fungsi untuk menampilkan error
function tampilkanError(pesan) {
    const hasilDiv = document.getElementById('hasil');
    hasilDiv.innerHTML = pesan;
    hasilDiv.className = 'error';
}

// Fungsi untuk mendapatkan simbol unit
function getUnitSymbol(unit) {
    const symbols = {
        'celsius': '°C',
        'fahrenheit': '°F',
        'kelvin': 'K',
        'rankine': '°R',
        'reamur': '°Ré'
    };
    return symbols[unit] || '';
}

// Fungsi untuk mendapatkan nama unit lengkap
function getNamaUnit(unit) {
    const names = {
        'celsius': 'Celsius',
        'fahrenheit': 'Fahrenheit',
        'kelvin': 'Kelvin',
        'rankine': 'Rankine',
        'reamur': 'Réaumur'
    };
    return names[unit] || unit;
}

// Fungsi untuk reset form
function resetForm() {
    document.getElementById('inputSuhu').value = '';
    document.getElementById('fromUnit').value = 'celsius';
    document.getElementById('toUnit').value = 'fahrenheit';
    clearResult();
}

// Fungsi untuk membersihkan hasil
function clearResult() {
    const hasilDiv = document.getElementById('hasil');
    hasilDiv.innerHTML = '';
    hasilDiv.className = '';
}

// Event listener untuk Enter key
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        konversiSuhu();
    }
});

// Event listeners untuk membersihkan hasil ketika input berubah
document.getElementById('inputSuhu').addEventListener('input', clearResult);
document.getElementById('fromUnit').addEventListener('change', clearResult);
document.getElementById('toUnit').addEventListener('change', clearResult);

// Event listener untuk animasi focus pada input
document.getElementById('inputSuhu').addEventListener('focus', function() {
    this.style.transform = 'scale(1.02)';
});

document.getElementById('inputSuhu').addEventListener('blur', function() {
    this.style.transform = 'scale(1)';
});

// Fungsi untuk auto-konversi saat mengetik (opsional)
let timeout;
document.getElementById('inputSuhu').addEventListener('input', function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        if (this.value && !isNaN(this.value)) {
            konversiSuhu();
        }
    }, 1000); // Auto convert setelah 1 detik tidak mengetik
});