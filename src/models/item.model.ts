import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("demotrarion_item")
export class Item {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column()
    name: string
}