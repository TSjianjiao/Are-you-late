/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 852:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(e,_){ true?module.exports=_(__webpack_require__(349)):0}(this,(function(e){"use strict";function _(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=_(e),d={name:"zh-cn",weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),ordinal:function(e,_){switch(_){case"W":return e+"周";default:return e+"日"}},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日Ah点mm分",LLLL:"YYYY年M月D日ddddAh点mm分",l:"YYYY/M/D",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日dddd HH:mm"},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},meridiem:function(e,_){var t=100*e+_;return t<600?"凌晨":t<900?"早上":t<1100?"上午":t<1300?"中午":t<1800?"下午":"晚上"}};return t.default.locale(d,null,!0),d}));

/***/ }),

/***/ 607:
/***/ (function(module) {

!function(e,i){ true?module.exports=i():0}(this,(function(){"use strict";return function(e,i,t){i.prototype.isBetween=function(e,i,s,f){var n=t(e),o=t(i),r="("===(f=f||"()")[0],u=")"===f[1];return(r?this.isAfter(n,s):!this.isBefore(n,s))&&(u?this.isBefore(o,s):!this.isAfter(o,s))||(r?this.isBefore(n,s):!this.isAfter(n,s))&&(u?this.isAfter(o,s):!this.isBefore(o,s))}}}));

/***/ }),

