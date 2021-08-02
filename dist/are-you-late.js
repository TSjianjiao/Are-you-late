/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 903:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const dayjs_1 = __importDefault(__webpack_require__(349));
const system_config_1 = __importDefault(__webpack_require__(522));
const toolkits_1 = __importDefault(__webpack_require__(391));
const botCommand_1 = __webpack_require__(836);
const gameUser_1 = __importDefault(__webpack_require__(94));
const signIn_1 = __importDefault(__webpack_require__(68));
const userPoints_1 = __importDefault(__webpack_require__(90));
const point_1 = __importStar(__webpack_require__(831));
const util_1 = __webpack_require__(854);
const randomPoint_1 = __importDefault(__webpack_require__(418));
const ws_1 = __webpack_require__(461);
// export default withMessage(async function (message) {
// 	// 筛选消息
// 	const filterMsg = ToolKit.get<ReceiveMessage<GroupMessage>>(message)
// 		.filterByMessageChainType('GroupMessage')
// 		.filterByMessageType('At')
// 		.filterByTaget()
// 		.filterByPlainText(text => {
// 			const t = text.trim()
// 			return t.includes('#')
// 		})
// 		.exec()
// 	if(filterMsg) {
// 		const find = filterMsg.data.messageChain.find(i => i.type === 'Plain') as Plain
// 		const targetQQ = filterMsg.data.sender.id
// 		// 添加用户
// 		await GameUser.findOneAndUpdate({qq: targetQQ}, {
// 			qq: targetQQ,
// 			memberName: filterMsg.data.sender.memberName,
// 			specialTitle: filterMsg.data.sender.specialTitle,
// 		}, {upsert: true}).exec()
// 		//////////////////////////////////// 下注流程 ////////////////////////////////////
// 		const [words, value] = isBetCommand(find.text)
// 		if(words && value) {
// 			// 匹配关键词
// 			const type = words.search((notLateRegexp)) >= 0 ? betType.不迟到 :
// 				words.search((lateRegexp)) >= 0 ? betType.迟到 : undefined
// 			if(type === undefined) return
// 			// 存储下注积分
// 			const [err] = await addOnlyOneDocument<PointIterface>({
// 				qq: targetQQ,
// 				betTime: {
// 					$gt: dayjs().startOf('date').toDate()
// 				}
// 			}, {
// 				qq: targetQQ,
// 				betPoint: Number(value),
// 				betType: type,
// 			}, Point)
// 			if(err) {
// 				ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
// 					.at(targetQQ)
// 					.plain('\n' + getOneErrorMessage(err))
// 					.face(undefined, '请/gun')
// 					.exec()
// 				return
// 			}
// 			// 成功提示
// 			ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
// 				.at(targetQQ)
// 				.plain(`\n押注${betTypeText[type]}：${value}积分`)
// 				.face(undefined, '吃糖')
// 				.exec()
// 		}
// 		//////////////////////////////////// 签到流程 ////////////////////////////////////
// 		if(isSignInCommand(find.text)) {
// 			// 随机发积分
// 			const userPoint = randomPoint()
// 			const find = await UserPointsModel.findByQQ(targetQQ)
// 			const { success: SignInSuccess, message: SignInMessage }  = await SignInModel.signIn(targetQQ)
// 			if(SignInSuccess) {
// 				const  {success: addPointSuccess, message: addPointMessage} = await find.addPoint(userPoint)
// 				ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
// 					.at(targetQQ)
// 					.plain(addPointSuccess ? `\n签到成功！\n获得积分${userPoint}!` : `\n签到失败：\n${addPointMessage}`)
// 					.exec()
// 			}else {
// 				ToolKit.send('sendGroupMessage', SystemConfig.group_qq)
// 					.at(targetQQ)
// 					.plain(`\n签到失败：${SignInMessage}`)
// 					.exec()
// 			}
// 		}
// 		//////////////////////////////////// 获取摆子哥消息 ////////////////////////////////////
// 	}
// })
// 添加用户
ws_1.EventFlow.addUser = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = context;
    const { data: { sender: { id, memberName, specialTitle } } } = message;
    yield gameUser_1.default.findOneAndUpdate({ qq: id }, {
        qq: id,
        memberName: memberName,
        specialTitle: specialTitle,
    }, { upsert: true }).exec();
});
// 筛选消息
ws_1.EventFlow.filter = (context) => {
    var _a, _b, _c, _d;
    const { message } = context;
    const filterMsg = toolkits_1.default.get(message)
        .filterByMessageChainType('GroupMessage')
        .filterByMessageType('At')
        .filterByTaget()
        .filterByPlainText(text => {
        const t = text.trim();
        return t.includes('#');
    })
        .exec();
    // 把筛选后的消息带在上下文中
    context.filterMsg = filterMsg;
    context.filterText = (_d = (_c = (_b = (_a = filterMsg === null || filterMsg === void 0 ? void 0 : filterMsg.data) === null || _a === void 0 ? void 0 : _a.messageChain) === null || _b === void 0 ? void 0 : _b.find(i => i.type === 'Plain')) === null || _c === void 0 ? void 0 : _c.text) !== null && _d !== void 0 ? _d : '';
};
// 下注
ws_1.EventFlow.bet = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const lateRegexp = /迟到/gi;
    const notLateRegexp = /不迟到|没有迟到|不会迟到|不可能迟到|没迟到|准时到|准点到/gi;
    const { message, targetQQ, filterText } = context;
    const [words, value] = botCommand_1.isBetCommand(filterText);
    if (words && value) {
        // 匹配关键词
        const type = words.search((notLateRegexp)) >= 0 ? point_1.betType.不迟到 :
            words.search((lateRegexp)) >= 0 ? point_1.betType.迟到 : undefined;
        if (type === undefined)
            return;
        // 存储下注积分
        const [err] = yield util_1.addOnlyOneDocument({
            qq: targetQQ,
            betTime: {
                $gt: dayjs_1.default().startOf('date').toDate()
            }
        }, {
            qq: targetQQ,
            betPoint: Number(value),
            betType: type,
        }, point_1.default);
        if (err) {
            toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
                .at(targetQQ)
                .plain('\n' + util_1.getOneErrorMessage(err))
                .face(undefined, '请/gun')
                .exec();
            return;
        }
        // 成功提示
        toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
            .at(targetQQ)
            .plain(`\n押注${point_1.betTypeText[type]}：${value}积分`)
            .face(undefined, '吃糖')
            .exec();
    }
});
// 签到
ws_1.EventFlow.signIn = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { message, targetQQ, filterText } = context;
    if (botCommand_1.isSignInCommand(filterText)) {
        // 随机发积分
        const userPoint = randomPoint_1.default();
        const find = yield userPoints_1.default.findByQQ(targetQQ);
        const { success: SignInSuccess, message: SignInMessage } = yield signIn_1.default.signIn(targetQQ);
        if (SignInSuccess) {
            const { success: addPointSuccess, message: addPointMessage } = yield find.addPoint(userPoint);
            toolkits_1.default.send('sendGroupMessage', system_config_1.default.group_qq)
                .at(targetQQ)
                .plain(addPointSuccess ? `\n签到成功！\n获得积分${userPoint}!` : `\n签到失败：\n${addPointMessage}`)
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


/***/ }),

