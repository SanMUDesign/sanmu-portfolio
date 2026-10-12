# SanMu 林俊杰 · 个人作品集

纯静态 HTML、CSS、JavaScript 作品集，可直接部署到 GitHub Pages，无需构建工具或后端。

## 页面与资源

- `index.html`：网站入口
- `app.js`：页面、分类、路由与交互
- `project-assets.js`：12 个作品的文案、封面和详情图片数据
- `portfolio-update.css`：当前排版与响应式调整
- `styles.css`、`refinements.css`、`artwork.css`：基础样式
- `image-manifest.js`：原作品与多尺寸网页图片的映射
- `image-loading.js`：响应式图片、按需加载及常见图片保存操作限制
- `assets/optimized/`：经过尺寸调整与压缩的 WebP 展示图
- `_headers`：Cloudflare Pages 的缓存设置

站内采用 `#/` 路由和相对资源路径，支持 GitHub Pages 项目子目录，刷新作品详情页仍可打开。

## GitHub Pages

在仓库 Settings → Pages 中选择 Deploy from a branch，使用 `main` 分支的 `/ (root)`。
`.nojekyll` 用于直接发布静态文件。修改文件后提交并推送到 `main`，GitHub Pages 会重新发布。

## 本地预览

在此目录运行 `python -m http.server 8080`，打开 `http://localhost:8080/`。

作品原图在本地单独保存，当前发布目录只提供 WebP 展示图。普通作品生成 640、1280、2400 像素宽的版本（不放大原图），背景使用较小版本。图片接近屏幕时才下载；背景轮播逐张加载。

Cloudflare Pages 连接此仓库的 `main` 分支，构建命令为 `exit 0`，输出目录为 `.`。推送后自动部署到 `https://sanmudesign.work/`。

已限制图片区域的右键、长按、拖拽、含图片的复制和常见保存快捷键，并移除详情页的原图链接。这些仅能阻止常规操作，公开网页无法保证图片不能被截图、开发者工具或网络请求获取。旧版原图仍可能存在于公开 Git 历史与访客缓存中；本次没有重写仓库历史。
网站展示首页、关于我、作品分类、作品详情和联系信息。作品版权归相应权利人所有。
