// // const { useState } = require("react");
// // const { default: UserTable } = require("./components/userTable");
// // const { default: SignUnForm } = require("./components/SignUpForm");

// import { useState } from "react";
// import UserTable from "./components/userTable";
// import SignUpForm from "./components/SignUpForm";
// // import SignUnForm from "./components/SignUpForm";



// const App = () => {
//   const [showSignUpModal, setShowSignUpModal] = useState(false);
//   const [reload, setReload] = useState(false);

//   const handleUserAdded = () => {
//     setReload(!reload);
//   };

//   return (
//     <div>
//       <h1>User Management</h1>
//       <button onClick={() => setShowSignUpModal(true)}>Sign Up</button>
//       <UserTable onUserAdded={handleUserAdded} />
//       <SignUpForm
//         isOpen={showSignUpModal}
//         onClose={() => setShowSignUpModal(false)}
//         onUserAdded={handleUserAdded}
//       />
//     </div>
//   );
// };


// export default App


// src/App.js

import { useState } from "react";
import { Button, Heading, Box } from "@chakra-ui/react";
// import UserTable from "";
import SignUpForm from "./components/SignUpForm";
import UserTable from "./components/userTable";

const App = () => {
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [reload, setReload] = useState(false);

  const handleUserAdded = () => {
    setReload(!reload);
  };

  return (
    <Box p={5}>
      <Heading as="h1" size="xl" mb={4}>
        User Management
      </Heading>
      <Button colorScheme="teal" onClick={() => setShowSignUpModal(true)} mb={4}>
        Sign Up
      </Button>
      <UserTable reload={reload} onUserAdded={handleUserAdded} />
      <SignUpForm
        isOpen={showSignUpModal}
        onClose={() => setShowSignUpModal(false)}
        onUserAdded={handleUserAdded}
      />
    </Box>
  );
};

export default App;