/***/ 903:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const system_config_1 = __importDefault(__webpack_require__(522));
const textTable_1 = __importDefault(__webpack_require__(841));
const toolkits_1 = __importDefault(__webpack_require__(391));
const botCommand_1 = __webpack_require__(836);
const gameUser_1 = __importDefault(__webpack_require__(94));
const signIn_1 = __importDefault(__webpack_require__(68));
const userPoints_1 = __importDefault(__webpack_require__(90));
const bet_1 = __webpack_require__(224);
const randomPoint_1 = __importDefault(__webpack_require__(418));
const ws_1 = __webpack_require__(461);
const bet_2 = __importDefault(__webpack_require__(224));
const dayjs_1 = __importDefault(__webpack_require__(349));
const isBetween_1 = __importDefault(__webpack_require__(607));
__webpack_require__(852);
const base_config_1 = __importDefault(__webpack_require__(585));
const flashImage_1 = __importDefault(__webpack_require__(814));
const yuliumsg_1 = __importDefault(__webpack_require__(640));
const lateRegexp = /迟到/gi;
const notLateRegexp = /不迟到|没有迟到|不会迟到|不可能迟到|没迟到|准时到|准点到|迟不到/gi;
dayjs_1.default.extend(isBetween_1.default);
// 保存闪照
ws_1.EventFlow.saveFlashImage = (context) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { message } = context;
    const find = (_b = (_a = message === null || message === void 0 ? void 0 : message.data) === null || _a === void 0 ? void 0 : _a.messageChain) === null || _b === void 0 ? void 0 : _b.find(mc => mc.type === 'FlashImage');
    if (find === null || find === void 0 ? void 0 : find.url) {
        const sender = message.data.sender.id;
        flashImage_1.default.create({
            qq: sender,
            url: find.url
        });
    }
});
// 添加用户
ws_1.EventFlow.addUser = (context) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const { message } = context;
    if ((_d = (_c = message === null || message === void 0 ? void 0 : message.data) === null || _c === void 0 ? void 0 : _c.sender) === null || _d === void 0 ? void 0 : _d.id) {
        const { data: { sender: { id, memberName, specialTitle } } } = message;
        yield gameUser_1.default.findOneAndUpdate({ qq: message.data.sender.id }, {
            qq: message.data.sender.id,
            memberName: memberName,
            specialTitle: specialTitle,
        }, { upsert: true }).exec();
    }
});
// 记录摆子哥消息
ws_1.EventFlow.saveYuLiuMessage = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, targetQQ, commandText, text } = context;
    // 8点到封盘的消息记录
    if (dayjs_1.default().isBetween(dayjs_1.default().set('hours', 8).set('minutes', 0).set('seconds', 0), base_config_1.default.封盘时间())) {
        if (targetQQ === system_config_1.default.yuliu_qq) {
            yuliumsg_1.default.saveMsg(text);
        }
    }
});
// 筛选命令 #xxx 消息
ws_1.EventFlow.filter = (context) => {
    var _a, _b, _c, _d;
    const { message } = context;
    const filterMsg = toolkits_1.default.get(message)
        .filterByMessageChainType('GroupMessage')
        .filterByMessageType('At')
        .filterByTaget(system_config_1.default.bot_qq)
        .filterByPlainText(text => {
        const t = text.trim();
        return t.includes('#');
    })
        .exec();
    // 把筛选后的消息带在上下文中
    context.commandMessage = filterMsg;
    context.commandText = (_d = (_c = (_b = (_a = filterMsg === null || filterMsg === void 0 ? void 0 : filterMsg.data) === null || _a === void 0 ? void 0 : _a.messageChain) === null || _b === void 0 ? void 0 : _b.find(i => i.type === 'Plain')) === null || _c === void 0 ? void 0 : _c.text) !== null && _d !== void 0 ? _d : '';
};
// 查询闪照
ws_1.EventFlow.findFlashImage = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, targetQQ, commandText } = context;
    const [word, value] = botCommand_1.getParamCommand(commandText);
    if (word === '查询闪照') {
        try {
            const limit = 5;
            if (!value)
                throw new Error('\n请输入正确QQ号');
            const res = yield flashImage_1.default.find({ qq: value }).sort({ createTime: 'desc' }).limit(limit).exec();
            if (res.length <= 0)
                throw new Error('\n没有数据');
            let msg = '';
            msg = res.reduce((pre, cur, curIndex) => {
                return pre += `\n${dayjs_1.default(cur.createTime).format('YYYY-MM-DD')}：${cur.url}`;
            }, '');
            throw new Error(`\n<${value}>的最近${limit}张闪照地址：` + msg);
        }
        catch ({ message }) {
            toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
                .plain(message)
                .exec();
        }
    }
});
// 下注
ws_1.EventFlow.bet = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, targetQQ, commandText } = context;
    const [words, value] = botCommand_1.isBetCommand(commandText);
    if (words && value) {
        // 匹配关键词
        const type = words.search((notLateRegexp)) >= 0 ? bet_1.betType.不迟到 :
            words.search((lateRegexp)) >= 0 ? bet_1.betType.迟到 : undefined;
        if (type === undefined)
            return;
        // 存储下注积分
        const { success, message } = yield bet_2.default.bet(type, targetQQ, Number(value));
        if (message) {
            toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
                .at(targetQQ)
                .plain('\n' + message)
                .face(undefined, '请')
                .exec();
            return;
        }
        // 成功提示
        toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
            .at(targetQQ)
            .plain(`\n押注${bet_1.betTypeText[type]}：${value}积分`)
            .face(undefined, '吃糖')
            .exec();
    }
});
// 查询积分
ws_1.EventFlow.queryPoints = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, targetQQ, commandText } = context;
    if (botCommand_1.isQueryPoints(commandText)) {
        const find = yield userPoints_1.default.findByQQ(targetQQ);
        if (find) {
            toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
                .at(targetQQ)
                .plain(`\n当前还剩${find.remainPoints}积分\n${find.remainPoints < 10 ? '穷逼！' : find.remainPoints > 1000 ? '增有钱呐' : ''}`)
                .exec();
            return;
        }
        toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
            .at(targetQQ)
            .plain('\n' + '没有记录，发送 #签到 试试？')
            .exec();
    }
});
// 签到
ws_1.EventFlow.signIn = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, targetQQ, commandText } = context;
    if (botCommand_1.isSignInCommand(commandText)) {
        // 随机发积分
        const userPoint = randomPoint_1.default();
        const find = yield userPoints_1.default.findByQQ(targetQQ);
        const { success: SignInSuccess, message: SignInMessage } = yield signIn_1.default.signIn(targetQQ, userPoint);
        if (SignInSuccess) {
            const { success: addPointSuccess, message: addPointMessage } = yield find.addPoint(userPoint);
            toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
                .at(targetQQ)
                .plain(addPointSuccess ? `\n签到成功！\n获得积分${userPoint}!\n${userPoint <= 5 ? 'maybe!' : ''}` : `\n签到失败：\n${addPointMessage}`)
                .exec();
        }
        else {
            toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
                .at(targetQQ)
                .plain(`\n签到失败：${SignInMessage}`)
                .exec();
        }
    }
});
// 查询投注
ws_1.EventFlow.queryBet = (context) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h, _j, _k, _l, _m;
    const { message, targetQQ, commandText, commandMessage } = context;
    // const filterMsg = ToolKit.get<ReceiveMessage<GroupMessage>>(commandMessage).filterBySender(SystemConfig.admin_qq).exec()
    if (botCommand_1.isQueryBet(commandText)) {
        const res = yield bet_2.default.aggregate([
            {
                $facet: {
                    late: [
                        {
                            $match: {
                                betTime: {
                                    $gt: dayjs_1.default().startOf('date').toDate(),
                                    $lt: base_config_1.default.封盘时间().toDate()
                                },
                                betType: { $eq: bet_1.betType.迟到 }
                            },
                        },
                        {
                            $group: {
                                _id: 'null',
                                betPoints: { $sum: '$betPoint' },
                                betNum: { $sum: 1 },
                                betUser: { $push: { qq: '$qq', betPoint: '$betPoint' } }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                betPoints: 1,
                                betNum: 1,
                                betUser: 1
                            }
                        }
                    ],
                    notLate: [
                        {
                            $match: {
                                betTime: {
                                    $gt: dayjs_1.default().startOf('date').toDate(),
                                    $lt: base_config_1.default.封盘时间().toDate()
                                },
                                betType: { $eq: bet_1.betType.不迟到 }
                            }
                        },
                        {
                            // 根据下注类别分组
                            $group: {
                                _id: 'null',
                                betPoints: { $sum: '$betPoint' },
                                betNum: { $sum: 1 },
                                betUser: { $push: { qq: '$qq', betPoint: '$betPoint' } }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                betPoints: 1,
                                betNum: 1,
                                betUser: 1
                            }
                        }
                    ],
                    targetUserBet: [
                        {
                            $match: {
                                betTime: {
                                    $gt: dayjs_1.default().startOf('date').toDate(),
                                    $lt: base_config_1.default.封盘时间().toDate()
                                },
                                qq: { $eq: String(targetQQ) }
                            }
                        },
                        {
                            $project: {
                                betPoint: 1,
                                betTime: 1,
                                betType: 1
                            }
                        }
                    ]
                }
            }
        ]).exec();
        const lateTotal = (_f = (_e = res[0].late[0]) === null || _e === void 0 ? void 0 : _e.betPoints) !== null && _f !== void 0 ? _f : 0;
        const notLateTotal = (_h = (_g = res[0].notLate[0]) === null || _g === void 0 ? void 0 : _g.betPoints) !== null && _h !== void 0 ? _h : 0;
        const total = lateTotal + notLateTotal;
        const lateNum = (_k = (_j = res[0].late[0]) === null || _j === void 0 ? void 0 : _j.betNum) !== null && _k !== void 0 ? _k : 0;
        const notLateNum = (_m = (_l = res[0].notLate[0]) === null || _l === void 0 ? void 0 : _l.betNum) !== null && _m !== void 0 ? _m : 0;
        let forecast;
        if (res[0].targetUserBet[0]) {
            const { betPoint, betTime, betType: userBetType } = res[0].targetUserBet[0];
            if (userBetType === bet_1.betType.迟到) {
                forecast = Math.floor((betPoint / lateTotal) * total);
            }
            else {
                forecast = Math.floor((betPoint / notLateTotal) * total);
            }
        }
        toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
            .at(targetQQ)
            .plain(`
      今日投注情况：
      迟到：${lateTotal}积分（${lateNum}人）
      不迟到：${notLateTotal}积分（${notLateNum}人）
      ${forecast ? `<${targetQQ}>已投注<${bet_1.betTypeText[res[0].targetUserBet[0].betType]}>预计可获得：${forecast}积分` : ''}
      `)
            .exec();
    }
});
// 结算
ws_1.EventFlow.accountBet = (context) => __awaiter(void 0, void 0, void 0, function* () {
    var _o, _p, _q, _r;
    const { message, targetQQ, commandMessage } = context;
    const filterMsg = toolkits_1.default.get(commandMessage).filterBySender([system_config_1.default.admin_qq, system_config_1.default.yuliu_qq]).exec();
    const [word, value] = botCommand_1.getParamCommand((_r = (_q = (_p = (_o = filterMsg === null || filterMsg === void 0 ? void 0 : filterMsg.data) === null || _o === void 0 ? void 0 : _o.messageChain) === null || _p === void 0 ? void 0 : _p.find(i => i.type === 'Plain')) === null || _q === void 0 ? void 0 : _q.text) !== null && _r !== void 0 ? _r : '');
    if (word === '结算') {
        // 结算命令type
        let type = value.search((notLateRegexp)) >= 0 ? bet_1.betType.不迟到 :
            value.search((lateRegexp)) >= 0 ? bet_1.betType.迟到 : undefined;
        // 查询今日所有投注
        const todayAllBet = yield bet_2.default.aggregate([
            {
                $match: {
                    betTime: {
                        $gt: dayjs_1.default().startOf('date').toDate(),
                        $lt: base_config_1.default.封盘时间().toDate()
                    }
                }
            },
            {
                $lookup: {
                    from: 'gameusers',
                    let: { qq: '$qq' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    // $$是外表的 $是内表的
                                    $eq: ['$$qq', '$qq']
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                memberName: 1,
                                specialTitle: 1,
                            }
                        },
                        {
                            $lookup: {
                                from: 'userpoints',
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                // $$是外表的 $是内表的
                                                $eq: ['$$qq', '$qq']
                                            }
                                        }
                                    },
                                ],
                                as: 'userpoints'
                            }
                        },
                        {
                            $unwind: {
                                path: '$userpoints'
                            }
                        },
                        {
                            $replaceRoot: { newRoot: { $mergeObjects: ['$userpoints', '$$ROOT'] } }
                        },
                        {
                            $project: {
                                _id: 0,
                                memberName: 1,
                                remainPoints: 1,
                                specialTitle: 1,
                                totalPoints: 1
                            }
                        }
                    ],
                    as: 'gameusers'
                }
            },
            {
                $unwind: {
                    path: '$gameusers'
                }
            },
        ]).exec();
        if (todayAllBet.length <= 0) {
            // 没人投注
            toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
                .at(targetQQ)
                .plain('今天还没有人下注')
                .exec();
            return;
        }
        // 是否已结算
        const isAreadyAccount = todayAllBet[0].betState !== bet_1.betState.未结束;
        type = isAreadyAccount ? todayAllBet[0].betState : type;
        let totalPoints = 0;
        let lateTotal = 0;
        let notLateTotal = 0;
        todayAllBet.forEach(data => {
            totalPoints += data.betPoint;
            if (data.betType === bet_1.betType.迟到) {
                lateTotal += data.betPoint;
            }
            else {
                notLateTotal += data.betPoint;
            }
        });
        // 计算个人获得
        const caclPoint = (data) => {
            const { betPoint, betType: dataBetType, betProfit } = data;
            if (isAreadyAccount) {
                return betProfit;
            }
            else {
                if (dataBetType === bet_1.betType.不迟到) {
                    return (type === dataBetType || type === undefined) ? Math.floor((betPoint / notLateTotal) * totalPoints) : 0;
                }
                else {
                    return (type === dataBetType || type === undefined) ? Math.floor((betPoint / lateTotal) * totalPoints) : 0;
                }
            }
        };
        let sendStr = '\n请输入"迟到"或者"没有迟到"';
        const willUpdate = [];
        if (todayAllBet.length > 0) {
            // 计算得分
            // const t = new Table
            const t = new textTable_1.default;
            todayAllBet.forEach(function (data) {
                // 计算盈利
                const profit = caclPoint(data);
                willUpdate.push(Object.assign(Object.assign({}, data), { betProfit: profit }));
                t.cell('昵称', data.gameusers.memberName);
                t.cell('投注类型', bet_1.betTypeText[data.betType]);
                t.cell('投注积分', data.betPoint);
                t.cell('剩余积分', data.gameusers.remainPoints);
                t.cell(isAreadyAccount ? '获得积分' : '预计得分', profit);
            });
            sendStr = t.output();
        }
        if (type !== undefined && !isAreadyAccount) {
            willUpdate.forEach((i) => {
                userPoints_1.default.updateOne({
                    qq: i.qq
                }, {
                    $inc: {
                        remainPoints: i.betProfit
                    }
                }).exec();
                bet_2.default.updateOne({
                    qq: i.qq
                }, {
                    $set: {
                        betState: i.betType,
                        betProfit: i.betProfit
                    }
                }).exec();
            });
        }
        toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
            .at(targetQQ)
            .plain('\n' + `${(isAreadyAccount || type !== undefined) ? `已结算<${bet_1.betTypeText[type] || bet_1.betStateText[todayAllBet[0].betState]}>` : '未结算'}` + '\n' + sendStr + '\n')
            .exec();
    }
});
// 积分排行榜
ws_1.EventFlow.pointsRank = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, targetQQ, commandText } = context;
    if (botCommand_1.isCommand(commandText, /积分排行/ig)) {
        const res = yield userPoints_1.default.aggregate([
            {
                $sort: {
                    remainPoints: -1
                }
            },
            {
                $lookup: {
                    from: 'gameusers',
                    let: { qq: '$qq' },
                    as: 'gameusers',
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    // $$是外表的 $是内表的
                                    $eq: ['$$qq', '$qq']
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                memberName: 1,
                                specialTitle: 1,
                            }
                        },
                    ]
                }
            },
            {
                $unwind: {
                    path: '$gameusers'
                }
            },
            {
                $project: {
                    _id: 0,
                    qq: 1,
                    totalPoints: 1,
                    remainPoints: 1,
                    gameusers: 1
                }
            },
        ]).exec();
        const t = new textTable_1.default;
        const len = res.length;
        const size = 5;
        let index = 0;
        let rank = 1;
        while (index < len) {
            res.slice(index, (index += size)).forEach((r, index) => {
                t.cell('排名', rank++);
                t.cell('昵称', r.gameusers.memberName);
                t.cell('剩余积分', r.remainPoints);
                t.cell('总获得积分', r.totalPoints);
            });
            let sendStr = t.output();
            toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
                .plain('\n' + sendStr + '\n')
                .exec();
        }
    }
});
// 时间段maybe
ws_1.EventFlow.queryMaybe = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, targetQQ, commandMessage, commandText } = context;
    const [word, value] = botCommand_1.getParamCommand(commandText);
    // 默认今天
    let date = dayjs_1.default();
    if (word === '查询眉笔') {
        if (value) {
            if (dayjs_1.default(value).isValid()) {
                date = dayjs_1.default(value);
            }
        }
        const res = yield signIn_1.default.find({
            signInTime: {
                $gt: date.startOf('date').toDate(),
                $lt: date.endOf('date').toDate()
            },
            point: {
                $lt: 5
            }
        }).sort({ point: 1 }).exec();
        if (res.length > 0) {
            toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
                .plain(`${date.format('MM[月]DD[日]')}的眉笔是\n`)
                .at(res[0].qq)
                .plain(`\nta通过努力签到获得了${res[0].point}分！\n`)
                .plain('\n让我们恭喜ta')
                .face(undefined, '庆祝')
                .face(undefined, '庆祝')
                .exec();
        }
        else {
            toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
                .plain(`${date.format('MM[月]DD[日]')}没有眉笔\n`)
                .exec();
        }
    }
});
// 抽奖
// EventFlow.luckDraw = async (context) => {
//   const { message, targetQQ, commandText } = context
//   if(isCommand(commandText, /抽奖/ig)) {
//     let str = ''
//     const find = await UserPointsModel.find({qq:targetQQ}).exec()
//     if(find && find.length > 0 && find[0].remainPoints >= 5) {
//       await UserPointsModel.updateOne({
//         qq: targetQQ
//       }, {
//         $inc: {
//           remainPoints: -5
//         }
//       }).exec()
//       let gainPoints = 0
//       let num = Math.ceil(Math.random() * 1000)
//       if(num>0&&num<500){
//         gainPoints = 0
//         str =  '谢谢惠顾'
//       }else if(num>=500&&num<800){
//         gainPoints = 10
//         str =  '中奖10积分'
//       }else if(num>=800&&num<950){
//         gainPoints = 100
//         str =  '中奖100积分!'
//       }else if(num>950){
//         gainPoints = 1000
//         str =  '中奖1000积分!!'
//       }
//       await UserPointsModel.updateOne({
//         qq: targetQQ
//       }, {
//         $inc: {
//           remainPoints: gainPoints
//         }
//       }).exec()
//     }else {
//       str = '你没有足够的积分！每次抽奖消耗<5>积分，请先获取积分，如签到'
//     }
//     ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
//       .at(targetQQ)
//       .plain('\n' + str + '\n')
//       .exec()
//   }
// }
// 帮助
ws_1.EventFlow.help = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, targetQQ, commandText, commandMessage } = context;
    if (botCommand_1.isCommand(commandText, /命令/gi)) {
        let str = '';
        for (let key in botCommand_1.commandList) {
            str += `\n${key}：${botCommand_1.commandList[key]}`;
        }
        toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
            .at(targetQQ)
            .plain(str)
            .exec();
    }
});


