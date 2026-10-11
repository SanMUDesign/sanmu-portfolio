# SanMu 林俊杰 · 个人作品集

纯静态 HTML、CSS、JavaScript 作品集，可直接部署到 GitHub Pages，无需构建工具或后端。

## 页面与资源

- `index.html`：网站入口
- `app.js`：页面、分类、路由与交互
- `project-assets.js`：12 个作品的文案、封面和详情图片数据
- `portfolio-update.css`：当前排版与响应式调整
- `styles.css`、`refinements.css`、`artwork.css`：基础样式
- `assets/`：作品原图、独立封面、首屏轮播和个人照片

站内采用 `#/` 路由和相对资源路径，支持 GitHub Pages 项目子目录，刷新作品详情页仍可打开。

## GitHub Pages

在仓库 Settings → Pages 中选择 Deploy from a branch，使用 `main` 分支的 `/ (root)`。
`.nojekyll` 用于直接发布静态文件。修改文件后提交并推送到 `main`，GitHub Pages 会重新发布。

## 本地预览

在此目录运行 `python -m http.server 8080`，打开 `http://localhost:8080/`。

作品图保持原尺寸和原始文件内容，未进行有损压缩。图片体积较大，首次访问时间取决于网络状况。
网站展示首页、关于我、作品分类、作品详情和联系信息。作品版权归相应权利人所有。
