// NOTE: To reduce the bundle size, we did not include react-syntax-highlighter types package.

import type { FC } from 'react'
import Markdown, { Components } from 'react-markdown'
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import PropTypes from 'prop-types'

import { styled } from '@mui/material/styles'

import { codeStyle } from '~/src/utils/code-style'

const Code: Components['code'] = (props) => {
  const { node, className, children, ...other } = props

  const language = /language-(\w+)/.exec(className || '')

  return language
    ? (
      <SyntaxHighlighter
        language={language[1]}
        PreTag="div"
        style={codeStyle}
        {...other}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    )
    : (
      <code
        className={className}
        {...other}
      >
        {children}
      </code>
    )
}

const components = {
  code: Code,
}

const CourseLessonRoot = styled('div')(
  ({ theme }) => ({
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    '& blockquote': {
      borderLeft: `4px solid ${theme.palette.text.secondary}`,
      marginBottom: theme.spacing(2),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(1),
      '& > p': {
        color: theme.palette.text.secondary,
        marginBottom: 0
      }
    },
    '& code': {
      color: theme.palette.primary.main,
      fontFamily: 'Inconsolata, Monaco, Consolas, \'Courier New\', Courier, monospace',
      fontSize: 14,
      paddingLeft: 2,
      paddingRight: 2
    },
    '& h1': {
      fontSize: 35,
      fontWeight: 500,
      letterSpacing: '-0.24px',
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(6)
    },
    '& h2': {
      fontSize: 29,
      fontWeight: 500,
      letterSpacing: '-0.24px',
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(6)
    },
    '& h3': {
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: '-0.06px',
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(6)
    },
    '& h4': {
      fontSize: 20,
      fontWeight: 500,
      letterSpacing: '-0.06px',
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(4)
    },
    '& h5': {
      fontSize: 16,
      fontWeight: 500,
      letterSpacing: '-0.05px',
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2)
    },
    '& h6': {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: '-0.05px',
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2)
    },
    '& li': {
      fontSize: 14,
      lineHeight: 1.5,
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(4)
    },
    '& p': {
      fontSize: 16,
      lineHeight: 1.5,
      marginBottom: theme.spacing(2),
      '& > a': {
        color: theme.palette.primary.main
      }
    }
  })
)

interface CourseLessonProps {
  content: string
}

export const CourseLesson: FC<CourseLessonProps> = (props) => {
  const { content } = props;

  return (
    <CourseLessonRoot>
      <Markdown components={components}>{content}</Markdown>
    </CourseLessonRoot>
  )
}

CourseLesson.propTypes = {
  content: PropTypes.string.isRequired
}
