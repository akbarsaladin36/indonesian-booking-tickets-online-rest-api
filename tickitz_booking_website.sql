-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Bulan Mei 2021 pada 10.09
-- Versi server: 10.1.38-MariaDB
-- Versi PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tickitz_booking_website`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking`
--

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL,
  `user_account_id` int(11) NOT NULL DEFAULT '0',
  `cinema_id` int(11) NOT NULL,
  `schedule_id` int(11) NOT NULL,
  `booking_ticket` int(11) DEFAULT '0',
  `booking_total_price` int(11) DEFAULT '0',
  `booking_payment_method` varchar(150) DEFAULT '0',
  `booking_status` enum('Y','N') DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `booking`
--

INSERT INTO `booking` (`booking_id`, `user_account_id`, `cinema_id`, `schedule_id`, `booking_ticket`, `booking_total_price`, `booking_payment_method`, `booking_status`, `created_at`, `updated_at`) VALUES
(1, 0, 1, 0, 1, 25000, 'bca', 'Y', '2021-04-14 01:12:53', '0000-00-00 00:00:00'),
(2, 0, 1, 0, 1, 25000, 'gopay', 'Y', '2021-04-14 10:09:39', '2021-04-14 10:09:39');

-- --------------------------------------------------------

--
-- Struktur dari tabel `booking_seat`
--

