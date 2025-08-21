import { NextRequest } from 'next/server';

// Single Responsibility: Generate placeholder images for development
export async function GET(
  request: NextRequest,
  { params }: { params: { params: string[] } }
) {
  try {
    const [size, text] = params.params;
    const [width, height] = size.split('x').map(Number);
    
    // Validate dimensions
    if (!width || !height || width > 500 || height > 500) {
      return new Response('Invalid dimensions', { status: 400 });
    }

    // Create SVG placeholder
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${Math.min(width, height) / 4}" 
              fill="#9ca3af" text-anchor="middle" dy=".3em">
          ${text || `${width}x${height}`}
        </text>
      </svg>
    `;

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    return new Response('Error generating placeholder', { status: 500 });
  }
}
