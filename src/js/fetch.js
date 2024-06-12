const apiUrl = "http://localhost:3000/api/users/";

//Metodo GET
export const getData = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Metodo POST
export const postData = async (userData) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Metodo DELETE
export const deleteData = async (id) => {
  try {
    const response = await fetch(apiUrl + id, {
      method: "DELETE",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//Metodo PUT
export const putData = async (id, newData) => {
  try {
    const response = await fetch(apiUrl + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