/***/ }),

/***/ 585:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dayjs_1 = __importDefault(__webpack_require__(349));
/**
 * 当天上班时间
 */
function getTodayWorkTime() {
    return dayjs_1.default().set('hours', 9).set('minutes', 30).set('seconds', 0);
}
/**
 * 当天封盘时间
 */
function getBetClosingTime() {
    return getTodayWorkTime().subtract(10, 'minute');
    // return dayjs().endOf('date')
}
const BaseConfig = {
    '迟到扣钱': 30,
    '上班时间': getTodayWorkTime,
    '封盘时间': getBetClosingTime
};
exports.default = BaseConfig;


/***/ }),

/***/ 692:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const DBConfig = {
    // uri: "mongodb://admin:xh19963900@8.130.48.20:27017",
    uri: 'mongodb://admin:xh19963900@127.0.0.1:27017',
    connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'areyoulate',
    },
};
exports.default = DBConfig;


/***/ }),

/***/ 8:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const path_1 = __importDefault(__webpack_require__(622));
exports.default = {
    appenders: {
        defualt: {
            type: 'file',
            filename: path_1.default.join(__dirname, '../log/defualt.log'),
            layout: {
                type: 'coloured'
            }
        },
        errors: {
            type: 'dateFile',
            category: 'dateFileLog',
            filename: path_1.default.join(__dirname, '../log/errors/'),
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            layout: {
                type: 'coloured'
            }
        },
        ws: {
            type: 'file',
            filename: path_1.default.join(__dirname, '../log/ws.log'),
            layout: {
                type: 'coloured'
            }
        },
        db: {
            type: 'file',
            filename: path_1.default.join(__dirname, '../log/db.log'),
            layout: {
                type: 'coloured'
            }
        }
    },
    categories: {
        default: { appenders: ['defualt'], level: 'info' },
        error: { appenders: ['errors'], level: 'error' },
        ws: { appenders: ['ws'], level: 'info' },
        db: { appenders: ['db'], level: 'info' },
    }
};


