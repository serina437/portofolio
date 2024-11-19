$(document).ready(function() {
    var zoom = 1;

    $('.zoom').on('click', function() {
        zoom += 0.1;
        $('.target').css('transform', 'scale(' + zoom + ')');
    });

    $('.zoom-init').on('click', function() {
        zoom = 1;
        $('.target').css('transform', 'scale(' + zoom + ')');
    });

    $('.zoom-out').on('click', function() {
        if (zoom > 0.1) { // Mencegah zoom menjadi kurang dari 0.1
            zoom -= 0.1;
            $('.target').css('transform', 'scale(' + zoom + ')');
        }
    });
});

 function checkScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('solid');
      navbar.classList.remove('scrolled');
    } else {
      navbar.classList.add('scrolled');
      navbar.classList.remove('solid');
    }
  }

  // Cek scroll saat halaman pertama kali dimuat
  document.addEventListener('DOMContentLoaded', checkScroll);

  // Tambahkan event listener untuk cek scroll ketika user scroll
  window.addEventListener('scroll', checkScroll);


function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less"; 
    moreText.style.display = "inline";
  }
}
  const swiper = new Swiper('.swiper', {
        loop: true, // Membuat slider terus berputar
        autoplay: {
            delay: 3000, // Delay 3 detik
            disableOnInteraction: false, // Autoplay tetap berjalan meskipun user berinteraksi
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true, // Pagination dapat diklik
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });