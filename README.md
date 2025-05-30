﻿# BelajarFundamental-FE_NotesApp

Dalam mengerjakan proyek ini, ada beberapa kriteria yang perlu Anda penuhi. Kriteria-kriteria ini diperlukan agar Anda dapat lulus dari tugas ini.<br>
Berikut adalah daftar kriteria dari proyek submission yang harus Anda penuhi.<br>

<b>Kriteria Wajib 1: Pertahankan Kriteria Submission Sebelumnya</b>
<br>
Ini adalah lanjutan dari submission sebelumnya. Pastikan proyek yang telah Anda bangun masih memenuhi seluruh kriteria dari submission sebelumnya.

<b>Kriteria Wajib 2: Memanfaatkan RESTful API sebagai Sumber Data</b>
<br>
Aplikasi harus memanfaatkan RESTful API yang telah kami sediakan sebagai sumber data. RESTful API yang digunakan adalah https://notes-api.dicoding.dev/v2. Dokumentasi API bisa Anda akses pada tautan tersebut.
<br>
Ada beberapa fitur yang wajib Anda adopsi dengan API di atas.
<br>
Membuat atau menambahkan catatan baru.<br>
Mendapatkan dan menampilkan daftar catatan.<br>
Menghapus catatan yang tersimpan.<br>
Catatan:<br>
Kriteria ini juga menyebabkan data local (data dumi) sudah tidak digunakan lagi. Silakan manfaatkan Notes API sebagai data utama aplikasi notesapp Anda.<br>

<b>Kriteria Wajib 3: Menggunakan webpack sebagai Module Bundler</b>
<br>
Pengembangan aplikasi Notes App harus menggunakan webpack sebagai module bundler dengan spesifikasi berikut:
<br>
Aplikasi harus menerapkan html-webpack-plugin dalam konfigurasinya.<br>
Aplikasi harus dapat dijalankan untuk fase development dengan perintah npm run start-dev dan memanfaatkan webpack-dev-server.<br>
Aplikasi harus dapat di-build untuk fase production dengan perintah npm run build.<br>

<b>Kriteria Wajib 4: Menggunakan Fetch API</b>
<br>
Menggunakan Fetch API untuk melakukan Asynchronous JavaScript Request dalam berinteraksi dengan API https://notes-api.dicoding.dev/v2.
<br>

<b>Kriteria Wajib 5: Memiliki Indikator Loading</b>
<br>
Anda diwajibkan untuk menampilkan indikator loading saat melakukan proses request HTTP dalam menunggu hasilnya. Contohnya menampilkan indikator loading saat user sedang masuk aplikasi atau buat akun baru.<br>

Sebagai tips, Anda juga dapat membangun indikator loading menggunakan Web component.
