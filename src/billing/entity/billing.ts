import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('billing_records')
export class Billing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'integer' }) // if enum can use 'varchar' as type
  productCode: number;

  @Column()
  location: string;

  @Column({ type: 'decimal' })
  premiumPaid: number;
}
