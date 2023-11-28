import {FC, ReactNode, useCallback, useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import {Theme, useMediaQuery} from '@mui/material'
import { styled } from '@mui/material/styles'

import { usePathname } from 'next/navigation'

import { MobileNav } from '../mobile-nav'
import { SideNav } from './side-nav'
import { TopNav } from './top-nav'
import {NavColor} from '~/src/types/settings'
import {Section} from '~/src/layouts/dashboard/config'

const SIDE_NAV_WIDTH = 280

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

const VerticalLayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH
  }
}))

const VerticalLayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%"
})

interface VerticalLayoutProps {
  children?: ReactNode;
  navColor?: NavColor;
  sections?: Section[];
}

export const VerticalLayout: FC<VerticalLayoutProps> = (props) => {
  const { children, sections, navColor } = props
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"))
  const mobileNav = useMobileNav()

  return (
    <>
      <TopNav onMobileNavOpen={mobileNav.handleOpen} />
      {lgUp && (
        <SideNav
          color={navColor}
          sections={sections}
        />
      )}
      {!lgUp && (
        <MobileNav
          color={navColor}
          onClose={mobileNav.handleClose}
          open={mobileNav.isOpen}
          sections={sections}
        />
      )}
      <VerticalLayoutRoot>
        <VerticalLayoutContainer>
          {children}
        </VerticalLayoutContainer>
      </VerticalLayoutRoot>
    </>
  )
}

VerticalLayout.propTypes = {
  children: PropTypes.node
}
