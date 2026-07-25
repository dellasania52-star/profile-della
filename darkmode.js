let darkmode = localStorage.getItem('darkmode')
const togglemode = document.getElementById('togglemode')

const enableDarkmode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkmode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkmode()

togglemode.addEventListener("click", () => {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkmode() : disableDarkmode()
})

const search = document.querySelector('.search');
const cari = document.querySelector('.cari');
const input = document.querySelector('.input');

// cari.addEventListener('click', () => {
//     search.classList.toggle('active');
//     input.focus();
// });

document.addEventListener('click', (e) => {
    if (!search.contains(e.target)) {
        search.classList.remove('active');
    }
});

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();

        let keyword = input.value.trim();

        if (keyword !== "") {
            console.log("Keyword", keyword);
        }

        input.value = "";
        search.classList.remove('active');
    }
});

var namaError = document.getElementById('nama-error');
var telError = document.getElementById('tel-error');
var emailError = document.getElementById('email-error');
var pesanError = document.getElementById('pesan-error');
var subError = document.getElementById('sub-error');

function namaValidasi() {
    var nama = document.getElementById('namakontak').value;
    if(nama.length == 0) {
        namaError.innerHTML = '';
        return false;
    }
    if(!nama.match(/^[A-Za-z]+(\s[A-Za-z]+)+$/)){
        namaError.innerHTML = 'masukkan nama lengkap';
        return false;
    }
    namaError.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
    return true;
}

function telValidasi() {
    var nomor = document.getElementById('telkontak').value;

    if(nomor.length == 0) {
        telError.innerHTML = 'nomor tidak valid';
        return false;
    }
    if(nomor.length < 10 || nomor.length > 13) {
        telError.innerHTML = 'nomor harus 10-13 digit';
        return false;
    }
    if(!nomor.match(/^[0-9]{10,13}$/)){
        telError.innerHTML = 'nomor harus 10-13 digit';
        return false;
    }

    telError.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
    return true;
}

function emailValidasi() {
    var email = document.getElementById('emailkontak').value;

    if(email.length == 0) {
        emailError.innerHTML = 'email tidak valid';
        return false;
    }
    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        emailError.innerHTML = 'email tidak sesuai';
        return false;
    }

    emailError.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
    return true;
}

function pesanValidasi() {
    var pesan = document.getElementById('pesankontak').value;
    var valid = 30;
    var left = valid - pesan.length;

    if(left>0){
        pesanError.innerHTML = left + 'masukkan lebih banyak karakter';
        return false;
    }

    pesanError.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
    return true;
}

function validasiForm() {
    if(!namaValidasi() || !telValidasi() || !emailValidasi() || !pesanValidasi()){
        subError.style.display = 'block';
        subError.innerHTML = 'Lengkapi data';
        setTimeout(function(){subError.style.display = 'none'}, 3000);
        return false;
    }
    return true;
    // alert("Pesan berhasil dikirim!");
    // document.querySelector("form").reset();
    // namaError.innerHTML = "";
    // telError.innerHTML = "";
    // emailError.innerHTML = "";
    // pesanError.innerHTML = "";
    // return false;
}

let isSending = false;

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Mencegah klik berkali-kali
    if (isSending) {
        return;
    }

    // Validasi form
    if (!validasiForm()) {
        return;
    }

    isSending = true;

    const btn = document.querySelector("#contactForm button");

    btn.disabled = true;
    btn.innerHTML = "Mengirim...";

    emailjs.send("service_q77t4eg", "template_14d5pgf", {
        nama: document.getElementById("namakontak").value,
        nomor: document.getElementById("telkontak").value,
        email: document.getElementById("emailkontak").value,
        pesan: document.getElementById("pesankontak").value
    })
    .then(function () {

        alert("Pesan berhasil dikirim!");

        document.getElementById("contactForm").reset();

        namaError.innerHTML = "";
        telError.innerHTML = "";
        emailError.innerHTML = "";
        pesanError.innerHTML = "";
        subError.innerHTML = "";

        // Tombol tetap nonaktif
        btn.innerHTML = "✓ Terkirim";

    })
    .catch(function (error) {

        console.log(error);

        alert("Gagal mengirim pesan!");

        // Jika gagal, tombol aktif lagi
        isSending = false;
        btn.disabled = false;
        btn.innerHTML = "Kirim";

    });

});