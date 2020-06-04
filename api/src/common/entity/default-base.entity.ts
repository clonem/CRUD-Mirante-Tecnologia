import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DefaultBaseEntity {
  @CreateDateColumn({ select: false })
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true, select: false })
  updatedAt?: Date;
}
