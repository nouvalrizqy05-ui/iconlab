import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight, ChevronLeft, Calendar, Trophy, FileText, Gamepad2, Users, Monitor, Star, Youtube, Instagram, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollReveal } from './hooks/useScrollReveal';

// --- DATA DUMMY ---

const GOOGLE_FORM_LINK = "https://forms.google.com/";

const eventData = {
  workshop: {
    id: 'workshop',
    title: "Workshop IT",
    titleImage: "/Lomba/WORKSHOP 2.png",
    titleScale: "scale-90 md:scale-115",
    detailScale: "scale-100 md:scale-120",
    icon: <Monitor className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    themeColor: "bg-[#FF8800]", // Orange
    shadowColor: "shadow-[#CC6600]",
    colorStr: "text-[#FF8800]",
    comingSoon: true,
    shortDesc: "Coming Soon — Detail acara sedang disusun.",
    fullDesc: "Detail Workshop IT ICONLAB 2026 sedang dalam tahap penyusunan. Nantikan informasi selengkapnya segera!",
    date: "Coming Soon",
    prize: "Coming Soon",
    requirements: [
      "Coming Soon"
    ],
    timeline: [
      { date: 'TBA', step: 'Coming Soon' },
    ],
    faqs: [
      { q: "Kapan detail Workshop akan diumumkan?", a: "Informasi lengkap mengenai Workshop akan segera diumumkan melalui Instagram @iconlab.ilkom." }
    ],
    contacts: [
      { name: "Sulthan", role: "Narahubung", contact: "+62 813 6927 4302", type: "wa", icon: "S", color: "bg-[#FF1111]" },
      { name: "Zahra", role: "Narahubung", contact: "+62 822 4146 7806", type: "wa", icon: "Z", color: "bg-[#00AAFF]" }
    ]
  },
  gamedev: {
    id: 'gamedev',
    title: "Game Dev",
    titleImage: "/Lomba/GameDev 2.png",
    titleScale: "scale-100 md:scale-135",
    titleTranslate: "-translate-y-1 md:-translate-y-3",
    detailScale: "scale-90 md:scale-105",
    icon: <Gamepad2 className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    themeColor: "bg-[#FF1111]",
    shadowColor: "shadow-[#AA0000]",
    colorStr: "text-[#FF1111]",
    shortDesc: "Wadah bagi mahasiswa untuk mengembangkan kreativitas serta kemampuan dalam merancang dan membangun game yang inovatif, interaktif, dan menarik.",
    fullDesc: "Lomba Game Development merupakan salah satu cabang kompetisi yang diselenggarakan oleh Himpunan Mahasiswa Ilmu Komputer UNNES dalam rangka ICONLAB 2026 dengan tema \"Innovating Technology for Sustainable Society 5.0\". Kompetisi dilaksanakan dalam dua tahap, yaitu babak penyisihan dan babak final. Pada tahap penyisihan, peserta mengumpulkan game, Game Design Document (GDD), dan video demo. Tim terbaik akan melaju ke babak final yang diselenggarakan secara luring di Universitas Negeri Semarang untuk melakukan presentasi dan demonstrasi karya. Melalui kompetisi ini, peserta diharapkan dapat bertukar ilmu, pengalaman, dan inovasi dalam bidang pengembangan game.",
    date: "23 Mei 2026",
    prize: "Juara 1-3: Uang Pembinaan + Piagam + Sertifikat, Juara Harapan 1-2: Piagam + Sertifikat",
    requirements: [
      "Mahasiswa aktif (D3/D4/S1) perwakilan PTN/PTS se-Indonesia",
      "Tema wajib berkaitan dengan salah satu dari 17 poin SDGs",
      "Game engine bebas, KECUALI Roblox Studio atau sejenisnya",
      "Dilarang menggunakan Generative AI (Aset/Kode/Konten)",
      "Game harus playable (dapat dijalankan) tanpa error fatal",
      "Karya bersifat orisinal dan tidak mengandung unsur SARA"
    ],
    timeline: [
      { date: '30 Maret - 5 April 2026', step: 'Open Early Bird' },
      { date: '7 - 19 April 2026', step: 'Open Registration Batch 1' },
      { date: '21 April - 8 Mei 2026', step: 'Open Registration Batch 2' },
      { date: '9 Mei 2026', step: 'Technical Meeting' },
      { date: '11 Mei 2026', step: 'Batas Pengumpulan Game, GDD, dan Video Demo Game' },
      { date: '11 - 15 Mei 2026', step: 'Penilaian Submisi' },
      { date: '16 Mei 2026', step: 'Pengumuman Finalis' },
      { date: '17 Mei 2026', step: 'Technical Meeting Final' },
      { date: '23 Mei 2026', step: 'Final & Awarding' },
    ],
    faqs: [
      { q: "Apa tema utama lomba Game Development?", a: "Tema utamanya adalah Sustainable Development Goals (SDGs). Setiap tim wajib mengembangkan game yang berkaitan dengan minimal satu dari 17 poin SDGs." },
      { q: "Apakah Game Engine yang digunakan bebas?", a: "Semua engine bebas (Unity, Unreal, Godot, Construct, dll), KECUALI platform seperti Roblox Studio karena dianggap tidak memberikan kontrol penuh dalam pengembangan." },
      { q: "Apa saja platform game yang diperbolehkan?", a: "Game dapat didevelop untuk platform Desktop (Windows/Linux), Mobile (Android/iOS), maupun berbasis Web." },
      { q: "Bolehkah menggunakan Artificial Intelligence (AI)?", a: "Dilarang keras menggunakan Generative AI dalam bentuk apa pun (baik aset, kode, maupun konten). Seluruh elemen game harus hasil kerja tim sendiri." },
      { q: "Bagaimana ketentuan penggunaan aset pihak ketiga?", a: "Diperbolehkan selama aset legal, mencantumkan sumber kredit dengan jelas, dan tidak mendominasi keseluruhan isi game." },
      { q: "Apa saja syarat kelayakan game yang dikumpulkan?", a: "Game harus playable (bisa dimainkan), tidak error mengganggu, memiliki alur jelas, dan tidak mengandung SARA, pornografi, atau kekerasan berlebihan." },
      { q: "Apakah ada aturan mengenai Hak Kekayaan Intelektual (HKI)?", a: "Hak cipta atas karya tetap menjadi milik peserta. Namun, panitia berhak mempublikasikan karya untuk keperluan promosi non-komersial ICONLAB." },
      { q: "Bolehkah saya mengikuti lebih dari satu cabang lomba?", a: "Boleh, namun Anda hanya diperkenankan menjadi Ketua dalam satu tim saja di seluruh cabang lomba ICONLAB." },
      { q: "Berapa banyak anggota dalam satu tim?", a: "Satu tim terdiri dari 2–3 orang (1 ketua dan maksimal 2 anggota) dari perguruan tinggi yang sama. Anggota dapat berasal dari program studi berbeda." }
    ],
    criteria: [
      { name: "Game Design Document", point: 30, details: "Menilai kejelasan fitur, fungsi, dan kesesuaian GDD dengan game." },
      { name: "Game Implementation", point: 100, details: "Menilai kesesuaian tema SDGs, kreativitas, visual, sound, dan gameplay." },
      { name: "Video Demo Game", point: 30, details: "Menilai kesesuaian video dengan game dan kualitas presentasi video." },
      { name: "Final Presentation", point: 100, details: "Menilai penguasaan materi presentasi dan kualitas tanya jawab (Q&A)." }
    ],
    contacts: [
      { name: "Wira", role: "Narahubung", contact: "+62 895 7033 78080", type: "wa", icon: "W", color: "bg-[#FF1111]" }
    ],
    registrationLink: "https://forms.gle/WKCuZKazMqogQcNZ8",
    rulebookLink: "https://drive.google.com/drive/folders/1u4zB_gi5OeBx2FCE9aybMbohNpg2GbFY?usp=drive_link"
  },
  lkti: {
    id: 'lkti',
    title: "Lomba KTI",
    titleImage: "/Lomba/LKTI 2.png",
    titleScale: "scale-80 md:scale-100",
    detailScale: "scale-100 md:scale-120",
    icon: <FileText className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    themeColor: "bg-[#00AAFF]", // Blue
    shadowColor: "shadow-[#0066AA]",
    colorStr: "text-[#00AAFF]",
    shortDesc: "Wadah bagi mahasiswa menuangkan ide dan inovasi teknologi berbasis SDGs melalui karya tulis ilmiah yang kreatif dan aplikatif.",
    fullDesc: "Lomba Karya Tulis Ilmiah (LKTI) ICONLAB 2026 mengusung tema \"Innovating Technology For Sustainable Society 5.0\". Kompetisi ini mendorong mahasiswa untuk mengembangkan gagasan kreatif dan solutif berbasis teknologi yang mampu menjawab berbagai permasalahan masyarakat secara nyata dan berkelanjutan. Terbagi menjadi dua tahap: babak penyisihan (daring) menyaring lima tim terbaik untuk melaju ke babak Grand Final (luring) di Universitas Negeri Semarang. Setiap tim wajib dibimbing oleh satu tenaga pendidik sebagai pembimbing.",
    date: "23 Mei 2026",
    prize: "Juara 1-3: Uang Pembinaan + Piagam + Sertifikat, Juara Harapan 1-2: Piagam + Sertifikat",
    requirements: [
      "Mahasiswa aktif D3/D4/S1 PTN/PTS se-Indonesia (WNI)",
      "Tim terdiri dari 3 orang dari instansi yang sama (1 ketua + 2 anggota)",
      "Setiap tim wajib dibimbing oleh satu tenaga pendidik",
      "Karya orisinal, belum pernah menjuarai/diikutsertakan lomba lain",
      "Penulisan sesuai format & kaidah PUEBI, maks 15 halaman inti",
      "Tidak mengandung unsur SARA dan pornografi"
    ],
    timeline: [
      { date: '30 Maret - 5 April 2026', step: 'Open Early Bird' },
      { date: '7 - 19 April 2026', step: 'Open Registration Batch 1' },
      { date: '21 April - 8 Mei 2026', step: 'Open Registration Batch 2' },
      { date: '9 Mei 2026', step: 'Technical Meeting' },
      { date: '11 Mei 2026', step: 'Deadline Pengumpulan Full Paper' },
      { date: '12 - 15 Mei 2026', step: 'Penilaian Full Paper' },
      { date: '16 Mei 2026', step: 'Pengumuman Finalist' },
      { date: '17 Mei 2026', step: 'Technical Meeting Finalist' },
      { date: '23 Mei 2026', step: 'Grand Final & Awarding' },
    ],
    faqs: [
      { q: "Apakah lomba ini daring atau luring?", a: "Hybrid. Pendaftaran dan penyisihan dilakukan secara daring, sedangkan babak Grand Final dilaksanakan secara luring (offline) di Universitas Negeri Semarang." },
      { q: "Berapa biaya pendaftaran LKTI?", a: "Early Bird: Rp55.000/tim, Gelombang 1: Rp65.000/tim, Gelombang 2: Rp75.000/tim." },
      { q: "Apakah peserta boleh berasal dari instansi yang berbeda?", a: "Tidak. Setiap tim diwajibkan berasal dari instansi yang sama, namun boleh dari program studi berbeda." },
      { q: "Bolehkah satu peserta tergabung di lebih dari satu tim?", a: "Tidak. Setiap individu hanya diperbolehkan bergabung dalam satu tim demi keadilan kompetisi." },
      { q: "Apakah karya yang pernah dilombakan boleh diajukan kembali?", a: "Tidak. Karya harus orisinal dan belum pernah diikutkan dalam lomba sejenis, dibuktikan melalui lembar orisinalitas bermaterai." },
      { q: "Apakah wajib mengunggah Twibbon?", a: "Ya. Setiap anggota tim wajib mengunggah Twibbon ICONLAB 2026 di Instagram sesuai ketentuan panitia." },
      { q: "Apakah semua peserta mendapatkan sertifikat?", a: "Ya. Seluruh peserta yang mengikuti rangkaian lomba akan menerima e-sertifikat resmi." },
      { q: "Apa saja subtema LKTI?", a: "Kesejahteraan Sosial & Ekonomi, Kesehatan & Kualitas Hidup, Pendidikan Berkualitas & Inklusif, Lingkungan & Keberlanjutan, serta Inovasi Teknologi & Pembangunan Berkelanjutan." },
      { q: "Berapa halaman maksimal naskah?", a: "Maksimal 15 halaman inti (tidak termasuk halaman judul, lembar pengesahan, orisinalitas, kata pengantar, daftar isi, dan lampiran)." }
    ],
    criteria: [
      { name: "Naskah Full Paper", point: 100, details: "Format penulisan, kreativitas gagasan, kesesuaian topik, data & sumber, analisis-sintesis. (Bobot 60%)" },
      { name: "Presentasi Final", point: 100, details: "Pemaparan, sistematika, dan diskusi/tanya jawab dengan juri. (Bobot 40%)" }
    ],
    contacts: [
      { name: "Selma", role: "Narahubung", contact: "+62 889 8060 2427", type: "wa", icon: "S", color: "bg-[#00AAFF]" }
    ],
    registrationLink: "https://forms.gle/4CGJZP4hkvT334iAA",
    rulebookLink: "https://drive.google.com/drive/folders/1Yp0KxYB8yhlFcoBuU2AqaVLzo9QJPJSG?usp=drive_link"
  },
  mlbb: {
    id: 'mlbb',
    title: "E-Sports",
    titleImage: "/Lomba/Mobile Legend 2.png",
    titleScale: "scale-80 md:scale-100",
    detailScale: "scale-90 md:scale-110",
    icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-white" />,
    themeColor: "bg-[#00FF00]", // Green
    shadowColor: "shadow-[#009900]",
    colorStr: "text-[#00FF00]",
    shortDesc: "Turnamen E-Sports MLBB antar masyarakat umum Kota Semarang. Buktikan timmu!",
    fullDesc: "Siapkan tim terbaikmu untuk bertarung di turnamen Mobile Legends: Bang Bang ICONLAB 2026! Kompetisi ini mencari tim E-Sports dengan mekanik makro dan mikro terbaik. Pertandingan terdiri dari Babak Penyisihan (online BO1), Semifinal (offline BO3), dan Grand Final (offline BO5). Buktikan strategi dan kekompakan tim kalian!",
    date: "16 Mei 2026",
    prize: "Uang Tunai + Piagam + Sertifikat",
    requirements: [
      "Masyarakat umum Kota Semarang",
      "1 Tim terdiri dari 5 pemain inti dan 1 pemain cadangan",
      "Tim yang sudah didaftarkan tidak dapat diubah (roster lock)",
      "Nickname dan ID server wajib sama dengan saat registrasi",
      "Dilarang menggunakan kata vulgar/sara/porno saat bertanding",
      "Bermain sportif, no cheat/hack, no emulator"
    ],
    timeline: [
      { date: '30 Maret - 5 April 2026', step: 'Open Early Bird' },
      { date: '7 - 19 April 2026', step: 'Open Registration Batch 1' },
      { date: '21 April - 8 Mei 2026', step: 'Open Registration Batch 2' },
      { date: '9 Mei 2026', step: 'Technical Meeting' },
      { date: '10 Mei 2026', step: 'Babak Penyisihan (Online)' },
      { date: '16 Mei 2026', step: 'Semifinal, Juara 3, & Final (Offline)' },
    ],
    faqs: [
      { q: "Siapa saja yang bisa mendaftar lomba ini?", a: "Turnamen ini terbuka untuk masyarakat umum khususnya Kota Semarang." },
      { q: "Berapa biaya pendaftaran MLBB?", a: "Early Bird: Rp40.000, Gelombang 1: Rp45.000, Gelombang 2: Rp50.000." },
      { q: "Bagaimana sistem pertandingannya?", a: "Sistem Single Elimination. Penyisihan (BO1) secara online, Semifinal/Juara 3 (BO3) dan Final (BO5) secara offline." },
      { q: "Apakah pertandingan full online?", a: "Tidak. Babak penyisihan secara online (10 Mei), sedangkan Semifinal hingga Final diadakan offline (16 Mei) di Gedung D4 FMIPA UNNES." },
      { q: "Apakah panitia menyediakan device / koneksi?", a: "Tidak. Panitia tidak menyediakan HP, internet, atau powerbank. Peserta harus membawa device sendiri." },
      { q: "Apakah ada ketentuan penggunaan fitur in-game?", a: "Skin: ON, Chat(Team): ON, Chat(All): OFF, Stickers: ON, Radio(All): OFF, Recall: ON. Pelanggaran Chat All/Radio All bisa berakibat diskualifikasi." },
      { q: "Apakah sistem pause berlaku?", a: "Ya, jumlah pause 1x per match, maksimal 3 menit. Khusus Final 2x per match. (Pause HANYA berlaku di pertandingan offline)." },
      { q: "Bagaimana jika pemain terputus (DC) saat online?", a: "Pertandingan tetap berlanjut. Pemain yang DC harus menyambung kembali secepatnya. Segala kendala device/koneksi di luar tanggung jawab panitia." }
    ],
    criteria: [
      { name: "Penyisihan (Online)", point: "BO1", details: "Best of One. 10 Mei (Mulai 19.00). Custom Draft Pick Mode. Eliminasi tunggal." },
      { name: "Semifinal (Offline)", point: "BO3", details: "Best of Three. 16 Mei (Mulai 09.30). Gedung D4 FMIPA UNNES." },
      { name: "Perebutan Juara 3", point: "BO3", details: "Best of Three. 16 Mei (Mulai 12.45). Gedung D4 FMIPA UNNES." },
      { name: "Grand Final (Offline)", point: "BO5", details: "Best of Five. 16 Mei (Mulai 14.00). Pembuktian tim MLBB terkuat ICONLAB 2026!" }
    ],
    contacts: [
      { name: "Damar", role: "Narahubung", contact: "+62 822 7986 2622", type: "wa", icon: "D", color: "bg-[#FF8800]" }
    ],
    registrationLink: "https://forms.gle/aTEH3d9xt6wJLZL69",
    rulebookLink: "https://drive.google.com/drive/folders/1GqGG8Kbyy-iQ_eNYyn_E3FGqaz3ompbs?usp=drive_link"
  }
};