/***/ 692:
/***/ ((__unused_webpack_module, exports) => {


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


Object.defineProperty(exports, "__esModule", ({ value: true }));
const SystemConfig = {
    /** 服务器地址 */
    wsPath: 'ws://ws.dangdangdang.top',
    /** http地址 */
    httpPath: 'http://api.dangdangdang.top',
    // /** 服务器地址 */
    // wsPath: process.env.TS_NODE_DEV ? 'ws://ws.dangdangdang.top' : 'ws://172.17.82.247:3002',
    // /** http地址 */
    // httpPath: process.env.TS_NODE_DEV ? 'http://api.dangdangdang.top' : 'http://172.17.82.247:3001',
    /** 鉴权key */
    verifyKey: 1234567890,
    /** bot的qq号 */
    bot_qq: 1092946821,
    /** qq群号 */
    group_qq: 599869861,
};
exports.default = SystemConfig;


/***/ }),

/***/ 40:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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

/***/ 94:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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

/***/ 831:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.betTypeText = exports.betType = void 0;
const dayjs_1 = __importDefault(__webpack_require__(349));
const mongoose_1 = __webpack_require__(619);
var betType;
(function (betType) {
    betType[betType["\u8FDF\u5230"] = 0] = "\u8FDF\u5230";
    betType[betType["\u4E0D\u8FDF\u5230"] = 1] = "\u4E0D\u8FDF\u5230";
})(betType = exports.betType || (exports.betType = {}));
exports.betTypeText = {
    [betType.迟到]: '迟到',
    [betType.不迟到]: '不迟到',
};
const PointSchema = new mongoose_1.Schema({
    qq: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    betPoint: {
        type: mongoose_1.Schema.Types.Number,
        require: true,
        validate: {
            validator: function (v) {
                if (v < 0) {
                    throw new Error('只能投注正数');
                }
                if (!Number.isInteger(v)) {
                    throw new Error('只能投注整数');
                }
                return true;
            },
        },
    },
    betTime: {
        type: mongoose_1.Schema.Types.Date,
        require: false,
        default: () => dayjs_1.default().toDate()
    },
    betType: {
        type: mongoose_1.Schema.Types.Number,
        require: true,
    }
});
// 防止重复定义模型
exports.default = (mongoose_1.models && mongoose_1.models.Point) || mongoose_1.model('Point', PointSchema);


