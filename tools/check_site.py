from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
PRODUCT_PAGES = ["top-asia.html", "khoi-thanh.html", "composite-frp.html", "ton-nhom.html"]
errors = []

class AuditParser(HTMLParser):
    def __init__(self, page):
        super().__init__()
        self.page = page
        self.h1 = 0
        self.title = 0
        self.canonical = 0
        self.refs = []
    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        if tag == "h1":
            self.h1 += 1
        if tag == "title":
            self.title += 1
        if tag == "link" and data.get("rel") == "canonical":
            self.canonical += 1
        if tag in {"a", "img", "script", "source", "link"}:
            key = "href" if tag in {"a", "link"} else "src"
            if data.get(key):
                self.refs.append(data[key])

for name in PRODUCT_PAGES:
    page = ROOT / name
    if not page.exists():
        errors.append(f"{name}: missing product page")
        continue
    parser = AuditParser(name)
    parser.feed(page.read_text(encoding="utf-8-sig"))
    if parser.h1 != 1:
        errors.append(f"{name}: expected exactly one H1, found {parser.h1}")
    if parser.title != 1:
        errors.append(f"{name}: expected exactly one title, found {parser.title}")
    if parser.canonical != 1:
        errors.append(f"{name}: expected exactly one canonical link, found {parser.canonical}")
    for ref in parser.refs:
        clean = urlsplit(ref).path
        if not clean or ref.startswith(("http://", "https://", "mailto:", "tel:", "data:", "#", "javascript:")):
            continue
        target = (ROOT / clean).resolve()
        try:
            target.relative_to(ROOT.resolve())
        except ValueError:
            errors.append(f"{name}: unsafe local reference {ref}")
            continue
        if not target.exists():
            errors.append(f"{name}: broken local reference {ref}")

if errors:
    print("\n".join(errors))
    raise SystemExit(1)
print("Site checks passed for four product pages.")
