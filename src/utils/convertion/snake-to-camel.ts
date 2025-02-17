import { camelCase } from "lodash";

// Function to convert snake_case to camelCase
export const snakeToCamel = <
  T extends Record<string, unknown>, // T can be any object with string keys
  U extends Record<string, unknown> // U can be any object with string keys
>(
  obj: T
): Partial<U> => {
  const result: Partial<U> = {}; // Initialize with a clean object

  for (const [key, value] of Object.entries(obj)) {
    // Convert snake_case key to camelCase
    const camelKey = camelCase(key) as keyof U;

    // Safely assign the value to the result object
    (result as Record<keyof U, unknown>)[camelKey] = value ?? ""; // Default to empty string if value is undefined
  }

  return result;
};

// Function to convert an array of objects from snake_case to camelCase
export const snakeToCamelArray = <
  T extends Record<string, unknown>, // T can be any object with string keys
  U extends Record<string, unknown> // U can be any object with string keys
>(
  arr: T[]
): Partial<U>[] => {
  if (!arr || arr.length === 0) {
    return []; // Return an empty array if input is null or empty
  }
  return arr.map((item) => snakeToCamel<T, U>(item)); // Apply snakeToCamel to each item in the array
};

// // Interface with index signature to satisfy constraint
// interface CsvEmployee {
//   employeeId: string;
//   fullName: string;
//   department: string;
//   [key: string]: unknown; // Add this line to allow indexing by string
// }

// // Input object in snake_case
// const inputEmployee = {
//   employee_id: "E123",
//   full_name: "John Doe",
//   department_name: "Engineering",
// };

// // Using snakeToCamel function to convert to camelCase
// const resultEmployee = snakeToCamel<typeof inputEmployee, CsvEmployee>(
//   inputEmployee
// );

// console.log(resultEmployee);
// // Output: { employeeId: 'E123', fullName: 'John Doe', department: 'Engineering' }

// // Interface with index signature to satisfy constraint
// interface CsvEmployee {
//   employeeId: string;
//   fullName: string;
//   department: string;
//   [key: string]: unknown; // Add this line to allow indexing by string
// }

// // Input array of objects in snake_case
// const inputEmployees = [
//   {
//     employee_id: "E123",
//     full_name: "John Doe",
//     department_name: "Engineering",
//   },
//   {
//     employee_id: "E124",
//     full_name: "Jane Smith",
//     department_name: "Marketing",
//   },
// ];

// // Using snakeToCamelArray function to convert the array
// const resultEmployees = snakeToCamelArray<
//   (typeof inputEmployees)[0],
//   CsvEmployee
// >(inputEmployees);

// console.log(resultEmployees);
// // Output:
// // [
// //   { employeeId: 'E123', fullName: 'John Doe', department: 'Engineering' },
// //   { employeeId: 'E124', fullName: 'Jane Smith', department: 'Marketing' }
// // ]
