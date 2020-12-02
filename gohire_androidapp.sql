-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 02, 2020 at 07:17 AM
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
  `ac_level` enum('Engineer','Company','Admin') DEFAULT NULL,
  `ac_created_at` timestamp NULL DEFAULT NULL,
  `ac_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `ad_id` int(11) UNSIGNED NOT NULL,
  `ac_id` int(11) UNSIGNED NOT NULL,
  `ad_job_title` varchar(70) DEFAULT NULL,
  `ad_location` varchar(70) DEFAULT NULL,
  `ad_avatar` text DEFAULT NULL,
  `ad_created_at` timestamp NULL DEFAULT NULL,
  `ad_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `cp_created_at` datetime DEFAULT NULL,
  `cp_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `en_updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `hr_date_confirm` datetime DEFAULT NULL,
  `hr_created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `pj_created_at` timestamp NULL DEFAULT NULL,
  `pj_updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`ad_id`);

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
  MODIFY `ab_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `ac_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `ad_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `cp_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `engineer`
--
ALTER TABLE `engineer`
  MODIFY `en_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `experience`
--
ALTER TABLE `experience`
  MODIFY `ex_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hire`
--
ALTER TABLE `hire`
  MODIFY `hr_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `pr_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `pj_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
