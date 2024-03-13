import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import CharacterItem from '../components/CharacterItem';
import {Character} from '../interfaces/interfaces';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {fetchCharacters} from '../api';
import {useAppSelector} from '../hooks/useAppSelector';
import {resetState, setPage} from '../redux/charactersSlice';

const HomeScreen: React.FC = () => {
  const characters = useAppSelector(state => state.characters.characters);
  const status = useAppSelector(state => state.characters.status);
  const page = useAppSelector(state => state.characters.page);

  const dispatch = useAppDispatch();

  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    dispatch(fetchCharacters(page));
  }, [dispatch, page]);

  const addToFavorites = (character: Character) => {
    setFavorites(prevState => [...prevState, character]);
  };

  const removeFromFavorites = (character: Character) => {
    setFavorites(prevState => prevState.filter(fav => fav !== character));
  };

  const resetStatistics = () => {
    dispatch(resetState());
  };

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };

  const genderTotals = favorites.reduce(
    (totals, character) => {
      if (character.gender === 'male') {
        totals.male++;
      } else if (character.gender === 'female') {
        totals.female++;
      } else {
        totals.other++;
      }
      return totals;
    },
    {male: 0, female: 0, other: 0},
  );

  if (status === 'loading' && !characters.length) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={characters}
        renderItem={({item}) => (
          <CharacterItem
            item={item}
            addToFavorites={addToFavorites}
            removeFromFavorites={removeFromFavorites}
            favorites={favorites}
          />
        )}
        keyExtractor={item => item.name}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={resetStatistics}>
          <Text style={styles.resetButton}>Reset</Text>
        </TouchableOpacity>
        <Text style={styles.totals}>
          Male: {genderTotals.male}, Female: {genderTotals.female}, Other:{' '}
          {genderTotals.other}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  resetButton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  totals: {
    fontSize: 16,
    marginRight: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
