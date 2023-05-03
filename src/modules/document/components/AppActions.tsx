import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Toolbar,
  ToolbarButton,
  Tooltip,
} from '@fluentui/react-components'
import {
  AddRegular,
  ArrowExportUpFilled,
  ArrowImportRegular,
  DeleteRegular,
} from '@fluentui/react-icons'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { loadRomajiTableFromFile } from '~/modules/document/actions/loadRomajiTable'
import { saveRomajiTableAsMsImeFormat } from '~/modules/document/actions/saveRomajiTableAsMsImeFormat'
import { RegisterActionDialog } from '~/modules/document/components/RegisterActionDialog'
import { documentAtom } from '~/modules/document/stores'
import { message } from '~/utils/dialog'

export const AppActions = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [document, setDocument] = useAtom(documentAtom)

  return (
    <>
      <Toolbar>
        {/* TODO: 未実装
          <Tooltip content="変換を追加" relationship="label" positioning="below">
            <ToolbarButton aria-label="追加" icon={<AddRegular />} />
          </Tooltip>
          <Tooltip content="変換を削除" relationship="label" positioning="below">
            <ToolbarButton aria-label="削除" icon={<DeleteRegular />} />
          </Tooltip>
        */}
        <div className="flex-1" />
        <Tooltip
          content="ATOKまたはMozcのローマ字テーブル、または「.reg」形式のMS-IMEローマ字テーブルから読み込みます。"
          relationship="description"
          positioning="below"
        >
          <ToolbarButton
            icon={<ArrowImportRegular />}
            onClick={() => {
              loadRomajiTableFromFile({
                setDocument,
              })
            }}
          >
            ファイルから読み込み...
          </ToolbarButton>
        </Tooltip>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton
              appearance="primary"
              icon={<ArrowExportUpFilled />}
              disabled={!document}
            >
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
              <MenuItem
                onClick={() => {
                  if (!document) {
                    return
                  }

                  saveRomajiTableAsMsImeFormat(document.data)
                }}
              >
                .regとして書き出し...
              </MenuItem>
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
