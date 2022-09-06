import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ProjectList = ({navigation}) => {
  return (
    <View
      style={{flex: 1, backgroundColor: 'black', padding: 40, display: 'flex'}}>
      <Text>Project</Text>
      <TouchableOpacity onPress={() => navigation.navigate('paymentsApp')}>
        <Text style={styles.projectText}>Project #1 / paymentsApp</Text>
      </TouchableOpacity>

      <Text>Study</Text>
      <TouchableOpacity onPress={() => navigation.navigate('realm')}>
        <Text style={styles.projectText}>Study #1 / Realm</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProjectList;

const styles = StyleSheet.create({
  projectText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
