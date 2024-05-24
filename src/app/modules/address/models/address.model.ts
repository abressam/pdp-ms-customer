import { DataType, Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'Address',
  timestamps: false,
})
export class Address extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  zipcode: string;

  @Column({ type: DataType.STRING, allowNull: false })
  city: string;

  @Column({ type: DataType.STRING, allowNull: false })
  complement: string;

  @Column({ type: DataType.STRING, allowNull: false })
  street: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  number: number;

  @Column({ type: DataType.STRING, allowNull: false })
  neighbourhood: string;

  @Column({ type: DataType.STRING, allowNull: false })
  state: string;
}
