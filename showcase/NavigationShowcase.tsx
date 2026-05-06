import { Navigation, NavItem } from '../src/components/Navigation/Navigation'
import { Button } from '../src/components/Button/Button'

// Navigation is a full-width component — escape the 48px showcase padding
const fullWidth: React.CSSProperties = { margin: '0 -48px' }
const infoText: React.CSSProperties = {
  fontSize: 12,
  color: 'var(--sys-content-neutral-muted)',
  margin: '4px 0 16px',
}

const LOGO_SM = (
  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--sys-fg-brand-primary)' }}>IGT</div>
)
const LOGO_MD = (
  <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--sys-fg-brand-primary)' }}>IGT</div>
)

export function NavigationShowcase() {
  return (
    <section>
      <h2>Navigation (TopNavigation)</h2>

      <h3>Size: sm (default) — layoutMode: full</h3>
      <p style={infoText}>full: content width 제한 없음 (full-bleed)</p>
      <div style={fullWidth}>
        <Navigation
          size="sm"
          layoutMode="full"
          logo={LOGO_SM}
          navItems={
            <>
              <NavItem label="홈" href="#" current />
              <NavItem label="서비스" href="#" />
              <NavItem label="가격" href="#" />
              <NavItem label="고객지원" href="#" />
            </>
          }
          trailing={<Button size="sm">로그인</Button>}
        />
      </div>

      <h3>Size: sm — layoutMode: wide</h3>
      <p style={infoText}>wide: content max-width 1440px — 뷰포트가 1440px 초과 시 양쪽 여백 생김</p>
      <div style={fullWidth}>
        <Navigation
          size="sm"
          layoutMode="wide"
          logo={LOGO_SM}
          navItems={
            <>
              <NavItem label="홈" href="#" current />
              <NavItem label="서비스" href="#" />
              <NavItem label="가격" href="#" />
              <NavItem label="고객지원" href="#" />
            </>
          }
          trailing={<Button size="sm">로그인</Button>}
        />
      </div>

      <h3>Size: sm — layoutMode: narrow</h3>
      <p style={infoText}>narrow: content max-width 1100px — 뷰포트가 1100px 초과 시 양쪽 여백 생김</p>
      <div style={fullWidth}>
        <Navigation
          size="sm"
          layoutMode="narrow"
          logo={LOGO_SM}
          navItems={
            <>
              <NavItem label="홈" href="#" current />
              <NavItem label="서비스" href="#" />
              <NavItem label="가격" href="#" />
            </>
          }
          trailing={<Button size="sm">로그인</Button>}
        />
      </div>

      <h3>Size: md</h3>
      <div style={fullWidth}>
        <Navigation
          size="md"
          layoutMode="full"
          logo={LOGO_MD}
          navItems={
            <>
              <NavItem label="홈" href="#" current />
              <NavItem label="서비스" href="#" />
              <NavItem label="가격" href="#" />
            </>
          }
          trailing={<Button size="sm">로그인</Button>}
        />
      </div>

      <h3>Scrolled (with shadow)</h3>
      <div style={fullWidth}>
        <Navigation
          size="sm"
          layoutMode="full"
          scrolled
          logo={LOGO_SM}
          navItems={
            <>
              <NavItem label="홈" href="#" current />
              <NavItem label="서비스" href="#" />
            </>
          }
          trailing={<Button size="sm" appearance="outline">로그인</Button>}
        />
      </div>

      <h3>Logo only</h3>
      <div style={fullWidth}>
        <Navigation
          size="sm"
          layoutMode="full"
          logo={LOGO_SM}
        />
      </div>
    </section>
  )
}
