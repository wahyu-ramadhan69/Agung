/*
SQLyog Professional v12.5.1 (32 bit)
MySQL - 8.1.0 
*********************************************************************
*/
/*!40101 SET NAMES utf8 */;

create table `users` (
	`id` int (11),
	`uuid` varchar (765),
	`name` varchar (765),
	`email` varchar (765),
	`password` varchar (765),
	`role` varchar (765),
	`createdAt` datetime ,
	`updatedAt` datetime 
); 
insert into `users` (`id`, `uuid`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) values('1','5fcf1ca3-108a-4880-82b7-0bdaeb6628c8','admin','admin@gmail.com','$argon2id$v=19$m=4096,t=3,p=1$Ngf8ylZJhCfFxPNHFatgAg$yj6vbbRkJTHBjY8J5XRe+pfDmSV1KBKprHmtzG3qV9k','admin','2023-08-22 14:20:18','2023-08-22 14:20:18');
