import React, { useEffect } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View, Animated } from 'react-native';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

import { Images } from '@src/assets';
import { useColor } from '@src/context/ThemeContext';
import { DrawerParamList } from '../types/navigation';
import { StyledImage, StyledText, StyledView } from './styled/StyledComponents';

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
    const { color } = useColor();
    const navigation = props.navigation;
    const appVersion = '1.0.0'; // TODO: Get from app config
    const fadeAnim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, []);

    const menuItems = [
        {
            title: 'Home',
            icon: 'home-outline',
            gradient: ['#FF6B6B', '#FF8E8E'],
            onPress: () => navigation.navigate('MainTabs', { screen: 'Home' }),
        },
        {
            title: 'Now Playing',
            icon: 'play-outline',
            gradient: ['#4ECDC4', '#45B7AF'],
            onPress: () => navigation.navigate('MainTabs', { screen: 'Now Playing' }),
        },
        {
            title: 'Favorites',
            icon: 'heart-outline',
            gradient: ['#FF9A9E', '#FAD0C4'],
            onPress: () => navigation.navigate('MainTabs', { screen: 'Favorites' }),
        },
        {
            title: 'Login / Sign Up',
            icon: 'person-outline',
            gradient: ['#A18CD1', '#FBC2EB'],
            onPress: () => {
                // TODO: Navigate to login screen
                navigation.closeDrawer();
            },
        },
        {
            title: 'Terms & Conditions',
            icon: 'document-text-outline',
            gradient: ['#84FAB0', '#8FD3F4'],
            onPress: () => {
                // TODO: Navigate to terms screen
                navigation.closeDrawer();
            },
        },
        {
            title: 'Privacy Policy',
            icon: 'shield-outline',
            gradient: ['#FFD1FF', '#FAD0C4'],
            onPress: () => {
                // TODO: Navigate to privacy policy screen
                navigation.closeDrawer();
            },
        },
    ];

    return (
        <DrawerContentScrollView
            {...props}
            style={[styles.container, { backgroundColor: color.colors.background }]}>
            <Animated.View style={{ opacity: fadeAnim }}>
                <StyledView style={styles.header}>
                    <StyledImage
                        source={Images.APP_LOGO_SPLASH_SCREEN_DARK}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <StyledText style={[styles.version, { color: color.colors.subtext }]}>
                        Version {appVersion} ({Platform.OS})
                    </StyledText>
                </StyledView>

                <View style={[styles.divider, { backgroundColor: color.colors.border }]} />

                <StyledView style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                styles.menuItemWrapper,
                                {
                                    opacity: fadeAnim,
                                    transform: [
                                        {
                                            translateX: fadeAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-50, 0],
                                            }),
                                        },
                                    ],
                                },
                            ]}>
                            <TouchableOpacity
                                style={styles.menuItem}
                                onPress={item.onPress}
                                activeOpacity={0.7}>
                                <LinearGradient
                                    colors={item.gradient}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.menuItemGradient}>
                                    <View style={styles.menuItemContent}>
                                        <View style={styles.iconContainer}>
                                            <Ionicons
                                                name={item.icon as any}
                                                size={24}
                                                color="#FFFFFF"
                                                style={styles.menuIcon}
                                            />
                                        </View>
                                        <StyledText style={styles.menuText}>
                                            {item.title}
                                        </StyledText>
                                        <Ionicons
                                            name="chevron-forward"
                                            size={20}
                                            color="#FFFFFF"
                                            style={styles.chevron}
                                        />
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </StyledView>
            </Animated.View>
        </DrawerContentScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 60,
        marginBottom: 10,
    },
    version: {
        fontSize: 12,
        marginTop: 5,
    },
    divider: {
        height: 1,
        marginVertical: 10,
    },
    menuContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    menuItemWrapper: {
        marginBottom: 10,
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuItem: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    menuItemGradient: {
        borderRadius: 12,
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuIcon: {
        marginRight: 0,
    },
    menuText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
        flex: 1,
    },
    chevron: {
        opacity: 0.8,
    },
});

export default CustomDrawer; 