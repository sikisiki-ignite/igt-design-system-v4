import { Popover, PopoverSection, PopoverHeader, PopoverBody } from '../src/components/Popover/Popover'
import { Button } from '../src/components/Button/Button'

export function PopoverShowcase() {
  return (
    <section>
      <h2>Popover</h2>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', padding: '40px 0' }}>

        {/* surface / 단일 섹션 */}
        <div>
          <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>surface — 단일 섹션</p>
          <Popover
            emphasis="surface"
            placement="bottom"
            content={
              <PopoverSection>
                <PopoverHeader>알림 안내</PopoverHeader>
                <PopoverBody>
                  일부 알림은 지연되어 도착할 수 있어요.<br />
                  설정에서 언제든지 끌 수 있어요.
                </PopoverBody>
              </PopoverSection>
            }
          >
            <Button tone="secondary" appearance="outline" size="sm">surface 팝오버</Button>
          </Popover>
        </div>

        {/* surface / 멀티 섹션 */}
        <div>
          <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>surface — 멀티 섹션 (section gap: 20px)</p>
          <Popover
            emphasis="surface"
            placement="bottom"
            content={
              <>
                <PopoverSection>
                  <PopoverHeader>알림 안내</PopoverHeader>
                  <PopoverBody>
                    일부 알림은 지연되어 도착할 수 있어요.<br />
                    동일한 알림이 반복해서 표시될 수 있어요.
                  </PopoverBody>
                </PopoverSection>
                <PopoverSection>
                  <PopoverHeader>기능 사용 가이드</PopoverHeader>
                  <PopoverBody>
                    필요한 항목을 선택해 작업을 진행할 수 있어요.<br />
                    일부 작업은 되돌릴 수 없으니 주의해 주세요.
                  </PopoverBody>
                </PopoverSection>
              </>
            }
          >
            <Button tone="secondary" appearance="outline" size="sm">멀티 섹션</Button>
          </Popover>
        </div>

        {/* inverse / 단일 섹션 */}
        <div>
          <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>inverse — 단일 섹션</p>
          <Popover
            emphasis="inverse"
            placement="top"
            content={
              <PopoverSection>
                <PopoverHeader>알림 안내</PopoverHeader>
                <PopoverBody>
                  일부 알림은 지연되어 도착할 수 있어요.<br />
                  설정에서 언제든지 끌 수 있어요.
                </PopoverBody>
              </PopoverSection>
            }
          >
            <Button tone="secondary" appearance="outline" size="sm">inverse 팝오버</Button>
          </Popover>
        </div>

        {/* inverse / 멀티 섹션 */}
        <div>
          <p style={{ marginBottom: 8, fontSize: 12, color: '#666' }}>inverse — 멀티 섹션</p>
          <Popover
            emphasis="inverse"
            placement="top"
            content={
              <>
                <PopoverSection>
                  <PopoverHeader>알림 안내</PopoverHeader>
                  <PopoverBody>
                    일부 알림은 지연되어 도착할 수 있어요.
                  </PopoverBody>
                </PopoverSection>
                <PopoverSection>
                  <PopoverHeader>기능 사용 가이드</PopoverHeader>
                  <PopoverBody>
                    필요한 항목을 선택해 작업을 진행할 수 있어요.
                  </PopoverBody>
                </PopoverSection>
              </>
            }
          >
            <Button tone="secondary" appearance="outline" size="sm">inverse 멀티</Button>
          </Popover>
        </div>

      </div>
    </section>
  )
}
