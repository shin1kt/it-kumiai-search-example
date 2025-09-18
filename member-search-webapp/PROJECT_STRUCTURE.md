# プロジェクト構造

## 概要
長岡アイティ事業協同組合の会員検索Webアプリケーション

## 技術スタック
- React 18 + TypeScript
- Vite (ビルドツール)
- CSS Modules + レスポンシブデザイン

## ディレクトリ構造

```
src/
├── components/          # Reactコンポーネント
│   └── index.ts        # コンポーネントエクスポート
├── types/              # TypeScript型定義
│   ├── index.ts        # 基本データ型
│   ├── components.ts   # コンポーネントプロパティ型
│   └── constants.ts    # 定数とメッセージ
├── data/               # データ関連
│   └── index.ts        # データエクスポート
├── styles/             # スタイルファイル
│   ├── globals.css     # グローバルスタイル
│   └── utilities.css   # ユーティリティクラス
└── assets/             # 静的アセット
```

## 主要な型定義

### Member (組合員)
- id: string
- name: string  
- contactUrl?: string
- expertiseAreas: string[]

### SearchFilters (検索フィルター)
- query: string
- expertiseFilter: string

### SearchResult (検索結果)
- members: Member[]
- totalCount: number
- searchTime: number

## スタイル設計

### CSS変数
- カラーパレット（プライマリ、セカンダリ、エラーなど）
- スペーシング（xs, sm, md, lg, xl）
- ブレークポイント（モバイル: 768px以下）

### ユーティリティクラス
- レイアウト（flex, grid, spacing）
- テキスト（色、サイズ、配置）
- コンポーネント（ボタン、カード、入力フィールド）

## 開発コマンド

```bash
npm run dev     # 開発サーバー起動
npm run build   # プロダクションビルド
npm run preview # ビルド結果のプレビュー
```

## 要件対応

- **要件6.1**: モバイル対応のレスポンシブデザイン基盤
- **要件6.2**: デスクトップ向けレイアウト基盤
- TypeScript による型安全性の確保
- CSS変数とユーティリティクラスによる一貫したデザインシステム