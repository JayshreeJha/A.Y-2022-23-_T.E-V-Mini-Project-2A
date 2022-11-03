-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2022 at 08:32 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `css_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(30) NOT NULL,
  `user_id` int(30) NOT NULL,
  `user_type` tinyint(1) NOT NULL COMMENT '1= admin, 2= staff,3= customer',
  `ticket_id` int(30) NOT NULL,
  `comment` text NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `user_type`, `ticket_id`, `comment`, `date_created`) VALUES
(1, 1, 1, 1, '&lt;p&gt;Sample Comment only&lt;/p&gt; ', '2020-11-09 14:52:16'),
(3, 2, 3, 1, '&lt;p&gt;Sample&amp;nbsp;&lt;/p&gt;', '2020-11-09 15:36:56'),
(4, 1, 1, 5, '&lt;p&gt;Complaint has been processed it will resolve soon sorry for inconvenience&lt;/p&gt;', '2022-09-12 01:56:56'),
(5, 2, 2, 4, '&lt;p&gt;Your query will be resolved till 24 september&lt;/p&gt;', '2022-09-13 22:30:10'),
(6, 2, 2, 9, '&lt;p&gt;Your Query is going to solve wiith in few days.&lt;/p&gt;', '2022-10-14 02:00:07'),
(7, 3, 3, 9, '&lt;p&gt;Exact date and time&lt;/p&gt;', '2022-10-14 02:01:04');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(30) NOT NULL,
  `firstname` varchar(200) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  `middlename` varchar(200) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` text NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `firstname`, `lastname`, `middlename`, `contact`, `address`, `email`, `password`, `date_created`) VALUES
(3, 'Suraj ', 'Singh', 'B', '9137567796', 'APSIT', 'surajsingh@gmail.com', '2f2b2adb68e83de7433190e454536813', '2022-09-11 03:00:43'),
(4, 'Himanshu ', 'Rane', 'P', '9638527410', 'Kharegaon', 'himanshurane123@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '2022-09-12 01:29:47'),
(5, 'Mark', 'Zuckerberg', '', '1345698745', 'Facebook', 'mark@facebook.com', 'e10adc3949ba59abbe56e057f20f883e', '2022-10-14 01:22:22');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(30) NOT NULL,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `name`, `description`, `date_created`) VALUES
(1, 'I.T. Department', 'Information technology Department', '2020-11-09 11:43:18'),
(4, 'C.S.E Department', 'computer Science Department', '2022-09-12 01:51:09'),
(5, 'AI ML Department', 'Artificial intelligence and Machine Learning', '2022-09-12 01:52:15'),
(6, 'Data Science Department', 'Data Science', '2022-09-12 01:52:41');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `id` int(30) NOT NULL,
  `department_id` int(30) NOT NULL,
  `firstname` varchar(200) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  `middlename` varchar(200) NOT NULL,
  `contact` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` text NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`id`, `department_id`, `firstname`, `lastname`, `middlename`, `contact`, `address`, `email`, `password`, `date_created`) VALUES
(2, 1, 'Athrava', 'Takle', '', '9874563210', 'APIST', 'athrava@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', '2022-09-11 03:05:59'),
(3, 4, 'Vinayak', 'Somvanshi', '', '7418529632', 'APSIT', 'vinayak123@gmail.com', '6cf82ee1020caef069e753c67a97a70d', '2022-09-12 02:09:01'),
(4, 5, 'Elon', 'Musk', '', '789654123', 'Tesla', 'elon@tesla.com', 'e10adc3949ba59abbe56e057f20f883e', '2022-10-14 01:23:50');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(30) NOT NULL,
  `subject` text NOT NULL,
  `description` text NOT NULL,
  `status` tinyint(1) NOT NULL COMMENT '0=Pending,1=on process,2= Closed',
  `department_id` int(30) NOT NULL,
  `customer_id` int(30) NOT NULL,
  `staff_id` int(30) NOT NULL,
  `admin_id` int(30) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`id`, `subject`, `description`, `status`, `department_id`, `customer_id`, `staff_id`, `admin_id`, `date_created`) VALUES
(4, 'Lab 301', '&lt;p&gt;Pc no. 22: OS error&lt;/p&gt;', 2, 1, 3, 2, 1, '2022-09-12 01:54:23'),
(5, 'Lab 317', '&lt;p&gt;PC no. 4: Keyboard not working&lt;/p&gt;', 2, 4, 4, 0, 1, '2022-09-12 01:55:34'),
(6, 'Lab 317', '&lt;p&gt;pc not working&lt;/p&gt;', 1, 1, 3, 2, 0, '2022-09-28 13:26:47'),
(7, 'Lab 404', '&lt;p&gt;PC is not working and projector cable broken&lt;/p&gt;', 1, 5, 3, 0, 0, '2022-10-14 01:18:26'),
(8, 'Lab 308', '&lt;p&gt;Keyboard keys are not working&lt;/p&gt;', 0, 6, 5, 0, 0, '2022-10-14 01:40:04'),
(9, 'Location 405', '&lt;p&gt;Lab projector is not working&lt;/p&gt;', 2, 1, 3, 2, 0, '2022-10-14 01:58:10'),
(10, 'Lab 309', '&lt;p&gt;pc 2 is not working&lt;/p&gt;', 2, 1, 3, 2, 0, '2022-10-14 13:05:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(30) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `middlename` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `role` tinyint(1) NOT NULL COMMENT '1 = Admin,2=support',
  `username` varchar(200) NOT NULL,
  `password` text NOT NULL,
  `date_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `middlename`, `lastname`, `role`, `username`, `password`, `date_created`) VALUES
(1, 'Administrator', '', '', 1, 'admin', '0192023a7bbd73250516f069df18b500', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
