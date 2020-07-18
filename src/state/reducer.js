import { createContext } from "react";

export function Reducer(state, action) {
  switch (action.type) {
    case "LOG_IN":
      return { ...state };
    case "LOG_OUT":
      return {
        ...state,
        token: "",
        id: "",
        user: "",
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    case "SET_ID":
      return {
        ...state,
        id: action.payload,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "SET_NAME":
      return {
        ...state,
        user: { ...state.user, name: action.payload },
      };

    case "SET_AGE":
      return {
        ...state,
        user: { ...state.user, age: action.payload },
      };

    case "SET_PHNO":
      return {
        ...state,
        user: { ...state.user, phno: action.payload },
      };

    case "SET_EMAIL":
      return {
        ...state,
        user: { ...state.user, email: action.payload },
      };

    case "SET_CITY":
      return {
        ...state,
        user: { ...state.user, city: action.payload },
      };

    case "SET_GITHUB":
      return {
        ...state,
        user: { ...state.user, github: action.payload },
      };

    case "ADD_INTERNSHIP":
      return {
        ...state,
        user: {
          ...state.user,
          internships: [...state.user.internships, action.payload],
        },
      };

    case "ADD_EDUCATION":
      return {
        ...state,
        user: {
          ...state.user,
          education: [...state.user.education, action.payload],
        },
      };
    case "ADD_SKILL":
      return {
        ...state,
        user: {
          ...state.user,
          skills: [...state.user.skills, action.payload],
        },
      };
    case "DELETE_EDUCATION":
      return {
        ...state,
        user: {
          ...state.user,
          education: state.user.education.filter(
            (edu) => edu.id != action.payload.id
          ),
        },
      };

    case "DELETE_INTERNSHIP":
      return {
        ...state,
        user: {
          ...state.user,
          internships: state.user.internships.filter(
            (edu) => edu.id != action.payload.id
          ),
        },
      };

    default:
      return { ...state };
  }
}

export const InitialState = {
  user: {
    education: [],
    internships: [],
    courses: [],
    skills: [],
    name: "",
  },
  profiles: {},
  token: "",
  id: "",
};

export const Context = createContext();
export const APIURL = "http://localhost:5000";

export const ContextProvider = Context.Provider;
