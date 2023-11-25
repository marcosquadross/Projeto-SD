// import React, { useState, useEffect } from "react";
// import { Input } from "@chakra-ui/react";
// import axios from "axios";

// export default function SearchBar() {
//   const [search, setSearch] = useState("");

//   function handleSearch() {
//     axios
//       .get(`http://localhost:8000/api/email/search/${search}`)
//       .then((response) => {
//         console.log(response.data);
//       });
//   }

//   useEffect(() => {
//     handleSearch();
//   }, [search]);

//   return (
//     <div>
//       <div className="searchBar">
//         <Input
//           placeholder="Pesquisar"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           size="lg"
//         />
//       </div>
//     </div>
//   );
// }
