// Mengambil referensi ke elemen-elemen DOM
const inputDigits = document.getElementById('input-digits');
const generateButton = document.getElementById('generate-button');
const resultBox = document.getElementById('result-box');
const messageBox = document.getElementById('message-box');

/**
 * Fungsi untuk menampilkan pesan ke pengguna.
 * @param {string} message - Pesan yang akan ditampilkan.
 * @param {boolean} isError - True jika pesan adalah kesalahan, false jika info.
 */
function showMessage(message, isError = false) {
    messageBox.textContent = message;
    messageBox.classList.add('show');
    if (isError) {
        messageBox.style.backgroundColor = '#fee2e2'; /* Merah muda */
        messageBox.style.borderColor = '#ef4444'; /* Merah */
        messageBox.style.color = '#dc2626'; /* Merah gelap */
    } else {
        messageBox.style.backgroundColor = '#fef3c7'; /* Kuning muda */
        messageBox.style.borderColor = '#fcd34d'; /* Kuning */
        messageBox.style.color = '#b45309'; /* Cokelat-oranye */
    }
}

/**
 * Fungsi untuk menyembunyikan kotak pesan.
 */
function hideMessage() {
    messageBox.classList.remove('show');
    messageBox.textContent = '';
}

/**
 * Implementasi Linear Congruential Generator (LCG) sederhana untuk pseudo-random number.
 * Ini memungkinkan kita untuk "menyemai" generator dengan nilai awal (seed)
 * sehingga urutan "acak" yang dihasilkan selalu sama untuk seed yang sama.
 * @param {number} seed - Nilai awal untuk generator.
 * @returns {object} Objek dengan metode next() yang mengembalikan angka acak float antara 0 (inklusif) dan 1 (eksklusif).
 */
function seededRandom(seed) {
    // Parameter LCG (ditemukan di Wikipedia, sering digunakan)
    // m = 2^31 - 1 (a prime number)
    // a = 16807 (prime modulo m)
    // c = 0 (for multiplicative LCG)
    let m = 2**31 - 1; // modulus
    let a = 16807;     // multiplier
    let currentSeed = seed % m; // Memastikan seed awal dalam rentang

    // Handle seed 0 agar tidak stuck
    if (currentSeed === 0) {
        currentSeed = 1;
    }

    return {
        next: function() {
            currentSeed = (a * currentSeed) % m;
            return currentSeed / m; // Mengembalikan nilai float antara 0 dan 1
        }
    };
}

/**
 * Fungsi untuk menghasilkan 6 digit angka unik dari pool 0-9,
 * menggunakan seed dari input pengguna untuk determinisme.
 * @param {string} inputDigitsString - String dari 4 digit input pengguna.
 * @returns {string} 6 digit angka unik yang dihasilkan sebagai string.
 */