/***/ }),

/***/ 68:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const SignInSchema = new mongoose_1.Schema({
    qq: {
        type: mongoose_1.Schema.Types.String,
        required: true
    },
    signInTime: {
        type: mongoose_1.Schema.Types.Date,
        require: false,
        default: () => dayjs_1.default().toDate()
    }
});
class LoadClass {
    static signIn(qq) {
        return __awaiter(this, void 0, void 0, function* () {
            const find = yield this.findOne({
                qq,
                signInTime: {
                    $gt: dayjs_1.default().startOf('date').toDate()
                }
            }).exec();
            if (!find) {
                yield this.create({
                    qq
                });
            }
            else {
                throw new Error('今天已签到');
            }
        });
    }
}
__decorate([
    tryCatchPromise_1.default('签到失败！'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoadClass, "signIn", null);
SignInSchema.loadClass(LoadClass);
// 创建表 实例化Schema
const SignInModel = mongoose_1.model('SignIn', SignInSchema);
exports.default = SignInModel;


/***/ }),

/***/ 90:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
                    throw new Error('不能再减少');
                }
                if (!Number.isInteger(v)) {
                    throw new Error('只能为整数');
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
                    throw new Error('不能再减少');
                }
                if (!Number.isInteger(v)) {
                    throw new Error('只能为整数');
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

/***/ 854:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
exports.getOneErrorMessage = exports.addOnlyOneDocument = void 0;
const logger_1 = __importDefault(__webpack_require__(514));
/**
 * 插入唯一的数据
 * @param id 筛选条件
 * @param data 插入数据
 * @param model 要被插入数据的model
 * @returns 插入成功返回`true`插入失败返回`false`
 */
function addOnlyOneDocument(id, data, model) {
    return __awaiter(this, void 0, void 0, function* () {
        const find = yield model.find(id).exec();
        if (find.length > 0) {
            return [{ foo: { reason: { message: '已有记录' } } }, false];
        }
        else {
            try {
                yield model.create(data);
            }
            catch (err) {
                logger_1.default('db', 'error', err.errors);
                return [err.errors, false];
            }
            return [null, true];
        }
    });
}
exports.addOnlyOneDocument = addOnlyOneDocument;
/**
 * 获取第一个错误消息
 * @returns 错误消息
 */
function getOneErrorMessage(errors) {
    return errors[Object.keys(errors)[0]].reason.message;
}
exports.getOneErrorMessage = getOneErrorMessage;


/***/ }),

