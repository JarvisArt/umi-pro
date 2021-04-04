# Umi Pro
一个企业级的中后台前端解决方案 🎉

## 🔨 食用指南

安装依赖

```bash
$ yarn
```

启动开发服务

```bash
$ yarn start
```

## 📄 目录结构

整个项目的目录结构

```
├── config                  # umi 配置，包含路由，构建等配置
├── mock                    # 本地模拟数据
├── public
│   └── favicon.png         # Favicon
├── src
│   ├── assets              # 本地静态资源
│   ├── components          # 业务通用组件
│   ├── e2e                 # 集成测试用例 (暂无)
│   ├── layouts             # 通用布局
│   ├── models              # 全局 dva model
│   ├── pages               # 业务页面入口
│   ├── services            # 后台接口服务
│   ├── utils               # 工具库
│   ├── locales             # 国际化资源 (暂无)
│   ├── app.ts              # 运行时配置文件，可以在这里扩展运行时的能力
│   ├── global.less         # 全局样式
│   └── global.ts           # 全局 JS (暂无)
├── tests                   # 测试工具 (暂无)
├── README.md
└── package.json
```

尽可能的拆分路由组件为更细粒度的组件，对于多个页面可能会用到的组件推荐放到 src/components 中，对于只是被单个页面依赖的（区块）组件，推荐就近维护到路由组件文件夹下即可

## 🚀 commit 规范

#### <a name="commit-header"></a>Commit Message Header

```
<type>(<scope>): <short summary>
  │       │             │
  │       │             └─⫸ commit 的简短描述，结尾不加标点符号
  │       │
  │       └─⫸ Commit Scope: 用于说明 commit 影响的范围，比如一些模块
  │
  └─⫸ Commit Type: feat|fix|ui|docs|style|refactor|perf|test|chore|revert|merge|build
```

`<type>` 和 `<summary>` 为必填项, `(<scope>)` 为可选项，`type` 说明如下：

```
feat:       新功能
fix:        修复bug
ui:         界面UI的更改
docs:       文档改变
style:      代码格式调整
refactor:   重构，即不是新增功能，也不是修改bug的代码变动
perf:       优化相关，比如提升性能、体验
test:       增加测试
chore:      构建过程或辅助工具的变动
revert:     回滚到上一个版本
merge:      代码合并
build:      影响编译的一些更改
```
