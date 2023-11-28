import {ReactElement, ReactNode} from 'react'

import { useSettings } from '~/src/hooks/use-settings'
import { HorizontalLayout } from '~/src/layouts/dashboard/horizontal-layout'
import { VerticalLayout } from '~/src/layouts/dashboard/vertical-layout'
import { useSections } from '~/src/layouts/dashboard/config'
import {AuthGuard} from '~/src/guards/auth-guard'

interface LayoutProps {
  children?: ReactNode
}

export default function Layout({ children }: LayoutProps): ReactElement{
  const settings = useSettings()
  const sections = useSections()

  const Component = settings.layout === "horizontal" ? HorizontalLayout : VerticalLayout

  return (
    <AuthGuard>
      <Component
        sections={sections!}
        navColor={settings.navColor!}
      >
        {children}
      </Component>
    </AuthGuard>
  )
}
