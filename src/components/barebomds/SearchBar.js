import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

import { StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class SearchBox extends React.Component {
  static propTypes = {
    searchDeals: PropTypes.func.isRequired,
    initialSearchTerm: PropTypes.string.isRequired,
  };
  state = {
    searchTerm: this.props.initialSearchTerm,
  };
  debouncedSearchDeals = debounce(this.props.searchDeals, 300);
  handleChange = (searchTerm) => {
    this.setState({ searchTerm }, () => {
      this.debouncedSearchDeals(this.state.searchTerm);
    });
  };
  render() {
    return (
      <SearchBar
        value={this.state.searchTerm}
        placeholder="Search All Deals"
        onChangeText={this.handleChange}
        inputStyle={styles.input}
        containerStyle={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e8e8e8',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  input: {
    backgroundColor: '#fbfbfb',
  },
});
