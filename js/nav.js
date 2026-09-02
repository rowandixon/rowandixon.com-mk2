/*
 * Shared top navigation bar for rowandixon.com.
 *
 * This is the single source of truth for the "Rowan Dixon / Portfolio /
 * Interests / About / Media" nav that appears on every page. Add, remove,
 * rename, or reorder a section by editing SECTIONS below -- every page
 * that includes this script picks up the change automatically.
 *
 * How a page uses this: put an empty mount point where the nav should
 * appear, then load this script right after it (no defer/async, so it
 * fills the nav in before the page paints):
 *
 *   <nav class="topbar" id="site-nav"></nav>
 *   <script src="js/nav.js"></script>
 *
 * The current section (and, for a project/interest sub-page, its parent
 * section) is highlighted automatically by reading the page's own URL --
 * no per-page setup needed. This does NOT run on index.html, which has
 * its own scroll-driven nav as part of the particle-mesh homepage.
 */
(function () {
  "use strict";

  var SECTIONS = [
    { label: "Portfolio", path: "portfolio", subpages: ["beat", "efd1", "blink", "roupell-l1", "s3", "dremel-fan", "tewke-tap"] },
    { label: "Interests", path: "interests", subpages: ["climbing", "mountaineering", "overlanding", "running", "skiing"] },
    { label: "About", path: "about", subpages: [] },
    { label: "Media", path: "media", subpages: [] }
  ];

  // Figure out which page we're on from the URL alone, so this works
  // whether it's served clean (GitHub Pages, serve.py) or opened directly
  // as a file (where the ".html" is still in the path).
  var here = location.pathname.split("/").pop().replace(/\.html$/i, "");

  var linksHtml = SECTIONS.map(function (s) {
    var isSelf = here === s.path;
    var isChild = s.subpages.indexOf(here) !== -1;
    if (isSelf) {
      return '<li><a href="#" aria-current="true">' + s.label + "</a></li>";
    }
    if (isChild) {
      return '<li><a href="' + s.path + '" aria-current="true">' + s.label + "</a></li>";
    }
    return '<li><a href="' + s.path + '">' + s.label + "</a></li>";
  }).join("\n    ");

  var html =
    '<a class="word" href="/">Rowan Dixon</a>\n' +
    '    <ul class="topbar-links">\n    ' + linksHtml + '\n    </ul>';

  var mount = document.getElementById("site-nav");
  if (mount) mount.innerHTML = html;
})();
