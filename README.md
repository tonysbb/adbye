# adbye

日本系 App 去广告仓库，当前同时维护：

- Quantumult X rewrite：`jpapp.conf`
- Egern module：`egern/jpapp.module.yaml`

## 覆盖内容

- LINE：
  - Home / News / Wallet 广告
  - 群聊窗口广告
  - 聊天窗口 banner 广告
- 东京 Metro App：
  - `advertised_banners`
- Rakuten Link：
  - banner 广告请求

## 仓库结构

```text
.
├── README.md
├── jpapp.conf
└── egern
    ├── jpapp.module.yaml
    └── scripts
        └── rakuten_link_empty.js
```

## 使用方式

### Quantumult X

远程 rewrite 地址：

```text
https://raw.githubusercontent.com/tonysbb/adbye/main/jpapp.conf
```

### Egern

远程 module 地址：

```text
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/jpapp.module.yaml
```

这份模块已经把原 Quantumult X 配置拆开重写：

- `url reject` 规则改成 Egern `url_rewrites`
- `url reject-200` 规则改成 Egern `http_request` 脚本，直接返回 `200` 空响应
- `hostname` 改成 Egern `mitm.hostnames`

## 适配说明

- 目标平台：Egern / Quantumult X
- 目标地区：日本常用 App
- 适合“保留核心功能，仅屏蔽已确认广告接口”的保守策略

如果广告仍然存在，优先检查：

- App 是否更新了接口
- 是否已经启用 MITM
- 是否清理了 App 缓存

## 更新记录

- `2024-11-12`：创建仓库
- `2024-11-16`：仓库改名为 `adbye`
- `2024-12-06`：增加 LINE 群聊窗口广告拦截
- `2025-01-07`：增加 LINE 聊天窗口 banner 广告拦截
- `2025-11-19`：增加 Rakuten Link banner 广告拦截
- `2026-04-18`：新增 Egern module 版本，拆分重写 Quantumult X 规则
