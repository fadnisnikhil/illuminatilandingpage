import { drizzle } from 'drizzle-orm/d1';
import { migrate } from 'drizzle-orm/d1/migrator';
import { D1Database } from '@cloudflare/workers-types';

// This file will be used to run database migrations
export default {
  async fetch(request: Request, env: { DATABASE: D1Database }) {
    // Initialize the Drizzle client
    const db = drizzle(env.DATABASE);
    
    // Run migrations
    try {
      await migrate(db, { migrationsFolder: 'drizzle/migrations' });
      return new Response('Migrations completed successfully', { status: 200 });
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown migration error';
      
      return new Response(`Migration failed: ${errorMessage}`, { status: 500 });
    }
  }
}; 