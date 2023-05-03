import ReactDOM from 'react-dom/client'
import { FluentProvider, Theme, webDarkTheme } from '@fluentui/react-components'
import { App } from '~/App'
import './index.css'

const customDarkTheme: Theme = {
  ...webDarkTheme,
  fontFamilyBase:
    "system-ui, 'Segoe UI', 'Segoe UI Web (West European)', 'Yu Gothic UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', sans-serif",
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <FluentProvider theme={customDarkTheme}>
    <App />
  </FluentProvider>,
)
