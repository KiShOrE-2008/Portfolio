export type LandingPageCustomization = {
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string;
  bodyWeight?: string;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
};

export type PageTypographyProps = {
  headingFont?: string;
  bodyFont?: string;
  headingWeight?: string;
  bodyWeight?: string;
  primaryColor?: string;
  headingSize?: number;
  bodySize?: number;
  headingLetterSpacing?: number;
};

export function splitTypographyProps<T extends PageTypographyProps>(props: T) {
  const {
    headingFont,
    bodyFont,
    headingWeight,
    bodyWeight,
    primaryColor,
    headingSize,
    bodySize,
    headingLetterSpacing,
    ...rest
  } = props;
  return [
    {
      headingFont,
      bodyFont,
      headingWeight,
      bodyWeight,
      primaryColor,
      headingSize,
      bodySize,
      headingLetterSpacing,
    },
    rest,
  ] as const;
}

export function usePageTypography(defaultConfig: any, overrides: any) {
  return { ...defaultConfig, ...overrides };
}

export function applyPageCustomization(frame: HTMLIFrameElement | null, customization?: LandingPageCustomization) {
  if (!frame || !frame.contentWindow || !customization) return;
  try {
    frame.contentWindow.postMessage({ type: "THREEUI_CUSTOMIZATION", customization }, "*");
  } catch (e) {}
}

export function postPageCustomization(frame: HTMLIFrameElement | null, customization?: LandingPageCustomization) {
  if (!frame || !frame.contentWindow || !customization) return;
  try {
    frame.contentWindow.postMessage({ type: "THREEUI_CUSTOMIZATION", customization }, "*");
  } catch (e) {}
}
