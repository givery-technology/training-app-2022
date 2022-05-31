# Deploy演習
## backend
### 要素技術
- ECR
- ECS
  - web
  - db
- ALB

今回RDSは使用しておらずmysqlはECSのコンテナの中で起動している。  
このためdeployの度にデータベース内のデータは消える。

### 各種設定
- ECR
  - 各チームごとにwebとdbのリポジトリを容易
- ECS
  - webとdbを同梱するTaskDefinitionを作成
  - 上記TaskDefnitionをサービス化
- ALB
  - 1台のみ用意してHostでチームごとのリクエストを振り分け

### CI概要
- `go build`でバイナリを生成
- 上記バイナリを含むDockerImageを生成してECRにpush
- mysql側ではcreate.sqlとinsert.sqlをinit.dにコピーしたDockerImageを生成してECRにpush
- その後Serviceの参照するTaskDefinitionのバージョンをあげてReplace

migrationを導入している場合は初期データの生成方法を変える必要がある

## frontend
### 要素技術
- S3
- Cloudfront

### 各種設定
- S3
  - OAIを有効にして直接アクセスできないようにしている
- Cloudfront
  - 403エラー時はindex.htmlを200で返すようにしている

### CI概要
- `npm run build`でindex.html, js, cssを生成
- 成果物をs3にコピー

## 動作概要

``` mermaid
sequenceDiagram
  Browser ->> Cloudfront: ページリクエスト
  Cloudfront ->> S3: リクエスト転送
  S3 -->> Browser: HTML, JS, CSS
  Browser ->> ALB: APIリクエスト
  ALB ->> ECS(Web): リクエスト転送
  ECS(Web) ->> ECS(DB): DBアクセス
  ECS(Web) -->> Browser: APIレスポンス
```

