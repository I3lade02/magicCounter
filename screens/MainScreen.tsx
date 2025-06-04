import React, { useState } from 'react';
import { View, StyleSheet, Button, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import LifeCounter from '../components/LifeCounter';
import { useTheme } from '../context/themeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type Player = {
  id: number;
  name: string;
  life: number;
};

const MainScreen: React.FC<Props> = ({ route, navigation }) => {
  const { playerCount } = route.params;
  const { colors, toggleTheme } = useTheme();

  const [players, setPlayers] = useState<Player[]>(
    Array.from({ length: playerCount }, (_, i) => ({
      id: i,
      name: `Player ${i + 1}`,
      life: 40,
    }))
  );

  const updateLife = (id: number, delta: number) => {
    setPlayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, life: p.life + delta } : p))
    );
  };

  const resetGameToSetup = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Setup' }],
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <LifeCounter
            playerName={item.name}
            life={item.life}
            onIncrease={() => updateLife(item.id, 1)}
            onDecrease={() => updateLife(item.id, -1)}
          />
        )}
      />
      <View style={styles.buttons}>
        <Button title="Reset Game" onPress={resetGameToSetup} color={colors.button} />
        <Button title="Toggle Theme" onPress={toggleTheme} color={colors.button} />
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 10,
  },
  buttons: {
    alignSelf: 'center',
    gap: 10,
    marginBottom: 20,
  },
});
