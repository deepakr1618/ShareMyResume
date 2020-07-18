export function LogOutUser() {
  return {
    type: "LOG_OUT",
  };
}

export function SetToken(token) {
  return {
    type: "SET_TOKEN",
    payload: token,
  };
}

export function SetId(id) {
  return {
    type: "SET_ID",
    payload: id,
  };
}

export function SetField({ name, data }) {
  return {
    type: `SET_${name}`,
    payload: data,
  };
}

export function SetUser(user) {
  return {
    type: "SET_USER",
    payload: user,
  };
}

export function AddInternShipAction(internshipDetails) {
  return {
    type: "ADD_INTERNSHIP",
    payload: {
      ...internshipDetails,
      id: parseInt(Math.random() * 10000),
    },
  };
}

export function AddEducationAction(educationDetails) {
  return {
    type: "ADD_EDUCATION",
    payload: {
      ...educationDetails,
      id: parseInt(Math.random() * 10000),
    },
  };
}

export function AddSkillAction(skill) {
  return {
    type: "ADD_SKILL",
    payload: {
      ...skill,
      id: parseInt(Math.random() * 10000),
    },
  };
}

export function DeleteEducationAction(id) {
  return {
    type: "DELETE_EDUCATION",
    payload: {
      id: id,
    },
  };
}

export function DeleteInternshipAction(id) {
  return {
    type: "DELETE_INTERNSHIP",
    payload: {
      id: id,
    },
  };
}

export function EraseUserLoginData() {
  localStorage.setItem("token", "NONE");
  localStorage.setItem("id", "NONE");
}
