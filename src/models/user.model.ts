import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export type UserAuthorities = 'ADMIN' | 'USER';

@Entity()
export class UserPermissions {
  
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column({
    unique: true
  })
  role: UserAuthorities;

}

@Entity("users")
export class User {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({nullable: true})
  firstname?: string;

  @Column({nullable: true})
  lastname?: string;

  @Column({
    unique: true,
    nullable: false
  })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => UserPermissions)
  @JoinTable()
   _authorities: UserPermissions[];

  get authorities() {
    return this._authorities.map(authority => authority.role)
  }

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
