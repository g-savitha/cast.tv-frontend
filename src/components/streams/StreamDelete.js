import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';

import Modal from '../Modal';
import history from '../../history';
import { Link } from 'react-router-dom';

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <>
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui button negative"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  }
  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    } else {
      return (
        <>
          Are you sure you want to delete stream with title :{' '}
          <strong>{this.props.stream.title}</strong> ?
        </>
      );
    }
  }
  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
