// import { createContext, useEffect, useState } from "react";
// import jwtDecode from "jwt-decode";
// import { Navigate } from 'react-router-dom';

// // export const AuthenticationContext = createContext();

// // export const UserDataContextProvider = ({ children }) => {
// //   const [userData, setUserData] = useState(null)

  
// // function saveUserData() {
// //   let encodedToken=localStorage.getItem('tkn')
// //  let decodedToken= jwtDecode(encodedToken)
// //  setUserData(decodedToken)
// //  console.log(decodedToken);
// // }

// // function logOut() {
// //   setUserData(null);
// //   localStorage.removeItem('tkn');
// // <Navigate to='/login'/>

// // }

// //  function ProtectedRoute({ children }) {
// //    if(localStorage.getItem('tkn')===null){
// //      return <Navigate to='/login'/>
// //    }
// //    else
// //    {
// //      return children

// //    }
// //  }

// //   useEffect(() => {

// //     if(localStorage.getItem('tkn')){
// //       saveUserData()
// //         }
        
  
// //   }, [])

// //   return (
// //     <AuthenticationContext.Provider value={{ saveUserData,logOut,ProtectedRoute,userData }}>
// //       {children}
// //     </AuthenticationContext.Provider>
// //   );
// // };






// export const AuthenticationContext = createContext();

// export const AuthenticationContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(
//     JSON.parse(localStorage.getItem("user")) || null
//   );

//   const saveUserData = () => {
//     //TO DO
    
//         let encodedToken=localStorage.getItem('tkn')
//        let decodedToken= jwtDecode(encodedToken)
//        setCurrentUser(decodedToken)
//        console.log(decodedToken);
      
   
//   };

//   useEffect(() => {
//     localStorage.setItem("user", JSON.stringify(currentUser));
//   }, [currentUser]);

//   return (
//     <AuthenticationContext.Provider value={{ currentUser, saveUserData }}>
//       {children}
//     </AuthenticationContext.Provider>
//   );
// };


