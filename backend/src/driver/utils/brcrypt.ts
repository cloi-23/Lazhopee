import * as bcrypt from 'bcrypt'

export function encodePassword(rawPassword: string) {
  const SALT = bcrypt.genSalt()
  return bcrypt.hashSync(rawPassword, SALT)
}

export function comparePasswords(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash)
}