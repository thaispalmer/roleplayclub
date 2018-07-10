import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, TabContent, TabPane, Input } from 'reactstrap';
import CKEditor from 'react-ckeditor-component';

export class RichEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 'editor',
      content: this.props.value,
    };

    this.toggle = (tab) => {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab,
        });
      }
    };

    this.updateContent = (content) => {
      this.setState({
        content,
      }, () => {
        this.props.onChange(this.state.content);
      });
    };
  }

  render() {
    return ([
      <Nav tabs>
        <NavItem>
          <NavLink
            className={this.state.activeTab === 'editor' ? 'active' : ''}
            onClick={() => { this.toggle('editor'); }}
          >
            Editor Visual
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={this.state.activeTab === 'source' ? 'active' : ''}
            onClick={() => { this.toggle('source'); }}
          >
            Código Fonte
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={this.state.activeTab === 'preview' ? 'active' : ''}
            onClick={() => { this.toggle('preview'); }}
          >
            Pré-visualização
          </NavLink>
        </NavItem>
      </Nav>,
      <TabContent activeTab={this.state.activeTab}>
        {(this.state.activeTab === 'editor') && (
          <TabPane tabId="editor">
            <CKEditor
              content={this.props.value}
              config={{
                allowedContent: true,
                toolbarGroups: [
                  { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                  { name: 'insert', groups: ['insert'] },
                  { name: 'links', groups: ['links'] },
                  { name: 'clipboard', groups: ['undo', 'clipboard'] },
                  { name: 'tools', groups: ['tools'] },
                ],
                removeButtons: 'Subscript,Superscript,Anchor,PasteFromWord,PasteText',
              }}
              events={{
                change: (event) => {
                  this.props.onChange(event.editor.getData());
                },
              }}
            />
          </TabPane>
        )}
        <TabPane tabId="source">
          <Input
            type="textarea"
            value={this.props.value}
            rows={10}
            onChange={(event) => {
              this.props.onChange(event.target.value);
            }}
          />
        </TabPane>
        <TabPane tabId="preview">
          <div
            className="mt-3"
            dangerouslySetInnerHTML={{ __html: this.props.value }}
          />
        </TabPane>
      </TabContent>,
    ]);
  }
}

RichEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

RichEditor.defaultProps = {
  value: '',
};

export default RichEditor;
