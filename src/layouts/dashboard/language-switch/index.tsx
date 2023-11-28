import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, IconButton, Tooltip } from '@mui/material'
import { LanguagePopover } from './language-popover'
import {appConfig} from '~/src/config'

type Language = 'en' | 'de' | 'es';

const languages: Record<Language, string> = {
  en: `${appConfig.baseUrl}/assets/flags/flag-uk.svg`,
  de: `${appConfig.baseUrl}/assets/flags/flag-de.svg`,
  es: `${appConfig.baseUrl}/assets/flags/flag-es.svg`
}

export const LanguageSwitch = () => {
  const anchorRef = useRef(null)
  const { i18n } = useTranslation()
  const [openPopover, setOpenPopover] = useState(false)

  const handlePopoverOpen = useCallback(() => {
    setOpenPopover(true)
  }, [])

  const handlePopoverClose = useCallback(() => {
    setOpenPopover(false)
  }, [])

  const flag = languages[i18n.language as Language]

  return (
    <>
      <Tooltip title="Language">
        <IconButton
          onClick={handlePopoverOpen}
          ref={anchorRef}
        >
          <Box
            sx={{
              width: 28,
              "& img": {
                width: "100%"
              }
            }}
          >
            <img src={flag} />
          </Box>
        </IconButton>
      </Tooltip>
      <LanguagePopover
        anchorEl={anchorRef.current}
        onClose={handlePopoverClose}
        open={openPopover}
      />
    </>
  )
}
