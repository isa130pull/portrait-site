# かわぐち（isa130pull）ポートレートサイト

Unityゲームエンジニアのポートフォリオサイト

## 🌐 公開URL

**https://isa130pull.github.io/portrait-site/**

## 📁 サイト構成

```
portrait-site/
├── index.html              # トップページ
├── pages/
│   ├── contact.html        # お問い合わせフォーム
│   ├── privacy.html        # プライバシーポリシー
│   └── CONTACT_SETUP.md    # フォーム設定手順
├── images/
│   └── profile@1x.jpg      # プロフィール写真
└── README.md
```

## 📄 ページ構成

### トップページ（index.html）

- **ヘッダー**: ナビゲーション（プロフィール、実績、お問い合わせ）
- **ヒーロー**: 名前、専門分野、プロフィール写真
- **プロフィール**: 経歴、専門領域、拠点情報
- **略歴**: 2012年〜2024年のキャリアサマリー
- **実績/プロジェクト**: breaker、Vタビ、Velle（YouTube動画埋め込み）
- **自作アプリ**: いえばく、すしばく、AI美少女1/100、QR美少女1/100
- **メディア/執筆**: App Marketing Labo、Qiita
- **問い合わせ**: SNSリンク、お問い合わせフォームへの導線
- **フッター**: コピーライト、プライバシーポリシーリンク

### お問い合わせフォーム（pages/contact.html）

- Google Apps Script連携のカスタムフォーム
- 入力項目: お名前、メールアドレス、ご相談内容（選択式）、お問い合わせ内容
- 送信後: Googleスプレッドシートに自動保存 + メール通知

### プライバシーポリシー（pages/privacy.html）

- App Store/Google Play審査対応
- 情報収集、利用目的、第三者サービス、安全管理など

## 🎨 主な機能

- ✅ **ビルド不要**: HTML + CSS のみのシンプル構成
- ✅ **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- ✅ **ダーク/ライトモード**: システム設定に自動対応
- ✅ **SEO最適化**:
  - 構造化データ（JSON-LD）
  - Open Graph・Twitter Card対応
  - semantic HTML
  - canonical URL設定
- ✅ **YouTube動画埋め込み**: 実績紹介に動画を活用
- ✅ **アクセシビリティ**: ARIA属性、alt属性など
- ✅ **お問い合わせフォーム**: Google Apps Script連携

## 🛠️ セットアップ手順

### 1. お問い合わせフォームの設定

お問い合わせフォームを機能させるには、Google Apps Scriptの設定が必要です。

詳細は [`pages/CONTACT_SETUP.md`](pages/CONTACT_SETUP.md) を参照してください。

**簡易手順**:
1. Googleスプレッドシート作成
2. Apps Scriptでウェブアプリをデプロイ
3. `pages/contact.html` の `SCRIPT_URL` を更新

### 2. GitHub Pagesの有効化

1. リポジトリ設定 → Pages
2. Source を `main` ブランチに設定
3. Save をクリック

数分後、`https://isa130pull.github.io/portrait-site/` でサイトが公開されます。

## 📊 SEO対策

以下のSEO対策を実装済み：

- **メタタグ最適化**: タイトル、description、keywords
- **構造化データ**: Person型のJSON-LD
- **Open Graph**: SNSシェア時の表示最適化
- **Twitter Card**: Twitter表示の最適化
- **canonical URL**: 重複コンテンツ回避
- **semantic HTML**: 適切なHTML5タグ使用

## 🔒 プライバシー対応

- プライバシーポリシーページを実装
- App Store/Google Playの審査要件に準拠
- フッターから常にアクセス可能

## 💻 技術スタック

- **HTML5**: セマンティックマークアップ
- **CSS3**: CSS Variables、Grid、Flexbox
- **JavaScript**: Vanilla JS（ライブラリ不使用）
- **Google Apps Script**: フォーム送信処理
- **GitHub Pages**: ホスティング

## 📝 更新履歴

- 2025-10-13: 初版作成
  - トップページ実装
  - プロフィール・略歴・実績セクション追加
  - お問い合わせフォーム実装
  - プライバシーポリシー追加
  - SEO対策実装

## 📧 問い合わせ

お仕事のご相談: [お問い合わせフォーム](https://isa130pull.github.io/portrait-site/pages/contact.html)

SNS:
- X (Twitter): [@isa130pull](https://x.com/isa130pull)
- GitHub: [isa130pull](https://github.com/isa130pull)
- Qiita: [isa130pull](https://qiita.com/isa130pull)

## ⚖️ ライセンス

© 2025 かわぐち (isa130pull)
