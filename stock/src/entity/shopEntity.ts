import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Stock } from "./stockEntity";

@Entity()
export class Shop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Stock, (stock) => stock.shop)
    stocks: Stock[];
}