import { Entity, PrimaryGeneratedColumn, Unique, Column, OneToMany } from 'typeorm';
import { Stock } from './stockEntity';

@Entity()
@Unique(['plu'])
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    plu: string;

    @Column()
    name: string;

    @OneToMany(() => Stock, (stock) => stock.product)
    stocks: Stock[];
}
