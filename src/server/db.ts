import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { createClient } from '@libsql/client';
import { drizzle as drizzleTurso } from 'drizzle-orm/libsql';

// Define global DATABASE type for Cloudflare environment
declare global {
  var DATABASE: any;
}

// For compatibility with serverless environments
let _db: any = null;

// Create or get DB instance
export function getDb(env?: any) {
  if (_db) return _db;
  
  // If env is provided, use that
  if (env?.DATABASE) {
    _db = drizzle(env.DATABASE, { schema });
    return _db;
  }
  
  // Try global DATABASE if available
  try {
    if (globalThis.DATABASE) {
      _db = drizzle(globalThis.DATABASE, { schema });
    }
  } catch (e) {
    console.log('DATABASE not available');
  }
  
  return _db;
}

// For compatibility with auth.ts import
export const db = getDb();

// For environments where DATABASE isn't available at import time
export const createDb = (env: any) => {
  return drizzle(env.DATABASE, { schema });
};

// Export schema for use elsewhere
export { schema, eq }; 