export const USER_GENDERS = [
    "Male",
    "Female",
    "Other",
  ] as const;
  
  export type Gender = typeof USER_GENDERS[number];