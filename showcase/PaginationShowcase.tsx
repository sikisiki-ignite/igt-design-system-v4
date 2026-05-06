import { useState } from 'react'
import { Pagination } from '../src/components/Pagination/Pagination'

export function PaginationShowcase() {
  const [page1, setPage1] = useState(1)
  const [page2, setPage2] = useState(5)
  const [page3, setPage3] = useState(3)

  return (
    <section>
      <h2>Pagination</h2>

      <h3>Variant: default / Size: md</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p style={{ fontSize: 12, marginBottom: 8 }}>Page {page1} / 10</p>
          <Pagination page={page1} total={10} onChange={setPage1} variant="default" size="md" />
        </div>
      </div>

      <h3>Variant: default / Size: sm</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p style={{ fontSize: 12, marginBottom: 8 }}>Page {page2} / 20</p>
          <Pagination page={page2} total={20} onChange={setPage2} variant="default" size="sm" />
        </div>
      </div>

      <h3>Variant: minimal</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <p style={{ fontSize: 12, marginBottom: 8 }}>Page {page3} / 10</p>
          <Pagination page={page3} total={10} onChange={setPage3} variant="minimal" size="md" />
        </div>
        <Pagination page={page3} total={10} onChange={setPage3} variant="minimal" size="sm" />
      </div>

      <h3>Edge cases</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <p style={{ fontSize: 12, marginBottom: 4 }}>First page</p>
          <Pagination page={1} total={10} onChange={() => {}} />
        </div>
        <div>
          <p style={{ fontSize: 12, marginBottom: 4 }}>Last page</p>
          <Pagination page={10} total={10} onChange={() => {}} />
        </div>
        <div>
          <p style={{ fontSize: 12, marginBottom: 4 }}>Total=1</p>
          <Pagination page={1} total={1} onChange={() => {}} />
        </div>
        <div>
          <p style={{ fontSize: 12, marginBottom: 4 }}>SiblingCount=2</p>
          <Pagination page={7} total={20} onChange={() => {}} siblingCount={2} />
        </div>
      </div>
    </section>
  )
}
