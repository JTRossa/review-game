"""Build single-file offline copies (packs inlined) into dist/.
   python3 build.py                -> dist/BoxBlast_AllPacks.html (every pack in the manifest)
   python3 build.py gss-u2-population.js GSS_U2_BoxBlast_ReviewGame.html  -> one pack only
"""
import re, sys, pathlib
root = pathlib.Path(__file__).parent
packs = re.findall(r'"([^"]+\.js)"', (root/"packs/manifest.js").read_text(encoding="utf-8").split("];")[0])
if len(sys.argv) > 1: packs = [sys.argv[1]]
name = sys.argv[2] if len(sys.argv) > 2 else "BoxBlast_AllPacks.html"
html = (root/"index.html").read_text(encoding="utf-8")
inline = "\n".join("<script>\n" + (root/"packs"/f).read_text(encoding="utf-8") + "\n</script>" for f in packs)
html = html.replace('<script src="packs/manifest.js"></script>', inline)
(root/"dist").mkdir(exist_ok=True); (root/"dist"/name).write_text(html, encoding="utf-8"); print("dist/" + name, packs)
