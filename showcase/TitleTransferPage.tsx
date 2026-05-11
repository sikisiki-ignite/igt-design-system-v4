/* Composition component | figma-spec: 6135:126884 | 2026-05-08 */
import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Button } from '../src/components/Button/Button'
import { Table } from '../src/components/Table/Table'
import type { TableColumn } from '../src/components/Table/Table'
import { Label } from '../src/components/Label/Label'
import { TextField } from '../src/components/TextField/TextField'
import { Select } from '../src/components/Select/Select'
import { Pagination } from '../src/components/Pagination/Pagination'
import { ChoiceChip, ChipGroup } from '../src/components/Chip/Chip'
import { ButtonGroup } from '../src/components/ButtonGroup/ButtonGroup'
import { Divider } from '../src/components/Divider/Divider'
import { Icon } from '../src/components/Icon/Icon'
import { DatePicker } from '../src/components/DatePicker/DatePicker'
import { SideNavigation } from '../src/components/SideNavigation/SideNavigation'
import type { SideNavItemData } from '../src/components/SideNavigation/SideNavigation'
import { Navigation, NavItem } from '../src/components/Navigation/Navigation'
import { Menu } from '../src/components/Menu/Menu'
import { MenuItem } from '../src/components/Menu/MenuItem'
import './TitleTransferPage.css'

type TransferStatus = '전체' | '접수' | '처리중' | '완료' | '반려'

type TitleTransferRequest = {
  id: string
  requestedAt: string
  applicant: string
  prevOwner: string
  nextOwner: string
  vehicleNumber: string
  vehicleModel: string
  status: Exclude<TransferStatus, '전체'>
  assignee: string
  processedAt: string
}

const MOCK_DATA: TitleTransferRequest[] = [
  { id: 'TT-2026-0001', requestedAt: '2026-05-07 09:12', applicant: '홍길동', prevOwner: '김철수', nextOwner: '홍길동', vehicleNumber: '123가 4567', vehicleModel: '현대 아반떼', status: '완료', assignee: '박민준', processedAt: '2026-05-07 14:30' },
  { id: 'TT-2026-0002', requestedAt: '2026-05-07 10:45', applicant: '이영희', prevOwner: '박철민', nextOwner: '이영희', vehicleNumber: '456나 7890', vehicleModel: '기아 K5', status: '처리중', assignee: '최지수', processedAt: '' },
  { id: 'TT-2026-0003', requestedAt: '2026-05-07 11:20', applicant: '박준혁', prevOwner: '이지훈', nextOwner: '박준혁', vehicleNumber: '789다 1234', vehicleModel: 'BMW 5시리즈', status: '접수', assignee: '', processedAt: '' },
  { id: 'TT-2026-0004', requestedAt: '2026-05-06 14:33', applicant: '김수연', prevOwner: '최민호', nextOwner: '김수연', vehicleNumber: '321라 5678', vehicleModel: '현대 소나타', status: '완료', assignee: '이준서', processedAt: '2026-05-07 09:15' },
  { id: 'TT-2026-0005', requestedAt: '2026-05-06 16:50', applicant: '정재혁', prevOwner: '강동훈', nextOwner: '정재혁', vehicleNumber: '654마 9012', vehicleModel: '쉐보레 말리부', status: '반려', assignee: '박민준', processedAt: '2026-05-06 18:00' },
  { id: 'TT-2026-0006', requestedAt: '2026-05-06 09:05', applicant: '윤서현', prevOwner: '임채원', nextOwner: '윤서현', vehicleNumber: '987바 3456', vehicleModel: '현대 그랜저', status: '완료', assignee: '최지수', processedAt: '2026-05-06 15:45' },
  { id: 'TT-2026-0007', requestedAt: '2026-05-05 13:22', applicant: '송민재', prevOwner: '오경민', nextOwner: '송민재', vehicleNumber: '147사 7890', vehicleModel: '기아 쏘렌토', status: '처리중', assignee: '이준서', processedAt: '' },
  { id: 'TT-2026-0008', requestedAt: '2026-05-05 10:11', applicant: '한소희', prevOwner: '장태민', nextOwner: '한소희', vehicleNumber: '258아 1234', vehicleModel: '토요타 캠리', status: '접수', assignee: '', processedAt: '' },
  { id: 'TT-2026-0009', requestedAt: '2026-05-04 16:30', applicant: '임동현', prevOwner: '신보람', nextOwner: '임동현', vehicleNumber: '369자 5678', vehicleModel: '현대 투싼', status: '완료', assignee: '박민준', processedAt: '2026-05-05 11:20' },
  { id: 'TT-2026-0010', requestedAt: '2026-05-04 11:55', applicant: '조예린', prevOwner: '권현철', nextOwner: '조예린', vehicleNumber: '741차 9012', vehicleModel: '기아 스포티지', status: '반려', assignee: '최지수', processedAt: '2026-05-04 17:00' },
  { id: 'TT-2026-0011', requestedAt: '2026-05-03 14:20', applicant: '강민성', prevOwner: '류재원', nextOwner: '강민성', vehicleNumber: '852카 3456', vehicleModel: '르노 SM6', status: '완료', assignee: '이준서', processedAt: '2026-05-04 10:30' },
  { id: 'TT-2026-0012', requestedAt: '2026-05-03 09:40', applicant: '신유진', prevOwner: '문성훈', nextOwner: '신유진', vehicleNumber: '963타 7890', vehicleModel: '현대 팰리세이드', status: '처리중', assignee: '박민준', processedAt: '' },
]

