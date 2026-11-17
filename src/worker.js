// Serves the static site on the main domain and 301-redirects every other host
// (mrbestcars.com, www.*, *.workers.dev) and plain http to https://mrbestcars.ca,
// keeping path and query.
//
// /demo/* is the review copy of the redesign (static export of ../demo). It is
// kept out of search engines and gets the demo's own 404 page.
const PRIMARY = 'mrbestcars.ca';
const DEMO = '/demo';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname !== PRIMARY || url.protocol !== 'https:') {
      url.protocol = 'https:';
      url.hostname = PRIMARY;
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }

    const isDemo = url.pathname === DEMO || url.pathname.startsWith(DEMO + '/');
    if (!isDemo) return env.ASSETS.fetch(request);

    let res = await env.ASSETS.fetch(request);
    if (res.status === 404) {
      const notFound = await env.ASSETS.fetch(new Request(new URL(DEMO + '/404', url), request));
      res = new Response(notFound.body, { status: 404, headers: notFound.headers });
    }
    const headers = new Headers(res.headers);
    headers.set('X-Robots-Tag', 'noindex, nofollow');
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  },
};
