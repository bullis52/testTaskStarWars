import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {Character} from '../interfaces/interfaces';
import {useNavigation} from '@react-navigation/native';
import {ScreenNavigationProp} from '../interfaces/navigation';

interface CharacterItemProps {
  item: Character;
  addToFavorites: (character: Character) => void;
  removeFromFavorites: (character: Character) => void;
  favorites: Character[];
}

const CharacterItem: React.FC<CharacterItemProps> = ({
  item,
  addToFavorites,
  removeFromFavorites,
  favorites,
}) => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const navigateToDetail = () => {
    navigation.navigate('CharacterDetail', {character: item});
  };

  return (
    <View style={styles.characterItemContainer}>
      <TouchableOpacity onPress={navigateToDetail}>
        <Text style={styles.characterItem}>{item.name}</Text>
      </TouchableOpacity>
      <CheckBox
        value={favorites.includes(item)}
        onValueChange={value => {
          value ? addToFavorites(item) : removeFromFavorites(item);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  characterItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  characterItem: {
    fontSize: 18,
  },
});

export default CharacterItem;
