/**
 * LandingPages.tsx — minimal portfolio build
 *
 * This file exports only the CompleteShelfLandingPage component,
 * which is the only landing page used in this portfolio.
 *
 * The original ThreeUI package contains many more pages that reference
 * external builders and source files not present in this repo. Those are
 * intentionally omitted to prevent undefined-variable runtime crashes.
 */

import {
  splitTypographyProps,
  usePageTypography,
  type PageTypographyProps,
} from "./pageTypography";

import { LandingPageFrame, type LandingPageProps } from "./LandingPageFrame";

export { LandingPageFrame, applyBackgroundPresentation } from "./LandingPageFrame";
export type { LandingPageFrameProps, LandingPageProps } from "./LandingPageFrame";

import { COMPLETE_SHELF_TYPOGRAPHY } from "./pageRecipes";

export function CompleteShelfLandingPage(props: LandingPageProps & PageTypographyProps) {
  const [type, frame] = splitTypographyProps(props);
  const customization = usePageTypography(COMPLETE_SHELF_TYPOGRAPHY, type);
  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="Working Volumes — Seven Tools for Making"
      sourceUrl="/landing-pages/complete-shelf-v2.html"
    />
  );
}
