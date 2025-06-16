#!/bin/bash
set -e

# 1. src/font/raw/配下の各サブフォルダを処理
RAW_DIR="src/font/raw"
SVG_DIR="src/font/svg"
DIST_DIR="dist/assets"

# SVG出力先ディレクトリを作成
mkdir -p "$SVG_DIR"

# resize_svg.jsで変換
find "$RAW_DIR" -type f -name "*.svg" | while read -r raw_svg; do
  # サブパスを取得（例: wa-animal-01/wa-boar_head.svg）
  subpath="${raw_svg#$RAW_DIR/}"
  out_svg="$SVG_DIR/$subpath"
  out_dir=$(dirname "$out_svg")
  mkdir -p "$out_dir"
  # resize_svg.jsを実行（入力: $raw_svg, 出力: $out_svg）
  node ./resize_svg.js "$raw_svg" "$out_svg"
done

# 2. src/font/svg/配下の各サブフォルダごとにfantasticonを実行
find "$SVG_DIR" -mindepth 1 -type d | while read -r svg_subdir; do
  # サブパス（例: wa-animal-01）
  subpath="${svg_subdir#$SVG_DIR/}"
  out_dir="$DIST_DIR/$subpath/font"
  mkdir -p "$out_dir"
  # fantasticonコマンドを実行
  npx fantasticon "$svg_subdir" -o "$out_dir"
done