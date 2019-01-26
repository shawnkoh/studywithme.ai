import React, { Component } from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import { isKeyHotkey } from 'is-hotkey'
import { IconButton, Divider } from '@material-ui/core';
import {
  FormatBoldRounded,
  FormatItalicRounded,
  FormatUnderlinedRounded,
  CodeRounded,
  FormatQuoteRounded,
  FormatListNumberedRounded,
  FormatListBulletedRounded,
  LooksOneRounded,
  LooksTwoRounded
} from '@material-ui/icons';

const DEFAULT_NODE = 'paragraph'

const isBoldHotkey = isKeyHotkey('mod+b')
const isItalicHotkey = isKeyHotkey('mod+i')
const isUnderlinedHotkey = isKeyHotkey('mod+u')
const isCodeHotkey = isKeyHotkey('mod+`')

class CustomEditor extends Component {
  constructor(props) {
    super(props)
    let { value, disableDefaultValue, defaultLength } = this.props;

    var initialValue;
    if (value) {
      initialValue = Value.fromJSON(JSON.parse(value));
    } else if (disableDefaultValue) {
      initialValue = Plain.deserialize('');
    } else {
      initialValue = Plain.deserialize('\n'.repeat(defaultLength || 4))
    };

    this.state = {
      initialValue: initialValue,
      value: initialValue,
    };
  };

  componentDidUpdate(prevProps) {
    let { value } = this.props;
    if (value !== prevProps.value) {
      var initialValue;
      if (value) {
        initialValue = Value.fromJSON(JSON.parse(value));
      } else {
        initialValue = Plain.deserialize('');
      };
      this.setState({
        initialValue: initialValue,
        value: initialValue,
      });
    }
  }

  handleChange = ({ value }) => {
    this.setState({ value: value });
  };

  handleBlur = (event) => {
    let { readOnly, handleSave, clearAfterSave } = this.props;
    let { initialValue, value } = this.state;
    
    if (readOnly || !handleSave) return;

    // this does not effectively prevent editing questions with no changes in their value, need to look further
    if (initialValue.document !== value.document) {
      let saveValue = Plain.serialize(value);
      let saveValueJSON = JSON.stringify(value.toJSON());

      handleSave(saveValue, saveValueJSON);

      if (clearAfterSave) {
        let clearValue = Plain.deserialize('');
        this.setState({ initialValue: clearValue, value: clearValue });
      }
    }
  }

  hasMark = type => {
    const { value } = this.state
    return value.activeMarks.some(mark => mark.type === type)
  }

  hasBlock = type => {
    const { value } = this.state
    return value.blocks.some(node => node.type === type)
  }

  ref = editor => {
    this.editor = editor
  }

  renderToolbar = () => (
    <React.Fragment>
      {this.renderMarkButton('bold', <FormatBoldRounded />)}
      {this.renderMarkButton('italic', <FormatItalicRounded />)}
      {this.renderMarkButton('underlined', <FormatUnderlinedRounded />)}
      {this.renderMarkButton('code', <CodeRounded />)}
      {this.renderBlockButton('heading-one', <LooksOneRounded />)}
      {this.renderBlockButton('heading-two', <LooksTwoRounded />)}
      {this.renderBlockButton('block-quote', <FormatQuoteRounded />)}
      {this.renderBlockButton('numbered-list', <FormatListNumberedRounded />)}
      {this.renderBlockButton('bulleted-list', <FormatListBulletedRounded />)}
      <Divider />
    </React.Fragment>
  )

  render() {
    let { placeholder, readOnly, toolbar } = this.props;
    let { value } = this.state;
    return (
      <React.Fragment>
      {toolbar ? this.renderToolbar() :  null}
      <Editor
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        renderNode={this.renderNode}
        renderMark={this.renderMark}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        ref={this.ref}
        onKeyDown={this.onKeyDown}
      />
      </React.Fragment>
    )
  }

  renderMarkButton = (type, icon) => {
    const isActive = this.hasMark(type)

    return (
      <IconButton
        color={isActive ? 'primary' : 'default'}
        onMouseDown={event => this.onClickMark(event, type)}
      >
        {icon}
      </IconButton>
    )
  }

  renderBlockButton = (type, icon) => {
    let isActive = this.hasBlock(type)

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const { value: { document, blocks } } = this.state

      if (blocks.size > 0) {
        const parent = document.getParent(blocks.first().key)
        isActive = this.hasBlock('list-item') && parent && parent.type === type
      }
    }

    return (
      <IconButton
        color={isActive ? 'primary' : 'default'}
        onMouseDown={event => this.onClickBlock(event, type)}
      >
        {icon}
      </IconButton>
    )
  }

  renderNode = (props, editor, next) => {
    const { attributes, children, node } = props

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'list-item':
        return <li {...attributes}>{children}</li>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      default:
        return next()
    }
  }

  renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>
      case 'code':
        return <code {...attributes}>{children}</code>
      case 'italic':
        return <em {...attributes}>{children}</em>
      case 'underlined':
        return <u {...attributes}>{children}</u>
      default:
        return next()
    }
  }

  onKeyDown = (event, editor, next) => {
    let mark

    if (isBoldHotkey(event)) {
      mark = 'bold'
    } else if (isItalicHotkey(event)) {
      mark = 'italic'
    } else if (isUnderlinedHotkey(event)) {
      mark = 'underlined'
    } else if (isCodeHotkey(event)) {
      mark = 'code'
    } else {
      return next()
    }

    event.preventDefault()
    editor.toggleMark(mark)
  }

  onClickMark = (event, type) => {
    event.preventDefault()
    this.editor.toggleMark(type)
  }

  onClickBlock = (event, type) => {
    event.preventDefault()

    const { editor } = this
    const { value } = editor
    const { document } = value

    // Handle everything but list buttons.
    if (type !== 'bulleted-list' && type !== 'numbered-list') {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock('list-item')

      if (isList) {
        editor
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else {
        editor.setBlocks(isActive ? DEFAULT_NODE : type)
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = this.hasBlock('list-item')
      const isType = value.blocks.some(block => {
        return !!document.getClosest(block.key, parent => parent.type === type)
      })

      if (isList && isType) {
        editor
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock('bulleted-list')
          .unwrapBlock('numbered-list')
      } else if (isList) {
        editor
          .unwrapBlock(
            type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
          )
          .wrapBlock(type)
      } else {
        editor.setBlocks('list-item').wrapBlock(type)
      }
    }
  }
}

export default CustomEditor;