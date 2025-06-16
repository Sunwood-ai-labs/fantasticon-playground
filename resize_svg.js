const fs = require('fs');
const path = require('path');

/**
 * SVGファイルを安全にリサイズするスクリプト
 * 元ファイルを壊さず、シンプルな方法でリサイズ
 */

const inputDir = 'src/font/raw';
const outputDir = 'src/font/svg';
const targetSize = 2000;

function analyzeSVG(filePath) {
  try {
    console.log(`📄 SVGファイル分析: ${filePath}\n`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    
    // ファイルサイズ
    console.log(`ファイルサイズ: ${content.length} bytes`);
    
    // SVGタグの抽出
    const svgTagMatch = content.match(/<svg[^>]*>/i);
    if (svgTagMatch) {
      console.log(`SVGタグ: ${svgTagMatch[0]}`);
    }
    
    // 現在の寸法を取得
    const viewBoxMatch = content.match(/viewBox\s*=\s*["']([^"']+)["']/i);
    const widthMatch = content.match(/width\s*=\s*["']?([^"'\s>]+)["']?/i);
    const heightMatch = content.match(/height\s*=\s*["']?([^"'\s>]+)["']?/i);
    
    if (viewBoxMatch) {
      console.log(`viewBox: ${viewBoxMatch[1]}`);
    }
    if (widthMatch) {
      console.log(`width: ${widthMatch[1]}`);
    }
    if (heightMatch) {
      console.log(`height: ${heightMatch[1]}`);
    }
    
    // 主要な要素をカウント
    const pathCount = (content.match(/<path/gi) || []).length;
    const circleCount = (content.match(/<circle/gi) || []).length;
    const rectCount = (content.match(/<rect/gi) || []).length;
    const groupCount = (content.match(/<g/gi) || []).length;
    
    console.log(`\n📊 要素数:`);
    console.log(`- path: ${pathCount}`);
    console.log(`- circle: ${circleCount}`);
    console.log(`- rect: ${rectCount}`);
    console.log(`- group: ${groupCount}`);
    
    return {
      content,
      viewBox: viewBoxMatch ? viewBoxMatch[1] : null,
      width: widthMatch ? widthMatch[1] : null,
      height: heightMatch ? heightMatch[1] : null
    };
    
  } catch (error) {
    console.error(`❌ ファイル読み込みエラー: ${error.message}`);
    return null;
  }
}

function safeResizeSVG(inputPath, outputPath, maxSize) {
  try {
    console.log(`🔧 安全リサイズ開始...\n`);
    
    // まず分析
    const analysis = analyzeSVG(inputPath);
    if (!analysis) return false;
    
    const { content, viewBox, width, height } = analysis;
    
    // 現在のサイズを取得
    let currentWidth, currentHeight;
    
    if (viewBox) {
      const values = viewBox.split(/\s+/).map(Number);
      if (values.length >= 4) {
        currentWidth = values[2] - values[0];
        currentHeight = values[3] - values[1];
      }
    } else if (width && height) {
      currentWidth = parseFloat(width);
      currentHeight = parseFloat(height);
    } else {
      throw new Error('SVGのサイズを決定できません');
    }
    
    console.log(`\n📏 現在のサイズ: ${currentWidth} x ${currentHeight}`);
    
    // 新しいサイズを計算
    const maxCurrentSize = Math.max(currentWidth, currentHeight);
    const scaleFactor = maxSize / maxCurrentSize;
    const newWidth = Math.round(currentWidth * scaleFactor);
    const newHeight = Math.round(currentHeight * scaleFactor);
    
    console.log(`📏 新しいサイズ: ${newWidth} x ${newHeight}`);
    console.log(`🔢 スケール倍率: ${scaleFactor.toFixed(3)}`);
    
    // 新しいSVGを作成（ラッパー方式 - 安全）
    const newSVG = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${newWidth}" height="${newHeight}" viewBox="0 0 ${newWidth} ${newHeight}" xmlns="http://www.w3.org/2000/svg">
  <g transform="scale(${scaleFactor})">
    ${content.replace(/<\?xml[^>]*\?>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
  </g>
</svg>`;
    
    // 出力ディレクトリを作成
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // ファイルを保存
    fs.writeFileSync(outputPath, newSVG, 'utf8');
    return true;
  } catch (error) {
    console.error(`❌ リサイズエラー: ${error.message}`);
    return false;
  }
}

// メイン処理
function resizeAllSVGs() {
  if (!fs.existsSync(inputDir)) {
    console.error(`❌ 入力ディレクトリが存在しません: ${inputDir}`);
    return;
  }
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.svg'));
  if (files.length === 0) {
    console.log('SVGファイルが見つかりません。');
    return;
  }
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    console.log(`\n=== ${file} ===`);
    safeResizeSVG(inputPath, outputPath, targetSize);
  });
  console.log('\n✅ すべてのSVGのリサイズが完了しました。');
}

if (require.main === module) {
  // コマンドライン引数で個別ファイル指定があればそれを処理
  if (process.argv.length === 4) {
    const inputPath = process.argv[2];
    const outputPath = process.argv[3];
    safeResizeSVG(inputPath, outputPath, targetSize);
  } else {
    resizeAllSVGs();
  }
}
    