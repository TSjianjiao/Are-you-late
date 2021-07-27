import { MessageData, ReceiveMessage, MessageType, CommonMessage } from "@/types/receiveMessage"

/**
 * 根据消息类型筛选
 * @param type
 * @param message
 * @returns
 */
export function filterByMessageType<T extends CommonMessage>(type: keyof typeof MessageType, message: string) {
  const jsonMsg:ReceiveMessage<MessageData<T>> = JSON.parse(message)
  if(jsonMsg.data.type === type) {
    return jsonMsg
  }
}
