import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'
import { Comment } from './Comment'

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
