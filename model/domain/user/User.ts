class User {
  // ユーザー固有のID
  readonly uid: string
  // ユーザー名
  readonly name: string
  // メールアドレス
  readonly email: string
  // LINE 連携しているかどうか
  readonly isLine: boolean
  // Google 連携しているかどうか
  readonly isGoogle: boolean

  constructor({ uid, name, email, isLine, isGoogle }: { uid: string, name: string, email: string, isLine: boolean, isGoogle: boolean }) {
    if (!uid) {
      throw new Error('UID は必須です。')
    }
    if (!name) {
      throw new Error('名前は必須です。')
    }
    if (name.length > 50) {
      throw new Error('名前は50文字以内である必要があります。')
    }
    if (!this.validateEmail(email)) {
      throw new Error('無効なメールアドレスです。')
    }

    this.uid = uid
    this.name = name
    this.email = email
    this.isLine = isLine
    this.isGoogle = isGoogle
  }

  // 他のUserオブジェクトと等価性を比較するメソッド
  equals(other: User): boolean {
    return this.uid === other.uid && this.email === other.email
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

export { User }