/***/ }),

/***/ 522:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const runOnPro = "production" === 'production';
const SystemConfig = {
    /** 服务器地址 */
    wsPath: runOnPro ? 'ws://172.17.82.247:3002' : 'ws://ws.dangdangdang.top',
    /** http地址 */
    httpPath: runOnPro ? 'http://172.17.82.247:3001' : 'http://api.dangdangdang.top',
    /** 鉴权key */
    verifyKey: 1234567890,
    /** bot的qq号 */
    bot_qq: '1092946821',
    /** qq群号 */
    group_qq: '599869861',
    /** 管理员qq */
    admin_qq: '929175050',
    /** 摆子哥qq */
    yuliu_qq: '1916300010'
};
exports.default = SystemConfig;


/***/ }),

/***/ 40:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const mongoose_1 = __importDefault(__webpack_require__(619));
const db_config_1 = __importDefault(__webpack_require__(692));
const logger_1 = __importDefault(__webpack_require__(514));
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.connect(db_config_1.default.uri, db_config_1.default.connectionOptions, err => {
    if (err) {
        console.log('[Mongoose🦢] 连接失败');
        logger_1.default('db', 'error', err);
    }
    else {
        console.log('[Mongoose🦢] 连接成功');
        logger_1.default('db', 'info', '[Mongoose🦢] 连接成功');
    }
});
exports.default = mongoose_1.default;


/***/ }),

/***/ 224:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.betStateText = exports.betState = exports.betTypeText = exports.betType = void 0;
const base_config_1 = __importDefault(__webpack_require__(585));
const tryCatchPromise_1 = __importDefault(__webpack_require__(727));
const error_1 = __webpack_require__(551);
const dayjs_1 = __importDefault(__webpack_require__(349));
const mongoose_1 = __webpack_require__(619);
const userPoints_1 = __importDefault(__webpack_require__(90));
var betType;
(function (betType) {
    betType[betType["\u8FDF\u5230"] = 0] = "\u8FDF\u5230";
    betType[betType["\u4E0D\u8FDF\u5230"] = 1] = "\u4E0D\u8FDF\u5230";
})(betType = exports.betType || (exports.betType = {}));
exports.betTypeText = {
    [betType.迟到]: '迟到',
    [betType.不迟到]: '不迟到',
};
var betState;
(function (betState) {
    betState[betState["\u8FDF\u5230"] = 0] = "\u8FDF\u5230";
    betState[betState["\u4E0D\u8FDF\u5230"] = 1] = "\u4E0D\u8FDF\u5230";
    betState[betState["\u672A\u7ED3\u675F"] = 2] = "\u672A\u7ED3\u675F";
})(betState = exports.betState || (exports.betState = {}));
exports.betStateText = {
    [betState.迟到]: '迟到',
    [betState.不迟到]: '不迟到',
    [betState.未结束]: '未结束',
};
const BetSchema = new mongoose_1.Schema({
    qq: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    betPoint: {
        type: mongoose_1.Schema.Types.Number,
        require: false,
        validate: {
            validator: function (v) {
                if (v < 0) {
                    error_1.thorwCustomError('只能投注正数');
                }
                if (!Number.isInteger(v)) {
                    error_1.thorwCustomError('只能投注整数');
                }
                return true;
            },
        },
        default: () => 0
    },
    betTime: {
        type: mongoose_1.Schema.Types.Date,
        require: false,
        default: () => dayjs_1.default().toDate()
    },
    betType: {
        type: mongoose_1.Schema.Types.Number,
        require: false
    },
    betState: {
        type: mongoose_1.Schema.Types.Number,
        require: false,
        default: () => betState.未结束
    },
    betProfit: {
        type: mongoose_1.Schema.Types.Number,
        require: false,
        default: () => 0
    }
});
class LoadClass {
    static bet(betType, qq, point) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dayjs_1.default().isAfter(base_config_1.default.封盘时间())) {
                error_1.thorwCustomError(`每天 ${base_config_1.default.封盘时间().format('HH:mm:ss')} 前可投注！`);
            }
            if (point <= 0 || !Number.isInteger(point)) {
                error_1.thorwCustomError('只能为正整数');
            }
            const betRecord = yield this.findByQQ(qq, {
                betTime: {
                    $gt: dayjs_1.default().startOf('date').toDate(),
                    $lt: base_config_1.default.封盘时间().toDate()
                }
            });
            const userPoint = yield userPoints_1.default.findByQQ(qq);
            if (betRecord && (betRecord === null || betRecord === void 0 ? void 0 : betRecord.betType) !== undefined && betRecord.betType !== betType) {
                error_1.thorwCustomError(`你已认定摆子哥 ${exports.betTypeText[betRecord.betType]}了!改不了咯~`);
            }
            if (userPoint.remainPoints >= point) {
                yield betRecord.updateOne({
                    $inc: {
                        betPoint: point
                    },
                    betTime: dayjs_1.default().toDate(),
                    betType: betType
                }).exec();
                yield userPoint.updateOne({
                    $inc: {
                        remainPoints: -point
                    }
                }).exec();
            }
            else {
                error_1.thorwCustomError('你没有足够的积分！穷逼!');
            }
        });
    }
    static findByQQ(qq, otherFilter) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this.findOne(Object.assign({ qq }, otherFilter)).exec();
            if (find) {
                return find;
            }
            else {
                return yield this.create({
                    qq,
                    betState: betState.未结束
                });
            }
        });
    }
}
__decorate([
    tryCatchPromise_1.default(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Number]),
    __metadata("design:returntype", Promise)
], LoadClass, "bet", null);
BetSchema.loadClass(LoadClass);
// 创建表 实例化Schema
const BetModel = mongoose_1.model('Bet', BetSchema);
exports.default = BetModel;


