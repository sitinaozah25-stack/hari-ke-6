// Fungsi untuk menghitung BMI
function hitungBMI() {
    // Mengambil nilai dari input
    const beratBadan = parseFloat(document.getElementById('beratBadan').value);
    const tinggiBadan = parseFloat(document.getElementById('tinggiBadan').value);
    const hasilDiv = document.getElementById('hasil');
    
    // Validasi input
    if (isNaN(beratBadan) || isNaN(tinggiBadan)) {
        tampilkanError('Error: Mohon masukkan angka yang valid untuk berat dan tinggi badan!');
        return;
    }
    
    if (beratBadan <= 0) {
        tampilkanError('Error: Berat badan harus lebih dari 0 kg!');
        return;
    }
    
    if (tinggiBadan <= 0) {
        tampilkanError('Error: Tinggi badan harus lebih dari 0 cm!');
        return;
    }
    
    if (beratBadan > 1000) {
        tampilkanError('Error: Berat badan terlalu besar! Masukkan nilai yang realistis.');
        return;
    }
    
    if (tinggiBadan > 300) {
        tampilkanError('Error: Tinggi badan terlalu besar! Masukkan nilai yang realistis.');
        return;
    }
    
    try {
        // Konversi tinggi dari cm ke meter
        const tinggiMeter = tinggiBadan / 100;
        
        // Hitung BMI
        const bmi = beratBadan / (tinggiMeter * tinggiMeter);
        
        // Tentukan kategori dan tampilkan hasil
        const kategori = tentukanKategori(bmi);
        tampilkanHasil(bmi, kategori, beratBadan, tinggiBadan);
        
    } catch (error) {
        tampilkanError('Error: Terjadi kesalahan dalam perhitungan!');
    }
}

// Fungsi untuk menentukan kategori BMI
function tentukanKategori(bmi) {
    if (bmi < 18.5) {
        return {
            nama: 'Kurus (Underweight)',
            kelas: 'bmi-kurus',
            saran: 'Anda perlu menambah berat badan. Konsumsi makanan bergizi dan konsultasi dengan ahli gizi.',
            warna: '#00cec9'
        };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        return {
            nama: 'Normal (Healthy)',
            kelas: 'bmi-normal',
            saran: 'Berat badan Anda ideal! Pertahankan pola makan sehat dan olahraga teratur.',
            warna: '#00b894'
        };
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        return {
            nama: 'Kelebihan Berat Badan (Overweight)',
            kelas: 'bmi-berlebih',
            saran: 'Anda perlu menurunkan berat badan. Perbanyak aktivitas fisik dan atur pola makan.',
            warna: '#fdcb6e'
        };
    } else if (bmi >= 30.0 && bmi <= 34.9) {
        return {
            nama: 'Obesitas Kelas I',
            kelas: 'bmi-obesitas',
            saran: 'Konsultasikan dengan dokter untuk program penurunan berat badan yang aman.',
            warna: '#e17055'
        };
    } else if (bmi >= 35.0 && bmi <= 39.9) {
        return {
            nama: 'Obesitas Kelas II',
            kelas: 'bmi-obesitas',
            saran: 'Sangat disarankan untuk segera konsultasi dengan dokter atau ahli gizi.',
            warna: '#e84393'
        };
    } else {
        return {
            nama: 'Obesitas Kelas III (Ekstrem)',
            kelas: 'bmi-obesitas',
            saran: 'Kondisi ini berisiko tinggi. Segera konsultasi dengan dokter untuk penanganan medis.',
            warna: '#d63031'
        };
    }
}

// Fungsi untuk menampilkan hasil BMI
function tampilkanHasil(bmi, kategori, berat, tinggi) {
    const hasilDiv = document.getElementById('hasil');
    const bmiBulat = Math.round(bmi * 10) / 10; // Bulatkan ke 1 desimal
    
    hasilDiv.innerHTML = `
        <div style="margin-bottom: 15px;">
            <strong style="font-size: 24px; color: ${kategori.warna};">BMI: ${bmiBulat}</strong>
        </div>
        <div style="margin-bottom: 15px;">
            <strong>Kategori: ${kategori.nama}</strong>
        </div>
        <div style="margin-bottom: 15px; font-size: 14px; color: #666;">
            Berat: ${berat} kg | Tinggi: ${tinggi} cm
        </div>
        <div style="background: rgba(255,255,255,0.8); padding: 12px; border-radius: 8px; font-size: 14px; line-height: 1.5;">
            <strong>Saran:</strong> ${kategori.saran}
        </div>
    `;
    hasilDiv.className = kategori.kelas;
}

// Fungsi untuk menampilkan error
function tampilkanError(pesan) {
    const hasilDiv = document.getElementById('hasil');
    hasilDiv.innerHTML = pesan;
    hasilDiv.className = 'error';
}

// Fungsi untuk reset form
function resetForm() {
    document.getElementById('beratBadan').value = '';
    document.getElementById('tinggiBadan').value = '';
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
        hitungBMI();
    }
});

// Event listeners untuk membersihkan hasil ketika input berubah
document.getElementById('beratBadan').addEventListener('input', clearResult);
document.getElementById('tinggiBadan').addEventListener('input', clearResult);

// Event listeners untuk animasi focus pada input
const inputs = document.querySelectorAll('input[type="number"]');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
    });
});

// Fungsi untuk auto-hitung BMI saat mengetik (opsional)
let timeout;
function autoHitung() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        const berat = document.getElementById('beratBadan').value;
        const tinggi = document.getElementById('tinggiBadan').value;
        
        if (berat && tinggi && !isNaN(berat) && !isNaN(tinggi)) {
            hitungBMI();
        }
    }, 1500); // Auto hitung setelah 1.5 detik tidak mengetik
}

document.getElementById('beratBadan').addEventListener('input', autoHitung);
document.getElementById('tinggiBadan').addEventListener('input', autoHitung);

// Fungsi untuk validasi input real-time
function validasiInput(input) {
    input.addEventListener('input', function() {
        const value = parseFloat(this.value);
        if (this.id === 'beratBadan' && value > 1000) {
            this.style.borderColor = '#e74c3c';
        } else if (this.id === 'tinggiBadan' && value > 300) {
            this.style.borderColor = '#e74c3c';
        } else {
            this.style.borderColor = '#e0e0e0';
        }
    });
}

// Terapkan validasi ke semua input
inputs.forEach(validasiInput);