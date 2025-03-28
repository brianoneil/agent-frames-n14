import { NextResponse } from 'next/server';
import { serverConfig } from '@/config/server';

// Helper function to add delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Add a small delay to show loading state
    await delay(1000);

    // Call the external API
    const response = await fetch(serverConfig.api.endpoints.ideaCleanup, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': serverConfig.api.headers['api-key']
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('External API request failed');
    }

    // Get the markdown text from the response
    const markdownText = await response.text();
    
    // Return the markdown text in our expected format
    return NextResponse.json({
      output: markdownText,
      timestamp: new Date().toISOString(),
      message: "Successfully processed idea"
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 