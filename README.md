# adbye

自用 rewrite / module 仓库，当前同时维护：

- Quantumult X：原始 rewrite 配置
- Egern：重写后的本地化模块与脚本

目标不是做“大而全”公共仓库，而是把常用条目拆成可控、可维护、可单独测试的模块。

## 当前模块

### Quantumult X

- `jpapp.conf`
  - 日本 App 去广告
- `qx_sources/adultraplus.conf`
  - 去开屏广告融合版 Ultra+ 原始镜像

### Egern

- `egern/jpapp.module.yaml`
  - 日本 App 去广告
- `egern/ilovepdf.module.yaml`
  - iLovePDF Pro
- `egern/pdfexpert.module.yaml`
  - PDF Expert Pro
- `egern/camscanner.module.yaml`
  - 扫描全能王 Pro
- `egern/busuu.module.yaml`
  - Busuu Premium
- `egern/busuu_diagnose.module.yaml`
  - Busuu 诊断模块
- `egern/caixin.module.yaml`
  - 财新周刊净化
- `egern/wechat_applet.module.yaml`
  - 微信小程序净化
- `egern/youtube_ads.module.yaml`
  - YouTube 去广告
- `egern/netease_ads.module.yaml`
  - 网易云净化
- `egern/wechat_unblock_url.module.yaml`
  - 微信解锁链接
- `egern/spotify.module.yaml`
  - Spotify Premium

## 仓库结构

```text
.
├── README.md
├── jpapp.conf
├── qx_sources
│   └── adultraplus.conf
└── egern
    ├── caixin.module.yaml
    ├── camscanner.module.yaml
    ├── busuu.module.yaml
    ├── busuu_diagnose.module.yaml
    ├── ilovepdf.module.yaml
    ├── jpapp.module.yaml
    ├── netease_ads.module.yaml
    ├── pdfexpert.module.yaml
    ├── spotify.module.yaml
    ├── wechat_applet.module.yaml
    ├── wechat_unblock_url.module.yaml
    ├── youtube_ads.module.yaml
    └── scripts
        ├── applet.legacy.js
        ├── camscanner_query_property.js
        ├── busuu_user.js
        ├── busuu_diag_request.js
        ├── busuu_diag_response.js
        ├── caixinads.legacy.js
        ├── ilovepdf_user.js
        ├── netease.adblock.legacy.js
        ├── pdfexpert_subscription_refresh.js
        ├── rakuten_link_empty.js
        ├── respond_empty_200.js
        ├── spotify_artist_album_request.js
        ├── spotify_customize_request.js
        └── spotify_proto_response.js
        ├── weixin110.legacy.js
        ├── youtube.response.legacy.js
        └── zhangshanggongjiao.legacy.js
```

## 远程地址

### Quantumult X

```text
https://raw.githubusercontent.com/tonysbb/adbye/main/jpapp.conf
```

### Egern

```text
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/jpapp.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/ilovepdf.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/pdfexpert.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/camscanner.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/busuu.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/busuu_diagnose.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/caixin.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/wechat_applet.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/youtube_ads.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/netease_ads.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/wechat_unblock_url.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/spotify.module.yaml
```

## 已完成的重写方式

- 日本 App 去广告：
  - `url reject` 改成 Egern `url_rewrites`
  - `url reject-200` 改成 Egern `http_request` 脚本
  - `hostname` 改成 Egern `mitm.hostnames`
- iLovePDF Pro：
  - Quantumult X `script-response-body` 改成 Egern `http_response`
- PDF Expert Pro：
  - Quantumult X `script-request-body` 改成 Egern `http_request`
- 扫描全能王 Pro：
  - Quantumult X `script-response-body` 改成 Egern `http_response`
- Busuu Premium：
  - Quantumult X `script-response-body` 改成 Egern `http_response`
- Busuu Diagnose：
  - 用于抓取 Egern 实际命中的 Busuu URL 和响应状态，定位真实接口
- 财新周刊净化：
  - Quantumult X `script-response-body` 改成 Egern `http_response`
- 微信小程序净化：
  - `reject-200` 改成 Egern `http_request` 空响应
  - `response-body` 改成 Egern `body_rewrites`
  - `script-response-body` 改成 Egern `http_response`
- YouTube 去广告：
  - `url 302` 改成 Egern `url_rewrites`
  - `reject-200` 改成 Egern `http_request` 空响应
  - `script-response-body` 改成 Egern `http_response`
- 网易云净化：
  - `script-response-body` 改成 Egern `http_response`
  - `reject-200` 改成 Egern `http_request` 空响应
- 微信解锁链接：
  - Quantumult X `script-response-body` 改成 Egern `http_response`
- Spotify Premium：
  - 请求头处理改成 Egern `http_request`
  - URL 修正改成 Egern `http_request`
  - protobuf 响应改写改成 Egern `http_response` + `binary_body`

## 特殊说明

- `qx_sources/adultraplus.conf` 目前是 item 1 的原始镜像。
- 这条不是单一 rewrite，而是 2600 行的大型集合，混合了大量 `reject`、`script-response-body`、`request-body`、`response-body` 和外部脚本。
- 它需要按功能拆成多批 Egern 模块，不适合和普通单条 rewrite 一次性粗暴转写，否则后续很难定位失效点。

## 使用说明

- 模块测试阶段，建议一条一条单独添加到 Egern，确认通过后再并入主配置。
- 这批模块都依赖 MITM；没开 MITM 或证书没信任，行为不会完整生效。
- Spotify 这类二进制响应改写模块，建议单独测试，不要和同类脚本并开。

如果效果不对，优先检查：

- App 版本是否变化
- 接口路径是否变化
- MITM 是否启用
- CA 是否已安装并信任
- App 缓存是否需要清理

## 更新记录

- `2024-11-12`：创建仓库
- `2024-11-16`：仓库改名为 `adbye`
- `2024-12-06`：增加 LINE 群聊窗口广告拦截
- `2025-01-07`：增加 LINE 聊天窗口 banner 广告拦截
- `2025-11-19`：增加 Rakuten Link banner 广告拦截
- `2026-04-18`：新增日本 App 的 Egern 模块
- `2026-04-18`：新增 iLovePDF、PDF Expert、扫描全能王、Spotify 的 Egern 模块
- `2026-04-18`：新增 Busuu 的 Egern 模块
- `2026-04-18`：新增财新、微信小程序、YouTube、网易云、微信解锁链接的 Egern 模块
- `2026-04-18`：镜像保存 item 1 `adultraplus.conf`，待后续拆分转换
