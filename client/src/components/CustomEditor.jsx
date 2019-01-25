import React, { Component } from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';

class CustomEditor extends Component {
  constructor(props) {
    super(props)
    let { value } = this.props;

    var initialValue;
    if (value) {
      initialValue = Value.fromJSON(JSON.parse(value));
    } else {
      initialValue = Plain.deserialize('');
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
    
    if (readOnly) return;

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

  render() {
    let { placeholder, readOnly } = this.props;
    let { value } = this.state;
    return (
      <Editor
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        renderNode={this.renderNode}
        renderMark={this.renderMark}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
      />
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
}

export default CustomEditor;