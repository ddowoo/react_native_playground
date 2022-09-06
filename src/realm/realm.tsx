import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Realm from 'realm';

const {width} = Dimensions.get('screen');

// schema는 name , properties 구조로 되어있다.
const personSchema = {
  name: 'Person',
  properties: {
    name: 'string',
    age: 'string',
    // pets: {type: 'list'},
  },
  primaryKey: 'name',
};

const RealmView = () => {
  const [savedPerson, setSavedPerson] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [originData, setOriginData] = useState({name: '', age: ''});
  const [newData, setNewData] = useState({name: '', age: ''});
  const realm = useRef<Realm>();

  useEffect(() => {
    openLocalDB();

    return () => {
      realm.current?.close();
    };
  }, []);

  const openLocalDB = async () => {
    realm.current = await Realm.open({
      schema: [personSchema],
    });

    readDB();
  };

  const createDB = () => {
    realm.current?.write(() => {
      realm.current?.create('Person', newData);
    });
    readDB();
  };
  const readDB = () => {
    const persons = realm.current?.objects('Person');
    setSavedPerson(persons);
    setNewData({name: '', age: ''});
  };
  const updateDB = () => {
    const person = realm.current
      ?.objects('Person')
      .filtered(`name = '${originData.name}'`)[0];

    realm.current?.write(() => {
      person.name = newData.name;
      person.age = newData.age;
    });

    readDB();
  };

  const deleteDB = (name: string) => {
    const person = realm.current
      ?.objects('Person')
      .filtered(`name = '${name}'`)[0];

    realm.current?.write(() => {
      realm.current?.delete(person);
    });
    readDB();
  };

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text style={styles.title}>저장된 정보</Text>
      {savedPerson.map(person => {
        return (
          <View
            key={person.name}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>
              {person?.name} 은 {person.age}살 입니다
            </Text>
            <TouchableOpacity
              onPress={() => {
                setIsUpdate(true);
                setOriginData(person);
                setNewData(person);
              }}
              style={styles.editBtn}>
              <Text>변경하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteDB(person.name)}
              style={[styles.editBtn, {backgroundColor: 'yellow'}]}>
              <Text>삭제하기</Text>
            </TouchableOpacity>
          </View>
        );
      })}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'flex-start',
          marginVertical: 10,
        }}>
        <Text style={[styles.title, {width: 140}]}>작성중인 정보</Text>
        <TouchableOpacity
          onPress={() => {
            if (isUpdate) {
              setNewData({name: '', age: ''});
              setIsUpdate(false);
            }
          }}
          style={{padding: 5, borderRadius: 10, borderWidth: 1}}>
          <Text>{isUpdate ? '수정중' : '추가중'}</Text>
        </TouchableOpacity>
      </View>
      <Text>이름 : {newData.name}</Text>
      <Text>나이 : {newData.age}</Text>
      <Text style={styles.title}>이름</Text>
      <TextInput
        value={newData.name}
        onChangeText={e => setNewData({...newData, name: e})}
        style={styles.inputBox}
      />
      <Text style={styles.title}>나이</Text>
      <TextInput
        onChangeText={e => setNewData({...newData, age: e})}
        value={newData.age}
        style={styles.inputBox}
        keyboardType="number-pad"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          disabled={!isUpdate}
          onPress={updateDB}
          style={styles.saveBtn}>
          <Text>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={createDB} style={styles.saveBtn}>
          <Text>추가</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RealmView;

const styles = StyleSheet.create({
  editBtn: {
    marginLeft: 20,
    marginVertical: 10,
    padding: 5,
    backgroundColor: 'skyblue',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    width: width - 20,
    marginVertical: 10,
    paddingLeft: 10,
  },
  inputBox: {
    width: width - 20,
    height: 45,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 20,
  },
  saveBtn: {
    height: 45,
    width: width / 2 - 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
    backgroundColor: 'orange',
    marginHorizontal: 5,
  },
});
