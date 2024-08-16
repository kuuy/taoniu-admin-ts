import { CompactEncrypt,importX509,importSPKI,importPKCS8,compactDecrypt } from 'jose'

import {jweConfig} from '~/src/config'

export const jwe = {
  async encrypt(payload: string): Promise<string> {
    const publicKey = await importSPKI(jweConfig.publicKey, "RSA-OAEP-256")
    return new CompactEncrypt(new TextEncoder().encode(payload))
      .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
      .encrypt(publicKey)
  },
  async decrypt(jweCompact: string): Promise<string> {
    const privateKey = await importPKCS8(jweConfig.privateKey, "RSA-OAEP-256")
    const { plaintext } = await compactDecrypt(jweCompact, privateKey)
    return new TextDecoder().decode(plaintext)
  }
}
