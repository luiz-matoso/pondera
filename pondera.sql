-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: pondera
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `user_id` int NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `question_id` (`question_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`),
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (1,9,1,'teste','2025-09-14 01:03:31'),(2,9,1,'sim amno talvez vdd vlw flw\n','2025-09-14 01:11:11'),(3,12,1,'dd','2025-09-14 01:11:26'),(4,15,1,'vdd ','2025-09-14 01:11:29'),(5,15,1,'dsadsa','2025-09-14 01:11:32'),(6,15,1,'das','2025-09-14 01:11:33'),(7,15,1,'dsadsadsadsa','2025-09-14 01:11:36'),(8,15,1,'dsadsa','2025-09-14 01:11:38'),(9,15,1,'dasdsadsa','2025-09-14 01:11:41'),(10,9,1,'d','2025-09-14 01:36:34'),(11,9,1,'dd','2025-09-14 01:41:17'),(12,9,1,'dsadsa','2025-09-14 17:50:47'),(13,17,1,'Testing answers','2025-09-14 18:17:26'),(14,12,1,'testandoi','2025-09-14 18:20:47'),(15,10,5,'Python!','2025-09-14 18:31:30');
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (3,'Arts'),(9,'Business'),(8,'Education'),(10,'Entertainment'),(7,'Health'),(5,'History'),(4,'Mathematics'),(2,'Science'),(6,'Sports'),(1,'Technology');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question_votes`
--

DROP TABLE IF EXISTS `question_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_votes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `user_id` int NOT NULL,
  `vote_type` enum('like','dislike') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_question_vote` (`question_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `question_votes_ibfk_1` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `question_votes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_votes`
--

LOCK TABLES `question_votes` WRITE;
/*!40000 ALTER TABLE `question_votes` DISABLE KEYS */;
INSERT INTO `question_votes` VALUES (3,12,1,'like','2025-09-14 02:11:17'),(4,9,1,'like','2025-09-14 17:50:38'),(5,17,1,'dislike','2025-09-14 18:17:22'),(7,10,5,'like','2025-09-14 18:31:33');
/*!40000 ALTER TABLE `question_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category` varchar(100) NOT NULL,
  `likes` int DEFAULT '0',
  `dislikes` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (9,1,'How to learn React quickly?','I want to learn React fast for a project. Any tips for beginners? What resources should I use?','Technology',30,15,'2025-09-14 00:46:53'),(10,2,'Best programming language for beginners?','I\'m new to programming and want to know which language is best to start with in 2024?','Technology',9,22,'2025-09-14 00:46:53'),(12,2,'How to improve painting skills?','I\'ve been painting for a few months but feel stuck. Any advice on how to improve my techniques?','Arts',14,1,'2025-09-14 00:46:53'),(15,2,'Best exercises for weight loss?','What are the most effective exercises for losing weight and getting in shape?','Health',27,4,'2025-09-14 00:46:53'),(16,2,'History of ancient civilizations','Can anyone recommend good books or resources about ancient Egyptian and Greek civilizations?','History',14,1,'2025-09-14 00:46:53'),(17,1,'Pondera test','Testing pondera','general',0,1,'2025-09-14 18:17:09');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Luiz Matoso','matoso','2004-03-01','canaldosory@gmail.com','$2b$10$UZFGXSo7z1k8xsn62uepU.ejiHhaOHPe.mYKXToDSuCjQinM1vFaW'),(2,'Teste','tester','2004-03-01','luizhmatoso1340@gmail.com','$2b$10$tnX5iM.28sB4bbExzAgn9OOsFL0YshOcO0jRh5tbUV9zZI64AOaX.'),(4,'Testando','testando10','2005-03-02','dsadsadas@gmail.com','$2b$10$7kUYYol5lDHx5VEtHOpUz.5zguacGpqwbsbC2ZuPBWlrSZm8wJx7K'),(5,'Luiz Henrique Matoso','luizmatoso','2004-03-01','luizmatoso@gmail.com','$2b$10$JP3NeQR4MTfFfqkhjUZHZeEQXpE99pZS5JyMqM8pCmqCCfT7gh.u2'),(6,'Readme Testing','readmetest','1999-01-01','readmetest@gmail.com','$2b$10$TxrmN1MNLwf0mlTE7ca0rOcl2g87zefSj1kkEe2gXrpGLADe06lzW');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-14 16:03:50
