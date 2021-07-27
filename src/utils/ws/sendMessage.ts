import ws from '@/utils/ws'
import { messageType } from '@/types/sendMessage'
interface SendMessageListItem {
  methodName: string,
  params: any[],
  method: () => void
}
interface Msg {
  syncId: string,
  command: string,
  content: {
    messageChain: any[]
  }
}

/**
 * 参数任选其一，出现多个参数时，按照imageId > url > path > base64的优先级
 */
interface ImageP {
  /**
   * 图片的`imageId`，群图片与好友图片格式不同。不为空时将忽略url属性
    ```
    "imageId": "{01E9451B-70ED-EAE3-B37C-101F1EEBF5B5}.mirai",  //群图片格式
    "imageId": "/f8f1ab55-bf8e-4236-b55e-955848d7069f"      //好友图片格式
    ```
   * */
  imageId: string
  /** 图片的URL，发送时可作网络图片的链接；接收时为腾讯图片服务器的链接，可用于图片下载 */
  url: string
  /** 图片的路径，发送本地图片，相对路径于`plugins/MiraiAPIHTTP/images` */
  path: string
  /** 图片的 `Base64` 编码 */
  base64: string
}

const Pock = {
  "Poke": '戳一戳',
  "ShowLove": '比心',
  "Like": '点赞',
  "Heartbroken": '心碎',
  "SixSixSix": '666',
  "FangDaZhao": '放大招',
}
export default class SendMessage {
  private sendMessageList: SendMessageListItem[] = []
  constructor(private msg: Msg) {}

  /**
   * at目标
   * @param target 目标qq号
   * @param display At时显示的文字，发送消息时无效，自动使用群名片
   */
  at(target: number, display = '') {
    this.sendMessageList.push({
      methodName: 'at',
      params: [target, display],
      method: () => {
        this.msg.content.messageChain.push({
          type: "At",
          target: target,
          display
        })
      }
    })
    return this
  }

  /**
   * at全部
   */
  atAll() {
    this.sendMessageList.push({
      methodName: 'atAll',
      params: [],
      method: () => {
        this.msg.content.messageChain.push({
          type: "AtAll",
        })
      }
    })
    return this
  }

  /**
   * qq表情
   * @param faceId QQ表情编号，可选，优先高于name
   * @param name QQ表情拼音，可选
   */
  face(faceId?: number, name?: string) {
    if(!faceId && !name) {
      return this
    }
    this.sendMessageList.push({
      methodName: 'face',
      params: [faceId, name],
      method: () => {
        this.msg.content.messageChain.push({
          "type": "Face",
          "faceId": faceId,
          "name": name
        })
      }
    })
    return this
  }

  /**
   * 纯文本消息
   * @param text
   */
  plain(text: string) {
    this.sendMessageList.push({
      methodName: 'plain',
      params: [text],
      method: () => {
        this.msg.content.messageChain.push({
          "type": "Plain",
          "text": text
        })
      }
    })
    return this
  }

  /**
   * 发送图片
   */
  image(img:ImageP) {
    const {
      imageId,
      url,
      path,
      base64
    } = img
    if(!imageId && !url && path && !base64) {
      return this
    }
    this.sendMessageList.push({
      methodName: 'image',
      params: [img],
      method: () => {
        this.msg.content.messageChain.push({
          type: 'Image',
          imageId,  //群图片格式
          url,
          path,
          base64
        })
      }
    })
    return this
  }

  /**
   * 发送闪照
   */
  flashImage(img: ImageP) {
    const {
      imageId,
      url,
      path,
      base64
    } = img
    if(!imageId && !url && path && !base64) {
      return this
    }
    this.sendMessageList.push({
      methodName: 'flashImage',
      params: [img],
      method: () => {
        this.msg.content.messageChain.push({
          type: 'FlashImage',
          imageId,  //群图片格式
          url,
          path,
          base64
        })
      }
    })
    return this
  }

  /**
   * 大表情
   * @param name
   */
  poke(name: keyof typeof Pock) {
    this.sendMessageList.push({
      methodName: 'poke',
      params: [name],
      method: () => {
        this.msg.content.messageChain.push({
          type: 'Poke',
          name
        })
      }
    })
    return this
  }

  /**
   * 骰子
   * @param value 点数
   */
  dice(value: number) {
    this.sendMessageList.push({
      methodName: 'dice',
      params: [value],
      method: () => {
        this.msg.content.messageChain.push({
          type: 'Dice',
          value
        })
      }
    })
    return this
  }


  exec() {
    this.sendMessageList.forEach(action => {
      action.method()
    })
    ws.send(JSON.stringify(this.msg))
    this.sendMessageList = []
  }

}