/***/ }),

/***/ 814:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const dayjs_1 = __importDefault(__webpack_require__(349));
const mongoose_1 = __webpack_require__(619);
const FlashImageSchema = new mongoose_1.Schema({
    qq: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    url: {
        type: mongoose_1.Schema.Types.String,
        require: true,
    },
    createTime: {
        type: mongoose_1.Schema.Types.String,
        require: false,
        default: () => dayjs_1.default().toDate()
    }
});
class LoadClass {
}
FlashImageSchema.loadClass(LoadClass);
const FlashImageModel = mongoose_1.model('FlashImage', FlashImageSchema);
exports.default = FlashImageModel;


/***/ }),

/***/ 94:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const mongoose_1 = __webpack_require__(619);
const GameUserSchema = new mongoose_1.Schema({
    qq: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    memberName: {
        type: mongoose_1.Schema.Types.String,
        require: true
    },
    specialTitle: {
        type: mongoose_1.Schema.Types.String,
        require: true
    },
    // memberName: { type: Schema.Types.String, default: () => 0, min: 0},
    // specialTitle: { type: Schema.Types.Number, default: () => Math.random(), select: false}
});
// 防止重复定义模型
exports.default = (mongoose_1.models && mongoose_1.models.GameUser) || mongoose_1.model('GameUser', GameUserSchema);


/***/ }),

/***/ 68:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tryCatchPromise_1 = __importDefault(__webpack_require__(727));
const error_1 = __webpack_require__(551);
const dayjs_1 = __importDefault(__webpack_require__(349));
const mongoose_1 = __webpack_require__(619);
const SignInSchema = new mongoose_1.Schema({
    qq: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    signInTime: {
        type: mongoose_1.Schema.Types.Date,
        require: false,
        default: () => dayjs_1.default().toDate()
    },
    point: {
        type: mongoose_1.Schema.Types.Number,
        require: true,
    }
});
class LoadClass {
    static signIn(qq, point) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this.findOne({
                qq,
                signInTime: {
                    $gt: dayjs_1.default().startOf('date').toDate()
                },
            }).exec();
            if (!find) {
                yield this.create({
                    qq,
                    point: point !== null && point !== void 0 ? point : 0
                });
            }
            else {
                error_1.thorwCustomError('今天已签到');
            }
        });
    }
}
__decorate([
    tryCatchPromise_1.default(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], LoadClass, "signIn", null);
SignInSchema.loadClass(LoadClass);
// 创建表 实例化Schema
const SignInModel = mongoose_1.model('SignIn', SignInSchema);
exports.default = SignInModel;


/***/ }),

/***/ 90:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const mongoose_1 = __webpack_require__(619);
const tryCatchPromise_1 = __importDefault(__webpack_require__(727));
const error_1 = __webpack_require__(551);
// 创建结构
const UserPointSchema = new mongoose_1.Schema({
    qq: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    totalPoints: {
        type: mongoose_1.Schema.Types.Number,
        require: false,
        validate: {
            validator: function (v) {
                if (v < 0) {
                    error_1.thorwCustomError('不能再减少');
                }
                if (!Number.isInteger(v)) {
                    error_1.thorwCustomError('只能为整数');
                }
                return true;
            },
        },
        default: () => 0
    },
    remainPoints: {
        type: mongoose_1.Schema.Types.Number,
        require: false,
        validate: {
            validator: function (v) {
                if (v < 0) {
                    error_1.thorwCustomError('不能再减少');
                }
                if (!Number.isInteger(v)) {
                    error_1.thorwCustomError('只能为整数');
                }
                return true;
            },
        },
        default: () => 0
    }
});
// 添加方法
class LoadClass {
    addPoint(points) {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateOne({
                $inc: {
                    totalPoints: points,
                    remainPoints: points,
                }
            }).exec();
        });
    }
    subPoint(points) {
        return __awaiter(this, void 0, void 0, function* () {
            const remainPoints = this.remainPoints - points;
            yield this.updateOne({
                remainPoints: remainPoints < 0 ? 0 : remainPoints
            }).exec();
        });
    }
    static findByQQ(qq) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this.findOne({ qq }).exec();
            if (find) {
                return find;
            }
            else {
                return yield this.create({
                    qq
                });
            }
        });
    }
}
__decorate([
    tryCatchPromise_1.default('添加积分失败！'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LoadClass.prototype, "addPoint", null);
__decorate([
    tryCatchPromise_1.default('减少积分失败！'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LoadClass.prototype, "subPoint", null);
UserPointSchema.loadClass(LoadClass);
// 创建表 实例化Schema
const UserPointsModel = mongoose_1.model('UserPoints', UserPointSchema);
// 防止重复定义模型
// export default (models && models.UserPoints) || model<UserPoints>('UserPoints', UserPointSchema)
exports.default = UserPointsModel;


/***/ }),

/***/ 640:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tryCatchPromise_1 = __importDefault(__webpack_require__(727));
const dayjs_1 = __importDefault(__webpack_require__(349));
const mongoose_1 = __webpack_require__(619);
const YuliuMsgSchema = new mongoose_1.Schema({
    msg: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    saveTime: {
        type: mongoose_1.Schema.Types.Date,
        require: false,
        default: () => dayjs_1.default().toDate()
    }
});
class LoadClass {
    static saveMsg(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg) {
                yield this.create({
                    msg
                });
            }
        });
    }
}
__decorate([
    tryCatchPromise_1.default(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoadClass, "saveMsg", null);
YuliuMsgSchema.loadClass(LoadClass);
// 创建表 实例化Schema
const YuliuMsgModel = mongoose_1.model('YuliuMsg', YuliuMsgSchema);
exports.default = YuliuMsgModel;


/***/ }),

/***/ 718:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.store = void 0;
const toolkit_1 = __webpack_require__(139);
const sessionSlice_1 = __importDefault(__webpack_require__(578));
exports.store = toolkit_1.configureStore({
    reducer: {
        session: sessionSlice_1.default,
    },
});


/***/ }),

/***/ 578:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.saveSession = exports.sessionSlice = void 0;
const toolkit_1 = __webpack_require__(139);
const initialState = {
    session: ''
};
exports.sessionSlice = toolkit_1.createSlice({
    name: 'session',
    initialState,
    reducers: {
        saveSession: (state, action) => {
            state.session = action.payload;
        }
    }
});
// // 处理异步
// /**
//  * 这个action返回一个函数
//  * 这个函数返回一个promise
//  */
//  export const changeColor = () => (dispatch) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       dispatch(randomColor())
//       resolve(0)
//     }, 1000)
//   })
// }
exports.saveSession = exports.sessionSlice.actions.saveSession;
exports.default = exports.sessionSlice.reducer;


/***/ }),

