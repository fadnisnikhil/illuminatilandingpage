import { NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/lib/db';

export const runtime = 'edge';

// Define the expected request data type
type NewsletterData = {
  email: string;
  source?: string;
};

export async function POST(request: Request) {
  try {
    // Parse and type-cast the data
    const data = await request.json() as NewsletterData;
    
    // Basic validation
    if (!data.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Subscribe to newsletter
    const result = await subscribeToNewsletter(process.env, data.email, data.source || 'website');
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
} 