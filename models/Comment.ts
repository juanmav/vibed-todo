import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { Todo } from './Todo'

@Table({ tableName: 'comments' })
export class Comment extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  text!: string

  @ForeignKey(() => Todo)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  todoId!: number

  @BelongsTo(() => Todo)
  todo!: Todo
}
