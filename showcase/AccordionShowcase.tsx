import React from 'react';
import { Accordion, AccordionItem } from '../src/components/Accordion/Accordion';

function InfoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9v5M10 7h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const items = [
  { title: '알림이 오지 않을 때는 어떻게 하나요?', content: '설정 > 알림 > 허용으로 변경하시면 알림을 받을 수 있습니다.' },
  { title: '비밀번호를 잊어버렸어요', content: '로그인 화면 하단의 "비밀번호 찾기" 버튼을 통해 이메일로 재설정 링크를 받으세요.' },
  { title: '결제 수단을 변경하고 싶어요', content: '내 계정 > 결제 수단 관리에서 신규 카드를 추가하거나 기존 카드를 삭제할 수 있습니다.' },
];

export function AccordionShowcase() {
  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 48 }}>
      <h2 style={{ margin: 0 }}>Accordion</h2>

      <section>
        <h3>Variation — plain</h3>
        <div style={{ maxWidth: 480 }}>
          <Accordion variation="plain">
            {items.map((item) => (
              <AccordionItem key={item.title} title={item.title}>
                {item.content}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section>
        <h3>Variation — contained</h3>
        <div style={{ maxWidth: 480 }}>
          <Accordion variation="contained">
            {items.map((item, i) => (
              <AccordionItem key={item.title} title={item.title} defaultExpanded={i === 0}>
                {item.content}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section>
        <h3>With Leading Icon</h3>
        <div style={{ maxWidth: 480 }}>
          <Accordion variation="contained">
            {items.map((item) => (
              <AccordionItem key={item.title} title={item.title} leadingIcon={<InfoIcon />}>
                {item.content}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section>
        <h3>Size × Variation</h3>
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <div key={size} style={{ flex: 1, minWidth: 240 }}>
              <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600 }}>{size}</p>
              <Accordion size={size} variation="plain">
                <AccordionItem title="질문 제목">{size} 크기의 아코디언 내용입니다.</AccordionItem>
                <AccordionItem title="다른 질문" defaultExpanded>두 번째 아이템 내용.</AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3>Disabled</h3>
        <div style={{ maxWidth: 480 }}>
          <Accordion>
            <AccordionItem title="활성 아이템">이 아이템은 펼칠 수 있습니다.</AccordionItem>
            <AccordionItem title="비활성 아이템" disabled>비활성 상태입니다.</AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
