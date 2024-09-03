import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const InsightsDisplay = ({ data }) => {
  if (!data || data.length === 0) {
    return <Text>No data to display.</Text>;
  }

  const validDataCounts = data.map(item =>
    Object.values(item).filter(value => value !== null && value !== undefined && value !== '' && value !== 0).length
  );

  const maxValidDataCount = Math.max(...validDataCounts);
  const filteredData = data.filter((item, index) => validDataCounts[index] === maxValidDataCount);

  const formatValue = (key, value, indicatorValue) => {
    if (key === 'value' && indicatorValue && indicatorValue.includes('%') && !isNaN(value)) {
      return `${Number(value).toPrecision(3)}%`;
    }
    return value;
  };

  const renderItem = ({ item }) => {
    const { indicator, country, ...rest } = item;
    const indicatorValue = indicator?.value || null;
    const countryValue = country?.value || null;

    return (
      <View style={styles.itemContainer}>
        {indicatorValue && (
          <View style={styles.itemRow}>
            <Text style={styles.key}>Indicator:</Text>
            <Text style={styles.value}>{indicatorValue}</Text>
          </View>
        )}
        {countryValue && (
          <View style={styles.itemRow}>
            <Text style={styles.key}>Country:</Text>
            <Text style={styles.value}>{countryValue}</Text>
          </View>
        )}
        {Object.entries(rest).map(([key, value]) => (
          value !== null && value !== undefined && value !== '' && value !== 0 && (
            <View key={key} style={styles.itemRow}>
              <Text style={styles.key}>{key}:</Text>
              <Text style={styles.value}>
                {typeof value === 'object' && value !== null
                  ? JSON.stringify(value)
                  : formatValue(key, String(value), indicatorValue)}
              </Text>
            </View>
          )
        ))}
      </View>
    );
  };

  return (
    <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 8,
    borderRadius: 5,
    elevation: 1,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  key: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    flexShrink: 1,
  },
});

export default InsightsDisplay;
