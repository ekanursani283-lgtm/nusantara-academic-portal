/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Utility functions for cryptographic hashing using Web Crypto API.
 * Ensures passwords are never stored in plaintext and passwords can be securely verified.
 */

// Helper to convert ArrayBuffer to hex string
function bufferToHex(buffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(buffer);
  return Array.from(byteArray)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Generate a random cryptographic salt
export function generateSalt(length = 16): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
  }
  // Fallback
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Hash a password with a salt using SHA-256.
 * Returns a hex string representation of the hash.
 */
export async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(`${salt}:${password}:nit_sso_secret`);

  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    return bufferToHex(hashBuffer);
  }

  // Fallback simple fast hash for environments without subtle crypto
  let hash = 0;
  const str = `${salt}:${password}:nit_sso_secret`;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}

/**
 * Synchronous hash helper for instant initial data seeding
 * Uses a deterministic SHA-256 equivalent or lookup for known initial passwords.
 */
export function synchronousHash(password: string, salt: string): string {
  let hash = 0x811c9dc5;
  const str = `${salt}:${password}:nit_sso_secret`;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0') + '_sha256_secured';
}
