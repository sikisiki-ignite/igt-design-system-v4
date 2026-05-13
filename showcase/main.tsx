import React from 'react'
import { createRoot } from 'react-dom/client'
import '../src/tokens/primitives.css'
import '../src/tokens/semantic.css'
import '../src/tokens/themes.css'
import '../src/tokens/typography.css'
import '../src/tokens/effects.css'
import '../src/tokens/component.css'
import '../src/fonts/fonts.css'
import './showcase.css'
import { ThemeControls } from './ThemeControls'
import { ShowcaseNav } from './ShowcaseNav'
import { ButtonShowcase } from './ButtonShowcase'
import { IconButtonShowcase } from './IconButtonShowcase'
import { OverlayActionShowcase } from './OverlayActionShowcase'
import { FloatingButtonShowcase } from './FloatingButtonShowcase'
import { ArrowControlShowcase } from './ArrowControlShowcase'
import { SearchTriggerShowcase } from './SearchTriggerShowcase'
import { TextButtonShowcase } from './TextButtonShowcase'
import { LinkShowcase } from './LinkShowcase'
import { ActionToggleShowcase } from './ActionToggleShowcase'
import { IconToggleShowcase } from './IconToggleShowcase'
import { MenuShowcase } from './MenuShowcase'
import { ModeSwitchButtonShowcase } from './ModeSwitchButtonShowcase'
import { ButtonGroupShowcase } from './ButtonGroupShowcase'
import { CheckboxShowcase } from './CheckboxShowcase'
import { RadioBoxShowcase } from './RadioBoxShowcase'
import { SwitchShowcase } from './SwitchShowcase'
import { ChipShowcase } from './ChipShowcase'
import { RatingShowcase } from './RatingShowcase'
import { NumberStepperShowcase } from './NumberStepperShowcase'
import { SliderShowcase } from './SliderShowcase'
import { TextFieldShowcase } from './TextFieldShowcase'
import { TagInputShowcase } from './TagInputShowcase'
import { TextAreaShowcase } from './TextAreaShowcase'
import { SearchShowcase } from './SearchShowcase'
import { SelectShowcase } from './SelectShowcase'
import { DatePickerShowcase } from './DatePickerShowcase'
import { AlertShowcase } from './AlertShowcase'
import { BannerShowcase } from './BannerShowcase'
import { ToastShowcase } from './ToastShowcase'
import { StateViewShowcase } from './StateViewShowcase'
import { SkeletonShowcase } from './SkeletonShowcase'
import { BreadcrumbShowcase } from './BreadcrumbShowcase'
import { PageIndicatorShowcase } from './PageIndicatorShowcase'
import { PaginationShowcase } from './PaginationShowcase'
import { TabShowcase } from './TabShowcase'
import { SegmentControlShowcase } from './SegmentControlShowcase'
import { NavigationShowcase } from './NavigationShowcase'
import { SideNavigationShowcase } from './SideNavigationShowcase'
import { OrgTreeShowcase } from './OrgTreeShowcase'
import { BackdropShowcase } from './BackdropShowcase'
import { HoverHintShowcase } from './HoverHintShowcase'
import { TooltipShowcase } from './TooltipShowcase'
import { PopoverShowcase } from './PopoverShowcase'
import { DialogShowcase } from './DialogShowcase'
import { DrawerShowcase } from './DrawerShowcase'
import { AvatarShowcase } from './AvatarShowcase'
import { BadgeShowcase } from './BadgeShowcase'
import { LabelShowcase } from './LabelShowcase'
import { AccordionShowcase } from './AccordionShowcase'
import { TableShowcase } from './TableShowcase'
import { DividerShowcase } from './DividerShowcase'
import { CardShowcase } from './CardShowcase'
import { IconShowcase } from './IconShowcase'
import { TitleTransferPage } from './TitleTransferPage'

const HR = () => <hr style={{ margin: '48px 0', border: 'none', borderTop: '1px solid var(--sys-border-neutral-subtle, #e5e7eb)' }} />

