/**
 * 渲染 JSON-LD 结构化数据（支持对象或数组）。
 * 置于 <body> 内即可被 Google 等爬虫识别。
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
