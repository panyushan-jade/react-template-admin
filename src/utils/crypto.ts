import CryptoJS from 'crypto-js'

const SECRET_KEY = 'vue-admin-secret-key-2024'

export function encrypt(data: string): string {
  return CryptoJS.AES.encrypt(data, SECRET_KEY).toString()
}

export function decrypt(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY)
  return bytes.toString(CryptoJS.enc.Utf8)
}

export function md5(data: string): string {
  return CryptoJS.MD5(data).toString()
}

export function sha256(data: string): string {
  return CryptoJS.SHA256(data).toString()
}