/***/ 718:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isSignInCommand = exports.isBetCommand = void 0;
function isBetCommand(text) {
    const blockComand = text.split('#');
    if (blockComand.length === 2) {
        const comand = blockComand[1].split(' ');
        if (comand.length === 2) {
            const [words, value] = comand;
            return [words, value];
        }
    }
    return ['', ''];
}
exports.isBetCommand = isBetCommand;
/**
 * 签到命令
 */
function isSignInCommand(text) {
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


/***/ }),

/***/ 580:
/***/ ((__unused_webpack_module, exports) => {


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
const logger_1 = __importDefault(__webpack_require__(514));
/**
 * 包装try catch的装饰器
 * @param errorMessage 错误消息
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
                    logger_1.default('db', 'error', err);
                    return {
                        message: err.message || errorMessage
                    };
                }
            });
        };
    };
}
exports.default = default_1;


/***/ }),

/***/ 514:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSession = void 0;
const store_1 = __webpack_require__(718);
const sessionSlice_1 = __webpack_require__(578);
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
            throw new Error('no session!');
        }
    }
}
exports.getSession = getSession;


/***/ }),

/***/ 116:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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
const system_config_1 = __importDefault(__webpack_require__(522));
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
        if (message) {
            if (message.data.sender.id === qq) {
                this.filteredMsg = message;
            }
            else {
                this.filteredMsg = undefined;
            }
        }
        return this;
    }
    /**
     * 消息接收者qq号筛选
     * @param qq 默认是bot的qq
     */
    filterByTaget(qq = system_config_1.default.bot_qq, message) {
        if (message) {
            if (message.data.messageChain) {
                if (message.data.messageChain.some(i => i.target === qq)) {
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
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], GetMessage.prototype, "filterBySender", null);
__decorate([
    getMessageFilter_1.default(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
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
const ws = new ws_1.default(`${system_config_1.default.wsPath}/all?verifyKey=${system_config_1.default.verifyKey}&qq=${system_config_1.default.bot_qq}`);
ws.on('open', function open() {
    console.log('websocket连接成功！');
    logger_1.default('ws', 'info', '连接成功！');
});
ws.on('error', (err) => {
    console.log('websocket错误');
    logger_1.default('error', 'error', err);
});
ws.on('close', (code, message) => {
    console.log('websocket关闭');
    logger_1.default('ws', 'info', `连接关闭！code: ${code}，message: ${message}`);
});
ws.addEventListener('message', ({ data }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    ////////////////////// 检查session 必须第一步 //////////////////////////
    const jsonMsg = JSON.parse(data);
    if (jsonMsg.data.code === code_1.CodeEnum.success) {
        session_1.getSession(jsonMsg);
        return;
    }
    ////////////////////////////////////////////////////////////////////////
    // 上下文对象
    const context = {
        message: jsonMsg,
        targetQQ: jsonMsg.data.sender.id,
        text: (_b = (_a = jsonMsg.data.messageChain) === null || _a === void 0 ? void 0 : _a.find(i => i.type === 'Plain')) === null || _b === void 0 ? void 0 : _b.text
    };
    // 顺序执行流程
    for (let flow of Object.keys(exports.EventFlow)) {
        const fnReturn = exports.EventFlow[flow](context);
        if (fnReturn instanceof Promise) {
            yield fnReturn;
        }
    }
}));
exports.default = ws;


/***/ }),

/***/ 178:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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

module.exports = require("@reduxjs/toolkit");

/***/ }),

/***/ 349:
/***/ ((module) => {

module.exports = require("dayjs");

/***/ }),

/***/ 455:
/***/ ((module) => {

module.exports = require("log4js");

/***/ }),

/***/ 619:
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ 622:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 906:
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),

/***/ 439:
/***/ ((module) => {

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_require__(40);
__webpack_require__(461);
__webpack_require__(906);
__webpack_require__(903);

})();

/******/ })()
;