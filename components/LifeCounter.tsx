import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import * as Haptics from 'expo-haptics';
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
  const [localLife, setLocalLife] = useState(life);
  const [changeDisplay, setChangeDisplay] = useState<number | null>(null);
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delta = life - localLife;
    if (delta === 0) return;

    let current = localLife;
    const direction = Math.sign(delta);

    const interval = setInterval(() => {
      current += direction;
      setLocalLife(current);
      setChangeDisplay(current - life);

      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      if (current === life) {
        clearInterval(interval);
        setTimeout(() => setChangeDisplay(null), 600);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [life]);

  const animatedStyle = {
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [10, -10],
        }),
      },
    ],
  };

  return (
    <View style={[styles.counter, { backgroundColor: colors.card }]}>
      <Text style={[styles.name, { color: colors.text }]}>{playerName}</Text>
      <Text style={[styles.life, { color: colors.text }]}>{localLife}</Text>

      {changeDisplay !== null && changeDisplay !== 0 && (
        <Animated.Text
          style={[
            styles.changeText,
            animatedStyle,
            {
              color: changeDisplay < 0 ? '#f44336' : '#4caf50',
            },
          ]}
        >
          {changeDisplay > 0 ? `+${Math.abs(changeDisplay)}` : changeDisplay}
        </Animated.Text>
      )}

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            onIncrease();
          }}
          style={[styles.button, { backgroundColor: '#4caf50' }]}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            onDecrease();
          }}
          style={[styles.button, { backgroundColor: '#f44336' }]}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LifeCounter;

const styles = StyleSheet.create({
  counter: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 16,
    borderRadius: 12,
  },
  name: {
    fontSize: 18,
    marginBottom: 4,
  },
  life: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  changeText: {
    fontSize: 24,
    position: 'absolute',
    top: 30,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
});
