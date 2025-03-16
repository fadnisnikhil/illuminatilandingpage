import { drizzle } from 'drizzle-orm/d1';
import * as schemaImport from '../../drizzle/schema';
import { eq, like, or, and } from 'drizzle-orm';

// Define global DATABASE type for Cloudflare environment
declare global {
  var DATABASE: any;
}

// Re-export schema
export const schema = schemaImport;

// For compatibility with serverless environments
let _db: any = null;

// Create or get DB instance
export function getDb(env?: any) {
  if (_db) return _db;
  
  // If env is provided, use that
  if (env?.DATABASE) {
    _db = drizzle(env.DATABASE, { schema: schemaImport });
    return _db;
  }
  
  // Try global DATABASE if available
  try {
    if (globalThis.DATABASE) {
      _db = drizzle(globalThis.DATABASE, { schema: schemaImport });
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
  return drizzle(env.DATABASE, { schema: schemaImport });
};

// Subscribe to newsletter
export async function subscribeToNewsletter(env: any, email: string, source: string) {
  const db = drizzle(env.DATABASE, { schema: schemaImport });
  
  try {
    await db.insert(schemaImport.newsletterSubscribers).values({
      email,
      source,
      createdAt: Date.now(),
    });
    return { success: true };
  } catch (error) {
    // Handle duplicate email error
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      return { success: true, alreadySubscribed: true };
    }
    throw error;
  }
} 