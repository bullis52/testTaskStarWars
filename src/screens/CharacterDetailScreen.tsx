import React from 'react';
import {Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

interface Character {
  name: string;
  gender: string;
  url: string;
}

interface RouteParams {
  character: Character;
}

export const CharacterDetailScreen = ({}) => {
  const {params} = useRoute();
  const {character} = params as RouteParams;

  return (
    <View>
      <Text>Name: {character.name}</Text>
      <Text>Gender: {character.gender}</Text>
      <Text>URL: {character.url}</Text>
    </View>
  );
};
