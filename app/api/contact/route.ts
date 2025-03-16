import { NextResponse } from 'next/server';
import { submitContactForm } from '../../../lib/db';

export const runtime = 'edge';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
};

export async function POST(request: Request) {
  try {
    const data = await request.json() as ContactFormData;
    
    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Submit the form data to the database
    await submitContactForm(process.env, data);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
} 