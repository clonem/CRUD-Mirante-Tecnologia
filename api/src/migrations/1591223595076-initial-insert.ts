import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialInsert1591223595076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "INSERT INTO `User` (`userID`, `userType`, `name`, `email`, `password`, `phone`) VALUES (1, 'backoffice', 'Mauro Catto Junior', 'email@gmail.com', 'senha', '+55 (11) 99999-9999');",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DELETE FROM `User`;');
    await queryRunner.query('ALTER TABLE `User` AUTO_INCREMENT = 1;');
  }
}
