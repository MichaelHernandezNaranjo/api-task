
CREATE TABLE `user`(
    `userId` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(120) NOT NULL,
    `userName` VARCHAR(120) NOT NULL,
    `password` VARCHAR(200) NOT NULL,
    `active` TINYINT(1) NOT NULL,
    `createDate` DATETIME NOT NULL,
    CONSTRAINT `pk_user` PRIMARY KEY (`userId`)
);

-- CREATE TABLE `userConfig`(
--     `userId` INT NOT NULL AUTO_INCREMENT,
--     `email` VARCHAR(120) NULL,
--     `userName` VARCHAR(120) NOT NULL,
--     `password` VARCHAR(200) NOT NULL,
--     `active` TINYINT(1) NOT NULL,
--     `createDate` DATETIME NOT NULL,
--     CONSTRAINT `pk_userConfig` PRIMARY KEY (`userId`),
--     CONSTRAINT `fk_userConfig_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
-- );

CREATE TABLE `project`(
    `projectId` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    `description` VARCHAR(500) NULL,
    `active` TINYINT(1) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `createUserId` INT NOT NULL,
    CONSTRAINT `pk_project` PRIMARY KEY (`projectId`)
);

CREATE TABLE `sprint`(
    `projectId` INT NOT NULL,
    `sprintId` INT NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `description` VARCHAR(500) NULL,
    `active` TINYINT(1) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `createUserId` INT NOT NULL,
    CONSTRAINT `pk_sprint` PRIMARY KEY (`projectId`,`sprintId`),
    CONSTRAINT `fk_sprint_project` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`)
);

CREATE TABLE `status`(
    `projectId` INT NOT NULL,
    `statusId` INT NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `active` TINYINT(1) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `createUserId` INT NOT NULL,
    CONSTRAINT `pk_status` PRIMARY KEY (`projectId`,`statusId`),
    CONSTRAINT `fk_status_project` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`)
);

CREATE TABLE `task`(
    `projectId` INT NOT NULL,
    `taskId` INT NOT NULL,
    `sprintId` INT NOT NULL,
    `statusId` INT NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `description` VARCHAR(500) NULL,
    `active` TINYINT(1) NOT NULL,
    `createDate` DATETIME NOT NULL,
    `createUserId` INT NOT NULL,
    CONSTRAINT `pk_task` PRIMARY KEY (`projectId`,`taskId`),
    CONSTRAINT `fk_task_project` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`),
    CONSTRAINT `fk_task_sprint` FOREIGN KEY (`projectId`,`sprintId`) REFERENCES `sprint` (`projectId`,`sprintId`),
    CONSTRAINT `fk_task_status` FOREIGN KEY (`projectId`,`statusId`) REFERENCES `status` (`projectId`,`statusId`)
);

CREATE TABLE `predecessor`(
    `projectId` INT NOT NULL,
    `taskId` INT NOT NULL,
    `predecessorId` INT NOT NULL,
    CONSTRAINT `pk_predecessor` PRIMARY KEY (`projectId`,`taskId`,`predecessorId`),
    CONSTRAINT `fk_predecessor_project` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`),
    CONSTRAINT `fk_predecessor_task` FOREIGN KEY (`projectId`,`taskId`) REFERENCES `task` (`projectId`,`taskId`)
);

CREATE TABLE `role`(
    `roleId` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(120) NOT NULL,
    CONSTRAINT `pk_role` PRIMARY KEY (`roleId`)
);

CREATE TABLE `taskUser`(
    `projectId` INT NOT NULL,
    `taskId` INT NOT NULL,
    `userId` INT NOT NULL,
    `roleId` INT NOT NULL,
    CONSTRAINT `pk_taskUser` PRIMARY KEY (`projectId`,`taskId`,`userId`),
    CONSTRAINT `fk_taskUser_project` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`),
    CONSTRAINT `fk_taskUser_task` FOREIGN KEY (`projectId`,`taskId`) REFERENCES `task` (`projectId`,`taskId`),
    CONSTRAINT `fk_taskUser_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`),
    CONSTRAINT `fk_taskUser_role` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`)
);

CREATE TABLE `taskTimer`(
    `projectId` INT NOT NULL,
    `taskId` INT NOT NULL,
    `taskTimerId` INT NOT NULL,
    `statusId` INT NOT NULL,
    `startDate` DATETIME NOT NULL,
    `startUserId` int NOT NULL,
    `endDate` DATETIME NULL,
    `endUserId` int NULL,
    CONSTRAINT `pk_taskTimer` PRIMARY KEY (`projectId`,`taskId`,`taskTimerId`),
    CONSTRAINT `fk_taskTimer_project` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`),
    CONSTRAINT `fk_taskTimer_task` FOREIGN KEY (`projectId`,`taskId`) REFERENCES `task` (`projectId`,`taskId`),
    CONSTRAINT `fk_taskTimer_status` FOREIGN KEY (`projectId`,`statusId`) REFERENCES `status` (`projectId`,`statusId`),
    CONSTRAINT `fk_taskTimer_startUser` FOREIGN KEY (`startUserId`) REFERENCES `user` (`userId`),
    CONSTRAINT `fk_taskTimer_endUser` FOREIGN KEY (`endUserId`) REFERENCES `user` (`userId`)
);

CREATE TABLE `taskComment`(
    `projectId` INT NOT NULL,
    `taskId` INT NOT NULL,
    `userId` INT NOT NULL,
    `taskCommentId` INT NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `createDate` DATETIME NOT NULL,
    CONSTRAINT `pk_taskComment` PRIMARY KEY (`projectId`,`taskId`,`userId`,`taskCommentId`),
    CONSTRAINT `fk_taskComment_project` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`),
    CONSTRAINT `fk_taskComment_task` FOREIGN KEY (`projectId`,`taskId`) REFERENCES `task` (`projectId`,`taskId`),
    CONSTRAINT `fk_taskComment_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
);

CREATE TABLE `taskAttach`(
    `projectId` INT NOT NULL,
    `taskId` INT NOT NULL,
    `userId` INT NOT NULL,
    `taskAttachId` INT NOT NULL,
    `path` VARCHAR(200) NOT NULL,
    `name` VARCHAR(40) NOT NULL,
    `createDate` DATETIME NOT NULL,
    CONSTRAINT `pk_taskAttach` PRIMARY KEY (`projectId`,`taskId`,`userId`,`taskAttachId`),
    CONSTRAINT `fk_taskAttach_project` FOREIGN KEY (`projectId`) REFERENCES `project` (`projectId`),
    CONSTRAINT `fk_taskAttach_task` FOREIGN KEY (`projectId`,`taskId`) REFERENCES `task` (`projectId`,`taskId`),
    CONSTRAINT `fk_taskAttach_user` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
);





