import React from "react";
import Sidebar from "./sidebar/Sidebar";
import Table from "./table/Table";
import SettingsModal from "./table/modals/ProfileModal";
import ChangeNameModal from "./table/modals/ChangeNameModal";
import EvidenceModal from "./table/modals/EvidenceModal";

const AuthenticatedApp = () => {
  return (
    <div className="App d-flex flex-row">
      <Sidebar></Sidebar>
      <Table></Table>

      {/* Modals */}
      <SettingsModal></SettingsModal>
      <ChangeNameModal></ChangeNameModal>
      <EvidenceModal></EvidenceModal>
      {/* <p>{JSON.stringify(useSelector(selectAllUserData))}</p> */}
    </div>
  );
};

export default AuthenticatedApp;