function App() {
  return (
    <>
      <ThemeControls />
      <div className="sc-layout">
        <ShowcaseNav />
        <main className="sc-content">
          <section id="button"><ButtonShowcase /></section>
          <HR />
          <section id="icon-button"><IconButtonShowcase /></section>
          <HR />
          <section id="overlay-action"><OverlayActionShowcase /></section>
          <HR />
          <section id="floating-button"><FloatingButtonShowcase /></section>
          <HR />
          <section id="arrow-control"><ArrowControlShowcase /></section>
          <HR />
          <section id="search-trigger"><SearchTriggerShowcase /></section>
          <HR />
          <section id="text-button"><TextButtonShowcase /></section>
          <HR />
          <section id="link"><LinkShowcase /></section>
          <HR />
          <section id="action-toggle"><ActionToggleShowcase /></section>
          <HR />
          <section id="icon-toggle"><IconToggleShowcase /></section>
          <HR />
          <section id="menu"><MenuShowcase /></section>
          <HR />
          <section id="mode-switch-button"><ModeSwitchButtonShowcase /></section>
          <HR />
          <section id="button-group"><ButtonGroupShowcase /></section>
          <HR />
          <section id="checkbox"><CheckboxShowcase /></section>
          <HR />
          <section id="radio-box"><RadioBoxShowcase /></section>
          <HR />
          <section id="switch"><SwitchShowcase /></section>
          <HR />
          <section id="chip"><ChipShowcase /></section>
          <HR />
          <section id="rating"><RatingShowcase /></section>
          <HR />
          <section id="number-stepper"><NumberStepperShowcase /></section>
          <HR />
          <section id="slider"><SliderShowcase /></section>
          <HR />
          <section id="text-field"><TextFieldShowcase /></section>
          <HR />
          <section id="tag-input"><TagInputShowcase /></section>
          <HR />
          <section id="text-area"><TextAreaShowcase /></section>
          <HR />
          <section id="search"><SearchShowcase /></section>
          <HR />
          <section id="select"><SelectShowcase /></section>
          <HR />
          <section id="date-picker"><DatePickerShowcase /></section>
          <HR />
          <section id="alert"><AlertShowcase /></section>
          <HR />
          <section id="banner"><BannerShowcase /></section>
          <HR />
          <section id="toast"><ToastShowcase /></section>
          <HR />
          <section id="state-view"><StateViewShowcase /></section>
          <HR />
          <section id="skeleton"><SkeletonShowcase /></section>
          <HR />
          <section id="breadcrumb"><BreadcrumbShowcase /></section>
          <HR />
          <section id="page-indicator"><PageIndicatorShowcase /></section>
          <HR />
          <section id="pagination"><PaginationShowcase /></section>
          <HR />
          <section id="tab"><TabShowcase /></section>
          <HR />
          <section id="segment-control"><SegmentControlShowcase /></section>
          <HR />
          <section id="navigation"><NavigationShowcase /></section>
          <HR />
          <section id="side-navigation"><SideNavigationShowcase /></section>
          <HR />
          <section id="org-tree"><OrgTreeShowcase /></section>
          <HR />
          <section id="backdrop"><BackdropShowcase /></section>
          <HR />
          <section id="hover-hint"><HoverHintShowcase /></section>
          <HR />
          <section id="tooltip"><TooltipShowcase /></section>
          <HR />
          <section id="popover"><PopoverShowcase /></section>
          <HR />
          <section id="dialog"><DialogShowcase /></section>
          <HR />
          <section id="drawer"><DrawerShowcase /></section>
          <HR />
          <section id="avatar"><AvatarShowcase /></section>
          <HR />
          <section id="badge"><BadgeShowcase /></section>
          <HR />
          <section id="label"><LabelShowcase /></section>
          <HR />
          <section id="accordion"><AccordionShowcase /></section>
          <HR />
          <section id="table"><TableShowcase /></section>
          <HR />
          <section id="divider"><DividerShowcase /></section>
          <HR />
          <section id="card"><CardShowcase /></section>
          <HR />
          <section id="icon"><IconShowcase /></section>
          <HR />
          <section id="title-transfer"><TitleTransferPage /></section>
        </main>
      </div>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
