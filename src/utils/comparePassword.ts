import bcrypt from 'bcryptjs';

export default async function comparePassword(passwordPlain: string, passwordEncrypted: string): Promise<boolean> {
  const isMatched = await bcrypt.compare(passwordPlain, passwordEncrypted);
  return isMatched;
}
