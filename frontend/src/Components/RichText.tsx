'use client'

import React from 'react'
import {
  DefaultNodeTypes,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import styles from './RichText.module.css'

type NodeTypes = DefaultNodeTypes

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/blog/${slug}` : `/${slug}`
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

type Props = {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  
  return (
    <div className={styles.mediumStyleContent}>
      <ConvertRichText
        converters={jsxConverters}
        className={`payload-richtext ${
          enableGutter ? 'container' : 'max-w-none'
        } ${
          enableProse ? 'mx-auto prose md:prose-md dark:prose-invert' : ''
        } ${className || ''}`}
        {...rest}
      />
    </div>
  )
}
