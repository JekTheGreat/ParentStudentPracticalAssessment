export interface ParentModel {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  created_at: string;
  updated_at: string;
  pin: string;
  id: string;
}

export interface StudentModel {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  grade_level: string;
  created_at: string;
  updated_at: string;
  id: string;
  parentId: string;
}
