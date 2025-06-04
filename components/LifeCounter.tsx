import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../context/themeContext';

type LifeCounterProps = {
  playerName: string;
  life: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const LifeCounter: React.FC<LifeCounterProps> = ({
  playerName,
  life,
  onIncrease,
  onDecrease,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.counter, { backgroundColor: colors.card }]}>
      <Text style={[styles.name, { color: colors.text }]}>{playerName}</Text>
      <Text style={[styles.life, { color: colors.text }]}>{life}</Text>
      <View style={styles.buttons}>
        <Button title="+" onPress={onIncrease} />
        <Button title="-" onPress={onDecrease} />
      </View>
    </View>
  );
};

export default LifeCounter;

const styles = StyleSheet.create({
  counter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 16,
    borderRadius: 12,
    minWidth: 150,
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
  },
  life: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
});
