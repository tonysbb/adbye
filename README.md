# adbye

自用 rewrite / module 仓库，当前同时维护：

- Quantumult X：原始 rewrite 配置
- Egern：重写后的本地化模块与脚本

目标不是做“大而全”公共仓库，而是把常用条目拆成可控、可维护、可单独测试的模块。

## 当前模块

### Quantumult X

- `Quantumult X/jpapp.conf`
  - 日本 App 去广告

### Egern

- `egern/jpapp.module.yaml`
  - 日本 App 去广告
- `egern/ilovepdf.module.yaml`
  - iLovePDF Pro
- `egern/camscanner.module.yaml`
  - 扫描全能王 Pro
- `egern/busuu.module.yaml`
  - Busuu Premium
- `egern/youtube_ads.module.yaml`
  - YouTube 去广告
- `egern/youtube_merged.module.yaml`
  - YouTube 合并版
- `egern/bilibili_web.module.yaml`
  - Bilibili Web Helper，适用于经过 Egern 的网页流量
- `egern/spotify.module.yaml`
  - Spotify Premium

## 仓库结构

```text
.
├── README.md
├── Quantumult X
│   └── jpapp.conf
└── egern
    ├── camscanner.module.yaml
    ├── busuu.module.yaml
    ├── ilovepdf.module.yaml
    ├── jpapp.module.yaml
    ├── spotify.module.yaml
    ├── youtube_ads.module.yaml
    ├── youtube_merged.module.yaml
    ├── bilibili_web.module.yaml
    └── scripts
        ├── camscanner_query_property.js
        ├── busuu_user.js
        ├── ilovepdf_user.js
        ├── rakuten_link_empty.js
        ├── respond_empty_200.js
        ├── spotify_artist_album_request.js
        ├── spotify_customize_request.js
        ├── spotify_proto_response.js
        └── youtube.response.legacy.js
```

## 远程地址

### Quantumult X

```text
https://raw.githubusercontent.com/tonysbb/adbye/main/Quantumult%20X/jpapp.conf
```

### Egern

```text
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/jpapp.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/ilovepdf.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/camscanner.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/busuu.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/spotify.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/youtube_ads.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/youtube_merged.module.yaml
https://raw.githubusercontent.com/tonysbb/adbye/main/egern/bilibili_web.module.yaml
```

## 已完成的重写方式

- 日本 App 去广告：
  - `url reject` 改成 Egern `url_rewrites`
  - `url reject-200` 改成 Egern `http_request` 脚本
  - `hostname` 改成 Egern `mitm.hostnames`
- iLovePDF Pro：
  - Quantumult X `script-response-body` 改成 Egern `http_response`
- 扫描全能王 Pro：
  - Quantumult X `script-response-body` 改成 Egern `http_response`
- Busuu Premium：
  - Quantumult X `script-response-body` 改成 Egern `http_response`
- YouTube 去广告：
  - `url 302` 改成 Egern `url_rewrites`
  - `reject-200` 改成 Egern `http_request` 空响应
  - `script-response-body` 改成 Egern `http_response`
- YouTube 合并版：
  - 保留 `Maasea` 响应增强脚本的默认行为
  - 叠加 `adbye` 的广告请求空响应与 `ctier` URL 修正
  - 使用 `response_jq` 移除 YouTube 网页播放器 JSON 响应中的广告字段，已在 macOS Safari 实测
  - 作为单独模块测试，不建议和 `youtube_ads.module.yaml` 同时启用
- Spotify Premium：
  - 请求头处理改成 Egern `http_request`
  - URL 修正改成 Egern `http_request`
  - protobuf 响应改写改成 Egern `http_response` + `binary_body`

## Bilibili Web Helper

首版过滤首页推荐接口 `/x/web-interface/(wbi/)index/top/feed/rcmd` 中明确标记的广告卡片，并让 `data.bilibili.com/log/web` 返回空的 HTTP 200。首次加载时已经嵌在首页 HTML 里的推广卡片不在这条过滤规则的覆盖范围内。需要 Egern 能解密模块列出的两个主机。

以下按 [SukkaW 原脚本的入口](https://github.com/SukkaW/Make-Bilibili-Great-Than-Ever-Before/blob/master/src/index.ts) 逐项对照。首版只实现网络层子集，已用 JSON 样例验证过滤规则，Safari 实际广告覆盖范围待实测。

| 原脚本功能 | Egern 首版与后续建议 |
| --- | --- |
| 限制本地存储和 IndexedDB 写入 | 依赖页面存储 API，建议保留在浏览器端。 |
| 禁用日志上报和跟踪 | 首版只拦截网页日志端点。浏览器内的上报函数仍由页面管理。 |
| 禁用 AV1 | 原脚本改写浏览器解码能力探测。可后续验证能否从播放响应中只过滤 AV1 候选。 |
| 直播增强和优先原画 | 部分 URL 可定向改写。先验证直播可正常回退，再考虑加入。 |
| 专栏解除复制限制 | 属于网页剪贴板事件，建议保留在浏览器端。 |
| 显示 4K、HDR 等播放选项 | 依赖浏览器环境和播放器设置，建议保留在浏览器端。 |
| 避免 PCDN | 可试验从实际播放响应中移除 PCDN 候选，前提是仍有可用的普通 CDN。 |
| 禁用 WebRTC P2P | 原脚本改写页面 WebRTC API，不能用普通 HTTP 重写等价实现。 |
| 去广告 | 首版移除推荐接口中带明确广告标记的卡片。 |
| 首页样式优化 | 依赖 CSS；如需继续，可单独评估首屏 HTML 和样式。 |
| 动态列表优化 | 涉及页面样式和加载时机，建议保留在浏览器端。 |
| 播放器宽度适配 | 依赖 CSS，建议保留在浏览器端。 |
| 移除网页黑白滤镜 | 依赖 CSS，建议保留在浏览器端。 |
| 清理链接跟踪参数 | 可限于少数普通网页链接做重定向。站内导航和签名请求需要区别处理。 |
| Thread Ripper 并发分片下载 | 依赖播放器的分片、并发调度及回退，建议保留在浏览器端。 |
| 使用系统字体 | 依赖 CSS，建议保留在浏览器端。 |

下一步建议先验证首页首次加载和换一换，再根据播放体验选择普通 CDN 优先或链接清理。

## 使用说明

- 模块测试阶段，建议一条一条单独添加到 Egern，确认通过后再并入主配置。
- 这批模块都依赖 MITM；没开 MITM 或证书没信任，行为不会完整生效。
- Spotify 这类二进制响应改写模块，建议单独测试，不要和同类脚本并开。
- `youtube_merged.module.yaml` 和 `youtube_ads.module.yaml` 二选一，不要同时开。

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
- `2026-04-18`：新增 iLovePDF、扫描全能王、Spotify 的 Egern 模块
- `2026-04-18`：新增 Busuu 的 Egern 模块
- `2026-04-18`：新增 YouTube 的 Egern 模块
- `2026-04-19`：新增 YouTube 合并版模块
- `2026-11-11`：新增 Bilibili Web Helper 模块
