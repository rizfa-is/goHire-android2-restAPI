-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 20, 2020 at 10:13 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gohire_androidapp`
--

-- --------------------------------------------------------

--
-- Table structure for table `ability`
--

CREATE TABLE `ability` (
  `ab_id` int(11) UNSIGNED NOT NULL,
  `en_id` int(11) UNSIGNED NOT NULL,
  `ab_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ability`
--

INSERT INTO `ability` (`ab_id`, `en_id`, `ab_name`) VALUES
(8, 2, 'C#'),
(9, 3, 'Java'),
(10, 3, 'Spring Boot'),
(11, 3, 'C++'),
(13, 7, 'Vue JS'),
(15, 7, 'Vue Js'),
(16, 7, 'Node Js'),
(17, 8, 'Ruby'),
(20, 4, 'Adobe Ilustrator'),
(21, 4, 'Microsoft Office'),
(22, 7, 'MySQL'),
(23, 7, 'Swift'),
(24, 7, 'Swift'),
(25, 7, 'Swift'),
(26, 7, 'Swift'),
(27, 7, 'Swift'),
(28, 7, 'Swift'),
(30, 2, 'Swift'),
(31, 8, 'Swift'),
(32, 8, 'Swift'),
(33, 2, 'Swift'),
(34, 2, 'Swift');

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `ac_id` int(11) UNSIGNED NOT NULL,
  `ac_name` varchar(50) DEFAULT NULL,
  `ac_email` varchar(50) DEFAULT NULL,
  `ac_phone` varchar(20) DEFAULT NULL,
  `ac_password` text DEFAULT NULL,
  `ac_level` enum('Engineer','Company') DEFAULT NULL,
  `ac_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `ac_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`ac_id`, `ac_name`, `ac_email`, `ac_phone`, `ac_password`, `ac_level`, `ac_created_at`, `ac_updated_at`) VALUES
(2, 'Aokiji', 'ginais@gmail.com', '0857867890089', 'qwer5678', 'Engineer', '2020-11-14 06:09:11', '2020-11-14 06:09:11'),
(3, 'Bandai', 'bandai@bnd.com', '089780890676', 'qwer5678', 'Engineer', '2020-11-14 06:19:04', '2020-11-14 06:19:04'),
(9, 'Kurozumi Orochi', 'ginais@gmail.com', '0857867890089', 'qwer5678', 'Engineer', '2020-11-14 06:45:50', '2020-11-14 06:45:50'),
(14, 'Makuto', 'makutoId@gmail.com', '081567543221', 'poik987', 'Engineer', '2020-11-14 07:03:57', '2020-11-14 07:03:57'),
(15, 'Gina Nihhhh', 'ginais@gmail.com', '0857867890089', 'qwer5678', 'Company', '2020-11-14 07:05:57', '2020-11-14 07:05:57'),
(17, 'Makuto', 'makutoId@gmail.com', '081567543221', 'poik987', 'Engineer', '2020-11-15 10:24:07', '2020-11-15 10:24:07'),
(18, 'Makuto', 'makutoId@gmail.com', '0857867890089', 'qwer5678', 'Company', '2020-11-15 10:24:26', '2020-11-15 10:24:26'),
(19, 'Serberus V3', 'serberusv5@gmail.com', '0321456344', '$2b$10$iPdpECy6tJdMSAdfyg92c.w8yOmXo6vUrhHCcf.1Mw95QFrhNQBf.', 'Engineer', '2020-11-18 22:46:17', '2020-11-18 22:46:17'),
(20, 'Makuto', 'makutoId@gmail.com', '081567543221', 'poik987', 'Company', '2020-11-18 22:47:01', '2020-11-18 22:47:01'),
(21, 'Saber', 'saber@gmail.com', '03214567890', '$2b$10$7V4dnHS4c9qBTTRCvhzn0uojYa/IZg.B08DWZTyA/H9GdOTbamXLG', 'Company', '2020-11-19 00:03:55', '2020-11-19 00:03:55'),
(23, 'Serberus V6', 'serberusv6@gmail.com', '0321456344', '$2b$10$lMlpvb9p204vKE/mPNF6R.URG1qTlc.hHFZlT4JhD9ccTnZ73efte', 'Engineer', '2020-11-20 00:14:22', '2020-11-20 00:14:22');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `cp_id` int(11) UNSIGNED NOT NULL,
  `ac_id` int(11) UNSIGNED NOT NULL,
  `cp_company` varchar(100) DEFAULT NULL,
  `cp_position` varchar(50) DEFAULT NULL,
  `cp_field` varchar(50) DEFAULT NULL,
  `cp_location` varchar(50) DEFAULT NULL,
  `cp_desc` text DEFAULT NULL,
  `cp_insta` varchar(50) DEFAULT NULL,
  `cp_linkedin` varchar(50) DEFAULT NULL,
  `cp_img` text DEFAULT NULL,
  `cp_created_at` datetime DEFAULT current_timestamp(),
  `cp_updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`cp_id`, `ac_id`, `cp_company`, `cp_position`, `cp_field`, `cp_location`, `cp_desc`, `cp_insta`, `cp_linkedin`, `cp_img`, `cp_created_at`, `cp_updated_at`) VALUES
