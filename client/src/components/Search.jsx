import React, { Component } from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-dom';
import Autocomplete from './Autocomplete';

const searchClient = algoliasearch(
  '3EJTXIKS8B',
  '092aa257d26c6e1fb8733a3c0229b176'
);

class Search extends Component {
  state = {
    query: '',
  };

  onSuggestionSelected = (_, { suggestion }) => {
    this.setState({
      query: suggestion.name,
    });
  };

  onSuggestionCleared = () => {
    this.setState({
      query: '',
    });
  };

  render() {
    const { query } = this.state;
    return (
      <InstantSearch indexName='Question' searchClient={searchClient}>
        <Autocomplete
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionCleared={this.onSuggestionCleared}
        />
      </InstantSearch>
    )
  }
}

export default Search;