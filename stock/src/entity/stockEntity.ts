import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shop } from "./shopEntity";
import { Product } from "./productEntity";

@Entity()
export class Stock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    shop_id: number;

    @Column()
    product_id: number;

    @Column('integer')
    shelf_quantity: number;

    @Column('integer')
    order_quantity: number;

    @ManyToOne(() => Shop, (shop) => shop.stocks, { onDelete: "CASCADE"})
    @JoinColumn({name:'shop_id'})
    shop: Shop;

    @ManyToOne(() => Product, (product) => product.stocks, {onDelete: "CASCADE"})
    @JoinColumn({name:'product_id'})
    product: Product;
}