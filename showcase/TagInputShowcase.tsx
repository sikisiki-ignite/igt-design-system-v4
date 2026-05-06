import { useState } from 'react'
import { TagInput } from '../src/components/TagInput/TagInput'

export function TagInputShowcase() {
  const [tags1, setTags1] = useState<string[]>([])
  const [tags2, setTags2] = useState<string[]>(['React', 'TypeScript', 'CSS'])
  const [tagsSm, setTagsSm] = useState<string[]>(['sm', 'tag'])
  const [tagsMd, setTagsMd] = useState<string[]>(['md', 'tag'])
  const [tagsLg, setTagsLg] = useState<string[]>(['lg', 'tag'])
  const [tagsHint, setTagsHint] = useState<string[]>([])
  const [tagsError, setTagsError] = useState<string[]>(['잘못된값'])
  const [tagsDisabled] = useState<string[]>(['비활성', '태그'])

  return (
    <section>
      <h2>TagInput</h2>
      <p style={{ color: 'var(--sys-content-neutral-muted)', marginBottom: 24 }}>
        텍스트 입력 후 Enter 또는 쉼표로 태그 생성. Backspace로 마지막 태그 삭제.
      </p>

      {/* ── 기본 ── */}
      <h3>기본</h3>
      <div style={{ display: 'flex', gap: 24, maxWidth: 800 }}>
        <TagInput
          label="키워드"
          placeholder="입력 후 Enter"
          tags={tags1}
          onChange={setTags1}
        />
        <TagInput
          label="기본값 있음"
          placeholder="입력 후 Enter"
          tags={tags2}
          onChange={setTags2}
        />
      </div>

      {/* ── Size ── */}
      <h3 style={{ marginTop: 40 }}>SIZE</h3>
      <div style={{ display: 'flex', gap: 24, maxWidth: 1000 }}>
        <TagInput size="sm" tags={tagsSm} onChange={setTagsSm} placeholder="Enter 또는 쉼표로 추가" />
        <TagInput size="md" tags={tagsMd} onChange={setTagsMd} placeholder="Enter 또는 쉼표로 추가" />
        <TagInput size="lg" tags={tagsLg} onChange={setTagsLg} placeholder="Enter 또는 쉼표로 추가" />
      </div>

      {/* ── Hint / Error / Disabled / MaxTags ── */}
      <h3 style={{ marginTop: 40, textTransform: 'uppercase', fontSize: 11, color: '#999', letterSpacing: '0.05em' }}>
        Hint / Error / Disabled / MaxTags
      </h3>
      <div style={{ display: 'flex', gap: 24, maxWidth: 1000, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px' }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>hint</p>
          <TagInput
            tags={tagsHint}
            onChange={setTagsHint}
            placeholder="Enter 또는 쉼표로 추가"
            maxTags={5}
            message="최대 5개까지 입력 가능합니다."
          />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>error</p>
          <TagInput
            tags={tagsError}
            onChange={setTagsError}
            invalid
            message="허용되지 않는 태그가 포함되어 있습니다."
          />
        </div>
        <div style={{ flex: '1 1 200px' }}>
          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>disabled</p>
          <TagInput
            tags={tagsDisabled}
            onChange={() => {}}
            disabled
          />
        </div>
      </div>
    </section>
  )
}
