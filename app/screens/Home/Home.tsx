import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NavigationScreenProps, RootStackParamList} from '../../navigation/AppNavigator';
import parents_students from '../../api';
import {ParentModel, StudentModel} from '../../models/models';

const Home = () => {
  const navigation = useNavigation<NavigationScreenProps<'Home'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
  const parentId = route?.params?.id;
  const [parent, setParent] = useState<ParentModel>({} as ParentModel);
  const [studentList, setStudentList] = useState<StudentModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const parent = await parents_students.getParent(parentId);
      setParent(parent);
      try {
        const students = await parents_students.getStudentList(parentId);
        setStudentList(students);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  const renderParentDetails = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.parentname}>{`Hi Parent ${parent?.first_name} ${parent?.last_name}`}</Text>
        <Text style={styles.parentDetails}>Address: {parent?.address}</Text>
        <Text style={styles.parentDetails}>Email: {parent?.email}</Text>
        <Text style={styles.parentDetails}>Phone number: {parent?.phone_number}</Text>
      </View>
    );
  };

  const goToStudentDetail = (item: StudentModel) => {
    navigation.navigate('StudentDetail', {parentId: item?.parentId, studentId: item?.id});
  };

  const renderItem = ({item, index}: {item: StudentModel; index: number}) => {
    const date = new Date(item?.date_of_birth);
    const options: any = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return (
      <TouchableOpacity style={styles.studentContainer} onPress={() => goToStudentDetail(item)}>
        <View style={styles.studentInitial}>
          <Text style={styles.parentname}>{`${item?.first_name.charAt(0)} ${item?.last_name.charAt(0)}`}</Text>
        </View>

        <View>
          <Text style={styles.studentName}>{`Student: ${item?.first_name} ${item?.last_name}`}</Text>
          <Text style={styles.studentDetails}>Date of birth: {date.toLocaleString('en-US', options)}</Text>
          <Text style={styles.studentDetails}>Grade level: {item?.grade_level}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => {
    if (studentList.length > 0) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyMessage}>No students found.</Text>
      </View>
    );
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.rg16}
      data={studentList}
      ListHeaderComponent={renderParentDetails}
      renderItem={renderItem}
      ListFooterComponent={renderEmptyComponent}
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {padding: 24},
  headerContainer: {rowGap: 8, marginBottom: 24},
  rg16: {rowGap: 16},
  parentname: {fontWeight: '700', color: 'black', fontSize: 18},
  parentDetails: {fontWeight: '400', color: 'black', fontSize: 14},
  studentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: 'lightslategrey',
    borderRadius: 10,
  },
  studentInitial: {
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: 'lightgray',
  },
  studentName: {fontWeight: '700', color: 'black', fontSize: 18},
  studentDetails: {fontWeight: '400', color: 'black', fontSize: 14},
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  emptyMessage: {fontWeight: '400', color: 'black', fontSize: 16},
});
