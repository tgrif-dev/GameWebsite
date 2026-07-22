import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: "'Space Grotesk', system-ui, sans-serif" },
        body: { value: "'Inter', system-ui, sans-serif" },
        mono: { value: "'IBM Plex Mono', monospace" },
      },
      colors: {
        slate: {
          950: { value: '#080B0E' },
          900: { value: '#0F151B' },
          850: { value: '#151D25' },
          800: { value: '#1D2731' },
          700: { value: '#2A3742' },
          600: { value: '#3D4E5C' },
          500: { value: '#5A6E7D' },
          400: { value: '#7E93A1' },
          300: { value: '#A6B8C3' },
          200: { value: '#CBD8E0' },
          100: { value: '#E9F0F4' },
        },
        verdigris: {
          700: { value: '#2E7A63' },
          600: { value: '#3D9B7D' },
          500: { value: '#4FB894' },
          400: { value: '#6ECFAE' },
          300: { value: '#9BE2CA' },
        },
      },
    },
    semanticTokens: {
      colors: {
        pageBg: { value: '{colors.slate.950}' },
        panelBg: { value: '{colors.slate.900}' },
        panelBgAlt: { value: '{colors.slate.850}' },
        panelBgHover: { value: '{colors.slate.800}' },
        textPrimary: { value: '{colors.slate.100}' },
        textMuted: { value: '{colors.slate.200}' },
        textSubtle: { value: '{colors.slate.400}' },
        accent: { value: '{colors.verdigris.500}' },
        accentHover: { value: '{colors.verdigris.400}' },
        accentText: { value: '{colors.slate.950}' },
        hairline: { value: '{colors.slate.700}' },
      },
    },
  },
  globalCss: {
    body: {
      bg: 'pageBg',
      color: 'textPrimary',
    },
  },
})

export const system = createSystem(defaultConfig, config)