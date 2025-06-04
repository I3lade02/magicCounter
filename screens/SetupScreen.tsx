import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useTheme } from '../context/themeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Setup'>;

const SetupScreen = ({ navigation }: Props) => {
  const { colors } = useTheme();
  const [playerCount, setPlayerCount] = useState(2);
  const [names, setNames] = useState<string[]>(['', '']);

  const handleCountChange = (count: number) => {
    setPlayerCount(count);
    setNames(Array(count).fill('')); // Reset names array
  };

  const updateName = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const startGame = () => {
    const defaultedNames = names.map((n, i) =>
      n.trim() === '' ? `Player ${i + 1}` : n.trim()
    );
    navigation.navigate('Home', {
      playerCount,
      playerNames: defaultedNames,
    });
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.inner}
    >
      <Text style={[styles.title, { color: colors.text }]}>
        Choose Player Count
      </Text>

      <View style={styles.options}>
        {[2, 3, 4].map((num) => (
          <Button
            key={num}
            title={`${num} Players`}
            onPress={() => handleCountChange(num)}
            color={playerCount === num ? colors.button : undefined}
          />
        ))}
      </View>

      <Text style={[styles.subtitle, { color: colors.text }]}>
        Enter Player Names
      </Text>
      {Array.from({ length: playerCount }, (_, i) => (
        <TextInput
          key={i}
          placeholder={`Player ${i + 1}`}
          placeholderTextColor={colors.text + '88'}
          value={names[i]}
          onChangeText={(text) => updateName(i, text)}
          style={[
            styles.input,
            {
              borderColor: colors.card,
              color: colors.text,
              backgroundColor: colors.card,
            },
          ]}
        />
      ))}

      <View style={styles.start}>
        <Button title="Start Game" onPress={startGame} color={colors.button} />
      </View>
    </ScrollView>
  );
};

export default SetupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    gap: 20,
    alignItems: 'stretch',
    marginTop: 270
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  start: {
    marginTop: 30,
  },
});
