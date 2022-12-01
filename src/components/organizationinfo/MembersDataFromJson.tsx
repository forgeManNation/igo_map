import React from "react";

//array of objects of main data for every world country
import worldCountriesInformation from "../../data/world_countries_information.json";

//object of inter governmental organisations (IGOs), each organisation is an array in the structure [ state, status in IGO]
interface membersDataFromJsonProps {
  currentOrganizationMembers: string[][];
}
const MembersDataFromJson = (props: membersDataFromJsonProps) => {
  const currentOrganizationMembersWithStatus =
    props.currentOrganizationMembers.filter(
      (member: String[]) => member[1] !== ""
    );

  let organizationsWithStatusesSeparated: { [key: string]: string[] } = {};

  currentOrganizationMembersWithStatus.forEach((member) => {
    if (organizationsWithStatusesSeparated[member[1]] === undefined) {
      organizationsWithStatusesSeparated[member[1]] = [];
    }

    organizationsWithStatusesSeparated[member[1]].push(member[0]);
  });

  const currentOrganizationMembersWithoutStatus =
    props.currentOrganizationMembers.filter(
      (member: String[]) => member[1] === ""
    );

  const currentOrganizationCountriesInfoWithStatuses: any = {};

  Object.keys(organizationsWithStatusesSeparated).forEach((key) => {
    currentOrganizationCountriesInfoWithStatuses[key] =
      worldCountriesInformation.filter((countryData) =>
        organizationsWithStatusesSeparated[key].includes(countryData.country)
      );
  });

  const currentOrganizationCountriesInfoWithoutStatus =
    worldCountriesInformation.filter((countryData) =>
      currentOrganizationMembersWithoutStatus
        .map((member) => member[0])
        .includes(countryData.country)
    );

  const cityIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
        clipRule="evenodd"
      />
    </svg>
  );

  const populationIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
    </svg>
  );

  return (
    <div className="  flex flex-col" style={{ maxHeight: "20%" }}>
      <h1 className=" text-2xl m-2 text-slate-200 uppercase">full members</h1>
      <div className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  gap-4 rounded-lg mb-6">
        {currentOrganizationCountriesInfoWithoutStatus.map((element, index) => {
          return (
            <span
              className=" bg-gradient-to-b   from-slate-900 to-slate-800  rounded-sm"
              key={"country-" + index}
            >
              <h1 className="text-lg text-blue-800">{element.country}</h1>
              <p data-tooltip-target="tooltip-continent">{element.continent}</p>
              <div
                id="tooltip-continent"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
              >
                Continent
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>

              <p
                data-tooltip-target="tooltip-city"
                className="flex justify-center gap-2 text-amber-900 "
              >
                {cityIcon}
                {element.city}
              </p>
              <div
                id="tooltip-city"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
              >
                Capital city
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>

              <p
                data-tooltip-target="tooltip-population"
                className=" text-green-800 flex justify-center gap-2 "
              >
                {populationIcon}
                {element.population}
              </p>

              <div
                id="tooltip-population"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
              >
                Population
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>

              <img
                alt=""
                style={{
                  display: "block",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                className="w-28 opacity-80 "
                src={element.flag_base64!}
              />
            </span>
          );
        })}
      </div>

      {Object.keys(currentOrganizationCountriesInfoWithStatuses).map(
        (key, index) => {
          return (
            <div className=" mb-6">
              <h1 className=" text-2xl m-5 text-slate-200 uppercase">
                {key}(s)
              </h1>
              <div className="grid grid-cols-4 content-center gap-4">
                {currentOrganizationCountriesInfoWithStatuses[key].map(
                  (element: any, index: number) => {
                    return (
                      <span
                        className=" bg-gradient-to-b   from-slate-900 to-slate-800  rounded-sm"
                        key={"country-" + index}
                      >
                        <h1 className="text-lg text-blue-800">
                          {element.country}
                        </h1>
                        <p data-tooltip-target="tooltip-continent">
                          {element.continent}
                        </p>
                        <div
                          id="tooltip-continent"
                          role="tooltip"
                          className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                        >
                          Continent
                          <div
                            className="tooltip-arrow"
                            data-popper-arrow
                          ></div>
                        </div>

                        <p
                          data-tooltip-target="tooltip-city"
                          className="flex justify-center gap-2 text-amber-900 "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {element.city}
                        </p>
                        <div
                          id="tooltip-city"
                          role="tooltip"
                          className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                        >
                          Capital city
                          <div
                            className="tooltip-arrow"
                            data-popper-arrow
                          ></div>
                        </div>

                        <p
                          data-tooltip-target="tooltip-population"
                          className=" text-green-800 flex justify-center gap-2 "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                          </svg>
                          {element.population}
                        </p>

                        <div
                          id="tooltip-population"
                          role="tooltip"
                          className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                        >
                          Population
                          <div
                            className="tooltip-arrow"
                            data-popper-arrow
                          ></div>
                        </div>
                        <img
                          style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                          className="w-28"
                          src={element.flag_base64!}
                        />
                      </span>
                    );
                  }
                )}
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default MembersDataFromJson;
