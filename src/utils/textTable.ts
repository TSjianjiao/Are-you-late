import wcwidth from 'wcwidth'
import { StringDecoder } from 'string_decoder'
interface Cell {
  colName: string
  colValue: string | number
  detectedResult: DetectedResult
}
interface Column {
  colName: string
  colValues: Cell['colValue'][]
  maxWidth?: number
}

interface DetectedResult {
  width: number,
  isFullWidth: boolean
}

class TextTable {
  // 保存单元格
  constructor(
    private cells:Cell[] = [],
    private fullWidthSpace:string = '　',
    private columns: Column[] = [],
    private maxRows:number = 0
  ) {}

  // 侦测值
  private detectValue(str: string): DetectedResult {
    const wcWidth = str.length
    const strWidth = str.length
    return {
      width: wcWidth,
      isFullWidth: strWidth !== wcWidth
    }
  }

  // 计算每列最长长度
  private calculateColMaxWidth() {
    this.columns.forEach((col) => {
      let colMaxWidth = 0
      const colNameWidth = col.colName.length
      this.maxRows = col.colValues.length > this.maxRows ? col.colValues.length : this.maxRows
      col.colValues.forEach(v => {
        const w = String(v).length
        colMaxWidth = w > colMaxWidth ? w :  colMaxWidth
      })
      colMaxWidth = colNameWidth > colMaxWidth ? colNameWidth :  colMaxWidth
      col.maxWidth = colMaxWidth
    })
  }

  // 存储列行 列
  public cell(colName: string, colValue: string | number , render?: () => void): void {
    const strValue = ToDBC(String(colValue))
    this.cells.push({
      colName,
      colValue: strValue,
      detectedResult: this.detectValue(strValue)
    })
    const find = this.columns.find(c => c.colName === colName)
    if(find) {
      find.colValues.push(strValue)
    }else {
      this.columns.push({
        colName,
        colValues: [strValue],
      })
    }
  }

  // 渲染每一行
  private renderRow() {
    let outStr = ''
    const maxRows = this.maxRows
    for(let rowIndex = -2; rowIndex < maxRows; rowIndex++) {
      this.columns.forEach((col, index) => {
        let v = ''
        if(rowIndex === -2) {
          v = col.colName
        }else if(rowIndex === -1) {
          v = '＝'.repeat(col.maxWidth)
        }else {
          v = String(col.colValues[rowIndex])
        }
        outStr += v
        outStr += this.fullWidthSpace.repeat(col.maxWidth + 2 - v.length)
      })
      outStr += '\n'
    }
    return outStr
  }

  // 输出
  public output():string {
    this.calculateColMaxWidth()
    const res = this.renderRow()
    this.reset()
    return res
  }

  // 清空
  public reset() {
    this.cells = [],
    this.columns = [],
    this.maxRows = 0
  }
}

// 半角转全角
export function ToDBC(txtstring: string) {
  let tmp = ''
  for (let i = 0; i < txtstring.length; i++) {
    if (txtstring.charCodeAt(i) == 32) {
      tmp += String.fromCharCode(12288)
      continue
    }else if (txtstring.charCodeAt(i) < 127) {
      tmp += String.fromCharCode(txtstring.charCodeAt(i) + 65248)
      continue
    }
    tmp += txtstring[i]
  }
  return tmp
}
export default TextTable
