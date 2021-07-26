# 摆子哥今天迟到了吗？

## 项目相关
### 1. 使用技术
  - typescript
  - node
  - gulp
  - webpack

### 2. 主要构成
  - gulp

    `gulp`主要是用来编译`ts`进入`lib`文件夹，方便在`npm`环境中引用
  - src文件夹

    所有源代码的目录，注意最上层只能有一个`index.ts`作为入口

## 使用
### 1. `npm`安装使用
  ```javascript
    import * as late from 'are-you-late'
    late.hello.default()
  ```
