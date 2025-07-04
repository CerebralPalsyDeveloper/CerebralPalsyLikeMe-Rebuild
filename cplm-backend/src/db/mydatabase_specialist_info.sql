-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 137.184.57.228    Database: mydatabase
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.24.04.1

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
-- Table structure for table `specialist_info`
--

DROP TABLE IF EXISTS `specialist_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialist_info` (
  `SpecialistID` int NOT NULL AUTO_INCREMENT,
  `SpecialistName` varchar(100) NOT NULL,
  `Specialties` varchar(255) NOT NULL,
  `Address` varchar(255) NOT NULL,
  `Expertise` varchar(255) NOT NULL,
  `Classification` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`SpecialistID`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialist_info`
--

LOCK TABLES `specialist_info` WRITE;
/*!40000 ALTER TABLE `specialist_info` DISABLE KEYS */;
INSERT INTO `specialist_info` VALUES (1,'Dr. Jose A. Urquidez','Physiatry, Emergency Medicine','11851 Jollyville Rd, Suite 103, Austin, TX','Cerebral Palsy, Decorticate Posture, Decerebrate Posture, Opisthotonos',NULL),(2,'Dr. Gregory Marchand','Family Medicine','16004 Snowdonia Cv, Bee Cave, TX','Cerebral Palsy, Bronchitis, Anemia, High Cholesterol',NULL),(3,'Dr. Maureen R. Nelson','Physiatry','8611 N Mopac Expy Ste 300, Austin, TX','Cerebral Palsy',NULL),(4,'Dr. Norman M. Whisenant','Physiatry','1106 W Dittmar Blvd, Austin, TX','Cerebral Palsy, Hemiplegia, Subarachnoid, Hemorrhage, Meige Disease',NULL),(5,'Dr. Judy L. Kim','Family Medicine','1101 Camino La Costa, Austin, TX','Moebius Syndrome, Down Syndrome, Cerebral Palsy',NULL),(6,'Dr. Maureen R. Nelson','Physiatry','8611 N Mopac Expy Ste 300, Austin, TX','Cerebral Palsy','Ataxic, Dyskinetic, Mixed-Typed, Spastic'),(7,'Dr. Shelia B. Patel','Physiatry','1201 W Louis Henna Blvd, Austin, TX','Rhabdomyolysis, Stroke, Chronic Subdural Hematoma','Spastic'),(8,'Dr. Justin C. Chavez','Physiatry, Pain Medicine','351 Seton Pkwy, Round Rock, TX','Necrotizing Myopathy, Stroke, Subdural Hematoma, Tomaculous Neuropathy','Spastic'),(9,'Dr. Vettaikorumakankav V. Vedanarayanan','Pediatrics, Neurology','1301 Medical Pkwy, Suite 200, Cedar Park, TX','Inclusion Body Myositis, Amyotonia Congenita, Congenital Myasthenic Syndrome, Limb-Girdle Muscular Dystrophy','Ataxic, Dyskinetic, Mixed-Typed, Spastic'),(10,'Dr. Norman M. Whisenant','Physiatry','1106 W Dittmar Blvd, Austin, TX','Cerebral Palsy, Hemiplegia, Subarachnoid, Hemorrhage, Meige Disease','Ataxic, Dyskinetic, Mixed-Typed, Spastic'),(11,'Dr. Ricardo A. Cruz','Internal Medicine','1201 W 38th St, Austin, TX','Ogilvie Syndrome, Peptic Ulcer, Cellulitis, Endoscopy, and Bone Marrow Aspiration','Spastic, Mixed-Typed'),(12,'Dr. Douglas H. Rankin','Family Medicine','6800 W Gate Blvd #132-326, Austin, TX','Familial Chronic Mucocutaneous Candidiasis, Generalized Tonic-Clonic Seizure, Cerebral Palsy','Ataxic, Dyskinetic, Mixed-Typed, Spastic'),(13,'Dr. James H. Shane','Internal Medicine','12221 N Mopac Expy, Austin, TX','Muscle Atrophy, Vascular Dementia, Dysgraphia, Gastronomy, Endoscopy','Ataxic, Dyskinetic, Mixed-Typed, Spastic'),(14,'Dr. Steven A. Inano','Physiatry','919 E 32nd St, Austin, TX','Stroke, Subdural Hematoma, Foot Drop, Chronic Subdural Hematoma','Spastic'),(15,'Dr. Talia R. Collier','Physiatry, Pediatrics','8611 N Mopac Expy Ste 300, Austin, TX','Myelomeningocele, Primary Lateral Sclerosis, Cerebral Palsy','Ataxic, Dyskinetic, Mixed-Typed, Spastic'),(16,'Dr. Karen C. Keough','Neurology, Pediatrics','7940 Shoal Creek Blvd, Ste 100, Austin, TX','Autosomal Dominant Nocturnal Frontal Lobe Epilepsy, Seizures, Epilepsy, Lennox-Gastaut Syndrome','Ataxic, Dyskinetic, Mixed-Typed, Spastic'),(17,'Dr. Katherine S. Labiner','Neurology','7940 Shoal Creek Blvd, Ste 100, Austin, TX','Seizures, Status Epilepticus, Epilepsy',NULL),(18,'Dr. Michael J. Soileau','Neurology','11279 Taylor Draper Ln, Austin, TX','Parkinson\'s Disease, Progressive Supranuclear Palsy, Progressive Supranuclear Palsy Atypical, Deep Brain Stimulation','Dyskinetic'),(19,'Dr. John R. Jefferson','Neurology','1500 Red River St, Austin, TX','Generalized Tonic-Clonic Seizure, Seizures, Foot Drop, Stroke','Spastic, Dyskinetic'),(20,'Dr. Jefferson T. Miley','Neurology, Interventional Radiology','1601 Trinity St 704 F, Austin, TX','Stroke, Subarachnoid Hemorrhage, Brain Aneurysm, Transmyocardial Revascularization, Stent Placement','Spastic, Dyskinetic'),(21,'Dr. Deborah E. Briggs','Neurology','1600 W 38th St, Austin, TX','Memory Loss, Seizures, Tuberous Sclerosis, Tuberous Sclerosis Complex','Ataxic, Dyskinetic, Mixed-Typed, Spastic'),(22,'Dr. Dave F. Clarke','Neurology, Pediatric Neurology','1301 Barbara Jordan Blvd, Suite 200, Austin, TX','Epilepsy, Seizures, Absence Seizure, Generalized Tonic-Clonic Seizure','Ataxic, Dyskinetic, Mixed-Typed, Spastic'),(23,'Dr. Pradeep N. Modur','Neurology','1600 W 38th St, Austin, TX','Seizures, Generalized Tonic-Clonic Seizure, Epilepsy, Brown-Sequard Syndrome','Ataxic, Dyskinetic, Mixed-Typed, Spastic'),(24,'Dr. Anupama Alareddy','Neurology','1600 W 38th St, Austin, TX','Seizures, Epilepsy, Memory Loss, Generalized Tonic-Clonic Seizure','Ataxic, Dyskinetic, Mixed-Typed, Spastic'),(25,'Dr. Richard A. Sawyers','Neurology','5251 W Hwy 290, Austin, TX','Facioscapulohumeral Muscular Dystrophy, Opsoclonus-Myoclonus Syndrome, Distal Median Nerve Dysfunction, Seizures',NULL),(26,'Dr. Steven J. Warach','Neurology','1601 Trinity St, Austin, TX','Stroke, Dysarthria, Increased Intracranial Pressure, Transient Ischemic Attack, Thrombectomy','Spastic'),(27,'Dr. Mariana G. Varga','Neurology, Physiatry, Psychiatry','3001 Bee Cave Rd, Suite 210, Austin, TX','Parkinson\'s Disease, Essential Tremor, Serotonin Syndrome, Athetosis','Dyskinetic'),(28,'Dr. Andrea S. Raymond','Neurology','2785 E 7th St, Austin, TX','Generalized Tonic-Clonic Seizure, Seizures, Cerebellar Degeneration, Parkinson\'s Disease','Ataxic, Dyskinetic, Mixed-Typed, Spastic'),(29,'Dr. Patrick C. Nolan','Neurology','2785 E 7th St, Austin, TX','Serotonin Syndrome, Neuralgia, Wernicke-Korsakoff Syndrome, Parkinson\'s Disease','Dyskinetic, Spastic'),(30,'Dr. Poonam M. Manasa','Physiatry','919 E 32nd St, Austin, TX','Necrotizing Myopathy, Familial Periodic Paralysis, Stroke, Subarachnoid Hemorrhage','Mixed-Typed, Spastic'),(31,'Dr. Kenny-bao B. Tran','Physiatry, Hospital Medicine','2000 Scenic Dr, Georgetown, TX','Subdural Hematoma, Rhabdomyolysis, Stroke, Chronic Subdural Hematoma, Gastrostomy','Mixed-Typed, Spastic');
/*!40000 ALTER TABLE `specialist_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01 19:39:02