const STATUS_FILTERS: TransferStatus[] = ['전체', '접수', '처리중', '완료', '반려']

const STATUS_COLOR: Record<Exclude<TransferStatus, '전체'>, 'blue' | 'yellow' | 'green' | 'red'> = {
  접수: 'blue',
  처리중: 'yellow',
  완료: 'green',
  반려: 'red',
}

const TRANSFER_TYPE_OPTIONS = [
  { value: '명의이전', label: '명의이전' },
  { value: '명의이전취소', label: '명의이전취소' },
  { value: '임시번호판', label: '임시번호판' },
]

const DEALER_GROUP_OPTIONS = [
  { value: 'a', label: 'A 그룹' },
  { value: 'b', label: 'B 그룹' },
  { value: 'c', label: 'C 그룹' },
]

const NAV_ITEMS: SideNavItemData[] = [
  { id: 'dashboard', label: '대시보드', icon: 'homeOutline2dp' },
  { id: 'title-transfer', label: '명의이전 관리', icon: 'documentOutline2dp' },
  { id: 'vehicle', label: '차량 등록 관리', icon: 'documentPaperOutline2dp' },
  { id: 'dealer', label: '딜러 관리', icon: 'personGroupOutline2dp' },
  { id: 'customer', label: '고객 관리', icon: 'personOutline2dp' },
  { id: 'settlement', label: '정산 관리', icon: 'wonCircleOutline2dp' },
  { id: 'report', label: '보고서', icon: 'listOutline2dp' },
  { id: 'notice', label: '공지사항', icon: 'bellOutline2dp' },
  { id: 'settings', label: '설정', icon: 'settingOutline2dp' },
]

const PAGE_SIZES = [10, 20, 50]