/***/ 768:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CodeEnum = exports.CodeText = void 0;
exports.CodeText = {
    0: '正常',
    1: '错误的verify key',
    2: '指定的Bot不存在',
    3: 'Session失效或不存在',
    4: 'Session未认证(未激活)',
    5: '发送消息目标不存在(指定对象不存在)',
    6: '指定文件不存在，出现于发送本地图片',
    10: '无操作权限，指Bot没有对应操作的限权',
    11: 'Bot被禁言，指Bot当前无法向指定群发送消息',
    30: '消息过长',
    400: '错误的访问，如参数错误等'
};
var CodeEnum;
(function (CodeEnum) {
    CodeEnum[CodeEnum["success"] = 0] = "success";
    CodeEnum[CodeEnum["errorVerifyKey"] = 1] = "errorVerifyKey";
    CodeEnum[CodeEnum["noBot"] = 2] = "noBot";
    CodeEnum[CodeEnum["sessionNotExsist"] = 3] = "sessionNotExsist";
    CodeEnum[CodeEnum["sessionNotActive"] = 4] = "sessionNotActive";
    CodeEnum[CodeEnum["targetLost"] = 5] = "targetLost";
    CodeEnum[CodeEnum["fileLost"] = 6] = "fileLost";
    CodeEnum[CodeEnum["permissionDeny"] = 10] = "permissionDeny";
    CodeEnum[CodeEnum["forbiddenWords"] = 11] = "forbiddenWords";
    CodeEnum[CodeEnum["longMessage"] = 30] = "longMessage";
    CodeEnum[CodeEnum["error"] = 400] = "error";
})(CodeEnum = exports.CodeEnum || (exports.CodeEnum = {}));


/***/ }),

/***/ 836:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isQueryBet = exports.isQueryPoints = exports.isSignInCommand = exports.isBetCommand = exports.getParamCommand = exports.isCommand = exports.commandList = void 0;
exports.commandList = {
    '投注': '#[迟到 | 没迟到] [投注点数]',
    '查询积分': '#查询积分',
    '签到': '#签到',
    '查询投注': '#查询投注',
    '结算': '#结算 [迟到 | 没迟到]',
};
/**
 * 一句话命令
 */
function isCommand(text, match) {
    if (!text)
        return;
    const blockComand = text.split('#');
    if (match instanceof RegExp) {
        return match.test(blockComand[1]);
    }
    else {
        return blockComand[1] === match;
    }
}
exports.isCommand = isCommand;
/**
 * 带一个参数的命令
 */
function getParamCommand(text) {
    if (!text)
        return ['', ''];
    const blockComand = text.split('#');
    if (blockComand.length === 2) {
        const comand = blockComand[1].split(' ');
        if (comand.length === 2) {
            const [words, value] = comand;
            return [words, value];
        }
        else {
            return [comand[0], ''];
        }
    }
    return ['', ''];
}
exports.getParamCommand = getParamCommand;
/**
 * 投注命令
 */
function isBetCommand(text) {
    if (!text)
        return ['', ''];
    const blockComand = text.split('#');
    if (blockComand.length === 2) {
        const comand = blockComand[1].split(' ');
        if (comand.length === 2) {
            const [words, value] = comand;
            if (!isNaN(Number(value))) {
                return [words, value];
            }
        }
    }
    return ['', ''];
}
exports.isBetCommand = isBetCommand;
/**
 * 签到命令
 */
function isSignInCommand(text) {
    if (!text)
        return;
    const regexp = /签到$/gi;
    const blockComand = text.split('#');
    if (blockComand.length === 2) {
        if (regexp.test(blockComand[1])) {
            return true;
        }
    }
    return false;
}
exports.isSignInCommand = isSignInCommand;
/**
 * 查询积分
 */
function isQueryPoints(text) {
    if (!text)
        return;
    const blockComand = text.split('#');
    return blockComand[1] === '查询积分';
}
exports.isQueryPoints = isQueryPoints;
/**
 * 查询投注情况
 */
function isQueryBet(text) {
    if (!text)
        return;
    const blockComand = text.split('#');
    return blockComand[1] === '查询投注';
}
exports.isQueryBet = isQueryBet;


/***/ }),

/***/ 580:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * 过滤函数装饰器
 */
function default_1() {
    return function (target, propertyName, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            // 调用的时候保存action长度
            const actionLength = this.actionList.length;
            this.actionList.push({
                methodName: propertyName,
                params: args,
                method: () => {
                    let message = undefined;
                    // action列表有长度说明应该基于上一次的结果进行过滤
                    if (actionLength > 0) {
                        if (this.filteredMsg) {
                            message = Object.assign({}, this.filteredMsg);
                        }
                    }
                    else {
                        message = Object.assign({}, this.msg);
                    }
                    originalMethod.apply(this, [...args, message]);
                }
            });
            return this;
        };
    };
}
exports.default = default_1;


/***/ }),

/***/ 727:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const error_1 = __webpack_require__(551);
const logger_1 = __importDefault(__webpack_require__(514));
/**
 * 包装try catch的装饰器
 * 没有返回数据的操作才能用tryCatchPromise
 * @param errorMessage 错误消息 (不填写需要自己抛出错误)
 */
function default_1(errorMessage) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield originalMethod.call(this, ...args);
                    return {
                        success: true
                    };
                }
                catch (err) {
                    if (err.name !== error_1.ErrorNames.custom) {
                        logger_1.default('db', 'error', err);
                    }
                    return {
                        message: errorMessage || err.message
                    };
                }
            });
        };
    };
}
exports.default = default_1;


/***/ }),

/***/ 551:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.thorwCustomError = exports.ErrorNames = void 0;
exports.ErrorNames = {
    custom: 'custom'
};
function thorwCustomError(message) {
    const error = new Error(message);
    error.name = 'custom';
    throw error;
}
exports.thorwCustomError = thorwCustomError;


/***/ }),

/***/ 514:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const log4js_1 = __importDefault(__webpack_require__(455));
const log_config_1 = __importDefault(__webpack_require__(8));
log4js_1.default.configure(log_config_1.default);
function logger(type, level, data) {
    log4js_1.default.getLogger(type)[level](data);
}
exports.default = logger;


/***/ }),

/***/ 418:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
const MIN = 1;
const MAX = 100;
const randomPoint = () => {
    if (Math.random() >= (1 - (1 / randomRange(2, 3)))) {
        return randomRange(MIN, MAX / randomRange(7, 10));
    }
    if (Math.random() >= (1 - (1 / randomRange(3, 5)))) {
        return randomRange(MIN, MAX / randomRange(5, 7));
    }
    if (Math.random() >= (1 - (1 / randomRange(5, 7)))) {
        return randomRange(MIN, MAX / randomRange(3, 5));
    }
    return randomRange(MIN, MAX);
};
function randomRange(min, max) {
    return Math.round(min + Math.random() * (max - min));
}
exports.default = randomPoint;


/***/ }),

/***/ 372:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSession = void 0;
const store_1 = __webpack_require__(718);
const sessionSlice_1 = __webpack_require__(578);
const error_1 = __webpack_require__(551);
/**
 * 返回session和保存session到store
 * @param jsonMsg
 * @returns
 */
function getSession(jsonMsg) {
    const { session } = store_1.store.getState().session;
    if (session) {
        return session;
    }
    else {
        if (jsonMsg) {
            store_1.store.dispatch(sessionSlice_1.saveSession(jsonMsg.data.session));
            return jsonMsg.data.session;
        }
        else {
            error_1.thorwCustomError('no session!');
        }
    }
}
exports.getSession = getSession;


/***/ }),

