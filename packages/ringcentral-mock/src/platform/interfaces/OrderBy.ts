export interface OrderBy {
  /**
   * Sorting priority index, starting from '1'. Optional if only one element in `orderBy` array is specified
   */
  index: number;
  /**
   * Field name by which to sort the contacts
   */
  fieldName:
    | 'firstName'
    | 'lastName'
    | 'extensionNumber'
    | 'phoneNumber'
    | 'email'
    | 'jobTitle'
    | 'department';
  /**
   * Sorting direction
   */
  direction: 'Asc' | 'Desc';
}
