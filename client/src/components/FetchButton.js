import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../store/actions';

const mapStateToProps = (state) => ({
  isFetching: state.topics.isFetching ? 'true' : 'false'
})

const FetchButton = ({isFetching, dispatch}) => (
  <label>
    <span>isFetching: {isFetching}</span>
    <input
      type='button'
      onClick={(event) => {
        event.preventDefault();
        dispatch(actions.fetchTopicsRequest())
      }}
    />
  </label>
)

export default connect(mapStateToProps)(FetchButton);