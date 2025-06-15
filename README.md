# 🎨 Fantasticon Playground

FontAwesome風にカスタムアイコンフォントをCDN配信するプロジェクトです。

## 🚀 デモ

- **アイコン一覧**: https://sunwood-ai-labs.github.io/fantasticon-playground/assets/font/icons.html

## 📦 CDNとして使用する方法

HTMLファイルの`<head>`に以下を追加：

```html
<link rel="stylesheet" href="https://sunwood-ai-labs.github.io/fantasticon-playground/assets/font/icons.css">
```

アイコンを使用：

```html
<i class="icon-facebook"></i>
<i class="icon-instagram"></i>
<i class="icon-pdf"></i>
```

## 🛠️ 開発

### 環境構築

```bash
npm install
```

### フォント生成

```bash
npm run build
```

### 開発モード（ファイル監視）

```bash
npm run dev
```

## 📁 プロジェクト構造

```
├── src/font/svg/          # SVGアイコンファイル
├── dist/assets/font/      # 生成されたフォントファイル（GitHub Pagesで配信）
├── fantasticon.config.js  # Fantasticonの設定
└── .github/workflows/     # CI/CD設定
```

## 🔄 CI/CD

GitHub Actionsで自動化されています：

1. **テスト**: フォント生成の成功を確認
2. **デプロイ**: mainブランチへのpush時にGitHub Pagesへ自動デプロイ

## 📝 アイコンの追加方法

1. `src/font/svg/`にSVGファイルを追加
2. コミット・プッシュすると自動でフォントが生成・デプロイされます

## 🎯 利用可能なアイコン

- `icon-facebook`
- `icon-instagram`
- `icon-pdf`
- `icon-direction-arrow-left`
- `icon-direction-arrow-right`
- `icon-cropped-1` ~ `icon-cropped-5`

詳細は[デモページ](https://sunwood-ai-labs.github.io/fantasticon-playground/assets/font/icons.html)をご覧ください。