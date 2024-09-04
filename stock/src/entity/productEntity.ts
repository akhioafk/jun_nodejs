import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Stock } from './stockEntity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column({ unique: true })
    plu: number;

    @Column()
    name: string;

    @OneToMany(() => Stock, (stock) => stock.product)
    stocks: Stock[];
}
