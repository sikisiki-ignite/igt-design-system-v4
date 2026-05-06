import { Breadcrumb } from '../src/components/Breadcrumb/Breadcrumb'

const ITEMS_3 = [
  { label: '홈', href: '/' },
  { label: '제품', href: '/products' },
  { label: '상세' },
]

const ITEMS_5 = [
  { label: '홈', href: '/' },
  { label: '카테고리', href: '/category' },
  { label: '서브카테고리', href: '/category/sub' },
  { label: '제품', href: '/category/sub/product' },
  { label: '상세 페이지' },
]

export function BreadcrumbShowcase() {
  return (
    <section>
      <h2>Breadcrumb</h2>

      <h3>Separator variants</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Breadcrumb separator="chevron" items={ITEMS_3} />
        <Breadcrumb separator="slash" items={ITEMS_3} />
        <Breadcrumb separator="dot" items={ITEMS_3} />
      </div>

      <h3>Leading: home</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Breadcrumb separator="chevron" leading="home" items={ITEMS_3} />
        <Breadcrumb separator="slash" leading="home" items={ITEMS_3} />
        <Breadcrumb separator="dot" leading="home" items={ITEMS_3} />
      </div>

      <h3>Depth 5</h3>
      <Breadcrumb separator="chevron" items={ITEMS_5} />

      <h3>Depth 5 + home</h3>
      <Breadcrumb separator="chevron" leading="home" items={ITEMS_5} />

      <h3>Single item (current only)</h3>
      <Breadcrumb items={[{ label: '현재 페이지' }]} />
    </section>
  )
}
