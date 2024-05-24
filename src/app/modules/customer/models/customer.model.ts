import { DataType, Table, Column, Model } from 'sequelize-typescript';

@Table({
  tableName: 'Customer',
  timestamps: false,
})
export class Customer extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  cpf: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  fk_Address_id: number;
}
