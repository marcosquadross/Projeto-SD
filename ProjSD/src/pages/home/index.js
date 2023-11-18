import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';

const CompetitionItem = ({ title, teams }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <ListItem onPress={toggleExpansion}>
        <Icon name={isExpanded ? 'chevron-up' : 'chevron-down'} type="font-awesome" />
        <ListItem.Content>
          <ListItem.Title>{title}</ListItem.Title>
        </ListItem.Content>
      </ListItem>

      {isExpanded && (
        <View style={styles.teamsContainer}>
          <Text>Equipes:</Text>
          {teams.map((team) => (
            <Text key={team}>{team}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const YourComponent = () => {
  const competitions = [
    { title: 'Competições', teams: ['Time A', 'Time B', 'Time C'] },
    { title: 'Times', teams: ['Time X', 'Time Y', 'Time Z'] },
    // Adicione mais competições conforme necessário
  ];

  return (
    <View style={styles.container}>
      {competitions.map((competition, index) => (
        <CompetitionItem key={index} {...competition} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  teamsContainer: {
    marginLeft: 20, // Ajuste a margem conforme necessário
  },
});

export default YourComponent;
