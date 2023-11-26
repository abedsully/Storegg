import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DetailParams } from '../detail/Detail';
import { HomeParams } from '../home/Home';


export type RootStackParamList = {
  Home: HomeParams;
  Detail: DetailParams;
  MyProduct: undefined; 
  MyCoin: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}