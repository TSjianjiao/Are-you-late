import path from "path";

export default {
  appenders: {
    defualt: {
      type: 'file',
      filename: path.join(__dirname, '../log/defualt.log'),
      layout: {
        type: 'coloured'
      }
    },
    errors: {
      type: 'dateFile',
      category: 'dateFileLog',
      filename: path.join(__dirname, '../log/errors/'),
      pattern: 'yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      layout: {
        type: 'coloured'
      }
    },
    ws: {
      type: 'file',
      filename: path.join(__dirname, '../log/ws.log'),
      layout: {
        type: 'coloured'
      }
    },
    db: {
      type: 'file',
      filename: path.join(__dirname, '../log/db.log'),
      layout: {
        type: 'coloured'
      }
    }
  },
  categories: {
    default: { appenders: ['defualt'], level: 'info' },
    error: { appenders: ['errors'], level: 'error' },
    ws: {appenders: ['ws'], level: 'info' },
    db: {appenders: ['db'], level: 'info' },
  }
}
