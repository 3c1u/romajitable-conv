import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  Input,
  Label,
} from '@fluentui/react-components'
import { Dismiss24Regular } from '@fluentui/react-icons'
import {
  ComponentPropsWithoutRef,
  FormEvent,
  useCallback,
  useId,
  useState,
} from 'react'
import { useEventCallback } from '~/utils/hooks/useEventCallback'

interface RegisterActionDialogProps
  extends Partial<ComponentPropsWithoutRef<typeof Dialog>> {
  isOpen: boolean
  onCancel?: () => void
  onRegister?: () => void
}

export const RegisterActionDialog = (props: RegisterActionDialogProps) => {
  const {
    isOpen,
    onCancel: _onCancel,
    onRegister: _onRegister,
    ...rest
  } = props

  const id = useId()

  const onCancel = useEventCallback(_onCancel)
  const onRegister = useEventCallback(_onRegister)

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      setIsProcessing(true)

      setTimeout(() => {
        setIsProcessing(false)
        onRegister()
      }, 1000)
    },
    [onRegister],
  )

  const [isProcessing, setIsProcessing] = useState(false)

  return (
    <Dialog
      {...rest}
      modalType="modal"
      open={isOpen}
      onOpenChange={(e, { open }) => {
        if (!open) {
          onCancel()
        }
      }}
    >
      <DialogSurface className="w-80">
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle
              action={
                <Button
                  appearance="subtle"
                  aria-label="close"
                  icon={<Dismiss24Regular />}
                />
              }
            >
              ローマ字テーブルの登録
            </DialogTitle>
            <DialogContent>
              <div className="gap-4 flex flex-col py-4">
                <Label required htmlFor={`${id}-name`}>
                  テーブル名
                </Label>
                <Input
                  required
                  id={`${id}-name`}
                  placeholder="例: AZIK"
                  disabled={isProcessing}
                  autoComplete="off"
                />
              </div>
            </DialogContent>
          </DialogBody>
          <DialogActions>
            <Button
              appearance="secondary"
              disabled={isProcessing}
              onClick={onCancel}
            >
              キャンセル
            </Button>
            <div className="flex-1" />
            <Button type="submit" appearance="primary" disabled={isProcessing}>
              登録
            </Button>
          </DialogActions>
        </form>
      </DialogSurface>
    </Dialog>
  )
}
