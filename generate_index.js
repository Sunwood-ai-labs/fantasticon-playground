const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const assetsDir = path.join(distDir, 'assets');
const indexPath = path.join(distDir, 'index.html');

// icons.htmlを探す
function findIconsHtml(dir) {
  const result = [];
  const subdirs = fs.readdirSync(dir, { withFileTypes: true })
    .filter(d => d.isDirectory());
  for (const subdir of subdirs) {
    const fontDir = path.join(dir, subdir.name, 'font');
    const iconsHtml = path.join(fontDir, 'icons.html');
    if (fs.existsSync(iconsHtml)) {
      result.push({
        name: subdir.name,
        relPath: path.relative(distDir, iconsHtml)
      });
    }
  }
  return result;
}

const links = findIconsHtml(assetsDir);

// Fantasticonデモ風のシンプルなレイアウト
const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>Font Icon Demo Index</title>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    body { font-family: system-ui, sans-serif; background: #f8f8f8; margin: 0; }
    .container { max-width: 600px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0001; padding: 32px 24px; }
    h1 { text-align: center; color: #333; margin-bottom: 32px; }
    ul { list-style: none; padding: 0; }
    li { margin: 18px 0; }
    a { display: block; font-size: 1.2em; color: #1976d2; text-decoration: none; border-bottom: 1px solid #eee; padding: 12px 0; border-radius: 4px; transition: background 0.2s; background: #f5faff; }
    a:hover { background: #e3f2fd; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Font Icon Demo Index</h1>
    <ul>
      ${links.map(link => `<li><a href="./${link.relPath}">${link.name}</a></li>`).join('\n')}
    </ul>
  </div>
</body>
</html>
`;

fs.writeFileSync(indexPath, html, 'utf8');
console.log('index.html generated:', indexPath);