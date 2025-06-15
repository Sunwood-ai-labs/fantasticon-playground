# 📚 サンプルページ集

このフォルダには、カスタムアイコンフォントの使用例が含まれています。

## 🎯 サンプル一覧

### 1. [index.html](./index.html)
- **概要**: サンプル集のメインページ
- **URL**: `https://sunwood-ai-labs.github.io/fantasticon-playground/example/`
- **内容**: 全体的な紹介と各サンプルへのリンク

### 2. [basic-usage.html](./basic-usage.html)
- **概要**: 基本的な使用方法
- **URL**: `https://sunwood-ai-labs.github.io/fantasticon-playground/example/basic-usage.html`
- **内容**: 
  - CDN読み込み方法
  - 基本的なアイコン表示
  - サイズ調整
  - 色の変更
  - 実用的な使用例

### 3. [advanced-usage.html](./advanced-usage.html)
- **概要**: 高度な使用方法
- **URL**: `https://sunwood-ai-labs.github.io/fantasticon-playground/example/advanced-usage.html`
- **内容**:
  - CSSアニメーション
  - ボタンとの組み合わせ
  - カードレイアウト
  - タブインターフェース
  - ナビゲーションメニュー
  - レスポンシブデザイン

### 4. [cropped-icons.html](./cropped-icons.html)
- **概要**: Cropped/Resized系統のアイコン専用ページ
- **URL**: `https://sunwood-ai-labs.github.io/fantasticon-playground/example/cropped-icons.html`
- **内容**:
  - 各croppedシリーズの比較表示
  - オリジナル/バックアップ/リサイズ版の違い
  - サイズバリエーション
  - カラーバリエーション
  - 実用的な使用例

## 🚀 使用方法

1. **CDN読み込み**
```html
<link rel="stylesheet" href="https://sunwood-ai-labs.github.io/fantasticon-playground/assets/font/icons.css">
```

2. **アイコン使用**
```html
<i class="icon-facebook"></i>
<i class="icon-instagram"></i>
<i class="icon-pdf"></i>
```

## 📋 利用可能なアイコン

すべてのアイコンは[こちら](https://sunwood-ai-labs.github.io/fantasticon-playground/assets/font/icons.html)で確認できます。

## 🎨 カスタマイズ例

### サイズ調整
```css
.large-icon { font-size: 2em; }
.medium-icon { font-size: 1.5em; }
.small-icon { font-size: 0.8em; }
```

### 色の変更
```css
.facebook-blue { color: #1877f2; }
.instagram-pink { color: #E4405F; }
.pdf-red { color: #dc3545; }
```

### アニメーション
```css
.spin {
    animation: spin 2s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
```

## 🔗 参考リンク

- [メインリポジトリ](https://github.com/Sunwood-ai-labs/fantasticon-playground)
- [アイコン一覧](https://sunwood-ai-labs.github.io/fantasticon-playground/assets/font/icons.html)
- [Fantasticon公式](https://github.com/tancredi/fantasticon)