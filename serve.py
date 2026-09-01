#!/usr/bin/env python3
"""
Local dev server that mimics GitHub Pages' extensionless-URL behaviour:
a request for /foo is served from foo.html if foo.html exists and there's
no exact match for /foo itself. Needed because Python's plain
`python3 -m http.server` does NOT do this fallback, so it 404s on every
clean link now that .html has been stripped from all the site's hrefs,
even though the real GitHub Pages / rowandixon.com deployment serves
those URLs fine.

Usage:  python3 serve.py [port]   (default port 8000)
Then open http://localhost:8000/
"""
import sys
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class CleanUrlHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        full = super().translate_path(path)
        if os.path.exists(full):
            return full
        if not path.endswith("/") and "." not in os.path.basename(path):
            candidate = full + ".html"
            if os.path.exists(candidate):
                return candidate
        return full


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    server = ThreadingHTTPServer(("127.0.0.1", port), CleanUrlHandler)
    print(f"Serving {os.getcwd()} at http://localhost:{port}/  (Ctrl+C to stop)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
