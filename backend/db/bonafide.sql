-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 18, 2024 at 07:02 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bonafide`
--

-- --------------------------------------------------------

--
-- Table structure for table `bonafide2`
--

CREATE TABLE `bonafide2` (
  `uid` int(11) NOT NULL,
  `id` varchar(200) NOT NULL,
  `fname` varchar(200) NOT NULL,
  `lname` varchar(200) NOT NULL,
  `regno` varchar(200) NOT NULL,
  `aadhar` varchar(255) NOT NULL,
  `gender` varchar(200) NOT NULL,
  `fathername` varchar(200) NOT NULL,
  `type` varchar(100) NOT NULL,
  `syear` varchar(100) NOT NULL,
  `degree` varchar(100) NOT NULL,
  `dept` varchar(200) NOT NULL,
  `ayear` varchar(100) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `boarding` varchar(100) NOT NULL,
  `purpose` varchar(200) NOT NULL,
  `status` varchar(255) NOT NULL,
  `applydate` varchar(255) NOT NULL,
  `photo` varchar(200) NOT NULL,
  `rejection_reason` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bonafide2`
--

INSERT INTO `bonafide2` (`uid`, `id`, `fname`, `lname`, `regno`, `aadhar`, `gender`, `fathername`, `type`, `syear`, `degree`, `dept`, `ayear`, `dob`, `boarding`, `purpose`, `status`, `applydate`, `photo`, `rejection_reason`) VALUES
(287, 'jp', 'jp', 'k', '927621bcs046', '7896541230', 'female', 'ram', 'BONAFDIE', 'II', 'b.e', 'CSE', '2025-2026', '2023-10-03T18:30:00.000Z', 'dayscholar', 'CERTIFICATE CORRECTIONS', 'rejected', '2024-03-16', '/images/photo/jegan.jpeg', 'reason not weell'),
(288, 'jp', 'jp', 'k', '927621bcs046', '7896541230', 'female', 'ram', 'BONAFDIE', 'III', 'b.e', 'CSE', '2026-2027', '2023-10-04', 'dayscholar', 'CERTIFICATE CORRECTIONS', 'accepted', '2024-03-16', '/images/photo/jegan.jpeg', 'details not well'),
(291, 'jp', 'jp', 'k', '927621bcs046', '7896541230', 'female', 'ram', 'BONAFDIE', 'III', 'b.e', 'CSE', '2024-2025', '2023-10-04', 'dayscholar', 'INTERNSHIP - INDIVIDUAL', 'accepted', '2024-03-17', '/images/photo/jegan.jpeg', 'fasdfasdfasdfDefault Value'),
(293, 'jp', 'jegan', 'jegan', '928721', 'asdfasdf', 'male', 'asdfasd', 'dafda', 'das', 'asdfasdf', 'CSE', 'asdfa', 'asdf', 'adsf', 'asdfa', 'pending', 'adsfasdf', 'asdfasdf', 'null'),
(294, 'jp', 'jp', 'k', '927621bcs046', '7896541230', 'female', 'ram', 'BONAFDIE', 'IV', 'b.e', 'CSE', '2024-2028', '2023-10-04', 'dayscholar', 'BANK ACCOUNT OPENING', 'pending', '2024-03-17', '/images/photo/jegan.jpeg', NULL),
(295, 'jp', 'jp', 'k', '927621bcs046', '7896541230', 'female', 'ram', 'BONAFDIE', 'III', 'b.e', 'computer science and engineering', '2024-2026', '2023-10-04', 'dayscholar', 'INTERNSHIP - INDIVIDUAL', 'pending', '2024-03-18', '/images/photo/jegan.jpeg', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `login_staff`
--

CREATE TABLE `login_staff` (
  `id` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `Department` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_staff`
--

INSERT INTO `login_staff` (`id`, `pass`, `Department`) VALUES
('admin', 'admin', 'CSE');

-- --------------------------------------------------------

--
-- Table structure for table `login_student`
--

CREATE TABLE `login_student` (
  `id` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `Department` varchar(255) NOT NULL,
  `Batch` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login_student`
--

INSERT INTO `login_student` (`id`, `pass`, `Department`, `Batch`) VALUES
('jegan', '44', 'IT', '2020-2024'),
('jp', '33', 'CSE', '2021-2025');

-- --------------------------------------------------------

--
-- Table structure for table `mic`
--

CREATE TABLE `mic` (
  `uid` int(11) NOT NULL,
  `id` varchar(100) NOT NULL,
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `regno` varchar(100) NOT NULL,
  `aadhar` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `fathername` varchar(100) NOT NULL,
  `degree` varchar(100) NOT NULL,
  `dept` varchar(100) NOT NULL,
  `dob` varchar(255) NOT NULL,
  `boarding` varchar(100) NOT NULL,
  `batch` varchar(100) NOT NULL,
  `photo` varchar(200) NOT NULL,
  `pass` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mic`
--

INSERT INTO `mic` (`uid`, `id`, `fname`, `lname`, `regno`, `aadhar`, `gender`, `fathername`, `degree`, `dept`, `dob`, `boarding`, `batch`, `photo`, `pass`) VALUES
(2, 'jp', 'jp', 'k', '927621bcs046', '7896541230', 'female', 'ram', 'b.e', 'computer science and engineering', '2023-10-04', 'dayscholar', '2021-2022', '/images/photo/jegan.jpeg', '33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bonafide2`
--
ALTER TABLE `bonafide2`
  ADD PRIMARY KEY (`uid`,`id`);

--
-- Indexes for table `login_staff`
--
ALTER TABLE `login_staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `login_student`
--
ALTER TABLE `login_student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mic`
--
ALTER TABLE `mic`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bonafide2`
--
ALTER TABLE `bonafide2`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=296;

--
-- AUTO_INCREMENT for table `mic`
--
ALTER TABLE `mic`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
