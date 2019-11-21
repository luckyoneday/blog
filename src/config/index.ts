export const sqlConfig = {
  host: "localhost",
  user: "root",
  password: "youting666",
  database: "blog-sql",
  port: 3306
}

export const cookieSignedKey = ["wangye, wangye-secret, wangye-secret-666"]
export const cookieConfig = {
  key: "koa:sessionId",
  domain: "localhost",
  path: "/",
  maxAge: 600000,
  httpOnly: true,
  signed: true
}
