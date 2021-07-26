import { Code } from "./code";

export interface ReceiveMessage<D> {
  /** 消息同步的字段 */
  syncId: number,
  /** 错误信息 */
  msg?: string
  /** 推送消息内容, 与通用接口定义相同 */
  data: D extends SessionMsg ? SessionMsg : MessageData<D>
}

// 消息类型：GroupMessage\FriendMessage\TempMessage\各类Event

export interface MessageData<T> {
  type: T["type"],
  messageChain: [
    Source,
    ...Array<any>
  ],
  /** 消息发送者 */
  sender?: T['sender']
}

/** 消息链类型 */

export const MessageType = {
  FriendMessage: '好友消息',
  GroupMessage: '群消息',
}

/** 通用响应 */
export interface SessionMsg  {
  code: Code,
  session:string
}

export interface CommonMessage {
  type: string
  sender: any
}
/** 好友消息 */
export interface FriendMessage extends CommonMessage {
  type: "FriendMessage",
  sender: {
      id: number,
      nickname: string,
      remark: string
  },
}

/** 群消息 */
export interface GroupMessage extends CommonMessage  {
  "type": "GroupMessage",
  "sender": {
      "id": number,
      "memberName": string,
      "specialTitle": string,
      "permission": string,
      "joinTimestamp": number,
      "lastSpeakTimestamp": number,
      "muteTimeRemaining": number,
      "group": {
          "id": number,
          "name": string,
          "permission": string,
      },
  },
}

/**  群临时消息 */
export interface TempMessage extends CommonMessage {
  "type": "TempMessage",
  "sender": {
      "id": number,
      "memberName": string,
      "specialTitle": string
      "permission": string,
      "joinTimestamp": number,
      "lastSpeakTimestamp": number,
      "muteTimeRemaining": number,
      "group": {
          "id": number,
          "name": string,
          "permission": string,
      },
  },
}

/**  陌生人消息 */
export interface StrangerMessage extends CommonMessage {
  "type": "StrangerMessage",
  "sender": {
      "id": number,
      "nickname": string,
      "remark": string
  },
}

/**  其他客户端消息 */
export interface OtherClientMessage extends CommonMessage {
  "type": "OtherClientMessage",
  "sender": {
      "id": number,
      "platform": string
  },
}

/** 消息类型 */

/** 消息链第一个元素，用于标识 */
export interface Source {
  "type": "Source",
  /** 消息的识别号，用于引用回复 */
  "id": number,
  "time": number
}

/** 引用 */
export interface Quote {
  "type": "Quote",
  "id": number,
  "groupId": number,
  "senderId": number,
  "targetId": number,
  /** 跟消息链一样 */
  "origin": any[]
}

export interface Plain {
  "type": string,
  "text": string
}

// 三个参数任选其一，出现多个参数时，按照imageId > url > path > base64的优先级
export interface Image {
  "type": "Image",
  "imageId": string,  //群图片格式
  //"imageId": "/f8f1ab55-bf8e-4236-b55e-955848d7069f"      //好友图片格式
  "url": string,
  "path": string,
  "base64": string
}

export interface At {
  "type": "At",
  "target": number,
  "display": string
}



// {
//   "syncId":"-1",
//   "data":{
//     "type":"GroupMessage",
//     "messageChain":[
//       {"type":"Source","id":893020,"time":1626933057},
//       {"type":"Plain","text":"问你好久来"}
//     ],
//     "sender":{
//       "id":624349819,
//       "memberName":"群傻卵",
//       "specialTitle":"黄皮猫",
//       "permission":"MEMBER",
//       "joinTimestamp":1577756307,
//       "lastSpeakTimestamp":1626933057,
//       "muteTimeRemaining":0,
//       "group":{
//         "id":599869861,
//         "name":"相亲相爱一家人",
//         "permission":"MEMBER"
//       }
//     }
//   }
// }

// {
//   "syncId":"-1",
//   "data":{
//     "type":"GroupMessage",
//     "messageChain":[
//       {
//         "type":"Source",
//         "id":893224,
//         "time":1626935053
//       },
//       {
//         "type":"Image",
//         "imageId":"{5C875394-C653-EDD0-C050-7D92771E728B}.jpg",
//         "url":"http://gchat.qpic.cn/gchatpic_new/929175050/599869861-3013057782-5C875394C653EDD0C0507D92771E728B/0?term=2",
//         "path":null,
//         "base64":null
//       }
//     ],
//     "sender":{
//       "id":929175050,
//       "memberName":"头上有煎饺",
//       "specialTitle":"煎饺",
//       "permission":"MEMBER",
//       "joinTimestamp":1583923168,
//       "lastSpeakTimestamp":1626935053,
//       "muteTimeRemaining":0,
//       "group":{
//         "id":599869861,
//         "name":"相亲相爱一家人",
//         "permission":"MEMBER"
//       }
//     }
//   }
// }
