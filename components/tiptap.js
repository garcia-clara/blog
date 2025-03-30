import { Color } from '@tiptap/extension-color'
import { useCallback, useEffect } from 'react'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { Button } from '@/components/ui/button'
import Underline from '@tiptap/extension-underline'
import { Bold, Italic, Strikethrough, Code, Undo, Redo, List, ListOrdered } from 'lucide-react'
import { Underline as UnderlineIcon } from 'lucide-react'
import { Link as LinkIcon } from 'lucide-react'
import Link from '@tiptap/extension-link'

const MenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    } catch (e) {
      alert(e.message)
    }
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className='control-group'>
      <div className='button-group flex gap-1 flex-wrap'>
        <Button
          variant='ghost'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <Bold />
        </Button>
        <Button
          variant='ghost'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <Italic />
        </Button>
        <Button
          variant='ghost'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().setUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          <UnderlineIcon />
        </Button>
        <Button
          variant='ghost'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <Strikethrough />
        </Button>
        <Button
          variant='ghost'
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <Code />
        </Button>
        <Button
          variant='ghost'
          onClick={setLink}
          className={editor.isActive('link') ? 'is-active' : ''}
        >
          <LinkIcon />
        </Button>
        <Button
          variant='ghost'
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </Button>
        <Button
          variant='ghost'
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </Button>
        <Button
          variant='ghost'
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          H3
        </Button>
        <Button
          variant='ghost'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <List />
        </Button>
        <Button
          variant='ghost'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <ListOrdered />
        </Button>
        <Button
          variant='ghost'
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo />
        </Button>
        <Button
          variant='ghost'
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo />
        </Button>
      </div>
    </div>
  )
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Underline,
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: 'https',
    protocols: ['http', 'https'],
    isAllowedUri: (url, ctx) => {
      try {
        // construct URL
        const parsedUrl = url.includes(':')
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`)

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false
        }

        // disallowed protocols
        const disallowedProtocols = ['ftp', 'file', 'mailto']
        const protocol = parsedUrl.protocol.replace(':', '')

        if (disallowedProtocols.includes(protocol)) {
          return false
        }

        // only allow protocols specified in ctx.protocols
        const allowedProtocols = ctx.protocols.map((p) => (typeof p === 'string' ? p : p.scheme))

        if (!allowedProtocols.includes(protocol)) {
          return false
        }

        // disallowed domains
        const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
        const domain = parsedUrl.hostname

        if (disallowedDomains.includes(domain)) {
          return false
        }

        // all checks have passed
        return true
      } catch {
        return false
      }
    },
    shouldAutoLink: (url) => {
      try {
        // construct URL
        const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

        // only auto-link if the domain is not in the disallowed list
        const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
        const domain = parsedUrl.hostname

        return !disallowedDomains.includes(domain)
      } catch {
        return false
      }
    },
  }),
]

const content = `
<h2>
  Hi there,
</h2>
`

export default ({ onChange }) => {
  const { editor } = useCurrentEditor()

  useEffect(() => {
    if (!editor) return

    const updateContent = () => {
      const content = editor.getHTML() // Get the current content as HTML
      if (onChange) {
        onChange(content) // Call the onChange callback with the content
      }
    }

    editor.on('update', updateContent) // Listen for content updates

    return () => {
      editor.off('update', updateContent) // Cleanup listener on unmount
    }
  }, [editor, onChange])

  return (
    <>
      <style>
        {`
          .ProseMirror ul {
            list-style-type: disc;
            margin-left: 1.5em;
          }
          .ProseMirror ol {
            list-style-type: decimal;
            margin-left: 1.5em;
          }
        `}
      </style>
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
      ></EditorProvider>
    </>
  )
}
