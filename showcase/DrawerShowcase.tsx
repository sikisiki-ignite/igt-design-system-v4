import { useState } from 'react'
import { Drawer } from '../src/components/Drawer/Drawer'
import { Button } from '../src/components/Button/Button'

type DrawerCase =
  | 'right-full'
  | 'left-full'
  | 'right-no-footer'
  | 'right-no-header'
  | 'right-title-only'
  | 'size-lg'
  | 'footer-primary-inlineEnd'
  | 'footer-primary-stack'
  | 'footer-primary-between'
  | 'footer-neutral-inlineEnd'
  | 'footer-neutral-stack'
  | 'footer-neutral-between'
  | 'footer-danger-inlineEnd'
  | 'footer-danger-stack'
  | 'footer-danger-between'
  | null

const BODY = (
  <div>
    <p>드로어 본문 콘텐츠가 여기 들어갑니다.</p>
    <p style={{ color: 'var(--sys-content-neutral-muted)', fontSize: 14, marginTop: 8 }}>
      섹션 헤더나 폼 요소를 배치할 수 있어요.
    </p>
  </div>
)

export function DrawerShowcase() {
  const [open, setOpen] = useState<DrawerCase>(null)
  const close = () => setOpen(null)

  return (
    <section>
      <h2>Drawer</h2>

      {/* ── Placement ── */}
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sys-content-neutral-muted)', margin: '16px 0 8px' }}>Placement</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('right-full')}>Right — Full</Button>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('left-full')}>Left — Full</Button>
      </div>

      {/* ── Structure variants ── */}
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sys-content-neutral-muted)', margin: '16px 0 8px' }}>Structure</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('right-no-footer')}>No Footer</Button>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('right-no-header')}>No Header</Button>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('right-title-only')}>Title Only (No Desc)</Button>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('size-lg')}>Size lg (640px)</Button>
      </div>

      {/* ── Footer Variation × Layout (9 cases) ── */}
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sys-content-neutral-muted)', margin: '16px 0 8px' }}>Footer Variation × Layout</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('footer-primary-inlineEnd')}>primary / inlineEnd</Button>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('footer-primary-stack')}>primary / stack</Button>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('footer-primary-between')}>primary / between</Button>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('footer-neutral-inlineEnd')}>neutral / inlineEnd</Button>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('footer-neutral-stack')}>neutral / stack</Button>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('footer-neutral-between')}>neutral / between</Button>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('footer-danger-inlineEnd')}>danger / inlineEnd</Button>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('footer-danger-stack')}>danger / stack</Button>
        <Button tone="secondary" appearance="outline" onClick={() => setOpen('footer-danger-between')}>danger / between</Button>
      </div>

      {/* ── Placement ── */}
      <Drawer open={open === 'right-full'} onOpenChange={(o) => !o && close()} placement="right"
        title="설정" description="시스템 환경 설정을 변경합니다."
        primaryLabel="저장" onPrimary={close} secondaryLabel="취소" onSecondary={close}>
        {BODY}
      </Drawer>

      <Drawer open={open === 'left-full'} onOpenChange={(o) => !o && close()} placement="left"
        title="내비게이션" description="앱의 주요 메뉴에 접근할 수 있습니다."
        primaryLabel="확인" onPrimary={close} secondaryLabel="취소" onSecondary={close}>
        {BODY}
      </Drawer>

      {/* ── Structure ── */}
      <Drawer open={open === 'right-no-footer'} onOpenChange={(o) => !o && close()} placement="right"
        title="상세 정보" description="항목의 상세 내용을 확인합니다.">
        {BODY}
      </Drawer>

      <Drawer open={open === 'right-no-header'} onOpenChange={(o) => !o && close()} placement="right"
        primaryLabel="완료" onPrimary={close} secondaryLabel="취소" onSecondary={close}>
        {BODY}
      </Drawer>

      <Drawer open={open === 'right-title-only'} onOpenChange={(o) => !o && close()} placement="right"
        title="파일 업로드"
        primaryLabel="업로드" onPrimary={close} secondaryLabel="취소" onSecondary={close}>
        {BODY}
      </Drawer>

      <Drawer open={open === 'size-lg'} onOpenChange={(o) => !o && close()} placement="right"
        size="lg" title="대형 드로어" description="너비 640px 케이스입니다."
        primaryLabel="저장" onPrimary={close} secondaryLabel="취소" onSecondary={close}>
        {BODY}
      </Drawer>

      {/* ── Footer: primary ── */}
      <Drawer open={open === 'footer-primary-inlineEnd'} onOpenChange={(o) => !o && close()} placement="right"
        title="Primary / inlineEnd" description="Variation=primary, Layout=inlineEnd"
        footerVariation="primary" footerLayout="inlineEnd"
        primaryLabel="저장" onPrimary={close} secondaryLabel="취소" onSecondary={close}>
        {BODY}
      </Drawer>

      <Drawer open={open === 'footer-primary-stack'} onOpenChange={(o) => !o && close()} placement="right"
        title="Primary / stack" description="Variation=primary, Layout=stack"
        footerVariation="primary" footerLayout="stack"
        primaryLabel="저장" onPrimary={close} secondaryLabel="취소" onSecondary={close}>
        {BODY}
      </Drawer>

      <Drawer open={open === 'footer-primary-between'} onOpenChange={(o) => !o && close()} placement="right"
        title="Primary / between" description="Variation=primary, Layout=between — 왼쪽: 삭제(ghost/danger), 오른쪽: 취소+저장"
        footerVariation="primary" footerLayout="between"
        tertiaryLabel="삭제" onTertiary={close}
        secondaryLabel="취소" onSecondary={close}
        primaryLabel="저장" onPrimary={close}>
        {BODY}
      </Drawer>

      {/* ── Footer: neutral ── */}
      <Drawer open={open === 'footer-neutral-inlineEnd'} onOpenChange={(o) => !o && close()} placement="right"
        title="Neutral / inlineEnd" description="Variation=neutral, Layout=inlineEnd"
        footerVariation="neutral" footerLayout="inlineEnd"
        primaryLabel="확인" onPrimary={close} secondaryLabel="취소" onSecondary={close}>
        {BODY}
      </Drawer>

      <Drawer open={open === 'footer-neutral-stack'} onOpenChange={(o) => !o && close()} placement="right"
        title="Neutral / stack" description="Variation=neutral, Layout=stack"
        footerVariation="neutral" footerLayout="stack"
        primaryLabel="확인" onPrimary={close} secondaryLabel="취소" onSecondary={close}>
        {BODY}
      </Drawer>

      <Drawer open={open === 'footer-neutral-between'} onOpenChange={(o) => !o && close()} placement="right"
        title="Neutral / between" description="Variation=neutral, Layout=between — 왼쪽: 삭제(ghost/danger), 오른쪽: 취소+확인"
        footerVariation="neutral" footerLayout="between"
        tertiaryLabel="삭제" onTertiary={close}
        secondaryLabel="취소" onSecondary={close}
        primaryLabel="확인" onPrimary={close}>
        {BODY}
      </Drawer>

      {/* ── Footer: danger ── */}
      <Drawer open={open === 'footer-danger-inlineEnd'} onOpenChange={(o) => !o && close()} placement="right"
        title="Danger / inlineEnd" description="Variation=danger, Layout=inlineEnd"
        footerVariation="danger" footerLayout="inlineEnd"
        primaryLabel="삭제" onPrimary={close} secondaryLabel="취소" onSecondary={close}>
        {BODY}
      </Drawer>

      <Drawer open={open === 'footer-danger-stack'} onOpenChange={(o) => !o && close()} placement="right"
        title="Danger / stack" description="Variation=danger, Layout=stack"
        footerVariation="danger" footerLayout="stack"
        primaryLabel="삭제" onPrimary={close} secondaryLabel="취소" onSecondary={close}>
        {BODY}
      </Drawer>

      <Drawer open={open === 'footer-danger-between'} onOpenChange={(o) => !o && close()} placement="right"
        title="Danger / between" description="Variation=danger, Layout=between — 왼쪽: 삭제(ghost/danger), 오른쪽: 취소+삭제(red)"
        footerVariation="danger" footerLayout="between"
        tertiaryLabel="삭제" onTertiary={close}
        secondaryLabel="취소" onSecondary={close}
        primaryLabel="삭제" onPrimary={close}>
        {BODY}
      </Drawer>
    </section>
  )
}
