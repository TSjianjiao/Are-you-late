import Log4js from "log4js"
import logConfig from "@/config/log.config"
Log4js.configure(logConfig)

export default function logger(type:string, level:string, data:any) {
  Log4js.getLogger(type)[level](data)
}
