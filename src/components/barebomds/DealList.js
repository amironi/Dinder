import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';
import DealItem from './DealItem';

class DealList extends React.Component {
  static propTypes = {
    deals: PropTypes.array.isRequired,
    onItemPress: PropTypes.func.isRequired,
  };
  render() {
    return (
      <View style={styles.list}>
        <FlatList
          data={this.props.deals}
          renderItem={({ item }) => (
            <DealItem deal={item} onPress={this.props.onItemPress} />
          )}
          ListFooterComponent={<View style={styles.footer}></View>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  footer: {
    height: 150,
  },
});

export default DealList;
