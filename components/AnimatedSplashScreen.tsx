import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native';

const { width, height } = Dimensions.get('window');

interface AnimatedSplashScreenProps {
  onFinish: () => void;
}

export default function AnimatedSplashScreen({ onFinish }: AnimatedSplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const rotateYAnim = useRef(new Animated.Value(0)).current;
  const rotateXAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Fade in and scale up with 3D flip
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 10,
          friction: 2,
          useNativeDriver: true,
        }),
        Animated.timing(rotateYAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // 3D tilt animation
      Animated.timing(rotateXAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      // Wait a bit
      Animated.delay(400),
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish();
    });
  }, []);

  const rotateY = rotateYAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const rotateX = rotateXAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '15deg', '0deg'],
  });

  return (
    <View style={styles.container}>
      {/* Animated logo */}
      <Animated.View
        style={[
          {
            opacity: fadeAnim,
            transform: [
              { perspective: 1000 },
              { scale: scaleAnim },
              { rotateY: rotateY },
              { rotateX: rotateX },
            ],
          },
        ]}
      >
        <Image
          source={require('../assets/images/splash-icon.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>

      {/* Animated dots loader */}
      <Animated.View
        style={[
          styles.dotsContainer,
          { opacity: fadeAnim },
        ]}
      >
        <LoadingDots />
      </Animated.View>
    </View>
  );
}

function LoadingDots() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (animValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const dot1Anim = animateDot(dot1, 0);
    const dot2Anim = animateDot(dot2, 200);
    const dot3Anim = animateDot(dot3, 400);

    dot1Anim.start();
    dot2Anim.start();
    dot3Anim.start();

    return () => {
      dot1Anim.stop();
      dot2Anim.stop();
      dot3Anim.stop();
    };
  }, []);

  const dotStyle = (animValue: Animated.Value) => ({
    opacity: animValue,
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
    ],
  });

  return (
    <View style={styles.dots}>
      <Animated.View style={[styles.dot, dotStyle(dot1)]} />
      <Animated.View style={[styles.dot, dotStyle(dot2)]} />
      <Animated.View style={[styles.dot, dotStyle(dot3)]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: height * 0.15,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#17B5A3',
  },
});
