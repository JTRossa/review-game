/* Box Blast pack manifest.
   To add a topic: put the pack file in this folder and add its file name to the list below.
   Packs appear in the setup menu grouped by their "subject" field, in this order. */
window.BOX_BLAST_MANIFEST = [
  "gss-u2-population.js"
];
(function () {
  var base = (document.currentScript && document.currentScript.src || "").replace(/manifest\.js.*$/, "");
  window.BOX_BLAST_MANIFEST.forEach(function (f) { document.write('<script src="' + base + f + '"><\/script>'); });
})();
