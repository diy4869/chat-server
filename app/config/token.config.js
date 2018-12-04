import path from 'path'
import fs from 'fs'

const privateKey = fs.readFileSync(path.join(__dirname, './rsa_private_key.pem'))
const publicKey = fs.readFileSync(path.join(__dirname, './rsa_public_key.pem'))

export default {
    algorithm: 'RS256',
    exp: 36000 *  24 * 30, // 过期时间一个月
    privateKey,
    publicKey
}