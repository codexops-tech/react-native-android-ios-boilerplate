import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { StyledView } from '../components/StyledView';
import { StyledText } from '../components/StyledText';
import { StyledImage } from '../components/StyledImage';
import { color } from '../theme/color';
import { mockStations, Station } from '../services/mockData';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

type GenreStationsRouteProp = RouteProp<RootStackParamList, 'GenreStations'>;
type GenreStationsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GenreStations'>;

export const GenreStationsScreen: React.FC = () => {
    const route = useRoute<GenreStationsRouteProp>();
    const navigation = useNavigation<GenreStationsNavigationProp>();
    const [stations, setStations] = useState<Station[]>([]);

    useEffect(() => {
        // In a real app, this would be an API call
        const filteredStations = mockStations.filter(
            station => station.genreId === route.params.genreId
        );
        setStations(filteredStations);
    }, [route.params.genreId]);

    return (
        <StyledView style={styles.container}>
            {/* Header */}
            <StyledView style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={24} color={color.colors.text} />
                </TouchableOpacity>
                <StyledText style={styles.title}>{route.params.genreName}</StyledText>
            </StyledView>

            {/* Stations List */}
            <ScrollView style={styles.stationsList}>
                {stations.map((station) => (
                    <TouchableOpacity
                        key={station.id}
                        style={styles.stationCard}
                        onPress={() => navigation.navigate('NowPlaying', { stationId: station.id })}
                    >
                        <StyledImage
                            source={{ uri: station.logo }}
                            style={styles.stationLogo}
                        />
                        <StyledView style={styles.stationInfo}>
                            <StyledText style={styles.stationName}>{station.name}</StyledText>
                            <StyledText style={styles.stationDescription}>
                                {station.description}
                            </StyledText>
                        </StyledView>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </StyledView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: color.colors.border,
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: color.colors.text,
    },
    stationsList: {
        flex: 1,
    },
    stationCard: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: color.colors.border,
    },
    stationLogo: {
        width: 60,
        height: 60,
        borderRadius: 8,
    },
    stationInfo: {
        flex: 1,
        marginLeft: 12,
    },
    stationName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: color.colors.text,
        marginBottom: 4,
    },
    stationDescription: {
        fontSize: 14,
        color: color.colors.textSecondary,
    },
}); 