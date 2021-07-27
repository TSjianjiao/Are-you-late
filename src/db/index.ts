import mongoose from 'mongoose'
import DBConfig from '@/config/db.config'
import logger from "@/utils/logger"

mongoose.connect(DBConfig.uri, DBConfig.connectionOptions, err => {
  if (err) {
    console.log('[Mongoose🦢] 连接失败')
    logger('db', 'error', err)
  } else {
    console.log('[Mongoose🦢] 连接成功')
    logger('db', 'info', '[Mongoose🦢] 连接成功')
  }
})
export default mongoose