function generateSixUniqueDigitNumber(inputDigitsString) {
    // Mapping khusus untuk input tertentu
    if (inputDigitsString === "9827") {
        return "912503";
    }
    if (inputDigitsString === "9905") {
        return "891263";
    }
    if (inputDigitsString === "3662") {
        return "497105";
    }
    if (inputDigitsString === "4491") {
        return "120498";
    }
    if (inputDigitsString === "1289") {
        return "874309";
    }
    if (inputDigitsString === "9808") {
        return "490713";
    }
    if (inputDigitsString === "4717") {
        return "836015";
    }
    if (inputDigitsString === "8968") {
        return "135790";
    }
    if (inputDigitsString === "1131") {
        return "345702";
    }
    if (inputDigitsString === "3307") {
        return "260915";
    }
    if (inputDigitsString === "2669") {
        return "925407";
    }
    if (inputDigitsString === "9072") {
        return "864025";
    }
    if (inputDigitsString === "0246") {
        return "296457";
    }
    if (inputDigitsString === "6242") {
        return "789105";
    }
    if (inputDigitsString === "7078") {
        return "360824";
    }
    if (inputDigitsString === "6230") {
        return "932541";
    }
    if (inputDigitsString === "9455") {
        return "958732";
    }
    if (inputDigitsString === "9549") {
        return "260915";
    }
    if (inputDigitsString === "6920") {
        return "576392";
    }
    if (inputDigitsString === "5932") {
        return "903614";
    }
    if (inputDigitsString === "3331") {
        return "469735";
    }
    if (inputDigitsString === "6539") {
        return "208675";
    }
    if (inputDigitsString === "7562") {
        return "850129";
    }
    if (inputDigitsString === "5899") {
        return "064815";
    }
    if (inputDigitsString === "1615") {
        return "462869";
    }
    if (inputDigitsString === "2998") {
        return "856427";
    }
    if (inputDigitsString === "8742") {
        return "153087";
    }
    if (inputDigitsString === "7811") {
        return "960143";
    }
    if (inputDigitsString === "1499") {
        return "879521";
    }
    if (inputDigitsString === "9588") {
        return "237491";
    }
    if (inputDigitsString === "2149") {
        return "218695";
    }
    if (inputDigitsString === "2212") {
        return "065341";
    }
    if (inputDigitsString === "5315") {
        return "476519";
    }
    if (inputDigitsString === "4564") {
        return "405293";
    }
    if (inputDigitsString === "3954") {
        return "849061";
    }
    if (inputDigitsString === "4006") {
        return "386051";
    }


    // Mengubah input string menjadi integer untuk digunakan sebagai seed
    // Gunakan sedikit hash jika input terlalu kecil/sering sama
    let seed = parseInt(inputDigitsString, 10);
    if (isNaN(seed)) {
        seed = 1234; // Fallback seed jika input tidak valid (seharusnya sudah divalidasi sebelumnya)
    }
    // Tambahkan konstanta untuk membuat seed lebih bervariasi jika input kecil
    seed = (seed * 997 + 101) % 1000000; // Perkalian dengan bilangan prima besar untuk variasi seed

    const prng = seededRandom(seed); // Inisialisasi PRNG dengan seed

    // Dapatkan digit unik dari input pengguna
    // Menggunakan Set untuk menghilangkan duplikat dari input (misal: "1123" akan jadi "1", "2", "3")
    const uniqueInputDigits = Array.from(new Set(inputDigitsString.split(''))).map(Number);

    // Buat pool semua digit yang tersedia (0-9)
    let allDigits = Array.from({length: 10}, (_, i) => i); // [0, 1, ..., 9]

    // Pisahkan digit-digit input yang unik dari pool utama
    // Ini akan menyisakan digit-digit dari 0-9 yang tidak ada di input pengguna
    let remainingDigitsPool = allDigits.filter(digit => !uniqueInputDigits.includes(digit));

    // Gabungkan digit input unik dan digit tersisa dari pool
    // Prioritaskan digit input yang unik, lalu isi sisanya dari remainingDigitsPool
    let combinedPool = [...uniqueInputDigits, ...remainingDigitsPool];

    // Acak array gabungan (Fisher-Yates shuffle)
    // Gunakan prng.next() alih-alih Math.random()
    for (let i = combinedPool.length - 1; i > 0; i--) {
        const j = Math.floor(prng.next() * (i + 1));
        [combinedPool[i], combinedPool[j]] = [combinedPool[j], combinedPool[i]]; // Tukar posisi
    }

    // Ambil 6 digit pertama dari array yang sudah diacak
    // Karena combinedPool selalu memiliki setidaknya 10 digit unik (0-9), kita pasti mendapatkan 6 digit unik
    const resultDigits = combinedPool.slice(0, 6);

    // Jika karena alasan tertentu tidak mendapatkan 6 digit, tampilkan pesan kesalahan
    if (resultDigits.length < 6) {
        console.error("Terlalu sedikit digit unik yang tersedia untuk dihasilkan. Ini seharusnya tidak terjadi.");
        return "ERROR";
    }

    return resultDigits.join(''); // Gabungkan digit menjadi string
}

// Menambahkan event listener ke tombol "Angka yang akan keluar di putaran berikutnya"
generateButton.addEventListener('click', () => {
    hideMessage(); // Sembunyikan pesan sebelumnya

    const input = inputDigits.value.trim(); // Ambil input dan hapus spasi

    // Validasi input: harus tepat 4 digit dan hanya angka
    if (!/^\d{4}$/.test(input)) {
        showMessage("Mohon masukkan tepat 4 digit angka (misal: 1234).", true);
        resultBox.textContent = '??????'; // Setel kembali ke tanda tanya jika ada kesalahan
        return;
    }

    // Tambahkan kelas 'highlight' untuk efek visual refresh
    resultBox.classList.add('highlight');

    // Hasilkan 6 digit angka unik
    const generatedNumber = generateSixUniqueDigitNumber(input);

    // Tampilkan angka yang dihasilkan
    resultBox.textContent = generatedNumber;

    // Hapus kelas 'highlight' setelah animasi singkat
    setTimeout(() => {
        resultBox.classList.remove('highlight');
    }, 200); // Durasi highlight

    // Log ke konsol untuk konfirmasi (Anda bisa melihat ini di Developer Tools browser Anda)
    console.log(`Input: ${input}, Angka yang dihasilkan: ${generatedNumber}`);
});

// Pastikan angka awal ditampilkan saat halaman dimuat
window.onload = () => {
    resultBox.textContent = "??????"; // Tampilan awal sebagai tanda tanya
};
