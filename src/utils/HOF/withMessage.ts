import ws from '@/utils/ws'
import { CodeEnum } from '@/types/code'
import { SessionMsg, GroupMessage, ReceiveMessage, Plain } from '@/types/receiveMessage'
import { getSession } from '@/utils/session'

export default function withMessage(callback: (message) => void) {

	ws.addEventListener('message', ({data}) => {
		////////////////////// 检查session 必须第一步 //////////////////////////
		const jsonMsg:ReceiveMessage<SessionMsg> = JSON.parse(data)
		if(jsonMsg.data.code === CodeEnum.success) {
			getSession(jsonMsg)
			return
		}
		////////////////////////////////////////////////////////////////////////
		callback(jsonMsg)
	})
}
