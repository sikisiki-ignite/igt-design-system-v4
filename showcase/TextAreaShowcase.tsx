import { useState } from 'react'
import { TextArea } from '../src/components/TextArea/TextArea'

export function TextAreaShowcase() {
  const [review, setReview] = useState('')
  const MAX = 300

  return (
    <section>
      <h2>TextArea</h2>

      {/* ── Appearance × Size ── */}
      <h3>Appearance × Size</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
        {(['outline', 'fill'] as const).map(appearance => (
          <div key={appearance}>
            <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', marginBottom: 12 }}>appearance={appearance}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(['md', 'lg'] as const).map(size => (
                <TextArea
                  key={size}
                  appearance={appearance}
                  size={size}
                  label={`size=${size}`}
                  placeholder="내용을 입력하세요"
                  rows={3}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── States ── */}
      <h3 style={{ marginTop: 40 }}>States</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
        <TextArea label="Normal" placeholder="내용을 입력하세요" message="최대 500자까지 입력 가능합니다" />
        <TextArea label="Invalid" placeholder="내용을 입력하세요" invalid message="필수 입력 항목입니다" />
        <TextArea label="Disabled" placeholder="내용을 입력하세요" disabled />
        <TextArea label="ReadOnly" value="읽기 전용 텍스트 내용입니다. 수정할 수 없습니다." readOnly />
      </div>

      {/* ── With indicator ── */}
      <h3 style={{ marginTop: 32 }}>Label Indicator</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
        <TextArea label="자기소개" indicator="required" placeholder="간단한 자기소개를 작성해 주세요" />
        <TextArea label="추가 의견" indicator="optional" placeholder="있다면 적어주세요" rows={3} />
      </div>

      {/* ── Character count ── */}
      <h3 style={{ marginTop: 32 }}>Character Count</h3>
      <div style={{ maxWidth: 480 }}>
        <TextArea
          label="리뷰"
          indicator="required"
          placeholder="상품에 대한 솔직한 리뷰를 남겨주세요"
          value={review}
          onChange={e => setReview(e.target.value)}
          maxLength={MAX}
          showCount
          rows={5}
          message={review.length > MAX * 0.9 ? `${MAX - review.length}자 남았습니다` : ''}
        />
      </div>

      {/* ── Real-world ── */}
      <h3 style={{ marginTop: 40 }}>실사용 예시 — 1:1 문의</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 560 }}>
        <TextArea
          label="문의 내용"
          indicator="required"
          placeholder="문의하실 내용을 자세히 입력해 주세요&#10;예) 주문 번호, 상품명, 발생한 문제 등"
          rows={6}
          maxLength={1000}
          showCount
          message="접수 후 영업일 기준 1-2일 이내에 답변 드립니다"
        />
        <TextArea
          label="첨부 메모"
          indicator="optional"
          placeholder="추가로 전달하실 내용이 있다면 입력해 주세요"
          rows={3}
          size="md"
          appearance="fill"
        />
      </div>
    </section>
  )
}
