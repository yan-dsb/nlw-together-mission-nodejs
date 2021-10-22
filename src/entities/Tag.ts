import { v4 as uuid } from 'uuid';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Expose } from 'class-transformer';

@Entity('tags')
export default class Tag {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'customName' })
  customName(): string {
    return `#${this.name}`;
  }

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
