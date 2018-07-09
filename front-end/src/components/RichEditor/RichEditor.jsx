import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Nav, NavItem, NavLink, TabContent, TabPane, Input } from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export class RichEditor extends Component {
  constructor(props) {
    super(props);

    this.modules = {
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image'],
          ['clean'],
        ],
      },
    };

    this.formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image',
    ];

    this.state = {
      activeTab: 'editor',
    };

    this.toggle = (tab) => {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab,
        });
      }
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
            Editor
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={this.state.activeTab === 'code' ? 'active' : ''}
            onClick={() => { this.toggle('code'); }}
          >
            Código HTML
          </NavLink>
        </NavItem>
      </Nav>,
      <TabContent activeTab={this.state.activeTab}>
        { /* Prevent Quill to bug value when editing html directly */
          (this.state.activeTab === 'editor') && (
            <TabPane tabId="editor">
              <ReactQuill
                theme="snow"
                modules={this.modules}
                formats={this.formats}
                value={this.props.value}
                onChange={this.props.onChange}
              />
            </TabPane>
          )
        }
        <TabPane tabId="code">
          <Input
            type="textarea"
            value={this.props.value}
            onChange={(event) => {
              this.props.onChange(event.target.value);
            }}
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