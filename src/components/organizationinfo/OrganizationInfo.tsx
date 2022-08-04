import React from 'react'
import MemebersDataFetchedFromWikipedia from "./MemebersDataFetchedFromWikipedia"
import MembersDataFromJson from "./MembersDataFromJson"
import worldCountriesInformation from "../../data/world_countries_information.json"
import organizations from "../../data/IGOs.json"

interface organizationInfoProps {
    currentOrganization: string
}

const OrganizationInfo = (props : organizationInfoProps) => {

  const currentOrganizationInfo = organizations[props.currentOrganization as keyof typeof organizations]
  const currentOrganizationMembers = currentOrganizationInfo.organizations
  const currentOrganizationWikiLink = currentOrganizationInfo.wikiPage


  return (
    <div className='bg-gray-800'>
        <h1 className=' text-white mt-6 text-5xl'>{props.currentOrganization}</h1>
        <div className= 'grid  lg:grid-cols-2 sm:grid-cols-1'>
          <div className = " m-7 mt-3">
            <MemebersDataFetchedFromWikipedia currentOrganization= {props.currentOrganization} currentOrganizationWikiLink = {currentOrganizationWikiLink}></MemebersDataFetchedFromWikipedia>
          </div>
          <div  className = " m-7 mt-3">
            <MembersDataFromJson currentOrganizationMembers = {currentOrganizationMembers}></MembersDataFromJson>
          </div>
        </div>
    </div>
  )
}

export default OrganizationInfo