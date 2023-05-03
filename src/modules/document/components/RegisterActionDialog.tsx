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
import { useAtom } from 'jotai'
import {
  ComponentPropsWithoutRef,
  FormEvent,
  useCallback,
  useEffect,
  useId,
  useState,
} from 'react'
import { documentAtom } from '~/modules/document/stores'
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

  const [document, setDocument] = useAtom(documentAtom)

  const [name, setName] = useState(document?.data?.name ?? '')
  const [semanticName, setSemanticName] = useState(
    document?.data?.semanticName ?? '',
  )

  useEffect(() => {
    setName(document?.data?.name ?? '')
    setSemanticName(document?.data?.semanticName ?? '')
  }, [document])

  const onCancel = useEventCallback(_onCancel)
  const onRegister = useEventCallback(_onRegister)

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      setIsProcessing(true)

      setDocument(
        document && {
          ...document,
          data: {
            ...document.data,
            name,
            semanticName,
          },
        },
      )

      onRegister?.()
      setIsProcessing(false)
    },
    [onRegister, name, semanticName],
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
              ローマ字テーブルの名称
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
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
                <Label required htmlFor={`${id}-name`}>
                  テーブル識別名
                </Label>
                <Input
                  required
                  id={`${id}-name`}
                  placeholder="例: azik"
                  disabled={isProcessing}
                  autoComplete="off"
                  value={semanticName}
                  onChange={e => setSemanticName(e.target.value)}
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
