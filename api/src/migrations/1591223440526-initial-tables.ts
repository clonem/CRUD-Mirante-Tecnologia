import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialTables1591223440526 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `User` ( `userID` int(11) NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(500) DEFAULT NULL, `password` varchar(255) DEFAULT NULL, `phone` varchar(255) DEFAULT NULL, `userType` varchar(100) NOT NULL, `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(), `updatedAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(), PRIMARY KEY (`userID`) ) ENGINE=InnoDB DEFAULT CHARSET=utf8',
    );
    await queryRunner.query(
      'CREATE UNIQUE INDEX `UNIQUE_USER_EMAIL` ON `User` (`email` ASC)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE IF EXISTS `User`');
  }
}
