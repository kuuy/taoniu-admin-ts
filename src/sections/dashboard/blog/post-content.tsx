// NOTE: To reduce the bundle size, we did not include react-syntax-highlighter types package.

import type { FC } from 'react'

import Markdown, { Components } from 'react-markdown'

// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

import { styled } from '@mui/material/styles'

import { codeStyle } from '~/src/utils/code-style'

const Code: Components['code'] = (props) => {
  const { node, className, children, ...other } = props;

  const language = /language-(\w+)/.exec(className || '');

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
  code: Code
}

const PostContentRoot = styled('div')(
  ({ theme }) => ({
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    '& code': {
      color: theme.palette.primary.main,
      fontFamily: 'Inconsolata, Monaco, Consolas, \'Courier New\', Courier, monospace',
      fontSize: 14,
      paddingLeft: 2,
      paddingRight: 2
    },
    '& h2': {
      fontSize: theme.typography.h5.fontSize,
      fontWeight: theme.typography.fontWeightBold,
      lineHeight: theme.typography.h5.lineHeight,
      marginBottom: theme.spacing(3)
    },
    '& h3': {
      fontSize: theme.typography.h3.fontSize,
      fontWeight: theme.typography.fontWeightBold,
      lineHeight: theme.typography.h3.lineHeight,
      marginBottom: theme.spacing(3)
    },
    '& p': {
      fontSize: theme.typography.body1.fontSize,
      lineHeight: theme.typography.body1.lineHeight,
      marginBottom: theme.spacing(2)
    },
    '& li': {
      fontSize: theme.typography.body1.fontSize,
      lineHeight: theme.typography.body1.lineHeight,
      marginBottom: theme.spacing(1)
    }
  })
);

interface PostContentProps {
  content: string;
}

export const PostContent: FC<PostContentProps> = (props) => {
  const { content } = props;

  return (
    <PostContentRoot>
      <Markdown components={components}>{content}</Markdown>
    </PostContentRoot>
  )
}
