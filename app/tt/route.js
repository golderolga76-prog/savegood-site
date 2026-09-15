import { NextResponse } from 'next/server';

export function GET(request) {
  const url = new URL('/nashi-servisy', request.url);
  url.searchParams.set('utm_source', 'tiktok');
  url.searchParams.set('utm_medium', 'social');
  url.searchParams.set('utm_campaign', 'profile');
  return NextResponse.redirect(url);
}
