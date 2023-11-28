import {FC, ReactNode, useCallback, useEffect, useState} from 'react'
import { usePathname } from 'next/navigation'
import PropTypes from 'prop-types'
import {Theme, useMediaQuery} from '@mui/material'
import { styled } from '@mui/material/styles'
import { MobileNav } from '../mobile-nav'
import { TopNav } from './top-nav'
import {NavColor} from '~/src/types/settings'
import {Section} from '~/src/layouts/dashboard/config'

const useMobileNav = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handlePathnameChange = useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
    }
  }, [isOpen])

  useEffect(() => {
      handlePathnameChange()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname])

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    handleOpen,
    handleClose
  }
}

const HorizontalLayoutRoot = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%"
})

const HorizontalLayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%"
})

interface HorizontalLayoutProps {
  children?: ReactNode;
  navColor?: NavColor;
  sections?: Section[];
}

export const HorizontalLayout: FC<HorizontalLayoutProps> = (props) => {
  const { children, navColor, sections } = props
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"))
  const mobileNav = useMobileNav()

  return (
    <>
      <TopNav
        color={navColor}
        onMobileNav={mobileNav.handleOpen}
        sections={sections}
      />
      {!lgUp && (
        <MobileNav
          color={navColor}
          onClose={mobileNav.handleClose}
          open={mobileNav.isOpen}
          sections={sections}
        />
      )}
      <HorizontalLayoutRoot>
        <HorizontalLayoutContainer>
          {children}
        </HorizontalLayoutContainer>
      </HorizontalLayoutRoot>
    </>
  )
}

HorizontalLayout.propTypes = {
  children: PropTypes.node
}
