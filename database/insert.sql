INSERT INTO `user` (`userId`,`email`,`userName`.`password`,`active`,`createDate`) VALUES (NULL,'admin@mail.com','Administrador','e99be3796d4611a42befe9c866cbd3f7ceb37541',1,NOW());


INSERT INTO `role` (`roleId`,`name`) VALUES (NULL,'MANAGER');
INSERT INTO `role` (`roleId`,`name`) VALUES (NULL,'ADMIN');
INSERT INTO `role` (`roleId`,`name`) VALUES (NULL,'WORKER');
INSERT INTO `role` (`roleId`,`name`) VALUES (NULL,'INVITED');
