-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 16, 2024 at 11:56 AM
-- Server version: 8.0.30
-- PHP Version: 8.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arsip_surat_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `arsip_surat`
--

CREATE TABLE `arsip_surat` (
  `id_arsip` bigint NOT NULL,
  `nomor_surat` varchar(255) NOT NULL,
  `judul_surat` varchar(255) NOT NULL,
  `id_kategori` int NOT NULL,
  `file_elektronik` varchar(255) DEFAULT NULL,
  `tanggal_surat` date DEFAULT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `id_pengguna` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `arsip_surat`
--

INSERT INTO `arsip_surat` (`id_arsip`, `nomor_surat`, `judul_surat`, `id_kategori`, `file_elektronik`, `tanggal_surat`, `deskripsi`, `id_pengguna`, `created_at`, `updated_at`) VALUES
(9, '001/SK/2024sd', 'Surat Keputusan Kenaikan Jabatan edit', 1, 'asa', '2024-12-06', 'asasa', 3, '2024-12-05 19:35:44', NULL),
(12, '12/nv/32', 'edit pol edit', 10, 'files-1734186010559.pdf', '2024-12-11', 'erferwerwe', 29, '2024-12-07 01:08:34', '2024-12-14 07:20:12'),
(14, '3232', 'Surat Kuasda 2', 2, 'contoh.pdf', '2024-12-21', 'dasdasdasda', 29, '2024-12-09 05:20:59', NULL),
(15, 'asdasd', 'sadasd', 1, 'files-1733752817310.pdf', '2024-12-13', '34324', 3, '2024-12-09 06:43:30', '2024-12-09 07:00:18'),
(20, '1212', 'coba', 5, 'files-1733804852297.pdf', '2024-12-11', 'fdsfds', 29, '2024-12-09 21:27:34', NULL),
(21, '1233', 'surat resmi ini', 10, 'files-1733967491033.pdf', '2024-12-03', 'contoh dari surat', 3, '2024-12-11 18:38:13', NULL),
(29, 'asdasdasdas', 'asdasd', 10, 'files-1733978809245.pdf', '2024-12-12', 'asdasdasd', 31, '2024-12-11 21:46:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kategori_surat`
--

CREATE TABLE `kategori_surat` (
  `id_kategori` int NOT NULL,
  `nama_kategori` varchar(255) NOT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `kategori_surat`
--

INSERT INTO `kategori_surat` (`id_kategori`, `nama_kategori`, `deskripsi`, `created_at`, `updated_at`) VALUES
(1, 'Surat Masuk edit', 'Kategori untuk surat-surat yang diterima', '2024-12-03 07:08:49', '2024-12-05 19:13:27'),
(2, 'Surat Keluar', 'Kategori untuk surat-surat yang dikirim', '2024-12-03 07:08:49', '2024-12-03 07:08:49'),
(3, 'Surat Keputusan', 'Kategori untuk surat-surat keputusan resmi', '2024-12-03 07:08:49', '2024-12-03 07:08:49'),
(5, 'Surat Keterangan edit', 'Kategori untuk surat keterangan', '2024-12-03 07:08:49', '2024-12-05 19:36:08'),
(9, 'surat resmi', 'kategori surat untuk acara yang resmi resmi aja', '2024-12-09 07:18:41', NULL),
(10, 'surat bagus', 'coba', '2024-12-09 21:30:13', '2024-12-11 20:20:24');

-- --------------------------------------------------------

--
-- Table structure for table `level_pengguna`
--

CREATE TABLE `level_pengguna` (
  `id_level` int NOT NULL,
  `nama_level` varchar(255) NOT NULL,
  `deskripsi_akses` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `level_pengguna`
--

INSERT INTO `level_pengguna` (`id_level`, `nama_level`, `deskripsi_akses`) VALUES
(1, 'ADMIN', 'Akses penuh ke seluruh fitur aplikasi'),
(2, 'USER', 'Akses terbatas pada manajemen arsip surat');

-- --------------------------------------------------------

--
-- Table structure for table `pengguna`
--

CREATE TABLE `pengguna` (
  `id_pengguna` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nama_lengkap` varchar(255) DEFAULT NULL,
  `id_level` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `pengguna`
--

INSERT INTO `pengguna` (`id_pengguna`, `username`, `password`, `nama_lengkap`, `id_level`, `created_at`, `updated_at`) VALUES
(3, 'adibmaros', 'adibmaros123', 'Adib Muhammad Maros', 1, '2024-12-03 08:20:07', '2024-12-09 13:16:28'),
(4, 'adib', 'user123', 'Muhammad Alimuddin', 2, '2024-12-05 07:44:52', '2024-12-05 07:44:52'),
(5, 'Muhammad Nusa', 'coba123', 'junaide', 1, '2024-12-05 00:52:10', NULL),
(29, 'user', 'user123', 'user', 2, '2024-12-06 23:45:00', NULL),
(30, 'adib ', 'adib123', 'Adib Muhammad', 2, '2024-12-11 18:49:17', '2024-12-11 18:53:44'),
(31, 'coba ya edit', 'siapa123', 'coba tambah', 2, '2024-12-11 21:08:32', '2024-12-14 07:10:48'),
(34, 'asdasd edit', 'asdasd', 'asdasdas', 1, '2024-12-14 07:18:48', '2024-12-14 07:19:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `arsip_surat`
--
ALTER TABLE `arsip_surat`
  ADD PRIMARY KEY (`id_arsip`),
  ADD KEY `id_kategori` (`id_kategori`),
  ADD KEY `id_pengguna` (`id_pengguna`);

--
-- Indexes for table `kategori_surat`
--
ALTER TABLE `kategori_surat`
  ADD PRIMARY KEY (`id_kategori`),
  ADD UNIQUE KEY `nama_kategori` (`nama_kategori`);

--
-- Indexes for table `level_pengguna`
--
ALTER TABLE `level_pengguna`
  ADD PRIMARY KEY (`id_level`),
  ADD UNIQUE KEY `nama_level` (`nama_level`);

--
-- Indexes for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD PRIMARY KEY (`id_pengguna`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `id_level` (`id_level`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `arsip_surat`
--
ALTER TABLE `arsip_surat`
  MODIFY `id_arsip` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `kategori_surat`
--
ALTER TABLE `kategori_surat`
  MODIFY `id_kategori` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `level_pengguna`
--
ALTER TABLE `level_pengguna`
  MODIFY `id_level` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pengguna`
--
ALTER TABLE `pengguna`
  MODIFY `id_pengguna` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `arsip_surat`
--
ALTER TABLE `arsip_surat`
  ADD CONSTRAINT `arsip_surat_ibfk_1` FOREIGN KEY (`id_kategori`) REFERENCES `kategori_surat` (`id_kategori`),
  ADD CONSTRAINT `arsip_surat_ibfk_2` FOREIGN KEY (`id_pengguna`) REFERENCES `pengguna` (`id_pengguna`);

--
-- Constraints for table `pengguna`
--
ALTER TABLE `pengguna`
  ADD CONSTRAINT `pengguna_ibfk_1` FOREIGN KEY (`id_level`) REFERENCES `level_pengguna` (`id_level`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