const faqs = [
  { q: "Apa itu ICONLAB 2026?", a: "Informatics Competition & Innovation Lab (ICONLAB) 2026 adalah ajang kompetisi teknologi nasional yang bertujuan untuk mewadahi kreativitas dan inovasi mahasiswa dalam mendukung tercapainya Sustainable Development Goals (SDGs) era Society 5.0." },
  { q: "Apa saja cabang kompetisi yang ada?", a: "ICONLAB 2026 menghadirkan tiga pilar kompetisi utama: Game Development, Lomba Karya Tulis Ilmiah (LKTI), dan Mobile Legends: Bang Bang (MLBB)." },
  { q: "Siapa saja yang diperbolehkan menjadi peserta?", a: "Kompetisi ini terbuka bagi mahasiswa aktif dari seluruh perguruan tinggi di Indonesia (untuk GameDev & LKTI) serta pelajar/umum (khusus untuk MLBB & Workshop) sesuai dengan syarat dan ketentuan masing-masing cabang." },
  { q: "Bagaimana sistem pendaftaran dan pembayarannya?", a: "Pendaftaran dilakukan secara daring melalui website resmi ini. Detail biaya dan mekanisme pembayaran dapat dilihat pada Guidebook resmi yang tersedia di setiap halaman detail kompetisi." },
  { q: "Apakah acara ini dilaksanakan secara daring atau luring?", a: "Rangkaian acara dilaksanakan secara hybrid. Tahap awal kompetisi umumnya dilakukan secara daring, sementara babak Final dan Workshop akan dilaksanakan secara luring di lokasi yang telah ditentukan (cek Guidebook untuk detailnya)." },
  { q: "Di mana saya bisa mendapatkan Guidebook resmi?", a: "Guidebook dapat diunduh langsung melalui tombol yang tersedia pada masing-masing halaman detail kompetisi (GameDev, LKTI, atau MLBB) di website ini." }
];

