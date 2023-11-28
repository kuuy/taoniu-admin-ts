import type { FC } from 'react'
import PropTypes from 'prop-types'
import {appConfig} from '~/src/config'

type Extension = 'jpeg' | 'jpg' | 'mp4' | 'pdf' | 'png' | 'svg' | string

const icons: Record<Extension, string> = {
  jpeg: `${appConfig.baseUrl}/assets/icons/icon-jpg.svg`,
  jpg: `${appConfig.baseUrl}/assets/icons/icon-jpg.svg`,
  mp4: `${appConfig.baseUrl}/assets/icons/icon-mp4.svg`,
  pdf: `${appConfig.baseUrl}/assets/icons/icon-pdf.svg`,
  png: `${appConfig.baseUrl}/assets/icons/icon-png.svg`,
  svg: `${appConfig.baseUrl}/assets/icons/icon-svg.svg`,
}

interface FileIconProps {
  extension?: Extension | null;
}

export const FileIcon: FC<FileIconProps> = (props) => {
  const { extension } = props;

  let icon: string;

  if (!extension) {
    icon = `${appConfig.baseUrl}/assets/icons/icon-other.svg`;
  } else {
    icon = icons[extension] || `${appConfig.baseUrl}/assets/icons/icon-other.svg`;
  }

  return <img src={icon} />
}

FileIcon.propTypes = {
  extension: PropTypes.string
}
