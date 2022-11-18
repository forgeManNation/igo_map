import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Table from "./table/Table";
import { doc, getDoc, db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "./sidebar/userSlice";

const Index = () => {
  const user = useSelector(selectUser);
  const [activeAnalysisIndex, setactiveAnalysisIndex] = useState(0);

  //initial load of data from firestore database
  useEffect(() => {
    async function getFirestoreData() {
      console.log("wauuuu :P", user);

      const firebaseFirestoreReference = doc(db, user.uid);
      const fireStoreUserData = await getDoc(firebaseFirestoreReference);
      console.log(fireStoreUserData, "wauuuu :P", user);
    }
    getFirestoreData();
  }, []);

  return (
    <div className="App d-flex flex-row">
      <Sidebar activeAnalysisIndex={activeAnalysisIndex}></Sidebar>
      <Table></Table>
    </div>
  );
};

export default Index;
