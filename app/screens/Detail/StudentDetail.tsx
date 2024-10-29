import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../navigation/AppNavigator';
import parents_students from '../../api';
import {StudentModel} from '../../models/models';

const StudentDetail = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'StudentDetail'>>();
  const {parentId, studentId} = route?.params;
  const [student, setStudent] = useState<StudentModel>({} as StudentModel);
  const date = new Date(student?.date_of_birth);
  const options: any = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentDetail = await parents_students.getStudent(parentId, studentId);
        setStudent(studentDetail);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.parentname}>{`Viewing student: ${student?.first_name} ${student?.last_name}`}</Text>
      <Text style={styles.parentDetails}>Date of birth: {date.toLocaleString('en-US', options)}</Text>
      <Text style={styles.parentDetails}>Grade level: {student?.grade_level}</Text>
    </View>
  );
};

export default StudentDetail;

const styles = StyleSheet.create({
  headerContainer: {padding: 24, rowGap: 8, marginBottom: 24},
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
    backgroundColor: 'red',
  },
  studentName: {fontWeight: '700', color: 'black', fontSize: 18},
  studentDetails: {fontWeight: '400', color: 'black', fontSize: 14},
});
