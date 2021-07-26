import { store } from "@/store"
import { saveSession } from "@/store/slices/sessionSlice"
import { SessionMsg, ReceiveMessage } from "@/types/receiveMessage"

/**
 * 返回session和保存session到store
 * @param jsonMsg
 * @returns
 */
 export function getSession(jsonMsg?: ReceiveMessage<SessionMsg>): string {
  const { session } = store.getState().session
  if(session) {
    return session
  }else {
    if(jsonMsg) {
      store.dispatch(saveSession(jsonMsg.data.session))
      return jsonMsg.data.session
    }else {
      throw new Error('no session!')
    }
  }
}
