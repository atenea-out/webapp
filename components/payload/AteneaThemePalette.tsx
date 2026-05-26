'use client'

import { useField } from '@payloadcms/ui'

const DEFAULTS = {
  themeNavy: '#023044',
  themeNavyMid: '#034060',
  themeCoral: '#ef625e',
  themeCoralLight: '#f2837f',
  themeBackground: '#F0F5FA',
  themeCream: '#ebe6e2',
  themeText: '#334155',
  themeTextMuted: '#475569',
}

const TOKENS = [
  {
    key: 'themeNavy',
    label: 'Principal',
    description: 'Navegacion, titulares y fondos premium.',
  },
  {
    key: 'themeCoral',
    label: 'Acento',
    description: 'CTAs, detalles activos y estados destacados.',
  },
  {
    key: 'themeBackground',
    label: 'Fondo claro',
    description: 'Base visual de paginas y secciones claras.',
  },
  {
    key: 'themeCream',
    label: 'Crema',
    description: 'Bloques suaves y apoyos de marca.',
  },
] as const

const HEX = /^#([0-9A-Fa-f]{6})$/

function normalizeColor(value: unknown, fallback: string) {
  if (typeof value === 'string' && HEX.test(value.trim())) return value.trim()
  return fallback
}

type TokenKey = keyof typeof DEFAULTS

function useThemeToken(path: TokenKey) {
  return useField<string>({ path })
}

export function AteneaThemePalette() {
  const fields = {
    themeNavy: useThemeToken('themeNavy'),
    themeNavyMid: useThemeToken('themeNavyMid'),
    themeCoral: useThemeToken('themeCoral'),
    themeCoralLight: useThemeToken('themeCoralLight'),
    themeBackground: useThemeToken('themeBackground'),
    themeCream: useThemeToken('themeCream'),
    themeText: useThemeToken('themeText'),
    themeTextMuted: useThemeToken('themeTextMuted'),
  }

  const resetPalette = () => {
    Object.entries(DEFAULTS).forEach(([key, value]) => {
      fields[key as TokenKey].setValue(value)
    })
  }

  return (
    <section className="atenea-theme-panel" aria-label="Paleta oficial de Atenea">
      <div className="atenea-theme-panel__content">
        <p className="atenea-theme-panel__eyebrow">Paleta visual</p>
        <h3>Personaliza los colores principales del sitio.</h3>
        <p>
          Puedes seleccionar un color desde la muestra visual o escribir un HEX. Si algo no
          convence, restablece la identidad oficial de Atenea en un clic.
        </p>
      </div>
      <div className="atenea-theme-panel__swatches">
        {TOKENS.map((token) => {
          const color = normalizeColor(fields[token.key].value, DEFAULTS[token.key])
          return (
            <button
              aria-label={`${token.label}: ${color}`}
              className="atenea-theme-panel__swatch"
              key={token.key}
              onClick={() => fields[token.key].setValue(DEFAULTS[token.key])}
              style={{ '--swatch-color': color } as React.CSSProperties}
              type="button"
            >
              <span />
              <strong>{token.label}</strong>
              <small>{token.description}</small>
            </button>
          )
        })}
      </div>
      <button className="atenea-theme-panel__reset" onClick={resetPalette} type="button">
        Restablecer identidad Atenea
      </button>
    </section>
  )
}

type ColorFieldProps = {
  field?: {
    admin?: {
      custom?: {
        description?: string
      }
    }
    label?: string
  }
  path: TokenKey
}

export function AteneaColorField({ field, path }: ColorFieldProps) {
  const { setValue, showError, value } = useThemeToken(path)
  const fallback = DEFAULTS[path]
  const colorValue = normalizeColor(value, fallback)
  const label = typeof field?.label === 'string' ? field.label : path
  const description = field?.admin?.custom?.description

  return (
    <div className="atenea-color-field">
      <label className="atenea-color-field__label" htmlFor={path}>
        {label}
      </label>
      {description ? <p className="atenea-color-field__description">{description}</p> : null}
      <div className="atenea-color-field__control">
        <input
          aria-label={`Selector de color para ${label}`}
          className="atenea-color-field__picker"
          onChange={(event) => setValue(event.target.value)}
          type="color"
          value={colorValue}
        />
        <input
          className="atenea-color-field__hex"
          id={path}
          maxLength={7}
          onChange={(event) => setValue(event.target.value)}
          placeholder={fallback}
          spellCheck={false}
          type="text"
          value={value || ''}
        />
      </div>
      {showError ? <p className="atenea-color-field__error">Usa formato HEX. Ej: {fallback}</p> : null}
    </div>
  )
}
