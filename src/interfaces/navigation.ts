import {NativeStackNavigationProp} from 'react-native-screens/native-stack';
import {Character} from './interfaces';

export interface RootStackParamList {
  Home: undefined;
  CharacterDetail: {character: Character};
  [key: string]: {character?: Character} | undefined;
}

export type ScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
