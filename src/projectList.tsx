import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const ProjectList = ({navigation}) => {
  return (
    <View
      style={{flex: 1, backgroundColor: 'black', padding: 40, display: 'flex'}}>
      <Text>Project</Text>
      <TouchableOpacity
        style={styles.titleBtn}
        onPress={() => navigation.navigate('paymentsApp')}>
        <Text style={styles.projectText}>Project #1 / paymentsApp</Text>
      </TouchableOpacity>

      <Text style={{marginTop: 20}}>Study</Text>
      <TouchableOpacity
        style={styles.titleBtn}
        onPress={() => navigation.navigate('realm')}>
        <Text style={styles.projectText}>Study #1 / Realm</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.titleBtn}
        onPress={() => navigation.navigate('layoutAnimationStudy')}>
        <Text style={styles.projectText}>Study #2 / LayoutAnimation</Text>
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
  titleBtn: {
    marginBottom: 5,
  },
});
