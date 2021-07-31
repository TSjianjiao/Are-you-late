import { GetMsg } from '../ws/getMessage'

/**
 * 过滤函数装饰器
 */
export default function <M extends GetMsg>() {
	return function (target: any, propertyName: string, descriptor: PropertyDescriptor):void {
		const originalMethod = descriptor.value
		descriptor.value = function(...args: any[]) {
			// 调用的时候保存action长度
			const actionLength = this.actionList.length
			this.actionList.push({
				methodName: propertyName,
				params: args,
				method: () => {
					let message:M = undefined
					// action列表有长度说明应该基于上一次的结果进行过滤
					if(actionLength > 0) {
						if(this.filteredMsg) {
							message = {...this.filteredMsg}
						}
					}else {
						message = {...this.msg}
					}
					originalMethod.apply(this, [...args, message])
				}
			})
			return this
		}
	}
}