/***/ 841:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ToDBC = void 0;
class TextTable {
    // 保存单元格
    constructor(cells = [], fullWidthSpace = '　', columns = [], maxRows = 0) {
        this.cells = cells;
        this.fullWidthSpace = fullWidthSpace;
        this.columns = columns;
        this.maxRows = maxRows;
    }
    // 侦测值
    detectValue(str) {
        const wcWidth = str.length;
        const strWidth = str.length;
        return {
            width: wcWidth,
            isFullWidth: strWidth !== wcWidth
        };
    }
    // 计算每列最长长度
    calculateColMaxWidth() {
        this.columns.forEach((col) => {
            let colMaxWidth = 0;
            const colNameWidth = col.colName.length;
            this.maxRows = col.colValues.length > this.maxRows ? col.colValues.length : this.maxRows;
            col.colValues.forEach(v => {
                const w = String(v).length;
                colMaxWidth = w > colMaxWidth ? w : colMaxWidth;
            });
            colMaxWidth = colNameWidth > colMaxWidth ? colNameWidth : colMaxWidth;
            col.maxWidth = colMaxWidth;
        });
    }
    // 存储列行 列
    cell(colName, colValue, render) {
        const strValue = ToDBC(String(colValue));
        this.cells.push({
            colName,
            colValue: strValue,
            detectedResult: this.detectValue(strValue)
        });
        const find = this.columns.find(c => c.colName === colName);
        if (find) {
            find.colValues.push(strValue);
        }
        else {
            this.columns.push({
                colName,
                colValues: [strValue],
            });
        }
    }
    // 渲染每一行
    renderRow() {
        let outStr = '';
        const maxRows = this.maxRows;
        for (let rowIndex = -2; rowIndex < maxRows; rowIndex++) {
            this.columns.forEach((col, index) => {
                let v = '';
                if (rowIndex === -2) {
                    v = col.colName;
                }
                else if (rowIndex === -1) {
                    v = '＝'.repeat(col.maxWidth);
                }
                else {
                    v = String(col.colValues[rowIndex]);
                }
                outStr += v;
                outStr += this.fullWidthSpace.repeat(col.maxWidth + 2 - v.length);
            });
            outStr += '\n';
        }
        return outStr;
    }
    // 输出
    output() {
        this.calculateColMaxWidth();
        const res = this.renderRow();
        this.reset();
        return res;
    }
    // 清空
    reset() {
        this.cells = [],
            this.columns = [],
            this.maxRows = 0;
    }
}
// 半角转全角
function ToDBC(txtstring) {
    let tmp = '';
    for (let i = 0; i < txtstring.length; i++) {
        if (txtstring.charCodeAt(i) == 32) {
            tmp += String.fromCharCode(12288);
            continue;
        }
        else if (txtstring.charCodeAt(i) < 127) {
            tmp += String.fromCharCode(txtstring.charCodeAt(i) + 65248);
            continue;
        }
        tmp += txtstring[i];
    }
    return tmp;
}
exports.ToDBC = ToDBC;
exports.default = TextTable;


/***/ }),

