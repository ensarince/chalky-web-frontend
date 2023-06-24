export type User = {
    user_id: string,
    email: string,
    hashed_password: string,
    about: string,
    dob_day: string,
    dob_month: string,
    dob_year: string,
    first_name: string,
    gender_identity: GenderIdentity,
    gender_interest: GenderInterest,
    matches: Match[],
    show_gender: boolean,
    url: string,
}

enum GenderIdentity {
    Male = 'male',
    Female = 'female',
    Other = 'other',
  }
  
  enum GenderInterest {
    Male = 'male',
    Female = 'female',
    Any = 'any',
  }

export type Match = {
    user_id: string,
}

export type Message = {
    timestamp: string,
    from_userId: string,
    to_userId: string,
    message: string,
    img: string
}

export type FormattedMessage = {
  name: string,
  timestamp: string,
  message: string,
  img: string
}


export type CookieData = {
  UserId?: string;
  AuthToken?: string;
  // Add other cookie properties if needed
};