export function TitleTransferPage() {
  const [dealerNo, setDealerNo] = useState('')
  const [statusFilter, setStatusFilter] = useState<TransferStatus>('전체')
  const [vehicleNo, setVehicleNo] = useState('')
  const [transferType, setTransferType] = useState('')
  const [requestDateFrom, setRequestDateFrom] = useState('')
  const [requestDateTo, setRequestDateTo] = useState('')
  const [processDateFrom, setProcessDateFrom] = useState('')
  const [processDateTo, setProcessDateTo] = useState('')
  const [dealerGroup, setDealerGroup] = useState('')
  const [assignee, setAssignee] = useState('')

  const [appliedFilter, setAppliedFilter] = useState({
    status: '전체' as TransferStatus,
    vehicleNo: '',
  })
  const [page, setPage] = useState(1)
  const [selectedCount, setSelectedCount] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [pageSizeOpen, setPageSizeOpen] = useState(false)
  const pageSizeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!pageSizeOpen) return
    const handler = (e: MouseEvent) => {
      if (pageSizeRef.current && !pageSizeRef.current.contains(e.target as Node)) {
        setPageSizeOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [pageSizeOpen])

  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(row => {
      if (appliedFilter.status !== '전체' && row.status !== appliedFilter.status) return false
      if (appliedFilter.vehicleNo && !row.vehicleNumber.includes(appliedFilter.vehicleNo)) return false
      return true
    })
  }, [appliedFilter])

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize))
  const pagedData = filteredData.slice((page - 1) * pageSize, page * pageSize)

  const columns: TableColumn<TitleTransferRequest>[] = [
    { key: 'id', header: '신청번호', width: 130 },
    { key: 'requestedAt', header: '신청일시', width: 140 },
    { key: 'applicant', header: '신청자', width: 80 },
    { key: 'prevOwner', header: '이전 소유자', width: 90 },
    { key: 'nextOwner', header: '신규 소유자', width: 90 },
    { key: 'vehicleNumber', header: '차량번호', width: 110 },
    { key: 'vehicleModel', header: '차종', width: 130 },
    {
      key: 'status',
      header: '처리 상태',
      width: 90,
      align: 'center',
      render: (v) => (
        <Label color={STATUS_COLOR[v as Exclude<TransferStatus, '전체'>]} size="sm">
          {v as string}
        </Label>
      ),
    },
    { key: 'assignee', header: '담당자', width: 80 },
    { key: 'processedAt', header: '처리일시', width: 140 },
  ]

  const handleSearch = () => {
    setAppliedFilter({ status: statusFilter, vehicleNo })
    setPage(1)
    setSelectedCount(0)
  }

  const handleReset = () => {
    setDealerNo('')
    setStatusFilter('전체')
    setVehicleNo('')
    setTransferType('')
    setRequestDateFrom('')
    setRequestDateTo('')
    setProcessDateFrom('')
    setProcessDateTo('')
    setDealerGroup('')
    setAssignee('')
    setAppliedFilter({ status: '전체', vehicleNo: '' })
    setPage(1)
    setSelectedCount(0)
  }

  return (
    <div className="ttp-layout">
      {/* GNB — 전체 너비 */}
      <Navigation
        size="sm"
        layoutMode="full"
        logo={<span className="ttp-nav-logo">MGWrap</span>}
        navItems={
          <>
            <NavItem label="명의이전" current />
            <NavItem label="차량관리" />
            <NavItem label="딜러관리" />
            <NavItem label="고객관리" />
            <NavItem label="정산" />
          </>
        }
        trailing={
          <Button tone="secondary" appearance="outline" emphasis="weak" size="sm">로그아웃</Button>
        }
      />

      <div className="ttp-body">
        {/* LNB */}
        <div className="ttp-lnb">
          <SideNavigation
            tone="accent"
            size="md"
            activeId="title-transfer"
            onSelect={() => {}}
            items={NAV_ITEMS}
          />
        </div>

        <div className="ttp-content">

          {/* Title section */}
          <div className="ttp-title-section">
            <h1 className="ttp-page-title">명의이전 신청 관리</h1>
          </div>

          {/* Filter Section — Figma: Searchbox frame 6134:114625 */}
          <div className="ttp-section">
            <div className="ttp-filter-grid">

              {/* Row 1: 딜러 번호 | 처리 상태 */}
              <div className="ttp-filter-grid-row">
                <div className="ttp-filter-field">
                  <span className="ttp-field-label">딜러 번호</span>
                  <TextField
                    size="md"
                    placeholder="딜러 번호 입력"
                    value={dealerNo}
                    onChange={e => setDealerNo(e.target.value)}
                  />
                </div>
                <div className="ttp-filter-field">
                  <span className="ttp-field-label">처리 상태</span>
                  <ChipGroup layout="wrap" size="md">
                    {STATUS_FILTERS.map(status => (
                      <ChoiceChip
                        key={status}
                        label={status}
                        size="md"
                        selected={statusFilter === status}
                        onClick={() => setStatusFilter(status)}
                      />
                    ))}
                  </ChipGroup>
                </div>
              </div>

              {/* Row 2: 차량 번호 | 신청 유형 */}
              <div className="ttp-filter-grid-row">
                <div className="ttp-filter-field">
                  <span className="ttp-field-label">차량 번호</span>
                  <TextField
                    size="md"
                    placeholder="차량 번호 입력"
                    value={vehicleNo}
                    onChange={e => setVehicleNo(e.target.value)}
                  />
                </div>
                <div className="ttp-filter-field">
                  <span className="ttp-field-label">신청 유형</span>
                  <Select
                    options={TRANSFER_TYPE_OPTIONS}
                    placeholder="전체"
                    width="fill"
                    value={transferType}
                    onChange={setTransferType}
                  />
                </div>
              </div>

              {/* Row 3: 신청일 | 처리일 — Figma: DatePicker variation=range */}
              <div className="ttp-filter-grid-row">
                <div className="ttp-filter-field">
                  <span className="ttp-field-label">신청일</span>
                  <DatePicker
                    variation="range"
                    size="md"
                    value={requestDateFrom}
                    endValue={requestDateTo}
                    onRangeChange={(s, e) => { setRequestDateFrom(s); setRequestDateTo(e) }}
                    placeholder="시작일"
                    endPlaceholder="종료일"
                  />
                </div>
                <div className="ttp-filter-field">
                  <span className="ttp-field-label">처리일</span>
                  <DatePicker
                    variation="range"
                    size="md"
                    value={processDateFrom}
                    endValue={processDateTo}
                    onRangeChange={(s, e) => { setProcessDateFrom(s); setProcessDateTo(e) }}
                    placeholder="시작일"
                    endPlaceholder="종료일"
                  />
                </div>
              </div>

              {/* Row 4: 딜러 그룹 | 담당자 */}
              <div className="ttp-filter-grid-row">
                <div className="ttp-filter-field">
                  <span className="ttp-field-label">딜러 그룹</span>
                  <Select
                    options={DEALER_GROUP_OPTIONS}
                    placeholder="전체"
                    width="fill"
                    value={dealerGroup}
                    onChange={setDealerGroup}
                  />
                </div>
                <div className="ttp-filter-field">
                  <span className="ttp-field-label">담당자</span>
                  <TextField
                    size="md"
                    placeholder="담당자 이름"
                    value={assignee}
                    onChange={e => setAssignee(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Divider — Figma: Tone: neutral, Emphasis: default */}
            <Divider tone="neutral" emphasis="default" />

            {/* Button group — Figma: justifyContent: center, 2 buttons only */}
            <div className="ttp-button-group">
              <ButtonGroup size="md" direction="horizontal" distribution="content">
                <Button
                  tone="secondary"
                  appearance="fill"
                  emphasis="weak"
                  onClick={handleReset}
                >
                  초기화
                </Button>
                <Button
                  tone="secondary"
                  appearance="fill"
                  emphasis="strong"
                  onClick={handleSearch}
                >
                  검색
                </Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Count info container — Figma: vertical gap 12 */}
          <div className="ttp-count-container">
            {/* Table header bar — Figma: horizontal space-between */}
            <div className="ttp-table-header-bar">
              {/* Count info — Figma: "N개 · N개 선택" */}
              <div className="ttp-count-info">
                <span className="ttp-count-total">{filteredData.length}개</span>
                <span className="ttp-count-bullet">·</span>
                <span className="ttp-count-selected">{selectedCount}개 선택</span>
              </div>
              <div className="ttp-table-actions">
                <ButtonGroup size="md" direction="horizontal" distribution="content">
                  <Button tone="secondary" appearance="fill" emphasis="weak">일괄 반려</Button>
                  <Button tone="secondary" appearance="fill" emphasis="weak">일괄 취소</Button>
                  <Button tone="primary" appearance="fill" emphasis="strong">선택 처리</Button>
                </ButtonGroup>
                <div style={{ position: 'relative' }} ref={pageSizeRef}>
                  <Button
                    tone="secondary"
                    appearance="outline"
                    emphasis="weak"
                    size="md"
                    trailingIcon={<Icon name="chevronDownSmallOutline2dp" size={16} />}
                    onClick={() => setPageSizeOpen(v => !v)}
                  >
                    {pageSize}개씩
                  </Button>
                  {pageSizeOpen && (
                    <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 100 }}>
                      <Menu size="md">
                        {PAGE_SIZES.map(s => (
                          <MenuItem key={s} onClick={() => { setPageSize(s); setPage(1); setPageSizeOpen(false) }}>
                            {s}개씩
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  )}
                </div>
                <Button
                  tone="secondary"
                  appearance="outline"
                  emphasis="strong"
                  size="md"
                >
                  엑셀 다운로드
                </Button>
              </div>
            </div>

            <div className="ttp-table-group">
              <div className="ttp-table-scroll-wrapper">
                <Table
                  columns={columns}
                  data={pagedData}
                  selectable
                  onRowSelect={(_, selected) => setSelectedCount(prev => selected ? prev + 1 : Math.max(0, prev - 1))}
                  size="md"
                  rowKey="id"
                />
              </div>

              {/* Pagination — Figma: padding 24 top/bottom, center */}
              <div className="ttp-pagination-bar">
                <Pagination
                  page={page}
                  total={totalPages}
                  onChange={p => setPage(p)}
                  size="md"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

