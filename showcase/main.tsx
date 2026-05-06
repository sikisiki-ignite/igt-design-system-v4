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

const HR = () => <hr style={{ margin: '48px 0', border: 'none', borderTop: '1px solid var(--sys-border-neutral-subtle, #e5e7eb)' }} />

function App() {
  return (
    <>
      <ThemeControls />
      <div className="sc-content">
        <ButtonShowcase />
        <HR />
        <IconButtonShowcase />
        <HR />
        <OverlayActionShowcase />
        <HR />
        <FloatingButtonShowcase />
        <HR />
        <ArrowControlShowcase />
        <HR />
        <SearchTriggerShowcase />
        <HR />
        <TextButtonShowcase />
        <HR />
        <LinkShowcase />
        <HR />
        <ActionToggleShowcase />
        <HR />
        <IconToggleShowcase />
        <HR />
        <MenuShowcase />
        <HR />
        <ModeSwitchButtonShowcase />
        <HR />
        <ButtonGroupShowcase />
        <HR />
        <CheckboxShowcase />
        <HR />
        <RadioBoxShowcase />
        <HR />
        <SwitchShowcase />
        <HR />
        <ChipShowcase />
        <HR />
        <RatingShowcase />
        <HR />
        <NumberStepperShowcase />
        <HR />
        <SliderShowcase />
        <HR />
        <TextFieldShowcase />
        <HR />
        <TextAreaShowcase />
        <HR />
        <SearchShowcase />
        <HR />
        <SelectShowcase />
        <HR />
        <DatePickerShowcase />
        <HR />
        <AlertShowcase />
        <HR />
        <BannerShowcase />
        <HR />
        <ToastShowcase />
        <HR />
        <StateViewShowcase />
        <HR />
        <SkeletonShowcase />
        <HR />
        <BreadcrumbShowcase />
        <HR />
        <PageIndicatorShowcase />
        <HR />
        <PaginationShowcase />
        <HR />
        <TabShowcase />
        <HR />
        <SegmentControlShowcase />
        <HR />
        <NavigationShowcase />
        <HR />
        <SideNavigationShowcase />
        <HR />
        <OrgTreeShowcase />
        <HR />
        <BackdropShowcase />
        <HR />
        <HoverHintShowcase />
        <HR />
        <TooltipShowcase />
        <HR />
        <PopoverShowcase />
        <HR />
        <DialogShowcase />
        <HR />
        <DrawerShowcase />
        <HR />
        <AvatarShowcase />
        <HR />
        <BadgeShowcase />
        <HR />
        <LabelShowcase />
        <HR />
        <AccordionShowcase />
        <HR />
        <TableShowcase />
      </div>
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
