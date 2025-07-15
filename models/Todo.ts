import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'todos' })
export class Todo extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  title!: string

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  completed!: boolean

}
