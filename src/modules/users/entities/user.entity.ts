import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { AbstractEntity } from '@utils/entity/abstract.entity';

@Entity({ name: 'users' })
export class User extends AbstractEntity {
  @Column({ unique: true })
  public name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, select: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  public country: string;

  @Column()
  public premium: boolean;

  @Column({ nullable: true })
  public photo: string | null;

  @Column()
  public role: number;

  /*
  @OneToOne(() => Level)
  @JoinColumn({ name: 'level_id' })
  public level: number | any;

  @OneToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  public role: number;
  */

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
