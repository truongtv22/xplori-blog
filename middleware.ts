import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

function getClientIp(req: NextRequest) {
  let ip = req.ip ?? req.headers.get('x-real-ip');
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (!ip && forwardedFor) {
    ip = forwardedFor.split(',')[0];
  }
  return ip;
}

async function getIpInfo(ip: string) {
  try {
    const response = await fetch(`https://ipinfo.io${ip ? `/${ip}` : ''}/json?token=4396f3f950ef3e`);
    return await response.json();
  } catch (error) {
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const defaultLocale = 'en';

  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }
  if (req.nextUrl.locale === defaultLocale) {
    const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
    if (cookieLocale) {
      if (cookieLocale !== defaultLocale) {
        url.pathname = `/${cookieLocale}${req.nextUrl.pathname}`;
        return NextResponse.redirect(url);
      }
    } else {
      const ip = getClientIp(req);
      const ipInfo = await getIpInfo(ip);
      if (ipInfo && ipInfo.country) {
        const country = ipInfo.country.toLowerCase();
        if (country === 'vn') {
          const nextLocale = 'vi';
          url.pathname = `/${nextLocale}${req.nextUrl.pathname}`;
          const res = NextResponse.redirect(url);
          res.cookies.set('NEXT_LOCALE', nextLocale, { maxAge: 60 * 60 * 24 * 7 });
          return res;
        } else {
          const res = NextResponse.next();
          res.cookies.set('NEXT_LOCALE', defaultLocale, { maxAge: 60 * 60 * 24 * 7 });
          return res;
        }
      }
    }
  }
}
