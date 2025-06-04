import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useTheme } from '../context/themeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Setup'>;

const SetupScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const [playerCount, setPlayerCount] = useState(2);

  const startGame = () => {
    navigation.navigate('Home', { playerCount });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Choose Player Count</Text>
      <View style={styles.options}>
        {[2, 3, 4].map((num) => (
          <Button
            key={num}
            title={`${num} Players`}
            onPress={() => setPlayerCount(num)}
            color={playerCount === num ? colors.button : undefined}
          />
        ))}
      </View>
      <View style={styles.start}>
        <Button title="Start Game" onPress={startGame} color={colors.button} />
      </View>
    </View>
  );
};

export default SetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  options: {
    gap: 12,
  },
  start: {
    marginTop: 40,
  },
});
