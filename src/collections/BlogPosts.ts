import React from 'react'
import {
  BoldFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  lexicalEditor,
  LinkFeature,
  ParagraphFeature,
  UnderlineFeature,
} from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'

export interface BlogPost {
  _id: string
  title: string
  content?: any
  excerpt?: string
  author: {
    relationTo: 'users'
    value: string | number
  }
  publishDate: string
  categories: string[]
  tags: string[]
  featuredImage?: {
    relationTo: 'media'
    value: string | number
  }
}

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  access: {
    read: () => true,
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature(),
          LinkFeature(),
          ParagraphFeature(),
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'excerpt',
      type: 'text',
      required: false,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: ['users'],
      required: true,
    },
    {
      name: 'publishDate',
      type: 'date',
      required: true,
    },
    {
      name: 'rating',
      type: 'select',
      required: false,
      options: [
        {
          label: '⭐ (1.0)',
          value: '1',
        },
        {
          label: '⭐½ (1.5)',
          value: '1.5',
        },
        {
          label: '⭐⭐ (2.0)',
          value: '2',
        },
        {
          label: '⭐⭐½ (2.5)',
          value: '2.5',
        },
        {
          label: '⭐⭐⭐ (3.0)',
          value: '3',
        },
        {
          label: '⭐⭐⭐½ (3.5)',
          value: '3.5',
        },
        {
          label: '⭐⭐⭐⭐ (4.0)',
          value: '4',
        },
        {
          label: '⭐⭐⭐⭐½ (4.5)',
          value: '4.5',
        },
        {
          label: '⭐⭐⭐⭐⭐ (5.0)',
          value: '5',
        },
      ],
      defaultValue: '3',
    },
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: ['media'],
      required: false,
    },
  ],
}
