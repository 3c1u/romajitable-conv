import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components'
import { useState } from 'react'
import { RegisterActionDialog } from '~/modules/document/components/RegisterActionDialog'
import { message } from '~/utils/dialog'

export const AppActions = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="flex gap-4 p-4">
        <div className="flex-1" />
        <Button>ファイルから読み込み...</Button>
        <Menu>
          <MenuTrigger disableButtonEnhancement>
            <MenuButton appearance="primary">書き出し</MenuButton>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem onClick={() => setIsOpen(true)}>
                レジストリに登録
              </MenuItem>
              <MenuItem>.regとして書き出し...</MenuItem>
              <MenuItem>ATOK用テーブルとして書き出し...</MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
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
