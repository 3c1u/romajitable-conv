import { AppActions } from '~/modules/document/components/AppActions'
import { RomajiTableDataGrid } from '~/modules/romajiTable/components/RomajiTableDataGrid'
import { TitleBar } from '~/modules/uiTitleBar/components/TitleBar'

export const App = () => {
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <TitleBar />
      <AppActions />
      <div className="overflow-y-auto">
        <RomajiTableDataGrid />
      </div>
    </div>
  )
}
