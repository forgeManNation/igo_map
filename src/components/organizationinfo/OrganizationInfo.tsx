import React from "react";
import OrganisationDataFetchedFromWikipedia from "./OrganisationDataFetchedFromWikipedia";
import MembersDataFromJson from "./MembersDataFromJson";
import organizations from "../../data/IGOs.json";

interface organizationInfoProps {
  currentOrganization: string;
}

const OrganizationInfo = (props: organizationInfoProps) => {

  //current organisation member countries and wikipedia page
  const currentOrganizationInfo =
    organizations[props.currentOrganization as keyof typeof organizations];

  //destructuring current organisation information
  const currentOrganizationMembers = currentOrganizationInfo.organizations;
  const currentOrganizationWikiLink = currentOrganizationInfo.wikiPage;

  return (
    <div className="bg-gray-800">
      <h1 className=" text-white mt-6 text-5xl">{props.currentOrganization}</h1>
      <div className="grid  lg:grid-cols-2 sm:grid-cols-1">
        <div className=" m-7 mt-3">
          <OrganisationDataFetchedFromWikipedia
            key={props.currentOrganization}
            currentOrganization={props.currentOrganization}
            currentOrganizationWikiLink={currentOrganizationWikiLink}
          ></OrganisationDataFetchedFromWikipedia>
        </div>
        <div className=" m-7 mt-3">
          <MembersDataFromJson
            currentOrganizationMembers={currentOrganizationMembers}
          ></MembersDataFromJson>
        </div>
      </div>
    </div>
  );
};

export default OrganizationInfo;