// --- STYLES INJECTION ---
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

  html {
    zoom: 0.85;
  }

  body {
    background-color: #E8B42B; /* Base Yellow Arcade */
    font-family: 'VT323', monospace;
    color: #1a1a1a;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, .font-pixel {
    font-family: 'Press Start 2P', cursive;
    line-height: 1.5;
  }

  /* --- WOW FACTOR BACKGROUNDS --- */

  /* 1. Sunburst Effect (Rotating Rays) */
  .bg-sunburst {
    position: absolute;
    top: -50%; left: -50%; width: 200%; height: 200%;
    background: repeating-conic-gradient(
      rgba(255, 255, 255, 0.25) 0 15deg,
      transparent 15deg 30deg
    );
    animation: rotate-sunburst 40s linear infinite;
    pointer-events: none;
    z-index: 0;
  }
  @keyframes rotate-sunburst {
    100% { transform: rotate(360deg); }
  }

  /* 2. Retro Grid / Checkerboard Moving Floor */
  .perspective-floor-container {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 50vh;
    overflow: hidden;
    z-index: 0;
  }
  .perspective-floor {
    position: absolute;
    bottom: -10%; left: -50%; width: 200%; height: 150%;
    background-image:
      linear-gradient(rgba(255,255,255,0.3) 4px, transparent 4px),
      linear-gradient(90deg, rgba(255,255,255,0.3) 4px, transparent 4px);
    background-size: 60px 60px;
    transform: perspective(400px) rotateX(75deg);
    transform-origin: top center;
    animation: grid-move 3s linear infinite;
    pointer-events: none;
  }
  .perspective-floor.dark {
    background-image:
      linear-gradient(rgba(255,255,255,0.15) 4px, transparent 4px),
      linear-gradient(90deg, rgba(255,255,255,0.15) 4px, transparent 4px);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 80%);
    mask-image: linear-gradient(to bottom, transparent 0%, black 80%);
  }
  .perspective-floor.orange {
    background: linear-gradient(180deg, #D48E1D 0%, #D8841B 50%, #DF7317 100%);
    background-image:
      linear-gradient(rgba(255,255,255,0.8) 4px, transparent 4px),
      linear-gradient(90deg, rgba(255,255,255,0.8) 4px, transparent 4px);
    border-top: 6px solid #FFF;
    box-shadow: 0 -10px 30px rgba(255,255,255,0.4);
  }
  @keyframes grid-move {
    0% { background-position: 0 0; }
    100% { background-position: 0 60px; }
  }

  /* 3. Pixel Dot Grid Pattern */
  .bg-dot-grid {
    position: absolute; inset: 0;
    background-image: radial-gradient(rgba(0,0,0,0.15) 15%, transparent 15%);
    background-size: 30px 30px;
    pointer-events: none;
  }

  /* 4. Checkerboard Retro Pattern */
  .bg-checker {
    position: absolute; inset: 0;
    background-image: linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05)),
                      linear-gradient(45deg, rgba(0,0,0,0.05) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.05) 75%, rgba(0,0,0,0.05));
    background-size: 40px 40px;
    background-position: 0 0, 20px 20px;
    pointer-events: none;
  }

  /* --- ELEMENTS & UI --- */

  .pixel-window {
    background-color: #030841;
    border: 4px solid #fff;
    outline: 4px solid #000;
    box-shadow: 8px 8px 0px #000;
    color: #fff;
    position: relative;
  }
  @media (min-width: 768px) {
    .pixel-window {
      border: 6px solid #fff;
      outline: 6px solid #000;
      box-shadow: 12px 12px 0px #000;
    }
  }

  .pixel-window-light {
    background-color: #fff;
    border: 4px solid #000;
    box-shadow: 6px 6px 0px rgba(0,0,0,0.8);
    color: #000;
  }
  @media (min-width: 768px) {
    .pixel-window-light {
      border: 6px solid #000;
      box-shadow: 10px 10px 0px rgba(0,0,0,0.8);
    }
  }

  /* Arcade Buttons */
  .btn-arcade {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px 14px;
    font-family: 'Press Start 2P', cursive;
    font-size: 8px;
    text-transform: uppercase;
    cursor: pointer;
    background-color: #FF8800;
    color: white;
    border: 3px solid #000;
    box-shadow: inset -2px -2px 0px rgba(0,0,0,0.3), inset 2px 2px 0px rgba(255,255,255,0.4), 3px 3px 0px #000;
    transition: all 0.1s ease-in-out;
    text-shadow: 1px 1px 0px rgba(0,0,0,0.5);
  }
  @media (min-width: 400px) {
    .btn-arcade {
      padding: 12px 20px;
      font-size: 10px;
      border: 4px solid #000;
      box-shadow: inset -4px -4px 0px rgba(0,0,0,0.3), inset 4px 4px 0px rgba(255,255,255,0.4), 4px 4px 0px #000;
    }
  }
  @media (min-width: 768px) {
    .btn-arcade {
      padding: 16px 28px;
      font-size: 14px;
      box-shadow: inset -4px -4px 0px rgba(0,0,0,0.3), inset 4px 4px 0px rgba(255,255,255,0.4), 6px 6px 0px #000;
      text-shadow: 2px 2px 0px rgba(0,0,0,0.5);
    }
  }
  .btn-arcade:active {
    box-shadow: inset -2px -2px 0px rgba(0,0,0,0.3), inset 2px 2px 0px rgba(255,255,255,0.4), 0px 0px 0px #000;
    transform: translate(4px, 4px);
  }
  .btn-arcade.red { background-color: #FF1111; }
  .btn-arcade.blue { background-color: #00AAFF; }
  .btn-arcade.yellow { background-color: #FFDF00; color: #000; text-shadow: none; }
  .btn-arcade.green { background-color: #00FF00; color: #000; text-shadow: none;}

  /* UI Tombol Bulat Arcade Bawah */
  .arcade-round-btn {
    width: 45px; height: 45px;
    border-radius: 50%;
    border: 3px solid white;
    outline: 2px solid black;
    box-shadow: inset -3px -3px 10px rgba(0,0,0,0.5), inset 3px 3px 10px rgba(255,255,255,0.6), 3px 3px 0px black;
    cursor: pointer;
    transition: transform 0.1s, box-shadow 0.1s;
  }
  @media (min-width: 640px) {
    .arcade-round-btn {
      width: 60px; height: 60px;
      border: 4px solid white;
      outline: 3px solid black;
      box-shadow: inset -5px -5px 15px rgba(0,0,0,0.5), inset 5px 5px 15px rgba(255,255,255,0.6), 5px 5px 0px black;
    }
  }
  .arcade-round-btn:active {
    transform: translate(3px, 3px);
    box-shadow: inset -2px -2px 5px rgba(0,0,0,0.5), inset 2px 2px 5px rgba(255,255,255,0.6), 0px 0px 0px black;
  }
  .btn-red { background-color: #E62429; }
  .btn-blue { background-color: #2956B2; }
  .btn-green { background-color: #38A843; }

  /* Joystick Base & Stick */
  .joystick-base {
    width: 80px; height: 30px;
    background: #666;
    border-radius: 50%;
    border: 3px solid black;
    box-shadow: inset -3px -3px 8px rgba(0,0,0,0.5), inset 3px 3px 8px rgba(255,255,255,0.5), 3px 10px 0px rgba(0,0,0,0.8);
    position: relative;
    display: flex; justify-content: center; align-items: flex-end;
  }
  @media (min-width: 640px) {
    .joystick-base {
      width: 120px; height: 40px;
      border: 4px solid black;
      box-shadow: inset -5px -5px 10px rgba(0,0,0,0.5), inset 5px 5px 10px rgba(255,255,255,0.5), 5px 15px 0px rgba(0,0,0,0.8);
    }
  }
  .joystick-stick {
    width: 12px; height: 50px;
    background: linear-gradient(90deg, #ccc 0%, #fff 50%, #888 100%);
    border: 2px solid black;
    position: absolute;
    bottom: 15px;
    z-index: 1;
  }
  @media (min-width: 640px) {
    .joystick-stick { width: 16px; height: 70px; bottom: 20px; }
  }
  .joystick-ball {
    width: 40px; height: 40px;
    background: radial-gradient(circle at 30% 30%, #FFB700, #F78125 60%, #C7651A 100%);
    border-radius: 50%;
    border: 3px solid black;
    position: absolute;
    bottom: 50px;
    z-index: 2;
    box-shadow: 3px 3px 8px rgba(0,0,0,0.5);
  }
  @media (min-width: 640px) {
    .joystick-ball { width: 60px; height: 60px; border: 4px solid black; bottom: 75px; }
  }

  /* Floating Animations */
  .animate-float { animation: float 4s ease-in-out infinite; }
  .animate-float-fast { animation: float 2.5s ease-in-out infinite; }
  .animate-float-slow { animation: float 6s ease-in-out infinite; }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(3deg); }
  }

  /* Cloud moving animation */
  .animate-cloud { animation: drift-cloud linear infinite; }
  @keyframes drift-cloud {
    from { transform: translateX(-100%); }
    to { transform: translateX(100vw); }
  }

  /* Scoreboard Digital Font */
  .digital-clock {
    font-family: 'VT323', monospace;
    color: #ff0000;
    text-shadow: 0 0 5px #ff0000, 0 0 10px #ff0000;
    background-color: #220000;
    border: 3px solid #000;
    box-shadow: inset 3px 3px 8px #000, 2px 2px 0 #fff, 4px 4px 0 #000;
    padding: 6px 12px;
    line-height: 1;
  }
  @media (min-width: 768px) {
    .digital-clock {
      border: 4px solid #000;
      text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;
      box-shadow: inset 4px 4px 10px #000, 4px 4px 0 #fff, 8px 8px 0 #000;
      padding: 10px 20px;
    }
  }

  /* Marquee */
  @keyframes scroll-left { 100% { transform: translateX(-50%); } }
  .animate-marquee-left {
    display: flex; width: max-content; animation: scroll-left 15s linear infinite;
  }
  .animate-marquee-left:hover { animation-play-state: paused; }
  
  @keyframes scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
  .animate-marquee-right {
    display: flex; width: max-content; animation: scroll-right 15s linear infinite;
  }
  .animate-marquee-right:hover { animation-play-state: paused; }

  .scanlines {
    background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.1));
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 100;
  }

  .text-retro-blue { color: #00AAFF; }
  .text-retro-red { color: #FF1111; }
  .text-retro-orange { color: #FF8800; }
  .text-retro-green { color: #00FF00; }
  .text-retro-magenta { color: #FF00FF; }

  .text-glow-blue { text-shadow: 0 0 10px #00AAFF, 0 0 20px #00AAFF; }
  .text-glow-red { text-shadow: 0 0 10px #FF1111, 0 0 20px #FF1111; }
  .text-glow-orange { text-shadow: 0 0 10px #FF8800, 0 0 20px #FF8800; }
  .text-glow-green { text-shadow: 0 0 10px #00FF00, 0 0 20px #00FF00; }
  .text-glow { text-shadow: 0 0 10px rgba(255,255,255,0.8); }
  
  .font-display { font-family: 'Press Start 2P', cursive; }
  .font-sans { font-family: 'VT323', monospace; }
  
  .text-muted-foreground { color: rgba(255,255,255,0.6); }
  .text-foreground { color: #fff; }
  .bg-primary\/20 { background-color: rgba(255,136,0,0.2); }
  .hover\:text-primary:hover { color: #FF8800; }
  .border-primary\/20 { border-color: rgba(255,136,0,0.2); }
  .border-primary\/30 { border-color: rgba(255,136,0,0.3); }

  /* --- PIXEL PAGE TRANSITION --- */
  @keyframes pixelBlockIn {
    0% { transform: scale(0); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: scale(1.1); opacity: 1; }
  }
  @keyframes pixelBlockOut {
    0% { transform: scale(1.1); opacity: 1; }
    50% { opacity: 1; }
    100% { transform: scale(0); opacity: 0; }
  }

`;

// --- DECORATIVE COMPONENTS ---

// 1. Teks Warna-Warni Berkilaun (Neon Glow + Shadow)
function ColorfulText({ text, className = "", intenseGlow = false, shadow = false }) {
  const hexColors = ['#FF1111', '#FF8800', '#FFDF00', '#00FF00', '#00AAFF']; // Merah, Oren, Kuning, Hijau, Biru
  let colorIndex = 0;

  return (
    <span className={className}>
      {text.split('').map((char, i) => {
        if (char === ' ') return <span key={i}> </span>;
        const colorHex = hexColors[colorIndex % hexColors.length];
        colorIndex++;

        const shadowStyle = intenseGlow
          ? { color: colorHex, textShadow: `0 0 5px ${colorHex}, 0 0 15px ${colorHex}, 2px 2px 0px #000` }
          : shadow
            ? { color: colorHex, textShadow: `2px 2px 0px #000` }
            : { color: colorHex };

        return <span key={i} style={shadowStyle} className="relative z-10 transition-all duration-300 hover:brightness-150 inline-block">{char}</span>;
      })}
    </span>
  );
}

// 2. Awan Pixel
function PixelCloud({ className = "", duration = "30s" }) {
  return (
    <div className={`absolute flex items-end animate-cloud z-0 ${className}`} style={{ animationDuration: duration }}>
      <div className="w-8 h-8 md:w-12 md:h-12 bg-white border-t-2 border-l-2 md:border-t-4 md:border-l-4 border-black"></div>
      <div className="w-14 h-14 md:w-20 md:h-20 bg-white border-t-2 md:border-t-4 border-black -ml-2 md:-ml-4 shadow-[2px_2px_0_#000] md:shadow-[4px_4px_0_#000]"></div>
      <div className="w-10 h-8 md:w-16 md:h-12 bg-white border-t-2 border-r-2 md:border-t-4 md:border-r-4 border-black -ml-2 md:-ml-4 shadow-[2px_2px_0_#000] md:shadow-[4px_4px_0_#000]"></div>
    </div>
  );
}

// 3. Bintang Minecraft (Kotak Bersinar)
function PixelTooltip({ text, isVisible }) {
  if (!isVisible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
    >
      <div className="bg-black border-2 border-white px-3 py-1 shadow-[4px_4px_0_#000]">
        <span className="font-pixel text-[8px] md:text-[10px] text-white whitespace-nowrap">{text}</span>
      </div>
      <div className="w-2 h-2 bg-black border-r-2 border-b-2 border-white rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
    </motion.div>
  );
}

function MinecraftStar({ style, variant = "white" }) {
  if (variant === "yellow") {
    return (
      <div
        className="absolute w-2 h-2 md:w-4 md:h-4 bg-[#FFDF00] border-2 md:border-4 border-black shadow-[inset_1px_1px_0_rgba(255,255,255,0.7),_2px_2px_0_#000] animate-float z-0"
        style={style}
      />
    );
  }
  return (
    <div
      className="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-white rotate-45 animate-pulse glow-white shadow-[0_0_10px_#fff]"
      style={style}
    />
  );
}

function MinecraftStarDecoration({ count = 12, sectionId = "" }) {
  const [stars, setStars] = useState([]);
  useEffect(() => {
    // Strategic positioning using a grid-based approach to avoid center crowding
    const newStars = Array.from({ length: count }).map((_, i) => {
      const gridX = (i % 8);
      const gridY = Math.floor(i / 8);
      return {
        id: i,
        top: `${(gridY * 12) + 5 + Math.random() * 8}%`,
        left: `${(gridX * 12) + 5 + Math.random() * 8}%`,
        scale: Math.random() * 0.4 + 0.6,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 4
      };
    });
    setStars(newStars);
  }, [count, sectionId]);
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-60">
      {stars.map(s => (
        <MinecraftStar
          key={s.id}
          style={{ top: s.top, left: s.left, transform: `scale(${s.scale})`, animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }}
        />
      ))}
    </div>
  );
}

// 4. Dekorasi Ikon Vektor Global (Tanpa Scatter/Fade)
function SectionDecoration({ icons = [] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map((icon, idx) => (
        <div key={idx} className={`absolute ${icon.pos} flex items-center justify-center transition-all duration-700 ease-out`}
          style={{ transform: `rotate(${icon.rotation || 0}deg)` }}>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: icon.delay || 0 }}
            className={`${idx % 2 === 0 ? 'animate-float' : 'animate-float-slow'}`}
          >
            <img
              src={icon.src}
              alt="Decoration"
              className={`${icon.size || 'w-10 h-10'} object-contain opacity-60`}
              style={{ filter: `brightness(1.5) sepia(100%) saturate(500%) hue-rotate(10deg) drop-shadow(0 0 8px rgba(255,191,0,0.5))` }}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// 5. Lautan Bintang (Star 1.svg) untuk Background Seksi
function StarDecoration({ count = 10, sectionId = "" }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate stars in a circular pattern around the center
    const newStars = Array.from({ length: count }).map((_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 35 + Math.random() * 15; // 35-50% radius
      const topPos = 50 + radius * Math.sin(angle);
      const leftPos = 50 + radius * Math.cos(angle);
      return {
        id: i,
        top: `${topPos}%`,
        left: `${leftPos}%`,
        size: `${Math.floor(Math.random() * 20) + 15}px`,
        delay: Math.random() * 2,
        duration: Math.random() * 3 + 3,
      };
    });
    setStars(newStars);
  }, [count, sectionId]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40">
      {stars.map((star) => (
        <motion.img
          key={star.id}
          src="/icon/Star 1.svg"
          alt="star"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: star.delay }}
          className="absolute object-contain filter invert"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animation: `float ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
            filter: `brightness(1.5) sepia(100%) saturate(500%) hue-rotate(10deg) drop-shadow(0 0 10px rgba(255,191,0,1))`
          }}
        />
      ))}
    </div>
  );
}

// --- PIXEL TRANSITION COMPONENT ---
function PixelTransition({ isActive, phase }) {
  const cols = 12;
  const rows = 8;
  const totalCells = cols * rows;

  return (
    <div
      className={`fixed inset-0 z-[9999] pointer-events-none ${isActive ? '' : 'hidden'}`}
      style={{ perspective: '600px' }}
    >
      <div
        className="w-full h-full grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: totalCells }).map((_, i) => {
          const col = i % cols;
          const row = Math.floor(i / cols);
          // Diagonal wave delay: top-left to bottom-right
          const delay = (col + row) * 0.03;
          const colors = ['#FF1111', '#FF8800', '#FFDF00', '#00FF00', '#00AAFF', '#030841'];
          const color = colors[(col + row) % colors.length];

          return (
            <div
              key={i}
              style={{
                backgroundColor: color,
                animation: isActive
                  ? `${phase === 'enter' ? 'pixelBlockIn' : 'pixelBlockOut'} 0.4s cubic-bezier(0.55, 0, 0.1, 1) ${delay}s both`
                  : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [routeParams, setRouteParams] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState('enter'); // 'enter' or 'exit'

  const navigate = (route, params = null) => {
    // Don't transition to the same page
    if (route === currentRoute && params === routeParams) return;

    setIsTransitioning(true);
    setTransitionPhase('enter');

    // Phase 1: Blocks fill the screen (enter) — ~0.7s
    setTimeout(() => {
      setCurrentRoute(route);
      setRouteParams(params);
      window.scrollTo({ top: 0 });
      setTransitionPhase('exit');
    }, 700);

    // Phase 2: Blocks clear away (exit) — starts at 0.7s, lasts ~0.7s
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1400);
  };

  return (
    <div className="min-h-screen relative bg-[#E8B42B] text-[#1a1a1a] selection:bg-[#FF1111] selection:text-white overflow-x-hidden">
      <style>{globalStyles}</style>
      <div className="fixed inset-0 scanlines pointer-events-none"></div>

      <PixelTransition isActive={isTransitioning} phase={transitionPhase} />

      <Navbar navigate={navigate} currentRoute={currentRoute} routeParams={routeParams} />

      <main className="pt-[58px] md:pt-[80px] relative z-10 w-full overflow-hidden">
        {currentRoute === 'home' && <HomePage navigate={navigate} />}
        {currentRoute === 'event' && <EventDetailPage eventId={routeParams} navigate={navigate} />}
        {currentRoute === 'about' && <AboutPage />}
        {currentRoute === 'sponsorship' && <SponsorshipPage />}
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}

// --- COMPONENTS ---

function Navbar({ navigate, currentRoute, routeParams }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDaftar = () => {
    if (currentRoute !== 'home') {
      navigate('home');
      setTimeout(() => {
        const el = document.getElementById('acara');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 800);
    } else {
      const el = document.getElementById('acara');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const getNavItemClass = (route, params = null) => {
    const isActive = currentRoute === route && (params === null || routeParams === params);
    return `font-pixel text-[10px] md:text-[13px] tracking-widest font-bold transition-all cursor-pointer p-2 ${isActive
      ? "text-[#FF1111] border-b-4 border-[#FF1111] -mb-[4px] md:-mb-[8px]"
      : "text-[#030841] hover:text-[#FF1111]"
      }`;
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b-4 md:border-b-8 border-black shadow-[0_4px_0_rgba(0,0,0,0.1)] md:shadow-[0_8px_0_rgba(0,0,0,0.1)] px-4 py-2 md:py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo Clickable */}
        <div
          className="flex items-center cursor-pointer gap-1 sm:gap-2 md:gap-3 group"
          onClick={() => navigate('home')}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-black flex items-center justify-center border-2 md:border-4 border-white shadow-[0_0_10px_#00AAFF] group-hover:scale-110 transition-transform">
            <img src="/logo-icn.png" alt="ICN Logo" className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-cover" />
          </div>
          <ColorfulText text="ICON.LAB" className="font-pixel text-xs sm:text-lg md:text-xl transition transform group-hover:scale-105" intenseGlow={false} shadow={true} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-4 md:space-x-6 h-full">
          <button onClick={() => navigate('home')} className={getNavItemClass('home')}>START</button>

          <div className="relative h-full flex items-center"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}>
            <button className={`font-pixel text-[10px] md:text-[13px] tracking-widest font-bold flex items-center px-2 md:px-3 py-1 md:py-2 border-2 md:border-4 border-black shadow-[2px_2px_0_#000] md:shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-transform ${currentRoute === 'event' ? 'bg-[#FF1111] text-white' : 'bg-[#FFDF00] text-black'}`}>
              QUESTS <ChevronDown className="w-3 h-3 md:w-4 md:h-4 ml-1" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-[80%] left-0 bg-white border-2 md:border-4 border-black flex flex-col w-56 md:w-64 py-2 z-50 shadow-[4px_4px_0_#000] md:shadow-[8px_8px_0_#000] mt-2">
                {Object.values(eventData).map(ev => (
                  <button
                    key={ev.id}
                    onClick={() => { navigate('event', ev.id); setIsDropdownOpen(false); }}
                    className={`text-left px-4 md:px-5 py-2 md:py-3 font-pixel text-[10px] md:text-[11px] border-b border-dashed border-gray-300 last:border-0 transition-colors flex items-center gap-2 ${routeParams === ev.id ? 'bg-[#FF1111] text-white' : 'text-black hover:bg-gray-100'}`}
                  >
                    <span className={routeParams === ev.id ? 'text-white' : 'text-[#FF8800]'}>&gt;</span> {ev.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => navigate('about')} className={getNavItemClass('about')}>PLAYERS</button>
          <button onClick={() => navigate('sponsorship')} className={getNavItemClass('sponsorship')}>MERCHANT</button>

          <button onClick={handleDaftar} className="btn-arcade yellow !px-4 !py-2 md:!px-6 md:!py-3 !text-[10px] md:!text-[12px] ml-2 md:ml-4">
            DAFTAR Sekarang
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden p-2 text-white bg-black border-2 border-white shadow-[2px_2px_0_#000] focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full max-h-screen overflow-y-auto bg-white border-b-4 border-black flex flex-col p-4 md:p-6 space-y-4 shadow-[0_8px_0_#000]">
          <button onClick={() => { navigate('home'); setIsOpen(false); }} className={`font-pixel text-xs md:text-sm font-bold text-left border-b-2 border-dashed border-gray-300 pb-3 ${currentRoute === 'home' ? 'text-[#FF1111]' : 'text-black'}`}>START {currentRoute === 'home' && '<<'}</button>

          <div className="flex flex-col space-y-3 border-b-2 border-dashed border-gray-300 pb-3">
            <span className={`font-pixel text-xs md:text-sm ${currentRoute === 'event' ? 'text-[#FF1111]' : 'text-gray-500'}`}>QUESTS:</span>
            {Object.values(eventData).map(ev => (
              <button
                key={ev.id}
                onClick={() => { navigate('event', ev.id); setIsOpen(false); }}
                className={`font-pixel text-[10px] md:text-xs font-bold text-left pl-4 flex items-center gap-2 ${routeParams === ev.id ? 'text-[#FF1111]' : 'text-black hover:text-[#00AAFF]'}`}
              >
                <span className={routeParams === ev.id ? 'text-[#FF1111]' : 'text-[#FF1111]'}>{routeParams === ev.id ? '>>' : '*'}</span> {ev.title}
              </button>
            ))}
          </div>

          <button onClick={() => { navigate('about'); setIsOpen(false); }} className={`font-pixel text-xs md:text-sm font-bold text-left border-b-2 border-dashed border-gray-300 pb-3 ${currentRoute === 'about' ? 'text-[#FF1111]' : 'text-black'}`}>PLAYERS (ABOUT) {currentRoute === 'about' && '<<'}</button>
          <button onClick={() => { navigate('sponsorship'); setIsOpen(false); }} className={`font-pixel text-xs md:text-sm font-bold text-left border-b-2 border-dashed border-gray-300 pb-3 ${currentRoute === 'sponsorship' ? 'text-[#FF1111]' : 'text-black'}`}>MERCHANT (SPONSOR) {currentRoute === 'sponsorship' && '<<'}</button>

          <button onClick={handleDaftar} className="btn-arcade text-center mt-2 !py-3">
            DAFTAR SEKARANG
          </button>
        </div>
      )}
    </nav>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-04-23T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          d: Math.floor(distance / (1000 * 60 * 60 * 24)),
          h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center mt-6 mb-8 md:mb-12 bg-[#111] border-4 md:border-8 border-gray-800 p-2 md:p-4 shadow-[6px_6px_0_#000] md:shadow-[10px_10px_0_#000] inline-block mx-auto transform -rotate-1 md:-rotate-2 hover:rotate-0 transition-transform relative z-10 w-[95%] sm:w-auto max-w-full">
      <h3 className="font-pixel text-[#00FF00] text-[10px] md:text-sm mb-2 md:mb-4 animate-pulse">SYSTEM ONLINE IN...</h3>
      <div className="flex justify-center items-center gap-1 sm:gap-2 md:gap-4">
        {[
          { label: 'DAYS', value: timeLeft.d },
          { label: 'HRS', value: timeLeft.h },
          { label: 'MINS', value: timeLeft.m },
          { label: 'SECS', value: timeLeft.s }
        ].map((item, idx, arr) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center">
              <div className="digital-clock text-xl sm:text-4xl md:text-6xl lg:text-7xl !px-2 !py-2 sm:!px-4 sm:!py-3">
                {item.value.toString().padStart(2, '0')}
              </div>
              <div className="font-pixel text-[6px] sm:text-[8px] md:text-xs mt-1 md:mt-3 text-white/50">{item.label}</div>
            </div>
            {idx < arr.length - 1 && (
              <div className="text-xl sm:text-2xl md:text-4xl text-[#ff0000] font-pixel self-center -mt-4 sm:-mt-6 animate-pulse">:</div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

// --- PAGE COMPONENTS ---

function HomePage({ navigate }) {
  // --- SCROLL PROGRESS FOR HERO DECORATIONS ---
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredBtn, setHoveredBtn] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(Math.max(window.scrollY / (window.innerHeight * 0.8), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <div className="w-full flex flex-col">
      <MinecraftStarDecoration count={48} sectionId="home-hero-field" />

      {/* =========================================
          1. HERO SECTION (Kombinasi Wow Factor + Arcade Layout)
          ========================================= */}
      <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center text-center overflow-hidden pt-0 md:pt-10">
        {/* The Animated Sunburst Background */}
        <div className="bg-sunburst"></div>
        <div className="bg-dot-grid opacity-50"></div>

        {/* Corner Decorations */}
        <img src="/corner/Group 37.png" alt="Corner Left" className="absolute top-0 left-0 w-20 sm:w-40 md:w-64 lg:w-80 z-40 pointer-events-none drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] animate-fade-in transform scale-[0.85] origin-top-left" />
        <img src="/corner/Group 36.png" alt="Corner Right" className="absolute top-0 right-0 w-20 sm:w-40 md:w-64 lg:w-80 z-40 pointer-events-none drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] animate-fade-in transform scale-[0.85] origin-top-right" />

        {/* Floor Grid 3D (Orange Arcade floor as requested) */}
        <div className="perspective-floor-container">
          <div className="perspective-floor orange"></div>
        </div>



        {/* Main Center Area: Logo and Banners */}
        <div className="relative z-20 flex flex-col items-center justify-center flex-grow w-full max-w-5xl px-4 mt-6 md:mt-6 pb-20 md:pb-48">

          {/* Welcome Text */}
          <div className="mb-2 sm:mb-4 md:mb-6 mt-0 md:mt-4">
            <h2 className="font-pixel text-[10px] sm:text-[14px] md:text-lg text-white tracking-widest uppercase animate-pulse drop-shadow-[2px_2px_0_#000]">
              --- Welcome to ---
            </h2>
          </div>

          {/* Logo ICON.LAB */}
          <div className="relative w-full max-w-[320px] sm:max-w-[500px] md:max-w-[1000px] mb-2 md:mb-6 z-30 drop-shadow-[0_4px_0_rgba(0,0,0,0.8)] md:drop-shadow-[0_6px_0_rgba(0,0,0,0.8)]">
            {/* Ambient Glow */}
            <div className="absolute inset-y-2 inset-x-0 md:inset-y-8 md:inset-x-0 bg-gradient-to-r from-[#FF1111] via-[#FF8800] to-[#00AAFF] blur-[15px] sm:blur-[30px] md:blur-[60px] opacity-90 md:opacity-100 rounded-[100px] z-0 pointer-events-none transform scale-105"></div>
            {/* Intense Core Glow */}
            <div className="absolute inset-y-6 inset-x-4 md:inset-y-16 md:inset-x-12 bg-gradient-to-r from-[#FF1111] via-[#FFDF00] to-[#00AAFF] blur-[8px] sm:blur-[15px] md:blur-[25px] opacity-100 rounded-[100px] z-0 pointer-events-none mix-blend-screen"></div>
            <img src="/ICONLAB.png" alt="ICON LAB" className="w-full object-contain relative z-10" />
          </div>

          {/* Theme Image (Tema.png) */}
          <div className="w-full max-w-[280px] sm:max-w-[400px] md:max-w-[800px] mb-2 sm:mb-6 md:mb-8 z-30 transform hover:scale-105 transition-transform duration-300 drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)]">
            <img src="/Tema.png" alt="Tema ICON LAB" className="w-full object-contain" />
          </div>

          {/* Tagline Image */}
          <div className="w-full max-w-[220px] sm:max-w-[250px] md:max-w-[450px] mb-4 sm:mb-8 md:mb-12 z-30 animate-float-slow drop-shadow-[0_2px_0_rgba(0,0,0,0.8)] md:drop-shadow-[0_4px_0_rgba(0,0,0,0.8)]">
            <img src="/Group 468.png" alt="Tagline" className="w-full object-contain" />
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mb-12 sm:mb-16 z-30">
            <button onClick={() => {
              const el = document.getElementById('acara');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }} className="btn-arcade green !py-4 !px-10 text-sm md:text-base md:!py-5 md:!px-14">
              &#9654; DAFTAR SEKARANG
            </button>
          </div>

          {/* Countdown Banner (Group 459.png) */}
          <div className="w-full max-w-[320px] sm:max-w-[700px] md:max-w-[950px] mt-8 md:mt-24 mb-2 md:mb-6 z-30 drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)]">
            <img src="/Group 459.png" alt="Jangan sampai ketinggalan" className="w-full object-contain transform scale-105" />
          </div>

          <Countdown />

        </div>

        {/* Arcade Controllers at Bottom (Responsive Wrapper) */}
        <div className="absolute bottom-4 sm:bottom-6 w-full max-w-5xl px-2 sm:px-6 flex justify-between items-end z-30">
          {/* Left: Buttons */}
          <div className="flex gap-2 sm:gap-4 md:gap-8 ml-1 sm:ml-2 md:ml-8 mb-2 sm:mb-4 scale-[0.65] sm:scale-75 md:scale-100 origin-bottom-left">
            <div className="relative" onMouseEnter={() => setHoveredBtn('gamedev')} onMouseLeave={() => setHoveredBtn(null)}>
              <PixelTooltip text="QUEST: GAMEDEV" isVisible={hoveredBtn === 'gamedev'} />
              <div className="arcade-round-btn btn-red hover:scale-110 !shadow-[0_4px_0_#990000] active:!shadow-none active:translate-y-[4px] transition-all" onClick={() => navigate('event', 'gamedev')}></div>
            </div>
            <div className="relative" onMouseEnter={() => setHoveredBtn('lkti')} onMouseLeave={() => setHoveredBtn(null)}>
              <PixelTooltip text="QUEST: LKTI" isVisible={hoveredBtn === 'lkti'} />
              <div className="arcade-round-btn btn-blue hover:scale-110 !shadow-[0_4px_0_#0066AA] active:!shadow-none active:translate-y-[4px] transition-all" onClick={() => navigate('event', 'lkti')}></div>
            </div>
            <div className="relative" onMouseEnter={() => setHoveredBtn('mlbb')} onMouseLeave={() => setHoveredBtn(null)}>
              <PixelTooltip text="QUEST: MLBB" isVisible={hoveredBtn === 'mlbb'} />
              <div className="arcade-round-btn btn-green hover:scale-110 !shadow-[0_4px_0_#009900] active:!shadow-none active:translate-y-[4px] transition-all" onClick={() => navigate('event', 'mlbb')}></div>
            </div>
          </div>

          {/* Center: Coin Slot */}
          <div className="relative flex flex-col items-center opacity-80 mb-1 sm:mb-2 cursor-pointer hover:opacity-100 transition-all scale-[0.6] sm:scale-75 md:scale-100 origin-bottom"
            onMouseEnter={() => setHoveredBtn('about')} onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => navigate('about')}>
            <PixelTooltip text="PLAYER INFO" isVisible={hoveredBtn === 'about'} />
            <img src="/coin.svg" alt="Insert Coin" className={`w-12 h-12 sm:w-16 sm:h-16 md:w-16 md:h-16 object-contain rounded-full mb-1 drop-shadow-[0_4px_0_rgba(0,0,0,0.5)] ${hoveredBtn === 'about' ? 'animate-bounce' : ''}`} />
            <span className="font-pixel text-[8px] md:text-[10px] text-white bg-black px-1 md:px-2 py-1 border border-white">INSERT COIN</span>
          </div>

          {/* Right: Joystick */}
          <div className="relative group mr-1 sm:mr-2 md:mr-8 mb-2 sm:mb-4 transition-transform cursor-pointer scale-[0.65] sm:scale-75 md:scale-100 origin-bottom-right"
            onMouseEnter={() => setHoveredBtn('sponsor')} onMouseLeave={() => setHoveredBtn(null)}
            onClick={() => navigate('sponsorship')}>
            <PixelTooltip text="MERCHANT / SPONSOR" isVisible={hoveredBtn === 'sponsor'} />
            <div className={`joystick-base ${hoveredBtn === 'sponsor' ? 'scale-105' : ''} transition-transform`}>
              <div className={`joystick-stick ${hoveredBtn === 'sponsor' ? 'rotate-12' : ''} transition-transform`}></div>
              <div className={`joystick-ball ${hoveredBtn === 'sponsor' ? 'scale-110' : ''} transition-transform`}></div>
            </div>
          </div>
        </div>

        {/* Gradient shadow separating hero and content */}
        <div className="absolute bottom-0 w-full h-12 md:h-16 bg-gradient-to-t from-[#030841] to-transparent z-10"></div>
      </section>

      {/* =========================================
          2. HIGHLIGHT ACARA SECTION (Laut Malam / Dark Navy Floor)
          ========================================= */}
      <section id="acara" className="w-full relative py-12 md:py-20 bg-[#030841] overflow-hidden border-t-4 md:border-t-8 border-white shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-20">
        {/* Latar Belakang Gelap dengan Lantai 3D Transparan */}
        <div className="perspective-floor-container">
          <div className="perspective-floor dark"></div>
        </div>
        <StarDecoration count={20} sectionId="select-quest" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 z-10 relative">
          <div className="mb-10 md:mb-16 text-center">
            <h1 className="font-pixel text-lg sm:text-4xl md:text-6xl inline-block bg-white px-3 sm:px-8 py-2 sm:py-4 border-4 md:border-8 border-black shadow-[4px_4px_0_#000] md:shadow-[10px_10px_0_#000]">
              <ColorfulText text="SELECT QUEST" intenseGlow={false} shadow={true} />
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {Object.values(eventData).map((ev) => (
              <div key={ev.id} className={`pixel-window group hover:-translate-y-2 md:hover:-translate-y-4 transition-transform duration-300 flex flex-col h-full bg-black/90 mt-4 md:mt-0`}>
                {/* Responsive Floating Badge */}
                <div className={`absolute -top-4 -right-2 sm:-top-6 sm:-right-4 md:-right-6 ${ev.themeColor} border-2 md:border-4 border-white p-2 md:p-3 ${ev.shadowColor} shadow-[4px_4px_0_#000] md:shadow-[6px_6px_0_#000] rotate-12 z-20 group-hover:rotate-0 transition-transform`}>
                  {React.cloneElement(ev.icon, { className: "w-6 h-6 md:w-10 md:h-10 text-white" })}
                </div>

                <div className={`p-3 md:p-4 border-b-2 md:border-b-4 border-white ${ev.themeColor} text-center shadow-[inset_0_-3px_0_rgba(0,0,0,0.2)]`}>
                  <h3 className={`font-pixel text-sm sm:text-lg md:text-xl text-white drop-shadow-[2px_2px_0_#000]`}>{ev.title}</h3>
                </div>

                <div className="p-4 md:p-6 flex-grow flex flex-col">
                  <p className="font-VT323 text-xl md:text-2xl text-white/90 mb-6 md:mb-8 flex-grow leading-relaxed">{ev.shortDesc}</p>

                  <div className="mt-auto">
                    <button onClick={() => navigate('event', ev.id)} className={`btn-arcade w-full text-[10px] md:text-xs !py-2 md:!py-3 !px-2 md:!px-4 !bg-white !text-black !shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.2),3px_3px_0_#000] md:!shadow-[inset_-3px_-3px_0_rgba(0,0,0,0.2),4px_4px_0_#000]`}>
                      READ MORE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          3. TIMELINE SECTION (Terang + Awan Mario)
          ========================================= */}
      <section className="w-full relative py-12 md:py-20 bg-[#E8B42B] overflow-hidden z-10">
        <div className="bg-dot-grid"></div>
        {/* Pixel Clouds Animation */}
        <PixelCloud className="top-10 left-0 scale-75 md:scale-100" duration="40s" />
        <PixelCloud className="top-1/3 left-[-20%] scale-50 md:scale-100" duration="25s" />
        <PixelCloud className="top-2/3 left-[-10%] scale-50 md:scale-75" duration="35s" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 z-10 relative">
          <div className="mb-10 md:mb-16 text-center">
            <h1 className="font-pixel text-xl sm:text-4xl md:text-6xl inline-block bg-black px-4 sm:px-8 py-3 md:py-4 border-4 md:border-8 border-white shadow-[6px_6px_0_#000] md:shadow-[10px_10px_0_#000] transform -rotate-1">
              <ColorfulText text="TIMELINE" intenseGlow={true} />
            </h1>
          </div>
          <TimelineViewer events={Object.values(eventData)} />
        </div>
      </section>

      {/* =========================================
          4. SPONSOR MARQUEE SECTION (Pita Bahaya Merah)
          ========================================= */}
      <section className="w-full relative overflow-hidden py-10 md:py-16 border-y-4 md:border-y-8 border-black bg-[#FF1111] z-20 shadow-[0_10px_0_rgba(0,0,0,0.5)] md:shadow-[0_15px_0_rgba(0,0,0,0.5)]">
        {/* Striped Caution Tape */}
        <StarDecoration count={8} sectionId="sponsors" />
        <div className="absolute top-0 left-0 w-full h-2 md:h-4 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#FFDF00_10px,#FFDF00_20px)] md:bg-[repeating-linear-gradient(45deg,#000,#000_15px,#FFDF00_15px,#FFDF00_30px)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 md:h-4 bg-[repeating-linear-gradient(45deg,#000,#000_10px,#FFDF00_10px,#FFDF00_20px)] md:bg-[repeating-linear-gradient(45deg,#000,#000_15px,#FFDF00_15px,#FFDF00_30px)]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 md:mb-10 text-center mt-6">
          <h1 className="font-pixel text-xl sm:text-3xl md:text-5xl text-white drop-shadow-[2px_2px_0_#000] md:drop-shadow-[4px_4px_0_#000] inline-block bg-black px-4 md:px-6 py-2 border-2 md:border-4 border-white">
            SPONSORS & PARTNERS
          </h1>
        </div>

        <div className="relative w-full overflow-hidden mb-8 md:mb-12">
          <div className="animate-marquee-left flex gap-4 md:gap-8 px-4">
            {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((i, idx) => (
              <div key={idx} className="bg-white w-32 h-20 sm:w-48 sm:h-32 md:w-64 md:h-40 border-2 md:border-4 border-black flex justify-center items-center overflow-hidden flex-shrink-0 shadow-[4px_4px_0_#000] md:shadow-[8px_8px_0_#000] transform -rotate-2 hover:rotate-0 transition">
                <span className="font-pixel text-sm md:text-xl text-black">SPONSOR {i}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full overflow-hidden mb-6 md:mb-8">
          <div className="animate-marquee-right flex gap-4 md:gap-8 px-4">
            {[
              { src: '/medpart/Logo HMIF ITERA.jpg', alt: 'HMIF ITERA' },
              { src: '/medpart/Logo OmahTI (black).png', alt: 'OmahTI' },
              { src: '/medpart/LOGO @INFOLOMBA (Untuk Background Poster Warna Gelap).png', alt: 'InfoLomba' },
              { src: '/medpart/Logo HMIF ITERA.jpg', alt: 'HMIF ITERA' },
              { src: '/medpart/Logo OmahTI (black).png', alt: 'OmahTI' },
              { src: '/medpart/LOGO @INFOLOMBA (Untuk Background Poster Warna Gelap).png', alt: 'InfoLomba' },
              { src: '/medpart/Logo HMIF ITERA.jpg', alt: 'HMIF ITERA' },
              { src: '/medpart/Logo OmahTI (black).png', alt: 'OmahTI' },
              { src: '/medpart/LOGO @INFOLOMBA (Untuk Background Poster Warna Gelap).png', alt: 'InfoLomba' },
            ].map((logo, idx) => (
              <div key={idx} className="bg-white w-24 h-16 sm:w-40 sm:h-24 md:w-56 md:h-32 border-2 md:border-4 border-white flex justify-center items-center overflow-hidden flex-shrink-0 shadow-[4px_4px_0_#000] md:shadow-[6px_6px_0_#000] p-2 md:p-4">
                <img src={logo.src} alt={logo.alt} className="max-w-full max-h-full object-contain" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 md:mt-10">
          <button onClick={() => navigate('sponsorship')} className="btn-arcade yellow text-sm md:text-xl px-6 py-3 md:px-10 md:py-5">
            JOIN THE PARTY
          </button>
        </div>
      </section>

      {/* =========================================
          5. FAQ SECTION (Retro Checker Pattern)
          ========================================= */}
      <section id="faq" className="w-full relative py-12 md:py-20 bg-[#E8B42B] overflow-hidden z-10">
        <div className="bg-checker"></div>
        <StarDecoration count={10} sectionId="faq" />
        <SectionDecoration icons={[
          { src: "/icon/_x31_5.svg", pos: "top-[10%] left-[5%]", size: "w-16 h-16", delay: 0.1, hue: "hue-rotate(45deg)" },
          { src: "/icon/_x32_2.svg", pos: "bottom-[15%] right-[8%]", size: "w-12 h-12", delay: 0.4, hue: "hue-rotate(180deg)" },
          { src: "/icon/_x33_1.svg", pos: "top-[40%] right-[3%]", size: "w-14 h-14", delay: 0.7, hue: "hue-rotate(270deg)" },
        ]} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 z-10 relative">
          <div className="mb-10 md:mb-16 text-center">
            <h1 className="relative inline-block bg-white px-12 sm:px-24 md:px-32 py-3 md:py-6 border-2 md:border-4 border-black shadow-[4px_4px_0_#000] md:shadow-[10px_10px_0_#000]">
              <div className="absolute left-3 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-[#FF1111] border-2 border-black rotate-45 animate-pulse"></div>
              <img src="/judulsec/Faq.png" alt="FAQ" className="h-10 sm:h-20 md:h-28 w-auto object-contain block mx-auto translate-x-[16%]" />
              <div className="absolute right-3 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 bg-[#00AAFF] border-2 border-black rotate-45 animate-pulse"></div>
            </h1>
          </div>
          <div className="flex flex-col gap-4 md:gap-8">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} index={idx} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function TimelineViewer({ events }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentEvent = events[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % events.length);
  const prev = () => setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));

  return (
    <div className={`pixel-window !bg-[#030841] p-4 sm:p-6 md:p-12 relative transition-colors duration-500`}>

      {/* Controller Buttons */}
      <div className="flex justify-between items-center mb-6 md:mb-10 bg-black/50 p-2 sm:p-4 border-2 md:border-4 border-white shadow-[inset_0_0_5px_#000] md:shadow-[inset_0_0_10px_#000] z-20 relative">
        <button onClick={prev} className={`btn-arcade !p-1 sm:!p-2 !bg-[#FFDF00] !text-black`}><ChevronLeft className="w-5 h-5 md:w-8 md:h-8" /></button>
        <div className="flex-1 flex justify-center items-center h-14 sm:h-20 md:h-24 px-4">
          {currentEvent.titleImage ? (
            <img
              src={currentEvent.titleImage}
              alt={currentEvent.title}
              className={`max-h-full w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transform ${currentEvent.titleScale || 'scale-100'} ${currentEvent.titleTranslate || ''} transition-transform duration-300`}
            />
          ) : (
            <h3 className={`font-pixel text-sm sm:text-2xl md:text-4xl text-center ${currentEvent.colorStr} drop-shadow-[1px_1px_0_#000] md:drop-shadow-[2px_2px_0_#000]`}>
              {currentEvent.title}
            </h3>
          )}
        </div>
        <button onClick={next} className={`btn-arcade !p-1 sm:!p-2 !bg-[#FFDF00] !text-black`}><ChevronRight className="w-5 h-5 md:w-8 md:h-8" /></button>
      </div>

      {/* Map Level path */}
      <div className="relative border-l-4 md:border-l-8 border-dashed border-white/50 ml-4 md:ml-16 space-y-8 md:space-y-12 py-4 md:py-8 z-10">
        {currentEvent.timeline.map((item, idx) => (
          <div key={idx} className="relative pl-8 sm:pl-12 md:pl-20 group">
            {/* Level Node (Coin/Star style) */}
            <div className={`absolute -left-[14px] md:-left-[22px] top-0 md:top-1 w-6 h-6 md:w-10 md:h-10 ${currentEvent.themeColor} border-2 md:border-4 border-white rounded-full shadow-[0_0_10px_currentColor] md:shadow-[0_0_15px_currentColor] group-hover:scale-125 transition-transform flex items-center justify-center z-10`}>
              <Star className="w-3 h-3 md:w-5 md:h-5 text-white fill-white" />
            </div>

            <div className="bg-white text-black border-2 md:border-4 border-black p-2 sm:p-4 md:p-6 shadow-[3px_3px_0_#000] md:shadow-[8px_8px_0_#000] hover:-translate-y-1 md:hover:-translate-y-2 transition-transform">
              <span className={`font-pixel text-[6px] sm:text-xs md:text-sm block mb-1 md:mb-3 px-1 sm:px-3 py-0.5 sm:py-1 bg-black text-white w-fit border border-white tracking-tighter sm:tracking-normal`}>{item.date}</span>
              <p className="font-VT323 text-lg sm:text-3xl md:text-4xl font-bold tracking-tight sm:tracking-wide leading-tight">{item.step}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = ['bg-[#FF1111]', 'bg-[#FF8800]', 'bg-[#FFDF00]', 'bg-[#00FF00]', 'bg-[#00AAFF]'];
  const color = colors[index % colors.length];

  return (
    <div className="pixel-window-light mb-2 md:mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-3 sm:p-4 md:p-6 focus:outline-none text-left group gap-2 sm:gap-4 bg-white hover:bg-gray-100 transition"
      >
        <span className="flex items-start sm:items-center gap-2 sm:gap-4 flex-1">
          <span className={`w-5 h-5 sm:w-8 sm:h-8 ${color} border-2 md:border-4 border-black shadow-[1px_1px_0_#000] md:shadow-[2px_2px_0_#000] flex-shrink-0 flex items-center justify-center font-pixel text-white text-[8px] sm:text-xs mt-1 sm:mt-0`}>?</span>
          <span className="font-pixel text-[9px] sm:text-sm md:text-lg leading-snug sm:leading-relaxed tracking-tighter sm:tracking-normal">{question}</span>
        </span>
        <span className={`font-pixel text-xs sm:text-lg md:text-2xl flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out border-t-2 md:border-t-4 border-black bg-gray-50 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 border-t-0'}`}>
        <div className="p-4 md:p-8 flex items-start gap-3 md:gap-4">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-black border-2 md:border-4 border-gray-400 flex-shrink-0 flex items-center justify-center mt-1">
            <span className="font-pixel text-white text-[10px] md:text-xs">&gt;</span>
          </div>
          <p className="font-VT323 text-black text-lg sm:text-2xl md:text-3xl leading-relaxed text-justify">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// --- SUB-PAGES ---
function EventDetailPage({ eventId, navigate }) {
  const ev = eventData[eventId];
  if (!ev) return <div className="text-center font-pixel pt-32 text-black text-2xl">ERROR: EVENT NOT FOUND</div>;

  return (
    <div className="w-full bg-[#E8B42B] min-h-screen relative pb-16 md:pb-20 overflow-x-hidden">
      <div className="bg-dot-grid opacity-30"></div>

      {/* 1. HERO SECTION (Deep Blue Arcade Cave) */}
      <section className="relative w-full min-h-[85vh] flex flex-col items-center justify-center pt-20 pb-12 px-4 bg-[#030841] border-b-8 border-black overflow-hidden">
        <MinecraftStarDecoration count={30} sectionId="event-hero-stars" />
        <div className="absolute inset-0 bg-checker opacity-5 pointer-events-none"></div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-50">
          <button onClick={() => navigate('home')} className="btn-arcade !bg-white !text-black !py-2 !px-4 !text-xs font-pixel shadow-[4px_4px_0_#000]">
            &lt; EXIT
          </button>
        </div>

        {/* Floating Item Icon */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 mb-8 md:mb-12"
        >
          <div className="p-4 md:p-8 bg-black border-4 border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {React.cloneElement(ev.icon, { className: "w-12 h-12 md:w-20 md:h-20 text-white" })}
          </div>
        </motion.div>

        {/* Quest Title */}
        <div className="relative z-20 text-center mb-8 md:mb-12">
          {ev.titleImage ? (
            <img
              src={ev.titleImage}
              alt={ev.title}
              className={`max-w-[280px] sm:max-w-[450px] md:max-w-[650px] h-auto drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transform ${ev.detailScale || 'scale-110'}`}
            />
          ) : (
            <h1 className="font-pixel text-3xl md:text-6xl text-white drop-shadow-[4px_4px_0_#FF1111] leading-tight">
              {ev.title}
            </h1>
          )}
        </div>

        {/* Event Countdown */}
        <div className="relative z-20 mb-10 md:mb-16">
          <div className="bg-black/60 backdrop-blur-md p-4 md:p-8 border-4 border-white shadow-[8px_8px_0_#000] inline-block">
            {ev.comingSoon ? (
              <>
                <h3 className="font-pixel text-[#FF8800] text-[10px] md:text-sm mb-4 text-center">STATUS:</h3>
                <p className="font-pixel text-2xl md:text-5xl text-white text-center animate-pulse drop-shadow-[0_0_10px_rgba(255,136,0,0.8)]">COMING SOON</p>
              </>
            ) : (
              <>
                <h3 className="font-pixel text-[#00FF00] text-[10px] md:text-sm mb-4 text-center">TIME REMAINING:</h3>
                <CountdownInternal targetDate={ev.date === "7 April - 23 Mei 2026" ? "2026-05-23T08:00:00" : "2026-05-23T08:00:00"} />
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative z-20 flex flex-col sm:flex-row gap-4 md:gap-8 justify-center w-full max-w-2xl px-4">
          <a
            href={eventId === 'workshop' ? "#" : (ev.rulebookLink || "https://bit.ly/RulebookICONLAB2026")}
            target={eventId === 'workshop' ? "_self" : "_blank"}
            rel="noreferrer"
            onClick={(e) => eventId === 'workshop' && e.preventDefault()}
            className={`btn-arcade blue w-full !py-4 md:!py-6 text-sm md:text-xl flex items-center justify-center gap-2 ${eventId === 'workshop' ? 'opacity-50 cursor-not-allowed grayscale pointer-events-none' : ''}`}
          >
            <FileText className="w-5 h-5 md:w-8 md:h-8" /> RULEBOOK
          </a>
          <a
            href={eventId === 'workshop' ? "#" : (ev.registrationLink || GOOGLE_FORM_LINK)}
            target={eventId === 'workshop' ? "_self" : "_blank"}
            rel="noreferrer"
            onClick={(e) => eventId === 'workshop' && e.preventDefault()}
            className={`btn-arcade green w-full !py-4 md:!py-6 text-sm md:text-xl flex items-center justify-center gap-2 ${eventId === 'workshop' ? 'opacity-50 cursor-not-allowed grayscale pointer-events-none' : ''}`}
          >
            <Trophy className="w-5 h-5 md:w-8 md:h-8" /> JOIN QUEST
          </a>
        </div>
      </section>

      {/* 2. MISSION INFO (ABOUT) */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 mt-[-40px] md:mt-[-60px] mb-12 md:mb-16">
        <div className="pixel-window-light p-6 sm:p-10 md:p-16 bg-white shadow-[12px_12px_0_rgba(0,0,0,0.2)] text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-pixel text-xl md:text-3xl text-black mb-6 border-b-4 border-black inline-block pb-2 uppercase text-center">MISSION INFO</h2>
            <p className="font-VT323 text-xl md:text-3xl lg:text-4xl leading-relaxed text-black">
              {ev.fullDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 2.5 REQUIREMENTS SECTION */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 mb-16 md:mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <div className="pixel-window !bg-[#FF1111] p-6 md:p-10 border-4 border-black shadow-[8px_8px_0_#000]">
            <h2 className="font-pixel text-white text-lg md:text-2xl mb-6 flex items-center gap-3">
              <Star className="w-5 h-5 md:w-8 md:h-8 fill-white" /> REQUIREMENTS
            </h2>
            <ul className="space-y-4">
              {ev.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-4 h-4 md:w-6 md:h-6 bg-white flex-shrink-0 rotate-45 mt-1 border-2 border-black"></div>
                  <span className="font-VT323 text-xl md:text-3xl text-white leading-tight">{req}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:flex pixel-window !bg-white p-6 md:p-10 border-4 border-black shadow-[8px_8px_0_#000] items-center justify-center overflow-hidden">
            <img src="/coin.svg" alt="Coin" className="w-32 h-32 md:w-48 md:h-48 animate-float opacity-20 absolute -right-10 -bottom-10" />
            <div className="text-center relative z-10">
              <p className="font-pixel text-2xl md:text-4xl text-black mb-4">READY TO PLAY?</p>
              <p className="font-VT323 text-2xl md:text-4xl text-gray-600">Prepare your team & conquer the quest!</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TIMELINE SECTION */}
      <section className="max-w-7xl mx-auto px-4 mb-20 md:mb-32">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="inline-block bg-black px-6 py-4 border-4 border-white shadow-[8px_8px_0_#000] -rotate-1">
            <img src="/JADWAL ACARA.png" alt="Timeline" className="h-10 md:h-20 w-auto object-contain" />
          </h2>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8 relative">
            {ev.timeline.map((item, idx) => {
              const isLast = idx === ev.timeline.length - 1;
              const isRowEnd = (idx + 1) % 4 === 0;

              return (
                <div key={idx} className="flex flex-col items-center text-center group relative">
                  {/* Vertical Line for Mobile (behind the circles) */}
                  {!isLast && (
                    <div className="absolute top-[24px] left-1/2 w-1 h-full bg-black/20 -translate-x-1/2 md:hidden z-0"></div>
                  )}

                  {/* Horizontal Line for Desktop (behind the circles) */}
                  {!isLast && !isRowEnd && (
                    <div className="absolute top-[32px] left-[50%] w-full h-1 bg-black/20 hidden md:block z-0"></div>
                  )}

                  <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center border-4 border-black text-white font-pixel text-xl mb-4 transform group-hover:scale-110 transition shadow-[4px_4px_0_rgba(0,0,0,0.5)] relative z-10 ${idx % 2 === 0 ? 'bg-[#FF1111]' : 'bg-[#FF8800]'}`}>
                    {idx + 1}
                  </div>
                  <div className="pixel-window-light !p-4 bg-white border-2 border-black w-full min-h-[140px] flex flex-col justify-center relative z-10">
                    <p className="font-pixel text-[8px] md:text-[10px] text-[#FF1111] mb-2">{item.date}</p>
                    <p className="font-VT323 text-lg md:text-2xl font-bold leading-tight">{item.step}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRIZES SECTION */}
      {!ev.comingSoon && (
        <section className="max-w-6xl mx-auto px-4 mb-24 md:mb-40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-16">
            <div className="text-center md:text-left">
              <h2 className="font-pixel text-2xl md:text-5xl text-black drop-shadow-[3px_3px_0_#fff]">REWARDS</h2>
              <p className="font-VT323 text-2xl md:text-4xl text-black/70 mt-4">Collect high scores & win prizes!</p>
            </div>
            <div className="hidden md:block">
              <img src="/coin.svg" alt="Coin" className="w-20 md:w-32 animate-float" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center items-end">
            {/* Juara 2 */}
            <PrizeBox
              rank="2ND PLACE"
              color="bg-gray-400"
              icon={<Trophy className="w-10 h-10 text-white" />}
              order="order-2 md:order-1"
            />
            {/* Juara 1 */}
            <PrizeBox
              rank="1ST PLACE"
              color="bg-[#FFDF00]"
              icon={<Trophy className="w-16 h-16 text-black" />}
              featured={true}
              order="order-1 md:order-2"
            />
            {/* Juara 3 */}
            <PrizeBox
              rank="3RD PLACE"
              color="bg-[#CD7F32]"
              icon={<Trophy className="w-8 h-8 text-white" />}
              order="order-3"
            />
          </div>

          {/* Additional Prizes Description */}
          <div className="mt-12 text-center bg-black/10 p-6 md:p-10 border-4 border-dashed border-black">
            {ev.prize.split(', ').map((p, idx) => (
              <p key={idx} className="font-VT323 text-2xl md:text-5xl font-bold text-black uppercase tracking-widest mb-2 md:mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* 5. SCORING CRITERIA (Conditional) */}
      {ev.criteria && (
        <section className="max-w-7xl mx-auto px-4 mb-24 md:mb-40">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="font-pixel text-2xl md:text-5xl text-black inline-block bg-white px-6 py-4 border-4 border-black shadow-[8px_8px_0_#000] -rotate-1">
              SCORING CRITERIA
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {ev.criteria.map((c, idx) => (
              <div key={idx} className="pixel-window-light p-4 md:p-6 bg-white border-2 border-black flex flex-col items-center text-center hover:scale-105 transition-transform">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-[#FFDF00] border-2 md:border-4 border-black flex items-center justify-center font-pixel text-black text-xs md:text-sm mb-4 shadow-[4px_4px_0_#000]">
                  {c.point}
                </div>
                <h3 className="font-pixel text-[10px] md:text-sm mb-4 leading-tight">{c.name}</h3>
                <p className="font-VT323 text-lg md:text-2xl text-gray-700 leading-snug">{c.details}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. CONTACT & FAQ (Combined) */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Contact Cards */}
          <div>
            <div className="mb-8 md:mb-12">
              <h2 className="font-pixel text-lg md:text-2xl text-black border-l-8 border-[#FF1111] pl-4">CONTACT ASSISTANCE</h2>
            </div>
            <div className="space-y-4 md:space-y-6">
              {(ev.contacts || [
                { name: "Sulthan", role: "Narahubung", contact: "+62 813 6927 4302", type: "wa", icon: "S", color: "bg-[#FF1111]" },
                { name: "Zahra", role: "Narahubung", contact: "+62 822 4146 7806", type: "wa", icon: "Z", color: "bg-[#00AAFF]" }
              ]).map((c, i) => (
                <ContactCard key={i} {...c} />
              ))}
            </div>
          </div>

          {/* FAQ Accordion */}
          <div>
            <div className="mb-8 md:mb-12">
              <h2 className="font-pixel text-lg md:text-2xl text-black border-l-8 border-[#00FF00] pl-4">QUEST FAQ</h2>
            </div>
            <div className="space-y-4">
              {(ev.faqs || faqs).map((faq, i) => (
                <div key={i} className="pixel-window-light !p-0 bg-white border-2 border-black overflow-hidden hover:bg-gray-50 transition-colors">
                  <details className="group">
                    <summary className="p-4 md:p-6 cursor-pointer flex justify-between items-center list-none font-jersey text-xl md:text-2xl font-bold">
                      <span className="flex-1 pr-4">
                        <span className="text-[#FF8800] mr-2">[?]</span> {faq.q}
                      </span>
                      <span className="text-[#FF8800] group-open:rotate-180 transition-transform">+</span>
                    </summary>
                    <div className="px-4 md:px-6 pb-6 pt-2 font-VT323 text-lg md:text-2xl text-gray-700 leading-relaxed border-t border-dashed border-gray-300">
                      <span className="text-[#00FF00] mr-2">[&gt;]</span> {faq.a}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper components for Quest Detail
function PrizeBox({ rank, color, icon, featured = false, order = "" }) {
  return (
    <div className={`flex flex-col items-center ${order} transition-transform hover:-translate-y-4 duration-300`}>
      <div className={`relative mb-4 ${featured ? 'scale-110 md:scale-125 z-20' : 'scale-90 md:scale-100'}`}>
        <div className={`w-32 h-32 md:w-48 md:h-48 ${color} border-4 md:border-8 border-black flex items-center justify-center shadow-[4px_4px_0_#000] md:shadow-[8px_8px_0_#000]`}>
          {icon}
        </div>
        {featured && (
          <div className="absolute -top-4 -right-4 bg-[#FF1111] border-4 border-black p-2 md:p-3 rotate-12 shadow-[2px_2px_0_#000]">
            <Star className="w-4 h-4 md:w-6 md:h-6 text-white animate-pulse" />
          </div>
        )}
      </div>
      <div className="font-pixel text-[10px] md:text-sm text-black mb-1">{rank}</div>
    </div>
  );
}

function CountdownInternal({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = new Date(targetDate).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          h: Math.floor(diff / (1000 * 60 * 60)),
          m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          s: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-4 md:gap-8 items-center text-white">
      {[{ val: timeLeft.h, lab: 'JAM' }, { val: timeLeft.m, lab: 'MINS' }, { val: timeLeft.s, lab: 'SECS' }].map((item, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <span className="font-pixel text-2xl md:text-5xl drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">{String(item.val).padStart(2, '0')}</span>
            <span className="font-pixel text-[8px] md:text-[10px] mt-2 opacity-60 text-white">{item.lab}</span>
          </div>
          {i < 2 && <span className="font-pixel text-xl md:text-4xl animate-pulse self-start mt-2">:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function AboutPage() {
  const kepanitiaan = [
    { divisi: "SC", theme: "bg-[#FF1166]", members: [{name: "Yaafi", role: ""}] },
    { divisi: "Ketua", theme: "bg-[#FF1166]", members: [{name: "Sulthan", role: ""}] },
    { divisi: "Sekretaris", theme: "bg-[#FFDF00]", members: [{name: "Jennie", role: "K"}, {name: "Caca", role: "WK"}] },
    { divisi: "Bendahara", theme: "bg-[#FFDF00]", members: [{name: "Karin", role: "K"}, {name: "Rian", role: "WK"}] },
    { divisi: "Kreatif", theme: "bg-[#FFDF00]", members: [{name: "Nabila", role: "K"}, {name: "Ardin", role: "WK"}, {name: "Lily", role: ""}, {name: "Hasya", role: ""}, {name: "Uma", role: ""}, {name: "Pelita", role: "I"}] },
    { divisi: "Perkap", theme: "bg-[#66D9E8]", members: [{name: "Nouval Ar", role: "K"}, {name: "Rizki", role: "WK"}, {name: "Naufal I", role: ""}, {name: "Dariel", role: ""}, {name: "Adjie", role: ""}] },
    { divisi: "PDD", theme: "bg-[#66D9E8]", members: [{name: "Satria", role: "K"}, {name: "Muti", role: "WK"}, {name: "Aqmar", role: ""}, {name: "Hakim", role: ""}, {name: "Aurel", role: ""}] },
    { divisi: "Humas", theme: "bg-[#66D9E8]", members: [{name: "Zahra A", role: "K"}, {name: "Silfia", role: "WK"}, {name: "Naila", role: ""}, {name: "Raza", role: ""}, {name: "Putri", role: "I"}] },
    { divisi: "Acara", theme: "bg-[#8CE99A]", members: [{name: "Elsa", role: "K"}, {name: "Selma", role: "WK"}, {name: "Wira", role: ""}, {name: "Eliz", role: ""}, {name: "Damar", role: ""}, {name: "Reza", role: ""}] },
    { divisi: "Sponsor", theme: "bg-[#8CE99A]", members: [{name: "Fardhan", role: "K"}, {name: "Docil", role: "WK"}, {name: "Tika", role: ""}, {name: "Danda", role: ""}, {name: "Azza", role: ""}] },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 md:pt-10 text-center z-10 relative pb-16 md:pb-20">
      <MinecraftStarDecoration count={15} sectionId="about-boxes" />

      <div className="mb-10 md:mb-16">
        <h1 className="inline-block bg-white px-2 md:px-4 py-2 md:py-3 border-2 md:border-4 border-black shadow-[4px_4px_0_#000] md:shadow-[8px_8px_0_#000] transform rotate-1">
          <img src="/judulsec/Tntang Kami.png" alt="Tentang Kami" className="h-10 sm:h-16 md:h-24 w-auto object-contain" />
        </h1>
      </div>

      <div className="pixel-window-light p-4 sm:p-8 md:p-16 mb-8 md:mb-20 text-lg sm:text-2xl md:text-4xl leading-relaxed text-justify font-VT323 font-bold bg-white/90 backdrop-blur-sm">
        <p>
          <span className="bg-black text-white px-1 sm:px-2 font-pixel text-[10px] sm:text-sm md:text-xl drop-shadow-[1px_1px_0_#FF1111] md:drop-shadow-[2px_2px_0_#FF1111]">Informatics Competition & Innovation Lab (ICONLAB)</span> merupakan wadah strategis bagi mahasiswa dalam mengaktualisasikan kreativitas, kompetensi, serta kontribusi nyata melalui pengembangan ide dan karya berbasis teknologi.
        </p>
        <div className="mt-6 md:mt-10 bg-[#FFDF00] p-3 md:p-6 border-2 md:border-4 border-black shadow-[3px_3px_0_#000] md:shadow-[6px_6px_0_#000] text-center">
          MENGUSUNG TEMA:<br />
          <strong className="font-pixel text-xs sm:text-xl md:text-3xl block mt-1 md:mt-4 text-[#FF1111] drop-shadow-[1px_1px_0_#000] md:drop-shadow-[2px_2px_0_#000]">"Innovating Technology For Sustainable Society 5.0"</strong>
        </div>
        <p className="mt-6 md:mt-10">
          Tema ini merupakan manifestasi dukungan terhadap pencapaian tujuh belas tujuan global yang tertuang dalam Sustainable Development Goals (SDGs). Melalui tiga pilar kompetisi utama, yaitu Lomba Karya Tulis Ilmiah, Game Development, dan Mobile Legends, ajang ini tidak hanya dirancang untuk memacu kreativitas generasi muda, melainkan juga untuk menantang ketajaman berpikir kritis serta soliditas kerja sama tim dalam menghasilkan solusi teknologi yang inklusif dan berkelanjutan.
        </p>
      </div>

      <div className="mb-8 md:mb-12 text-center mt-8">
        <h2 className="font-pixel text-lg sm:text-2xl md:text-4xl text-black inline-block bg-white px-4 md:px-6 py-2 border-2 md:border-4 border-black shadow-[4px_4px_0_#000] md:shadow-[6px_6px_0_#000]">
          KEPANITIAAN
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 items-stretch">
        {kepanitiaan.map((item, idx) => (
          <div key={idx} className="pixel-window-light !p-0 flex flex-col bg-[#EFEFEF] shadow-[4px_4px_0_rgba(0,0,0,0.8)] md:shadow-[8px_8px_0_rgba(0,0,0,0.8)] h-full relative rounded-[4px] md:rounded-[8px] overflow-hidden border-2 md:border-4 border-black">
            {/* Header */}
            <div className={`px-2 py-2 border-b-2 md:border-b-4 border-black ${item.theme} flex justify-between items-center shadow-[inset_0_-2px_0_rgba(0,0,0,0.1)]`}>
              <h3 className="font-pixel text-[10px] md:text-sm text-black">{item.divisi}</h3>
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#00AAFF] border-2 border-black flex items-center justify-center shadow-[1px_1px_0_#000]">
                <span className="font-pixel text-[8px] md:text-[10px] text-white">x</span>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-3 md:p-4 flex-grow flex flex-col relative bg-[#EFEFEF]">
              <ul className="space-y-1 md:space-y-2 mb-8 font-VT323 text-lg md:text-2xl font-bold text-black text-left">
                {item.members.map((m, i) => (
                  <li key={i} className="flex justify-between items-center gap-2 pb-1">
                    <span className="truncate">{m.name}</span>
                    {m.role && (
                      <span className={`text-[8px] font-pixel px-1.5 py-0.5 border-2 border-black shadow-[2px_2px_0_#000] flex-shrink-0 text-black ${m.role === 'K' ? 'bg-[#FFDF00]' : m.role === 'WK' ? 'bg-[#38BDF8]' : 'bg-[#FF8800]'}`}>
                        {m.role}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              
              {/* Custom Yes Button */}
               <div className="w-full flex justify-center -mb-2 mt-auto relative z-10 bottom-2">
                 <button className="bg-[#4CAF50] border-2 md:border-3 border-black px-3 py-1 font-pixel text-[8px] md:text-[10px] text-white shadow-[2px_2px_0_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer">
                    Yes
                 </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactCard({ name, role, contact, type, icon, color }) {
  return (
    <div className={`pixel-window-light !p-3 sm:!p-4 bg-white flex items-center gap-3 sm:gap-4 hover:scale-105 hover:-rotate-1 transition-all cursor-pointer group shadow-[4px_4px_0_#000] border-2 border-black max-w-sm w-full mx-auto`}>
      <div className={`w-10 h-10 sm:w-14 sm:h-14 ${color} border-2 md:border-4 border-black flex items-center justify-center text-white text-xl sm:text-2xl font-pixel shadow-[2px_2px_0_#000] md:shadow-[4px_4px_0_#000] flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-pixel text-[10px] sm:text-sm text-black mb-0.5 sm:mb-1 truncate">{name}</h4>
        <p className="font-VT323 text-lg sm:text-2xl text-gray-600 mb-2 leading-none">{role}</p>
        <a
          href={type === 'wa' ? `https://wa.me/${contact.replace(/[^0-9]/g, '')}` : `mailto:${contact}`}
          target="_blank" rel="noreferrer"
          className="font-pixel text-[8px] sm:text-[10px] bg-black text-white px-2 py-1 border border-white hover:bg-[#FF1111] transition-colors inline-block tracking-tighter sm:tracking-normal"
        >
          {type === 'wa' ? 'CHAT WHATSAPP' : 'SEND EMAIL'}
        </a>
      </div>
    </div>
  );
}

function SponsorshipPage() {
  const packages = [
    { name: "DIAMOND", theme: "bg-[#b9f2ff]", textTheme: "text-[#b9f2ff]", price: "> 600.000", benefits: ["Publication (XL)", "Live Ads 2x (15s)", "MC Mention 6x", "Ad-Lips 4x", "IG Story 4x/mgu", "Full Day Booth", "Speech Vendor"] },
    { name: "PLATINUM", theme: "bg-[#00AAFF]", textTheme: "text-[#00AAFF]", price: "400.000", benefits: ["Publication (L)", "Live Ads 1x (15s)", "MC Mention 4x", "Ad-Lips 3x", "IG Story 3x/mgu", "Workshop Booth", "Vendor Ads 1x"] },
    { name: "GOLD", theme: "bg-[#FFDF00]", textTheme: "text-[#FFDF00]", price: "300.000", benefits: ["Publication (M)", "Live Ads 1x (10s)", "MC Mention 3x", "Ad-Lips 2x", "IG Story 1x/mgu"] },
    { name: "SILVER", theme: "bg-[#C0C0C0]", textTheme: "text-[#C0C0C0]", price: "150.000", benefits: ["Publication (S)", "Live Ads 1x (10s)", "MC Mention 2x", "Ad-Lips 1x", "IG Story 1x Post"] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-10 z-10 relative pb-16 md:pb-20">
      <MinecraftStarDecoration count={15} sectionId="sponsor-boxes" />
      <PixelCloud className="top-0 right-4 md:right-10 scale-50 md:scale-75" duration="20s" />

      <div className="mb-10 md:mb-16 text-center">
        <h1 className="inline-block bg-black px-4 sm:px-6 py-3 md:py-4 border-2 md:border-4 border-white shadow-[4px_4px_0_#000] md:shadow-[8px_8px_0_#000] -rotate-1">
          <img src="/judulsec/Sponsorship.png" alt="Sponsorship" className="h-10 sm:h-16 md:h-24 w-auto object-contain" />
        </h1>
      </div>

      <div className="pixel-window-light p-6 sm:p-8 md:p-12 mb-12 md:mb-20 bg-white shadow-[6px_6px_0_rgba(0,0,0,0.2)] md:shadow-[12px_12px_0_rgba(0,0,0,0.2)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
          <div className="md:w-2/3 text-left">
            <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-black mb-6 md:mb-8 border-b-2 md:border-b-4 border-black inline-block pb-2">WHY CHOOSE US?</h2>
            <ul className="space-y-4 md:space-y-6 font-VT323 text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              <li className="flex items-center gap-3 md:gap-4"><div className="w-3 h-3 md:w-4 md:h-4 bg-[#FF1111] border-2 border-black flex-shrink-0"></div> Massive audience reach dari kalangan mahasiswa & tech enthusiast.</li>
              <li className="flex items-center gap-3 md:gap-4"><div className="w-3 h-3 md:w-4 md:h-4 bg-[#00AAFF] border-2 border-black flex-shrink-0"></div> High-impact brand exposure (digital, social media, & event).</li>
              <li className="flex items-center gap-3 md:gap-4"><div className="w-3 h-3 md:w-4 md:h-4 bg-[#00FF00] border-2 border-black flex-shrink-0"></div> Direct acces to future IT talents & innovators.</li>
            </ul>
          </div>
          <div className="md:w-1/3 flex justify-center w-full bg-[#E8B42B] p-4 md:p-6 border-2 md:border-4 border-black shadow-[inset_2px_2px_0_rgba(255,255,255,0.5)] md:shadow-[inset_4px_4px_0_rgba(255,255,255,0.5)] mt-6 md:mt-0">
            <button className="btn-arcade blue w-full py-4 md:py-6 text-sm md:text-lg">
              GET PROPOSAL
            </button>
          </div>
        </div>
      </div>

      <div className="text-center mb-8 md:mb-12">
        <h2 className="font-pixel text-sm sm:text-2xl md:text-4xl text-black bg-white inline-block px-3 sm:px-6 py-2 md:py-3 border-2 md:border-4 border-black shadow-[3px_3px_0_#000] md:shadow-[6px_6px_0_#000] rotate-2">
          UPGRADE ITEMS:
        </h2>
      </div>

      {/* Responsive Grid: 1 col on mobile (<768px), 2 col on tablet/desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto px-4">
        {packages.map((pkg, idx) => (
          <div key={idx} className={`pixel-window !p-0 flex flex-col transform hover:-translate-y-2 md:hover:-translate-y-4 transition duration-300 shadow-[6px_6px_0_rgba(0,0,0,0.5)] md:shadow-[10px_10px_0_rgba(0,0,0,0.5)] h-full`}>
            <div className={`p-4 md:p-6 text-center border-b-4 md:border-b-8 border-black ${pkg.theme} shadow-[inset_0_-5px_0_rgba(0,0,0,0.2)] md:shadow-[inset_0_-10px_0_rgba(0,0,0,0.2)]`}>
              <h3 className={`font-pixel text-xl sm:text-2xl md:text-3xl ${pkg.name === 'GOLD' ? 'text-black drop-shadow-md' : 'text-white drop-shadow-[2px_2px_0_#000]'} tracking-wider`}>{pkg.name}</h3>
            </div>
            <div className="p-6 sm:p-8 flex-grow flex flex-col bg-[#030841]">
              <div className={`text-center font-VT323 text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 ${pkg.textTheme} drop-shadow-[0_0_5px_currentColor] md:drop-shadow-[0_0_10px_currentColor]`}>Rp {pkg.price}</div>
              <ul className="space-y-3 mb-8 flex-grow font-VT323 text-xl md:text-2xl leading-snug text-white">
                {pkg.benefits.map((ben, i) => (
                  <li key={i} className="flex items-start border-b border-dashed border-white/10 pb-2">
                    <span className={`${pkg.textTheme} mr-2 font-pixel text-[10px] md:text-sm`}>+</span> {ben}
                  </li>
                ))}
              </ul>
              <a href={`https://wa.me/6281212495750?text=${encodeURIComponent(`Halo Kak, saya tertarik untuk menjalin kerja sama sponsorship Paket *${pkg.name}* pada acara ICONLAB 2026. Mohon informasi lebih lanjut terkait detail dan benefit yang tersedia. Terima kasih.`)}`} target="_blank" rel="noreferrer" className="btn-arcade w-full !text-xs md:!text-lg !py-3 md:!py-4 no-underline">BUY NOW</a>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12 md:mt-20 mb-8 md:mb-12">
        <h2 className="font-pixel text-lg sm:text-2xl md:text-3xl text-black bg-white inline-block px-4 md:px-6 py-2 md:py-3 border-2 md:border-4 border-black shadow-[4px_4px_0_#000] md:shadow-[6px_6px_0_#000] rotate-1">
          ANY QUESTIONS? CONTACT US:
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto pb-10">
        <ContactCard
          name="Fardhan"
          role="Sponsorship Manager"
          contact="+62 81212495750"
          type="wa"
          icon="F"
          color="bg-[#FF1111]"
        />
        <ContactCard
          name="Tika"
          role="Sponsorship Manager"
          contact="+62 89509541898"
          type="wa"
          icon="T"
          color="bg-[#00AAFF]"
        />
      </div>

      {/* Media Partner Section */}
      <div className="mt-16 md:mt-24 mb-10 md:mb-16">
        <div className="pixel-window-light !p-6 sm:!p-10 bg-white border-2 md:border-4 border-black shadow-[6px_6px_0_#000] md:shadow-[12px_12px_0_#000] text-center max-w-4xl mx-auto overflow-hidden relative">
          <div className="bg-checker opacity-10 absolute inset-0 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl text-black mb-6 md:mb-10 inline-block bg-[#00FF00] px-4 md:px-6 py-2 md:py-3 border-2 md:border-4 border-black shadow-[4px_4px_0_#000] -rotate-1">
              MEDIA PARTNER
            </h2>
            <p className="font-VT323 text-xl sm:text-2xl md:text-3xl text-black mb-8 md:mb-10 leading-relaxed max-w-2xl mx-auto text-center">
              Tertarik menjadi bagian dari keseruan ICON.LAB? <br className="hidden sm:block" />
              Kami membuka peluang kolaborasi seluas-luasnya bagi Media Partner untuk bergabung dalam perjalanan kami!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <ContactCard
                name="Danda"
                role="Press & Media"
                contact="+62 858 4877 9513"
                type="wa"
                icon="D"
                color="bg-[#FF8800]"
              />
              <ContactCard
                name="Docill"
                role="Collaboration Partner"
                contact="+62 877 7172 7353"
                type="wa"
                icon="D"
                color="bg-[#00FF00]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} function Footer({ navigate }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <footer id="contact" className="pt-12 sm:pt-20 pb-8 border-t-4 border-white relative overflow-hidden bg-[#030841] z-20" ref={ref}>
      {/* Background decoration to simulate the bridge/city vibe */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#FF1111]/20 to-transparent pointer-events-none" />
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(to right, #ffffff0a 1px, transparent 1px), linear-gradient(to bottom, #ffffff0a 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-6 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-8 mb-16">
          {/* Column 1: Branding (Takes 2 columns in lg) */}
          <div className="lg:col-span-2">
            <h2 className="font-pixel text-2xl sm:text-4xl tracking-widest mb-1 sm:mb-2 flex items-baseline">
              <span className="text-retro-blue text-glow-blue">I</span>
              <span className="text-retro-red text-glow-red">C</span>
              <span className="text-retro-orange text-glow-orange">O</span>
              <span className="text-retro-green text-glow-green">N</span>
              <span className="text-white text-glow ml-1 sm:ml-2">.LAB</span>
            </h2>
            <h3 className="font-pixel text-sm sm:text-xl text-white mb-4 sm:mb-6 tracking-wider">
              HIMA ILKOM UNNES
            </h3>
            <p className="font-VT323 text-lg sm:text-2xl text-white/70 leading-relaxed mb-6 sm:mb-8 max-w-sm">
              Acara IT tahunan unggulan yang diselenggarakan oleh HIMA ILKOM UNNES, menghadirkan para pionir untuk berinovasi, berkompetisi, dan berkolaborasi.
            </p>

            <h4 className="font-pixel text-base text-white mb-4">
              DIPERSEMBAHKAN OLEH
            </h4>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-white/30 bg-white flex items-center justify-center p-1">
                <img src="/Logo-unnes.jpg" alt="Logo UNNES" className="w-full h-full object-contain rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
              </div>
              <div className="w-12 h-12 rounded-full border border-white/30 bg-white flex items-center justify-center p-2">
                <img src="/logo-hima.png" alt="Logo HIMA ILKOM" className="w-full h-full object-contain" />
              </div>
              <div className="w-12 h-12 rounded-full border border-white/30 bg-white flex items-center justify-center p-2">
                <img src="/Logo-astasae.png" alt="Logo ASTASAE" className="w-full h-full object-contain" />
              </div>
              <div className="w-12 h-12 rounded-full border border-white/30 bg-white flex items-center justify-center p-1.5">
                <img src="/logo-icn.png" alt="Logo ICN" className="w-full h-full object-contain rounded-full" />
              </div>
            </div>
          </div>

          {/* Column 2: Acara */}
          <div>
            <h4 className="font-pixel text-base sm:text-lg text-white mb-4 sm:mb-6 border-b-2 sm:border-b-4 border-[#FFDF00] inline-block pb-1">
              ACARA
            </h4>
            <ul className="space-y-3 sm:space-y-4 font-VT323 text-xl sm:text-2xl">
              {[
                { name: "Game Development", id: "gamedev" },
                { name: "Lomba KTI", id: "lkti" },
                { name: "Mobile Legend", id: "mlbb" },
                { name: "Workshop", id: "workshop" }
              ].map((item) => (
                <li key={item.id}>
                  <button onClick={() => navigate('event', item.id)} className="font-bold text-white hover:text-[#FF8800] transition-colors text-left w-full">
                    &gt; {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Lainnya */}
          <div>
            <h4 className="font-pixel text-base sm:text-lg text-white mb-4 sm:mb-6 border-b-2 sm:border-b-4 border-[#00AAFF] inline-block pb-1">
              LAINNYA
            </h4>
            <ul className="space-y-3 sm:space-y-4 font-VT323 text-xl sm:text-2xl">
              <li>
                <button onClick={() => navigate('about')} className="font-bold text-white hover:text-[#FF8800] transition-colors text-left w-full">
                  &gt; Tentang Kami
                </button>
              </li>
              <li>
                <button onClick={() => navigate('sponsorship')} className="font-bold text-white hover:text-[#FF8800] transition-colors text-left w-full">
                  &gt; Sponsorship
                </button>
              </li>
              <li>
                <button onClick={() => {
                  if (window.location.hash !== '#faq') {
                    navigate('home');
                    setTimeout(() => {
                      const el = document.getElementById('faq');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  } else {
                    const el = document.getElementById('faq');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }} className="font-bold text-white hover:text-[#FF8800] transition-colors text-left w-full">
                  &gt; FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Social & Contact */}
          <div>
            <h4 className="font-pixel text-lg text-white mb-6 border-b-4 border-[#00FF00] inline-block pb-1">
              SOSIAL MEDIA
            </h4>
            <div className="flex items-center gap-3 mb-8">
              <a href="https://youtube.com/@himailkomunnes271?si=gQavx0wOnTW3L_4F" target="_blank" rel="noreferrer" className="w-10 h-10 bg-[#FF0000] border-2 border-white flex items-center justify-center text-white hover:scale-110 transition-transform shadow-[4px_4px_0_#000]">
                <Youtube size={20} />
              </a>
              <a href="https://www.instagram.com/iconlab.ilkom/" target="_blank" rel="noreferrer" className="w-10 h-10 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 border-2 border-white flex items-center justify-center text-white hover:scale-110 transition-transform shadow-[4px_4px_0_#000]">
                <Instagram size={20} />
              </a>
            </div>

            <h4 className="font-pixel text-base sm:text-lg text-white mb-4 sm:mb-6 border-b-2 sm:border-b-4 border-[#FF1111] inline-block pb-1">
              KONTAK KAMI
            </h4>
            <ul className="space-y-2 sm:space-y-3 font-VT323 text-xl sm:text-2xl">
              <li>
                <a href="mailto:iconlabilkomunnes@gmail.com" className="font-bold text-white hover:text-[#FF8800] transition-colors block">
                  iconlabilkomunnes@gmail.com
                </a>
              </li>
              <li>
                <a href="https://wa.me/6281369274302" target="_blank" rel="noreferrer" className="font-bold text-white hover:text-[#FF8800] transition-colors block">
                  +62 81369274302 (Sulthan)
                </a>
                <a href="https://wa.me/6281369274302" target="_blank" rel="noreferrer" className="font-bold text-white hover:text-[#FF8800] transition-colors block">
                  +62 822 4146 7806 (Zahra)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 sm:pt-8 border-t-2 border-white/20 text-center">
          <p className="font-pixel text-[6px] sm:text-[8px] md:text-xs text-white/50 tracking-[0.1em] sm:tracking-widest capitalize sm:uppercase">
            © 2026 HIMA ILKOM — GAME OVER? NEVER.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
