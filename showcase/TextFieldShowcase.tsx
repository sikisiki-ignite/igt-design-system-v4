import { useState } from 'react'
import { TextField } from '../src/components/TextField/TextField'

export function TextFieldShowcase() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const validateEmail = (v: string) => {
    setEmail(v)
    setEmailError(v && !v.includes('@') ? '올바른 이메일 형식이 아닙니다' : '')
  }

  return (
    <section>
      <h2>TextField</h2>

      {/* ── Appearance × Size ── */}
      <h3>Appearance × Size</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400 }}>
        {(['outline', 'fill'] as const).map(appearance => (
          <div key={appearance}>
            <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', marginBottom: 12 }}>appearance={appearance}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(['sm', 'md', 'lg'] as const).map(size => (
                <TextField
                  key={size}
                  appearance={appearance}
                  size={size}
                  label={`size=${size}`}
                  placeholder="입력하세요"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── States ── */}
      <h3 style={{ marginTop: 40 }}>States</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
        <TextField label="Normal" placeholder="입력하세요" message="도움말 텍스트" />
        <TextField label="Invalid" placeholder="입력하세요" invalid message="오류 메시지입니다" />
        <TextField label="Disabled" placeholder="입력하세요" message="비활성 상태" disabled />
        <TextField label="ReadOnly" value="읽기 전용 값" readOnly />
      </div>

      {/* ── Indicator ── */}
      <h3 style={{ marginTop: 32 }}>Label Indicator</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
        <TextField label="필수 항목" indicator="required" placeholder="입력하세요" />
        <TextField label="선택 항목" indicator="optional" placeholder="입력하세요" />
      </div>

      {/* ── With icons / prefix / suffix ── */}
      <h3 style={{ marginTop: 32 }}>With Icons & Prefix/Suffix</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
        <TextField label="검색" placeholder="검색어 입력" leadingIcon="searchOutline2dp" />
        <TextField label="가격" placeholder="0" prefixText="₩" />
        <TextField label="도메인" placeholder="username" suffixText="@example.com" />
        <TextField label="링크" placeholder="주소" leadingIcon="linkOutline1dp" suffixText=".com" />
      </div>

      {/* ── Interactive ── */}
      <h3 style={{ marginTop: 40 }}>Interactive</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <TextField
          label="이름"
          indicator="required"
          placeholder="성과 이름을 입력하세요"
          value={name}
          onChange={e => setName(e.target.value)}
          message={name ? undefined : '이름을 입력해 주세요'}
        />
        <TextField
          label="이메일"
          indicator="required"
          placeholder="example@email.com"
          value={email}
          onChange={e => validateEmail(e.target.value)}
          invalid={!!emailError}
          message={emailError || '알림을 받을 이메일 주소'}
        />
      </div>

      {/* ── Real-world: 회원가입 폼 ── */}
      <h3 style={{ marginTop: 40 }}>실사용 예시 — 회원가입 폼</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 480 }}>
        <TextField label="이름" indicator="required" placeholder="홍길동" size="lg" />
        <TextField label="이메일" indicator="required" placeholder="name@example.com" size="lg" leadingIcon="mailOutline2dp" />
        <TextField label="비밀번호" indicator="required" placeholder="8자 이상 입력" size="lg" type="password" message="영문, 숫자, 특수문자 포함 8자 이상" />
        <TextField label="회사명" indicator="optional" placeholder="소속 회사 또는 기관" size="lg" />
      </div>
    </section>
  )
}