CREATE TABLE `booking_seat` (
  `booking_seat_id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL DEFAULT '0',
  `booking_seat_location` varchar(100) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `booking_seat`
--

INSERT INTO `booking_seat` (`booking_seat_id`, `booking_id`, `booking_seat_location`) VALUES
(1, 1, 'A1'),
(2, 1, 'B1'),
(3, 1, 'C1'),
(4, 2, 'A5'),
(5, 2, 'B2'),
(6, 2, 'C3');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cinema`
--

CREATE TABLE `cinema` (
  `cinema_id` int(11) NOT NULL,
  `movie_id` int(11) NOT NULL DEFAULT '0',
  `premiere_location_id` int(11) NOT NULL DEFAULT '0',
  `cinema_name` varchar(250) DEFAULT '0',
  `cinema_price` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `cinema`
--

INSERT INTO `cinema` (`cinema_id`, `movie_id`, `premiere_location_id`, `cinema_name`, `cinema_price`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'ebv.id', 10, '2021-04-13 19:43:44', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `movie`
--

CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL,
  `movie_name` varchar(150) DEFAULT NULL,
  `movie_genre` varchar(150) DEFAULT NULL,
  `movie_duration` varchar(20) DEFAULT NULL,
  `movie_directed_by` varchar(150) DEFAULT NULL,
  `movie_casts` varchar(150) DEFAULT NULL,
  `movie_image` varchar(150) DEFAULT NULL,
  `movie_release_date` date DEFAULT NULL,
  `movie_synopsis` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `movie`
--

INSERT INTO `movie` (`movie_id`, `movie_name`, `movie_genre`, `movie_duration`, `movie_directed_by`, `movie_casts`, `movie_image`, `movie_release_date`, `movie_synopsis`, `created_at`, `updated_at`) VALUES
(6, 'Bourne: Ultimatum', 'Action', '02:03:00', 'Paul Greengrass', 'Matt Damon', '2021-05-03T04-51-36.378Z2500b63d-d04d-414d-9ac5-658bd32e76b1.jpg', '2007-01-01', 'The finale sequel of Bourne', '2021-04-29 00:29:01', '2021-04-29 00:29:01'),
(12, 'test', 'test', '02:15:00', 'test1', 'test1', '2021-05-03T04-49-06.080Z3100890853.jpg', '2021-09-09', 'the story about one of the heroes in independence day of Indonesia Haji Agus Salim.', '2021-05-03 11:49:06', '2021-05-03 11:49:06'),
(15, 'test1', 'test1', '12:12:00', 'teset1', 'tesetet1', '2021-05-07T08-21-19.767Z_102111263_toba02.jpg', '2021-05-12', 'tesetsetset', '2021-05-07 15:21:19', '2021-05-07 15:21:19'),
(16, 'Numpang Lewat', 'Numpang Lewat', '09:10:00', 'Numpang Lewat', 'Numpang Lewat', '2021-05-07T09-07-45.562Zgambar orang sukses.jpg', '2021-05-12', 'test', '2021-05-07 16:07:47', '2021-05-07 16:07:47'),
(17, 'Bourne: Ultimatum', 'Action', '02:03:00', 'Paul Greengrass', 'Matt Damon', '2021-05-08T09-18-49.549Zposter bourne ultimatum.jpg', '2007-01-01', 'The finale sequel of Bourne', '2021-05-08 15:31:03', '2021-05-08 15:31:03');

-- --------------------------------------------------------

--
-- Struktur dari tabel `premiere_location`
--

CREATE TABLE `premiere_location` (
  `premiere_location_id` int(11) NOT NULL,
  `premiere_location_city` varchar(250) DEFAULT NULL,
  `premiere_location_address` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `premiere_location`
--

INSERT INTO `premiere_location` (`premiere_location_id`, `premiere_location_city`, `premiere_location_address`, `created_at`, `updated_at`) VALUES
(1, 'Padang', 'Jalan Otto Iskandardinata No.105', '2021-04-13 18:53:37', '0000-00-00 00:00:00'),
(2, 'Padang', 'Jalan Otto Iskandardinata No.104 ', '2021-04-13 19:03:05', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `schedule`
--

CREATE TABLE `schedule` (
  `schedule_id` int(11) NOT NULL,
  `cinema_id` int(11) NOT NULL DEFAULT '0',
  `schedule_date` date DEFAULT NULL,
  `schedule_clock` time DEFAULT NULL,
  `schedule_location` varchar(150) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `schedule`
--

INSERT INTO `schedule` (`schedule_id`, `cinema_id`, `schedule_date`, `schedule_clock`, `schedule_location`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, '08:30:00', 'Jakarta', '2021-04-13 23:34:54', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `user_account_id` int(11) NOT NULL,
  `user_account_username` varchar(150) DEFAULT NULL,
  `user_account_first_name` varchar(150) DEFAULT NULL,
  `user_account_last_name` varchar(150) DEFAULT NULL,
  `user_account_email` varchar(150) DEFAULT NULL,
  `user_account_password` varchar(255) DEFAULT NULL,
  `user_account_phone_number` varchar(50) DEFAULT NULL,
  `user_account_status` varchar(50) DEFAULT NULL,
  `user_account_verified` varchar(50) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`user_account_id`, `user_account_username`, `user_account_first_name`, `user_account_last_name`, `user_account_email`, `user_account_password`, `user_account_phone_number`, `user_account_status`, `user_account_verified`, `created_at`, `updated_at`) VALUES
(1, 'akbarsaladin36', 'Muhammad Akbar', 'Saladin Siregar', 'asong36@gmail.com', '$2b$10$jXG7JzvKw17WhEbWZrp1fuCEOF/mY0wYdqEojjlWc7N5cpMF8IDKm', '0812345678910', 'admin', '1', '2021-04-28 23:19:39', NULL),
(2, 'ramadani1234', 'ramadani', 'saja', NULL, '$2b$10$MctF7f46rbdyY2OlWgXPH.Ou0tCeEoIODQLyTItbRqpnPfylZVOiS', '0812345678910', 'user', NULL, '2021-04-28 23:22:02', NULL),
(3, 'admin12', NULL, NULL, 'akbarsaladin99@gmail.com', '$2b$10$1wzC1omD17B.cJwU.ve/h.g/4Hh4vLSJJEnjDFlddJENCFha4fsr.', NULL, 'user', '1', '2021-05-08 14:49:18', NULL),
(4, 'test12', NULL, NULL, 'test123@gmail.com', '$2b$10$.RkCNwo0kD.n.Jgg4HBK2uFBTGnOvVjr1xHx/MJAGYDJcB7MtsW7e', NULL, 'user', NULL, '2021-05-10 10:03:05', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indeks untuk tabel `booking_seat`
--
ALTER TABLE `booking_seat`
  ADD PRIMARY KEY (`booking_seat_id`);

--
-- Indeks untuk tabel `cinema`
--
ALTER TABLE `cinema`
  ADD PRIMARY KEY (`cinema_id`) USING BTREE;

--
-- Indeks untuk tabel `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movie_id`);

--
-- Indeks untuk tabel `premiere_location`
--
ALTER TABLE `premiere_location`
  ADD PRIMARY KEY (`premiere_location_id`);

--
-- Indeks untuk tabel `schedule`
--
ALTER TABLE `schedule`
  ADD PRIMARY KEY (`schedule_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_account_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `booking`
--
ALTER TABLE `booking`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `booking_seat`
--
ALTER TABLE `booking_seat`
  MODIFY `booking_seat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `cinema`
--
ALTER TABLE `cinema`
  MODIFY `cinema_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `movie`
--
ALTER TABLE `movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT untuk tabel `premiere_location`
--
ALTER TABLE `premiere_location`
  MODIFY `premiere_location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `schedule`
--
ALTER TABLE `schedule`
  MODIFY `schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `user_account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
