// Serves the static site on the main domain and 301-redirects every other host
// (mrbestcars.com, www.*, *.workers.dev) and plain http to https://mrbestcars.ca,
// keeping path and query.
const PRIMARY = 'mrbestcars.ca';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname !== PRIMARY || url.protocol !== 'https:') {
      url.protocol = 'https:';
      url.hostname = PRIMARY;
      url.port = '';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
