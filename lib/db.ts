import 'reflect-metadata'
import { Sequelize } from 'sequelize-typescript'
import { Todo } from '../models/Todo'
import { Comment } from '../models/Comment'
import * as dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [Todo, Comment],
  logging: false
})

export { sequelize }

