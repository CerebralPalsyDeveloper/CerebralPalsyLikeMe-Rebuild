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
-- Table structure for table `device_info`
--

DROP TABLE IF EXISTS `device_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device_info` (
  `DeviceID` int NOT NULL AUTO_INCREMENT,
  `DeviceName` varchar(100) DEFAULT NULL,
  `DeviceDescription` varchar(255) DEFAULT NULL,
  `CanWalk` varchar(10) DEFAULT NULL,
  `HandTrouble` varchar(10) DEFAULT NULL,
  `CanTalk` varchar(10) DEFAULT NULL,
  `CanSee` varchar(10) DEFAULT NULL,
  `CanHear` varchar(10) DEFAULT NULL,
  `NeedAssistance` varchar(10) DEFAULT NULL,
  `Category` varchar(50) DEFAULT NULL,
  `Image` varchar(1000) DEFAULT NULL,
  `Website` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`DeviceID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_info`
--

LOCK TABLES `device_info` WRITE;
/*!40000 ALTER TABLE `device_info` DISABLE KEYS */;
INSERT INTO `device_info` VALUES (1,'Motorized Wheelchair','A motorized wheelchair','No','Yes',NULL,NULL,NULL,NULL,'Mobility','https://images-na.ssl-images-amazon.com/images/I/81J7Nkr5jQL._AC_UL900_SR900,600_.jpg','https://www.amazon.com/Lightweight-Electric-Wheelchair-Intelligent-Motorized/dp/B0DBPFB2Z5/ref=zg_bs_g_3777061_d_sccl_1/135-6456460-1510848?psc=1'),(2,'Manual Wheelchair','A manual wheelchair','No','No',NULL,NULL,NULL,NULL,'Mobility','https://m.media-amazon.com/images/I/81yOo8IZN7L.__AC_SX300_SY300_QL70_FMwebp_.jpg','https://www.amazon.com/Medline-Wheelchair-Desk-Length-Swing-Away-Transfers/dp/B08KSLCS9M/ref=asc_df_B08KSLCS9M/?tag=hyprod-20&linkCode=df0&hvadid=693403640392&hvpos=&hvnetw=g&hvrand=12200823547673519020&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9199138&hvtargid=pla-1260386471257&psc=1&mcid=de14cd7acf0334a3a35c05f6b61dd1d3'),(3,'Forearm Crutches','Some forearm crutches','Yes','No',NULL,NULL,NULL,NULL,'Mobility','https://m.media-amazon.com/images/I/31C-m+9KdQL._SX342_SY445_.jpg','https://www.amazon.com/Dynarex-Drynarex-Forearm-Crutches-Adult/dp/B084HXHFX2/ref=asc_df_B084HXHFX2/?tag=hyprod-20&linkCode=df0&hvadid=692875362841&hvpos=&hvnetw=g&hvrand=1204304673544324383&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9199138&hvtargid=pla-2281435179018&psc=1&mcid=49a1ea3dc2d1349d8b24093ae8198374&hvocijid=1204304673544324383-B084HXHFX2-&hvexpln=73'),(4,'Communication Device','A communication device',NULL,NULL,'No',NULL,NULL,NULL,'Communication','https://m.media-amazon.com/images/I/81iuHszgUZL._AC_UL800_FMwebp_QL65_.jpg','https://www.amazon.com/sspa/click?ie=UTF8&spc=MTozNTA4NDU2NzM2MzM1NjA6MTcyOTM1MTg3NjpzcF9hdGY6MzAwNDY3MTMzMTU4MzAyOjowOjo&url=%2FSpecial-Supplies-Communication-Therapy-Talking%2Fdp%2FB0BNP2KQ5G%2Fref%3Dsr_1_1_sspa%3Fdib%3DeyJ2IjoiMSJ9.5Zd1wqdobj5oeRWZmD7DWopPFcnGa1-S8mwQtDws00L1zNU9oVCDikf02q8Trpqjx-z1UyjdcC9jb7wHhFbH2SocY6pB7VCir6fxGWVFEY06pRI694NMFPNqR2E5ybLnrQk07rpzRwCPOmSpmyPTRk5KuD5OFaGHMbpK_RCDisaZoCNpuVHWoy-ux41gspceyhRprAy0N4jo0kv-uc58EvrK2exWYvQ65FMwdiMBH0VReXznQ2NmFM8eGt_EuwWrUmk68QUJMZo_3ydJ5Q0yXsD7Ul8eXAtLRHpnp15WUmE._uZDcANRuxhwqshFlMKea739F0PxzMNsGYvvo7EOoyQ%26dib_tag%3Dse%26keywords%3Dcommunication%2Bdevice%26qid%3D1729351876%26sr%3D8-1-spons%26sp_csd%3Dd2lkZ2V0TmFtZT1zcF9hdGY%26psc%3D1'),(5,'Walker','A posture control walker','Yes','Yes',NULL,NULL,NULL,NULL,'Mobility','http://kayeproducts.com/wordpress_3878201/wp-content/uploads/2023/01/w5c_240w.gif','https://kayeproducts.com/kaye-large-posture-control-walkers/'),(6,'Low-vision glasses','Some low-vision glasses',NULL,NULL,NULL,'No',NULL,NULL,'Vision','https://m.media-amazon.com/images/I/61SvJM1ItbL.__AC_SY300_SX300_QL70_FMwebp_.jpg','https://www.amazon.com/Eschenbach-162411-Look/dp/B004CS7R70/ref=asc_df_B004CS7R70/?tag=hyprod-20&linkCode=df0&hvadid=692875362841&hvpos=&hvnetw=g&hvrand=2737888654575815896&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9199138&hvtargid=pla-2281435179018&mcid=f464da7be6d338d7aa5f44d5cbc30e88&hvocijid=2737888654575815896-B004CS7R70-&hvexpln=73&th=1'),(7,'Hearing aids','Some hearing aids',NULL,NULL,NULL,NULL,'No',NULL,'Hearing','https://m.media-amazon.com/images/I/61DPtD-+fCL._AC_SX679_.jpg','https://www.amazon.com/Lexie-Plus-Hearing-Aids-Powered/dp/B0CQMZTHGM/ref=sr_1_2_sspa?dib=eyJ2IjoiMSJ9.p4Vi1phJhf8GWGwfBSDvkIUllK4h-DYFXQDytI69qIOnEYy8pHzzoVFgo5g7VbR__AA_giJleWRlp4DaANvKac_b2sLcRmC4xBomjiQQarOrnQNszYS9YM0nOcEIe8W27woutuMo4yUxWCiURxxmKMt-S88FfAzabgcWKei5V7Kk8NtAL2LuWnEdyvzW-sImHRVlvoQP_i9xuVchzSmeuXiCX40kpctE13hYH2Aj52Sce-jJAANxN0Qc2tqBSVNBEN9M6K_Yo0RRKWEx3IrDBS9r6yPOGu5aDzXhBAkjfvw.wwLmNOvsdz_9sz_1ri-OV01GZ5252F9cCUAomh7PnvE&dib_tag=se&hvadid=703824626873&hvdev=c&hvlocphy=9199138&hvnetw=g&hvqmt=e&hvrand=8781507826714467524&hvtargid=kwd-300693672605&hydadcr=6357_13364149&keywords=hearing+aids%27&qid=1729538724&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'),(8,'Adaptive Utensils','Some adaptive utensils',NULL,NULL,NULL,NULL,NULL,'Yes','Daily Living','https://m.media-amazon.com/images/I/711sdNPrkwL._AC_SX679_.jpg','https://www.amazon.com/dp/B074JGZTKV/?_encoding=UTF8&pd_rd_i=B074JGZTKV&ref_=sbx_be_s_sparkle_ssd_tt&qid=1729540929&pd_rd_w=iCB57&content-id=amzn1.sym.8591358d-1345-4efd-9d50-5bd4e69cd942%3Aamzn1.sym.8591358d-1345-4efd-9d50-5bd4e69cd942&pf_rd_p=8591358d-1345-4efd-9d50-5bd4e69cd942&pf_rd_r=73VPXM850D3DN934XXCC&pd_rd_wg=J9Qrz&pd_rd_r=6cff2582-332a-48a4-9d3a-2544609a3631&pd_rd_plhdr=t'),(10,'Transfer Bench for Bathtub Shower Chair','A transfer bench shower chair',NULL,NULL,NULL,NULL,NULL,'Yes','Daily Living','https://m.media-amazon.com/images/I/51ttQGk6bjL._AC_SX679_.jpg','https://www.amazon.com/Transfer-Bathtub-Elderly-Disabled-Adjustable/dp/B0DMQVTS67/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.E6qKkqdqdmPaMaXkjh4BCOutD_AL0t3YWe7FqXFelAgU-f5kQ6xGxh4FKdKfflxkWAtZtdl8tFeoC-leYjcfzYUTjH5BHUNqeMsrXbgyWXdC5_mnAClaSW2RGo38fdEW6O9Wp2wbWyJdSDwMKerJWELNDkTq5dKP4RI2Mb4PKGKeSSLmBgd0tHQzEkL3zdp1rHRvBYNJRV-dat6DTQ0SW3FTRmI2-HEROSDeH-yLY2Pcyx7bSv7LQY8qgNE4MO4delefoRVshC71_L5g0bGSZ8GftUDrH8cz0z7RHN3e3NE.07gMvg2EJZL7iHF_DH6XdyvRkJTJBHDgvvXVWFTFN5w&dib_tag=se&keywords=shower+chair&qid=1732044903&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1'),(11,'StrongArm Comfort Cane','Self Standing Lightweight Adjustable Walking Cane','Yes','Yes',NULL,NULL,NULL,'Yes','Mobility','https://m.media-amazon.com/images/I/718S4rXcfmL._AC_SX679_.jpg','https://www.amazon.com/dp/B07SV58TGL/?_encoding=UTF8&pd_rd_i=B07SV58TGL&ref_=sbx_be_s_sparkle_ssd_tt&qid=1732045506&pd_rd_w=SaO4a&content-id=amzn1.sym.8591358d-1345-4efd-9d50-5bd4e69cd942%3Aamzn1.sym.8591358d-1345-4efd-9d50-5bd4e69cd942&pf_rd_p=8591358d-1345-4efd-9d50-5bd4e69cd942&pf_rd_r=N1EPMMRDS9MPSC14PKZ0&pd_rd_wg=cgPko&pd_rd_r=353ca9f7-fd40-4e9b-b0e2-a7ff1e4fadb1&pd_rd_plhdr=t'),(12,'Speech Tablet','A speech tablet',NULL,NULL,'No',NULL,NULL,NULL,'Communication','https://usaspeechtablets.com/cdn/shop/products/ScreenShot2021-10-06at9.50.45PM_1024x1024@2x.png?v=1724436773','https://usaspeechtablets.com/products/8s?variant=41479989494015&utm_source=googleads&vt_keyword=&utm_source=google&utm_medium=x&utm_campaign=17453141234&utm_content=&utm_term=&ref=smart&gad_source=1&gclid=EAIaIQobChMIlN7Vm5zpiQMVXDbUAR18iSZsEAQYBCABEgJbSPD_BwE'),(13,'Full Page Magnifying Glass','A magnifying glass for reading',NULL,NULL,NULL,'No',NULL,NULL,'Vision','https://m.media-amazon.com/images/I/81+XPXJ64NL._AC_SX679_.jpg','https://www.amazon.com/MAGNIPROS-Magnifying-Detachable-Hands-Free-Magnifier/dp/B0DDRYZTY5/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.TSbGCDU4pKkEDRD47ADf4gc5TQiBy2RcJprK2wVJDpL1ZlXNLCiXmuVA6n4hXSoB0bmNWRlfKqWSMKWxyOgBEEFZnxfrOCSL19DsGAqDrvC7zFChZd4hDMAqg0Qpe1TnP_MJS9uiakUTQf_gqgB_Hbt-VcpSGEJragjpHy5g9_wPVwXVMptYwW096vLkg-F6QxeLqgQQQf_Iv1GSqggu_H-SJXcDV7_q-K79BHJOf2CmSb5LL3hLvfe_DUgFHxD0hU5JDtCnnFnxdG1Z3UOskEbPx-z6MShKgU29YGqEECc.smnd84IqvesfQro4aZfeOTAWlZyNQ5PZpeOmiFgRLWk&dib_tag=se&hvadid=630952709417&hvdev=c&hvlocphy=9199138&hvnetw=g&hvqmt=e&hvrand=6589247328180952717&hvtargid=kwd-304722525&hydadcr=24660_13626701&keywords=low%2Bvision%2Baids&qid=1732048239&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1'),(14,'Silicone Adaptive Aid Universal Cuff','Adaptive aid for limited hand mobility and Cerebral Palsy',NULL,'Yes',NULL,NULL,NULL,'Yes','Daily Living','https://m.media-amazon.com/images/I/611FHbMfc7L._AC_SX679_.jpg','https://www.amazon.com/EazyHold-Universal-Arthritis-Adaptive-Silicone/dp/B01CTDUT6U/ref=sr_1_9?crid=24UMH9P90MZIC&dib=eyJ2IjoiMSJ9.is6H3ItxkrciA0Nbc1EwF7dmJD-r1HIaOQkXjzckDHkEBRrTp_9PWW40KbLgBucCgfIp3WhbTkl8U9Nbbvkumcn7pf_pl6zzU-dTkVi1kazMhkEM2ox8XW90haGJzK2MV365hPUTSPmOZpQyNuJzafatkHP4wTBZudCOIMfpRRisAPYpao_YIrXI5LwTO5yj0gurK3bZ4vrSMsTkKLSxfSKDvR0plgqSQiczeu7SDl1fH-DGKQaB5UG3XG2N8MbN-NA0saC4eZpUiJwW8FNf6Qsm5mfhZl9UXpRgp2D87T4.gdiijfPFWmupdEe6GZf2NtFQB1g8B1eWIx6jK-UHAgQ&dib_tag=se&keywords=universal+cuff&qid=1732050375&s=hpc&sprefix=universal+cuff%2Chpc%2C250&sr=1-9'),(15,'Shower Grab Bar','A grab bar for the shower',NULL,NULL,NULL,NULL,NULL,'Yes','Daily Living','https://m.media-amazon.com/images/I/518mXmRvl-L._AC_SX679_.jpg','https://www.amazon.com/TAILI-Bathtubs-Removable-Handrails-Waterproof/dp/B0C4N4J4HQ/ref=sr_1_1_sspa?dib=eyJ2IjoiMSJ9.MjCXnFLI3VV9mWPoSBCzkfOGOqa-bECa3uiHcywcYvfwpfV7bljYkljG2VNVMJ0dBEL6q8UftkpSbqFSa5baHnh8Qj03GbSvYyeWMdbsSmoHlU1qoAwmqSRyoopI8p6uuT0XSwvxnEB76DhcG7HaZm6movqssMDjyrJoIeyvOP_IlTbgQkrAyW5bA-sjV8oh6RBiMv0vjov8n64loJh4jpZogY_apuHyyD9zk_TuKl4VfSc99fH6PTLN7YxTMYBk1q1XFqnGvsKmQEidhpTQPxFx8Eg8X2JunZ3NXs9OiYk.o3oF9PVJUI49zhWuSCGVqAJavWYG0qhtVnyumoamMu4&dib_tag=se&hvadid=707411862623&hvdev=c&hvlocphy=9199138&hvnetw=g&hvqmt=e&hvrand=13664200807516913595&hvtargid=kwd-1221536277246&hydadcr=21877_13323198&keywords=wall%2Bshower%2Bgrab%2Bbar&qid=1732051168&s=hpc&sr=1-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1'),(16,'TD I-Series Eyegaze Device','A device to communicate with your eyes',NULL,NULL,'No',NULL,NULL,NULL,'Communication','https://us.tobiidynavox.com/cdn/shop/files/TD_Series-Front_C5_TD-Snap_825x675_EN_2_5000x.png?v=1683137883','https://us.tobiidynavox.com/products/td-i-series');
/*!40000 ALTER TABLE `device_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-01 19:39:06
