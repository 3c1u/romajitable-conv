import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
  Tooltip,
} from '@fluentui/react-components'
import {
  AddRegular,
  ArrowExportUpFilled,
  ArrowImportRegular,
  DeleteRegular,
} from '@fluentui/react-icons'
import { useState } from 'react'
import { loadRomajiTableFromFile } from '~/modules/document/actions/loadRomajiTable'
import { RegisterActionDialog } from '~/modules/document/components/RegisterActionDialog'
import { message } from '~/utils/dialog'

export const AppActions = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Toolbar>
        <Tooltip content="変換を追加" relationship="label" positioning="below">
          <ToolbarButton aria-label="追加" icon={<AddRegular />} />
        </Tooltip>
        <Tooltip content="変換を削除" relationship="label" positioning="below">
          <ToolbarButton aria-label="削除" icon={<DeleteRegular />} />
        </Tooltip>
        <div className="flex-1" />
        <Tooltip
          content="ATOKまたはMozcのローマ字テーブル、または「.reg」形式のMS-IMEローマ字テーブルから読み込みます。"
          relationship="description"
          positioning="below"
        >
          <ToolbarButton
            icon={<ArrowImportRegular />}
            onClick={() => {
              loadRomajiTableFromFile()
            }}
          >
            ファイルから読み込み...
          </ToolbarButton>
        </Tooltip>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton appearance="primary" icon={<ArrowExportUpFilled />}>
              書き出し
            </MenuButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <Tooltip
                content="MS-IME用にローマ字テーブルを登録します。"
                relationship="description"
              >
                <MenuItem onClick={() => setIsOpen(true)}>
                  レジストリに登録
                </MenuItem>
              </Tooltip>
              <MenuItem>.regとして書き出し...</MenuItem>
              <MenuItem>ATOK用テーブルとして書き出し...</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </Toolbar>
      <RegisterActionDialog
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onRegister={() => {
          message('TODO')
          setIsOpen(false)
        }}
      />
    </>
  )
}
