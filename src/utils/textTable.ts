import wcwidth from 'wcwidth'

interface Cell {
  colName: string
  colValue: string | number
  detectedResult: DetectedResult
}
interface Column {
  colName: string
  colValues: Cell['colValue'][]
  detectedResult: DetectedResult
}

interface DetectedResult {
  width: number,
  isFullWidth: boolean
}

class TextTable {
  // 保存单元格
  private cells: Cell[] = []
  private columns: Column[] = []
  private fullWidthSpace = '　'
  private halfWidthSpace = ' '
  constructor() {}

  // 侦测值
  private detectValue(str: string): DetectedResult {
    const wcWidth = wcwidth(str)
    const strWidth = str.length
    return {
      width: wcWidth,
      isFullWidth: str.length === wcWidth
    }
  }

  // private calculateMax
  // 存储列行
  public cell(colName: string, colValue: string | number , render: () => void): void {
    const strValue = String(colValue)
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
        detectedResult: this.detectValue(colName)
      })
    }
  }


  // 输出
  public output():string {
    console.log('111')
    return
  }
}


export default TextTable
