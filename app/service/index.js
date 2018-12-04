
import jwt from 'jsonwebtoken'
import tokenConfig from "../config/token.config"

export let send = function (err, data, ctx) {
  if (err) {
    console.log('err ->', err)
    ctx.status = err.status || 500
    data = err.errors || err
  }

  return data
}


export let tokenSign = data => jwt.sign({
  data,
  exp: Date.now() + tokenConfig.exp
}, tokenConfig.privateKey, { algorithm: tokenConfig.algorithm })

export let tokenVerify = data => {
  let result = jwt.verify(data, tokenConfig.publicKey, { algorithm: tokenConfig.algorithm }) || {}
  let { exp = 0 } = result
  let currentDate = Date.now()
  return currentDate <= exp ? result.data : {}
}