/***/ 116:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const getMessageFilter_1 = __importDefault(__webpack_require__(580));
class GetMessage {
    constructor(msg) {
        this.msg = msg;
        this.actionList = [];
    }
    /**
     * 根据消息链类型筛选
     * @param type 消息链类型
     * @param message （不要传递值）返回的是上一步过滤的消息
     */
    filterByMessageChainType(type, message) {
        if (message) {
            if (message.data.type === type) {
                this.filteredMsg = message;
            }
            else {
                this.filteredMsg = undefined;
            }
        }
        // 必须返回 this 不然类型提示有错误
        // 真实返回的 this 是在装饰器里面
        return this;
    }
    /**
     * 消息类型筛选
     */
    filterByMessageType(type, message) {
        if (message) {
            if (message.data.messageChain) {
                if (message.data.messageChain.some(i => i.type === type)) {
                    this.filteredMsg = message;
                }
                else {
                    this.filteredMsg = undefined;
                }
            }
            else {
                this.filteredMsg = undefined;
            }
        }
        return this;
    }
    /**`
     * 消息发送者qq号筛选
     */
    filterBySender(qq, message) {
        var _a, _b;
        if (message) {
            if (Array.isArray(qq)) {
                if (qq.some(q => { var _a, _b; return q === String((_b = (_a = message === null || message === void 0 ? void 0 : message.data) === null || _a === void 0 ? void 0 : _a.sender) === null || _b === void 0 ? void 0 : _b.id); })) {
                    this.filteredMsg = message;
                }
                else {
                    this.filteredMsg = undefined;
                }
            }
            else {
                if (String((_b = (_a = message === null || message === void 0 ? void 0 : message.data) === null || _a === void 0 ? void 0 : _a.sender) === null || _b === void 0 ? void 0 : _b.id) === qq) {
                    this.filteredMsg = message;
                }
                else {
                    this.filteredMsg = undefined;
                }
            }
        }
        return this;
    }
    /**
     * 消息接收者qq号筛选
     */
    filterByTaget(qq, message) {
        // 不能直接在参数上设置默认值 因为装饰器里面获取不到参数
        if (message) {
            if (message.data.messageChain) {
                if (message.data.messageChain.some(i => String(i.target) === qq)) {
                    this.filteredMsg = message;
                    return;
                }
            }
        }
        this.filteredMsg = undefined;
        return this;
    }
    /**
     * 消息内容筛选
     * @param filterFn 筛选函数必须返回一个布尔值
     */
    filterByPlainText(filterFn, message) {
        if (message) {
            if (message.data.messageChain) {
                const find = message.data.messageChain.find(i => i.type === 'Plain' && filterFn(i.text));
                if (find) {
                    this.filteredMsg = message;
                }
                else {
                    this.filteredMsg = undefined;
                }
            }
        }
        return this;
    }
    /**
     * 执行
     * @returns 筛选后的结果
     */
    exec() {
        this.actionList.forEach(action => {
            action.method();
        });
        this.actionList = [];
        return this.filteredMsg;
    }
}
__decorate([
    getMessageFilter_1.default(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GetMessage.prototype, "filterByMessageChainType", null);
__decorate([
    getMessageFilter_1.default(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GetMessage.prototype, "filterByMessageType", null);
__decorate([
    getMessageFilter_1.default(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GetMessage.prototype, "filterBySender", null);
__decorate([
    getMessageFilter_1.default(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], GetMessage.prototype, "filterByTaget", null);
__decorate([
    getMessageFilter_1.default(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Object]),
    __metadata("design:returntype", void 0)
], GetMessage.prototype, "filterByPlainText", null);
exports.default = GetMessage;


/***/ }),

/***/ 461:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventFlow = void 0;
const ws_1 = __importDefault(__webpack_require__(439));
const system_config_1 = __importDefault(__webpack_require__(522));
const logger_1 = __importDefault(__webpack_require__(514));
const code_1 = __webpack_require__(768);
const session_1 = __webpack_require__(372);
exports.EventFlow = {};
// class FlowClass {
// 	public context:{[key:string]: any} = {}
// }
// export const Flow = new FlowClass()
// Flow.context.a = 1
class WS {
    static getWS() {
        if (WS.WSInstance) {
            return WS.WSInstance;
        }
        else {
            return WS.createWS();
        }
    }
    static createWS() {
        const ws = new ws_1.default(`${system_config_1.default.wsPath}/all?verifyKey=${system_config_1.default.verifyKey}&qq=${system_config_1.default.bot_qq}`);
        ws.on('open', function open() {
            console.log('websocket连接成功！');
            logger_1.default('ws', 'info', '连接成功！');
        });
        ws.on('error', (err) => {
            console.log('websocket错误');
            logger_1.default('error', 'error', err);
            this.reconnect();
        });
        ws.on('close', (code, message) => {
            console.log('websocket关闭');
            logger_1.default('ws', 'info', `连接关闭！code: ${code}，message: ${message}`);
            this.reconnect();
        });
        ws.onmessage = ({ data }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g;
            ////////////////////// 检查session 必须第一步 //////////////////////////
            const jsonMsg = JSON.parse(data.toString());
            if (jsonMsg.data.code === code_1.CodeEnum.success) {
                session_1.getSession(jsonMsg);
                return;
            }
            ////////////////////////////////////////////////////////////////////////
            // 上下文对象
            const context = {
                message: jsonMsg,
                targetQQ: String((_c = (_b = (_a = jsonMsg) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.sender) === null || _c === void 0 ? void 0 : _c.id),
                text: (_g = (_f = (_e = (_d = jsonMsg) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.messageChain) === null || _f === void 0 ? void 0 : _f.find(i => i.type === 'Plain')) === null || _g === void 0 ? void 0 : _g.text
            };
            // 顺序执行流程
            for (let flow of Object.keys(exports.EventFlow)) {
                const fnReturn = exports.EventFlow[flow](context);
                if (fnReturn instanceof Promise) {
                    yield fnReturn;
                }
            }
        });
        WS.WSInstance = ws;
        return ws;
    }
    static reconnect() {
        if (WS.reconnection)
            return;
        logger_1.default('ws', 'info', `正在重连${++WS.reConnectCount}次`);
        if (WS.reConnectCount >= 10) {
            logger_1.default('ws', 'error', '重连超时');
            return;
        }
        WS.reconnection = true;
        setTimeout(() => {
            WS.createWS();
            WS.reconnection = false;
        }, 2000);
    }
}
WS.reConnectCount = 0;
exports.default = WS.getWS();


/***/ }),

/***/ 178:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const ws_1 = __importDefault(__webpack_require__(461));
const Pock = {
    "Poke": '戳一戳',
    "ShowLove": '比心',
    "Like": '点赞',
    "Heartbroken": '心碎',
    "SixSixSix": '666',
    "FangDaZhao": '放大招',
};
class SendMessage {
    constructor(msg) {
        this.msg = msg;
        this.sendMessageList = [];
    }
    /**
     * at目标
     * @param target 目标qq号
     * @param display At时显示的文字，发送消息时无效，自动使用群名片
     */
    at(target, display = '') {
        this.sendMessageList.push({
            methodName: 'at',
            params: [target, display],
            method: () => {
                this.msg.content.messageChain.push({
                    type: "At",
                    target: target,
                    display
                });
            }
        });
        return this;
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
                });
            }
        });
        return this;
    }
    /**
     * qq表情
     * @param faceId QQ表情编号，可选，优先高于name
     * @param name QQ表情拼音，可选
     */
    face(faceId, name) {
        if (!faceId && !name) {
            return this;
        }
        this.sendMessageList.push({
            methodName: 'face',
            params: [faceId, name],
            method: () => {
                this.msg.content.messageChain.push({
                    "type": "Face",
                    "faceId": faceId,
                    "name": name
                });
            }
        });
        return this;
    }
    /**
     * 纯文本消息
     * @param text
     */
    plain(text) {
        this.sendMessageList.push({
            methodName: 'plain',
            params: [text],
            method: () => {
                this.msg.content.messageChain.push({
                    "type": "Plain",
                    "text": text
                });
            }
        });
        return this;
    }
    /**
     * 发送图片
     */
    image(img) {
        const { imageId, url, path, base64 } = img;
        if (!imageId && !url && path && !base64) {
            return this;
        }
        this.sendMessageList.push({
            methodName: 'image',
            params: [img],
            method: () => {
                this.msg.content.messageChain.push({
                    type: 'Image',
                    imageId,
                    url,
                    path,
                    base64
                });
            }
        });
        return this;
    }
    /**
     * 发送闪照
     */
    flashImage(img) {
        const { imageId, url, path, base64 } = img;
        if (!imageId && !url && path && !base64) {
            return this;
        }
        this.sendMessageList.push({
            methodName: 'flashImage',
            params: [img],
            method: () => {
                this.msg.content.messageChain.push({
                    type: 'FlashImage',
                    imageId,
                    url,
                    path,
                    base64
                });
            }
        });
        return this;
    }
    /**
     * 大表情
     * @param name
     */
    poke(name) {
        this.sendMessageList.push({
            methodName: 'poke',
            params: [name],
            method: () => {
                this.msg.content.messageChain.push({
                    type: 'Poke',
                    name
                });
            }
        });
        return this;
    }
    /**
     * 骰子
     * @param value 点数
     */
    dice(value) {
        this.sendMessageList.push({
            methodName: 'dice',
            params: [value],
            method: () => {
                this.msg.content.messageChain.push({
                    type: 'Dice',
                    value
                });
            }
        });
        return this;
    }
    exec() {
        this.sendMessageList.forEach(action => {
            action.method();
        });
        ws_1.default.send(JSON.stringify(this.msg));
        this.sendMessageList = [];
    }
}
exports.default = SendMessage;


/***/ }),

/***/ 391:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const session_1 = __webpack_require__(372);
const sendMessage_1 = __importDefault(__webpack_require__(178));
const getMessage_1 = __importDefault(__webpack_require__(116));
class ToolKit {
    constructor() { }
    /** 发送消息 */
    send(type, ..._rest) {
        let msg = {
            syncId: '-1',
            command: type,
            content: null
        };
        switch (type) {
            case 'sendGroupMessage': {
                (msg.content) = {
                    sessionKey: session_1.getSession(),
                    target: _rest[0],
                    messageChain: [],
                };
                return new sendMessage_1.default(msg);
            }
            case 'sendFriendMessage': {
                (msg.content) = {
                    sessionKey: session_1.getSession(),
                    target: _rest[0],
                    messageChain: [],
                };
                return new sendMessage_1.default(msg);
            }
            case 'sendTempMessage': {
                (msg.content) = {
                    sessionKey: session_1.getSession(),
                    qq: _rest[0],
                    group: _rest[1],
                    messageChain: [],
                };
                return new sendMessage_1.default(msg);
            }
            case 'sendNudge': {
                (msg.content) = {
                    sessionKey: session_1.getSession(),
                    target: _rest[0],
                    subject: _rest[1],
                    kind: _rest[2],
                };
                return;
            }
            case 'recall': {
                (msg.content) = {
                    sessionKey: session_1.getSession(),
                    target: _rest[0],
                };
                return;
            }
        }
    }
    /** 获取某个消息 */
    get(msg) {
        return new getMessage_1.default(msg);
    }
}
exports.default = new ToolKit();


/***/ }),

/***/ 139:
/***/ ((module) => {

"use strict";
module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 349:
/***/ ((module) => {

"use strict";
module.exports = require("dayjs");

/***/ }),

/***/ 455:
/***/ ((module) => {

"use strict";
module.exports = require("log4js");

/***/ }),

/***/ 619:
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ 622:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 906:
/***/ ((module) => {

"use strict";
module.exports = require("reflect-metadata");

/***/ }),

/***/ 439:
/***/ ((module) => {

"use strict";
module.exports = require("ws");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_require__(906);
__webpack_require__(40);
__webpack_require__(461);
__webpack_require__(903);

})();

/******/ })()
;