(6, 6, 'Mugen Tsukotomi Inc.', 'Senior Developer', 'Android', 'Madagascar', NULL, NULL, NULL, NULL, '2020-11-14 13:34:34', '2020-11-14 06:34:34'),
(12, 15, 'Hayam Wuruk Corp.', 'CTO', 'Executive', 'Tanjung Harapan', NULL, NULL, NULL, NULL, '2020-11-14 14:05:57', '2020-11-14 07:05:57'),
(13, 18, 'Grace Family', 'Manager Director', 'Executive', 'Rumania', NULL, NULL, NULL, 'img', '2020-11-15 17:24:26', '2020-11-15 10:24:26'),
(15, 20, NULL, 'Junior Developer', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-16 07:49:57', '2020-11-16 00:49:57'),
(16, 22, NULL, 'Junior Developer', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-16 10:53:56', '2020-11-16 03:53:56'),
(17, 26, 'Balhalu Inc.', 'Junior Developer', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-18 09:20:57', '2020-11-18 02:20:57'),
(18, 27, 'Balhalu Inc.', 'Junior Developer', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-18 09:22:54', '2020-11-18 02:22:54'),
(19, 20, 'Balhalu Inc.', 'Junior Developer', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-19 05:47:01', '2020-11-18 22:47:01'),
(20, 21, 'Police City Inc.', 'Security Expert', NULL, NULL, NULL, NULL, NULL, NULL, '2020-11-19 07:03:55', '2020-11-19 00:03:55');

-- --------------------------------------------------------

--
-- Table structure for table `engineer`
--

CREATE TABLE `engineer` (
  `en_id` int(11) UNSIGNED NOT NULL,
  `ac_id` int(11) UNSIGNED DEFAULT NULL,
  `en_job_title` varchar(50) DEFAULT NULL,
  `en_job_type` enum('Freelance','Fulltime') DEFAULT NULL,
  `en_location` varchar(50) DEFAULT NULL,
  `en_desc` text DEFAULT NULL,
  `en_ig` varchar(50) DEFAULT NULL,
  `en_github` varchar(50) DEFAULT NULL,
  `en_gitlab` varchar(50) DEFAULT NULL,
  `en_avatar` text DEFAULT NULL,
  `en_created_at` timestamp NULL DEFAULT NULL,
  `en_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `engineer`
--

INSERT INTO `engineer` (`en_id`, `ac_id`, `en_job_title`, `en_job_type`, `en_location`, `en_desc`, `en_ig`, `en_github`, `en_gitlab`, `en_avatar`, `en_created_at`, `en_updated_at`) VALUES
(2, 2, 'Talent Hunter', 'Fulltime', 'Sumeria', 'Love Myself', '@tlsum', NULL, NULL, NULL, NULL, NULL),
(3, 3, 'QA Engineer', 'Freelance', 'Machu picu', 'Analizing for brigth future', '@mcuqa', 'https://github.com/mcuqa', 'https://gitlab.com/mcqua', NULL, NULL, NULL),
(7, 9, 'Software Engineer', 'Fulltime', 'Rhode Island', 'I\'m kimono\'s engineer', '@kimonome', 'https://github.com/kimonome', 'https://gitlab.com/kimonome', NULL, NULL, NULL),
(8, 14, 'Good Job.', 'Fulltime', 'Bora-bora', 'Good Vibes.', '@alexme', NULL, NULL, 'img', NULL, NULL),
(14, 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 19, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `experience`
--

CREATE TABLE `experience` (
  `ex_id` int(11) UNSIGNED NOT NULL,
  `en_id` int(11) UNSIGNED DEFAULT NULL,
  `ex_role` varchar(50) DEFAULT NULL,
  `ex_company` varchar(100) DEFAULT NULL,
  `ex_desc` text DEFAULT NULL,
  `ex_start` date DEFAULT NULL,
  `ex_end` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `experience`
--

INSERT INTO `experience` (`ex_id`, `en_id`, `ex_role`, `ex_company`, `ex_desc`, `ex_start`, `ex_end`) VALUES
(2, 3, 'Senior Developer', 'GreenFiled Inc.', 'Good Atmospher.', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hire`
--

CREATE TABLE `hire` (
  `hr_id` int(11) UNSIGNED NOT NULL,
  `en_id` int(11) UNSIGNED NOT NULL,
  `pj_id` int(11) UNSIGNED NOT NULL,
  `hr_price` bigint(20) DEFAULT NULL,
  `hr_message` text DEFAULT NULL,
  `hr_status` enum('wait','reject','approve') DEFAULT NULL,
  `hr_date_confirm` datetime DEFAULT current_timestamp(),
  `hr_created_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hire`
--

INSERT INTO `hire` (`hr_id`, `en_id`, `pj_id`, `hr_price`, `hr_message`, `hr_status`, `hr_date_confirm`, `hr_created_at`) VALUES
(1, 2, 1, 1390, '089789890987', 'wait', '2020-11-15 22:00:16', '2020-11-16 06:41:52'),
(4, 2, 1, 1390, '089789890987', 'approve', '2020-11-19 23:01:57', '2020-11-19 16:02:47');

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--

CREATE TABLE `portfolio` (
  `pr_id` int(11) UNSIGNED NOT NULL,
  `en_id` int(11) UNSIGNED DEFAULT NULL,
  `pr_application` varchar(50) DEFAULT NULL,
  `pr_desc` text DEFAULT NULL,
  `pr_link` varchar(100) DEFAULT NULL,
  `pr_repo` varchar(100) DEFAULT NULL,
  `pr_company` varchar(100) DEFAULT NULL,
  `pr_role` enum('Mobile App','Web App') DEFAULT NULL,
  `pr_img` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `portfolio`
--

INSERT INTO `portfolio` (`pr_id`, `en_id`, `pr_application`, `pr_desc`, `pr_link`, `pr_repo`, `pr_company`, `pr_role`, `pr_img`) VALUES
(2, 2, 'NganterKamu', 'Transportasi Online', 'https://play.google.com/store/apps/details?id=com.pb.nganterkamu', 'https://github.com/punaru/nganterkm', 'Punggawa Baru', 'Mobile App', NULL),
(3, 6, 'CuacaKita', 'Tracking cuaca lokal', 'https://www.cuacakita.com', 'https://github.com/explr-id/weather', 'Explore ID', 'Web App', NULL),
(4, 7, 'Holahop', 'Game main holahop', 'https://play.google.com/store/apps/details?id=com.gg.hlop', 'https://github.com/gamgear/holahop', 'Gaming Gear', 'Mobile App', NULL),
(5, 11, 'JodohanYuk', 'Web cari jodoh', 'https://www.jodahanyuk.com', 'https://github.com/sos-id/meetup', 'Solusi ID', 'Web App', NULL),
(6, 3, 'Ittadaki Masu', 'Aplikasi Makan Ramen', 'https://play.google.com/store/apps/details?id=com.jr.ittada', 'https://github.com/jaray/ittada', 'Japan Ray', 'Mobile App', 'pr_img-1605802412221.png'),
(7, 3, 'Mujamu', 'Aplikasi Jual JAmu', 'https://play.google.com/store/apps/details?id=com.jr.mujamu', 'https://github.com/jaray/mujamu', 'Japan Ray', 'Mobile App', 'uploadImg-1605792875855.png'),
(8, 2, 'Nakama', 'Aplikasi Baca Anime', 'https://play.google.com/store/apps/details?id=com.jr.Nakama', 'https://github.com/jaray/Nakama', 'Japan Ray', 'Mobile App', 'pr_img-1605799641128.png');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `pj_id` int(11) UNSIGNED NOT NULL,
  `cp_id` int(11) UNSIGNED NOT NULL,
  `pj_name` varchar(100) DEFAULT NULL,
  `pj_desc` text DEFAULT NULL,
  `pj_deadline` date DEFAULT NULL,
  `pj_img` text DEFAULT NULL,
  `pj_created_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `pj_updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`pj_id`, `cp_id`, `pj_name`, `pj_desc`, `pj_deadline`, `pj_img`, `pj_created_at`, `pj_updated_at`) VALUES
(5, 6, 'Wonder Zoo V6', 'Game taman bermain V6', '2020-11-28', 'pj_img-1605800155826.png', '2020-11-19 15:35:55', '2020-11-19 15:35:55'),
(6, 6, 'Visit Indonesia', 'Aplikasi Wisata', '2020-11-28', '', '2020-11-19 00:44:13', '2020-11-19 00:44:13'),
(7, 6, 'Visit Indonesia V2', 'Aplikasi Wisata V2', '2020-11-25', 'pj_img-1605750789226.jpg', '2020-11-19 01:53:09', '2020-11-19 01:53:09'),
(8, 6, 'Visit Indonesia V3', 'Aplikasi Wisata V3', '2020-11-25', 'pj_img-1605780419138.jpg', '2020-11-19 10:06:59', '2020-11-19 10:06:59'),
(9, 6, 'Gerhana Matahari', 'Aplikasi Gerhana Matahari V3', '2020-11-21', 'uploadImg-1605790381043.jpg', '2020-11-19 12:53:01', '2020-11-19 12:53:01'),
(10, 6, 'Proxima Centaury', 'Aplikasi Pendeteksi Planet Layak Huni', '2020-11-21', 'pj_img-1605800420793.jpg', '2020-11-19 15:40:20', '2020-11-19 15:40:20'),
(11, 6, 'Proxima Centaury X2', 'Aplikasi Pendeteksi Planet Layak Huni II', '2020-11-28', 'pj_img-1605800475407.jpg', '2020-11-19 15:41:15', '2020-11-19 15:41:15'),
(12, 6, 'Proxima Centaury X2', 'Aplikasi Pendeteksi Planet Layak Huni II', '2020-11-28', 'pj_img-1605801101385.jpg', '2020-11-19 15:51:41', '2020-11-19 15:51:41');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ability`
--
ALTER TABLE `ability`
  ADD PRIMARY KEY (`ab_id`),
  ADD KEY `enn_id` (`en_id`);

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`ac_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`cp_id`),
  ADD KEY `acc_id2` (`ac_id`);

--
-- Indexes for table `engineer`
--
ALTER TABLE `engineer`
  ADD PRIMARY KEY (`en_id`),
  ADD KEY `acc_id` (`ac_id`);

--
-- Indexes for table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`ex_id`),
  ADD KEY `en_id` (`en_id`);

--
-- Indexes for table `hire`
--
ALTER TABLE `hire`
  ADD PRIMARY KEY (`hr_id`),
  ADD KEY `en_id2` (`en_id`),
  ADD KEY `pj_id` (`pj_id`);

--
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`pr_id`),
  ADD KEY `en_id4` (`en_id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`pj_id`),
  ADD KEY `cp_id` (`cp_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ability`
--
ALTER TABLE `ability`
  MODIFY `ab_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `ac_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `cp_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `engineer`
--
ALTER TABLE `engineer`
  MODIFY `en_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `experience`
--
ALTER TABLE `experience`
  MODIFY `ex_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hire`
--
ALTER TABLE `hire`
  MODIFY `hr_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `pr_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `pj_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
