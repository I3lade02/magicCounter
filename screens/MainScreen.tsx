import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useTheme } from '../context/themeContext';
import LifeCounter from '../components/LifeCounter';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

type Player = {
  id: number;
  name: string;
  life: number;
};

const MainScreen: React.FC<Props> = ({ route, navigation }) => {
  const { playerCount, playerNames } = route.params;
  const { colors, toggleTheme } = useTheme();

  const isTwoPlayerMode = playerCount === 2;
  const isThreePlayerMode = playerCount === 3;

  const [players, setPlayers] = useState<Player[]>(
    Array.from({ length: playerCount }, (_, i) => ({
      id: i,
      name: playerNames[i] || `Player ${i + 1}`,
      life: 40,
    }))
  );

  const updateLife = (id: number, delta: number) => {
    setPlayers((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, life: p.life + delta } : p
      )
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
      {isTwoPlayerMode ? (
        <View style={styles.verticalContainer}>
          {players.map((player) => (
            <View key={player.id} style={styles.playerHalf}>
              <View style={styles.cardWrapper}>
                <LifeCounter
                  playerName={player.name}
                  life={player.life}
                  onIncrease={() => updateLife(player.id, 1)}
                  onDecrease={() => updateLife(player.id, -1)}
                />
              </View>
            </View>
          ))}
        </View>
      ) : isThreePlayerMode ? (
        <View style={styles.threePlayerContainer}>
          <View style={styles.threeTopRow}>
            {players.slice(0, 2).map((player) => (
              <View key={player.id} style={styles.cardHalf}>
                <LifeCounter
                  playerName={player.name}
                  life={player.life}
                  onIncrease={() => updateLife(player.id, 1)}
                  onDecrease={() => updateLife(player.id, -1)}
                />
              </View>
            ))}
          </View>
          <View style={styles.threeBottomRow}>
            <View style={styles.cardFull}>
              <LifeCounter
                playerName={players[2].name}
                life={players[2].life}
                onIncrease={() => updateLife(players[2].id, 1)}
                onDecrease={() => updateLife(players[2].id, -1)}
              />
            </View>
          </View>
        </View>
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.gridList}
          columnWrapperStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <LifeCounter
              playerName={item.name}
              life={item.life}
              onIncrease={() => updateLife(item.id, 1)}
              onDecrease={() => updateLife(item.id, -1)}
            />
          )}
        />
      )}

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
  verticalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  playerHalf: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  threePlayerContainer: {
  flex: 1,
  justifyContent: 'center',
  paddingVertical: 20,
  gap: 20,
},
threeTopRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingHorizontal: 10,
  gap: 10,
},
threeBottomRow: {
  marginTop: 20,
  alignItems: 'center',
},
cardWrapper: {
  width: '45%', // fixed percentage width
  maxWidth: 300,
  minWidth: 160,
},
gridList: {
  padding: 10,
  gap: 10,
},
buttons: {
  alignSelf: 'center',
  gap: 10,
  marginBottom: 20,
},
cardHalf: {
  width: '48%',
  maxWidth: 300,
},
cardFull: {
  width: '95%',
  maxWidth: 620,
},
});
