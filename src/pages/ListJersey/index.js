import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {HeaderComponent, ListJerseys, ListLiga} from '../../components';
import {colors, fonts} from '../../utils';
import {dummyJerseys, dummyLigas} from '../../data';
import {Jarak} from '../../components';

export default class ListJersey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ligas: dummyLigas,
      jerseys: dummyJerseys,
    };
  }

  render() {
    const {ligas, jerseys} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.page}>
        <HeaderComponent navigation={navigation} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.pilihLiga}>
            <ListLiga ligas={ligas} />
          </View>
          <View style={styles.pilihJersey}>
            <Text style={styles.label}>
              Pilih <Text style={styles.boldLabel}>Jersey</Text> Yang Anda
              Inginkan
            </Text>
            <ListJerseys jerseys={jerseys} />
          </View>

          <Jarak height={100} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.white},
  container: {
    marginTop: -30,
  },
  pilihLiga: {
    marginHorizontal: 30,
  },
  pilihJersey: {
    marginHorizontal: 30,
    marginTop: 10,
  },
  label: {
    fontSize: 18,
    fontFamily: fonts.primary.regular,
  },
  boldLabel: {
    fontSize: 18,
    fontFamily: fonts.primary.bold,
  },
});
